const db = require('../models');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');
const { sendModerationNotification } = require('../utils/emailService');

function isValidId (id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

const getOfferWithDetails = async (offerId, transaction) => {
  const offer = await db.Offers.findOne({
    where: { id: offerId },
    include: [
      {
        model: db.Users,
        attributes: ['email', 'firstName', 'lastName'],
      },
      {
        model: db.Contests,
        attributes: ['title'],
      },
    ],
    transaction,
  });

  if (!offer) {
    throw new ServerError('Offer not found');
  }

  return offer;
};

const processOfferModeration = async (offerId, decision, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    if (!isValidId(offerId)) throw new ServerError('Invalid offerId');

    const offer = await getOfferWithDetails(offerId, transaction);
    const { User, Contest } = offer;
    const userName = `${User.firstName} ${User.lastName}`;

    const statusMap = {
      approved: CONSTANTS.OFFER_STATUS_APPROVED,
      rejected: CONSTANTS.OFFER_STATUS_REJECTED,
    };

    await db.Offers.update(
      { status: statusMap[decision] },
      { where: { id: offerId }, transaction }
    );

    await sendModerationNotification({
      userEmail: User.email,
      userName,
      offerId,
      decision,
      contestTitle: Contest.title,
    });

    await transaction.commit();
    res.send({ success: true });
  } catch (err) {
    await transaction.rollback();
    next(new ServerError(err.message || err));
  }
};

module.exports.getAllOffers = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const { count, rows } = await db.Offers.findAndCountAll({
      where: { status: CONSTANTS.OFFER_STATUS_PENDING },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Contests,
          attributes: ['id', 'title', 'industry', 'styleName', 'brandStyle'],
        },
      ],
    });
    res.send({ offers: rows, total: count });
  } catch (err) {
    next(new ServerError(err.message || err));
  }
};

module.exports.approveOffer = async (req, res, next) => {
  const { offerId } = req.params;
  await processOfferModeration(offerId, 'approved', res, next);
};

module.exports.rejectOffer = async (req, res, next) => {
  const { offerId } = req.params;
  await processOfferModeration(offerId, 'rejected', res, next);
};
