const db = require('../models');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

function isValidId (id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

async function findOfferById (offerId, transaction) {
  const offer = await db.Offers.findOne({
    where: { id: offerId },
    transaction,
  });
  if (!offer) throw new ServerError('Offer not found');
  return offer;
}

// Get all offers (with pagination)
module.exports.getAllOffers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { count, rows } = await db.Offers.findAndCountAll({
      where: { status: CONSTANTS.OFFER_STATUS_PENDING },
      limit,
      offset,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Contests,
          // attributes: ['id', 'title'],
          attributes: ['id', 'title', 'industry', 'styleName', 'brandStyle'],
        },
      ],
    });
    res.send({ offers: rows, total: count });
  } catch (err) {
    next(new ServerError(err.message || err));
  }
};

// Approve offer
module.exports.approveOffer = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const offerId = req.params.offerId;
    if (!isValidId(offerId)) throw new ServerError('Invalid offerId');
    // Только выбранный оффер становится approved
    await db.Offers.update(
      { status: CONSTANTS.OFFER_STATUS_APPROVED },
      { where: { id: offerId }, transaction }
    );
    // TODO: send email to offer creator (offer.userId)
    await transaction.commit();
    res.send({ success: true });
  } catch (err) {
    await transaction.rollback();
    next(new ServerError(err.message || err));
  }
};

// Reject offer
module.exports.rejectOffer = async (req, res, next) => {
  try {
    const offerId = req.params.offerId;
    if (!isValidId(offerId)) throw new ServerError('Invalid offerId');
    const offer = await findOfferById(offerId);
    await db.Offers.update(
      { status: CONSTANTS.OFFER_STATUS_REJECTED },
      { where: { id: offerId } }
    );
    // TODO: send email to offer creator (offer.userId)
    res.send({ success: true });
  } catch (err) {
    next(new ServerError(err.message || err));
  }
};
