const express = require('express');
const router = express.Router();
const {
  login,
  listCountGroup,
  listCountItems,
  createCount,
  reset,
  updateCount,
  getBatch,
  getEan,
} = require('../controllers/mock.controller');

router.post('/', (req, res, next) => {
  const response = routePostAction(req);
  return res.status(200).json(response);
});

function routePostAction(req) {
  const { action } = req.body;
  switch (action) {
    case 'Login':
      return login(req);

    case 'ListCountGroup':
      return listCountGroup(req);

    case 'ListCountItems':
      return listCountItems(req);

    case 'GetEAN':
      return getEan(req);

    case 'GetBatch':
      return getBatch(req);

    case 'CreateCount':
      return createCount(req);

    case 'UpdateCount':
      return updateCount(req);

    case 'Reset':
      return reset(req);
  }
}
module.exports = router;
