const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const [newConversation] = await db.Conversations.findOrCreate({
      where: { participants },
      defaults: {
        participants,
        blackList: [false, false],
        favoriteList: [false, false],
      },
    });

    const message = await db.Messages.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation.id,
    });

    const messageData = message.toJSON();
    messageData.participants = participants;

    const interlocutorId = participants.filter(
      participant => participant !== req.tokenData.userId
    )[0];

    const preview = {
      _id: newConversation.id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };

    controller.getChatController().emitNewMessage(interlocutorId, {
      message: messageData,
      preview: {
        _id: newConversation.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });

    res.send({
      message: messageData,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const conversation = await db.Conversations.findOne({
      where: { participants },
    });

    if (!conversation) {
      const interlocutor = await userQueries.findUser({
        id: req.body.interlocutorId,
      });
      return res.send({
        messages: [],
        interlocutor: {
          firstName: interlocutor.firstName,
          lastName: interlocutor.lastName,
          displayName: interlocutor.displayName,
          id: interlocutor.id,
          avatar: interlocutor.avatar,
        },
      });
    }

    const messages = await db.Messages.findAll({
      where: { conversation: conversation.id },
      order: [['createdAt', 'ASC']],
      attributes: [
        'id',
        'sender',
        'body',
        'conversation',
        'createdAt',
        'updatedAt',
      ],
    });

    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
    });

    res.send({
      messages: messages.map(msg => msg.toJSON()),
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await db.Conversations.findAll({
      where: {
        participants: {
          [db.Sequelize.Op.contains]: [req.tokenData.userId],
        },
      },
      order: [['updatedAt', 'DESC']],
    });

    const conversationsData = [];
    const interlocutors = [];

    for (const conversation of conversations) {
      const conversationData = conversation.toJSON();

      const lastMessage = await db.Messages.findOne({
        where: { conversation: conversationData.id },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'sender', 'body', 'createdAt'],
      });

      if (lastMessage) {
        const messageData = lastMessage.toJSON();
        conversationsData.push({
          _id: conversationData.id,
          sender: messageData.sender,
          text: messageData.body,
          createAt: messageData.createdAt,
          participants: conversationData.participants,
          blackList: conversationData.blackList,
          favoriteList: conversationData.favoriteList,
        });

        interlocutors.push(
          conversationData.participants.find(
            participant => participant !== req.tokenData.userId
          )
        );
      }
    }

    const senders = await db.Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    conversationsData.forEach(conversation => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });

    res.send(conversationsData);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const predicate = req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await db.Conversations.findOne({
      where: { participants: req.body.participants },
    });

    if (!chat) {
      return res.status(404).send({ error: 'Conversation not found' });
    }

    const blackList = [...chat.blackList];
    blackList[predicate] = req.body.blackListFlag;

    await chat.update({ blackList });

    res.send(chat.toJSON());

    const interlocutorId = req.body.participants.filter(
      participant => participant !== req.tokenData.userId
    )[0];

    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, chat.toJSON());
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const predicate = req.body.participants.indexOf(req.tokenData.userId);
  try {
    const chat = await db.Conversations.findOne({
      where: { participants: req.body.participants },
    });

    if (!chat) {
      return res.status(404).send({ error: 'Conversation not found' });
    }

    const favoriteList = [...chat.favoriteList];
    favoriteList[predicate] = req.body.favoriteFlag;

    await chat.update({ favoriteList });

    res.send(chat.toJSON());
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    });

    res.send(catalog.toJSON());
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ error: 'Catalog not found' });
    }

    await catalog.update({ catalogName: req.body.catalogName });

    res.send(catalog.toJSON());
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ error: 'Catalog not found' });
    }

    const chats = [...catalog.chats];
    if (!chats.includes(req.body.chatId)) {
      chats.push(req.body.chatId);
    }

    await catalog.update({ chats });

    res.send(catalog.toJSON());
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    if (!catalog) {
      return res.status(404).send({ error: 'Catalog not found' });
    }

    const chats = catalog.chats.filter(chatId => chatId !== req.body.chatId);
    await catalog.update({ chats });

    res.send(catalog.toJSON());
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const result = await db.Catalogs.destroy({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    if (result === 0) {
      return res.status(404).send({ error: 'Catalog not found' });
    }

    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalogs.findAll({
      where: { userId: req.tokenData.userId },
      attributes: ['id', 'catalogName', 'chats'],
    });

    res.send(catalogs.map(catalog => catalog.toJSON()));
  } catch (err) {
    next(err);
  }
};
