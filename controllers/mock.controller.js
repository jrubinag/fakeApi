const initialDB = require('../db.json');
const jsonServer = require('json-server');
const _ = require('lodash');
const db = jsonServer.router(_.cloneDeep(initialDB)).db;

const itemTemplate = require('../utils/itemTemplate.json');

const buildResponseList = (items) => ({
  count: items.length,
  items: items,
});

const login = (req) => ({
  sessionHandle: '-5b664b7:17451071a53:-1d51',
});

const listCountGroup = (req) => {
  const groups = db.get('groups').value();
  return buildResponseList(groups);
};

const listCountItems = (req) => {
  const { countGroup } = req.body;
  const filteredItems = db
    .get('items')
    .filter({ countGroup: countGroup })
    .value();
  return buildResponseList(filteredItems);
};

const createCount = (req) => {
  const { action, sessionHandle, ...itemBody } = req.body;
  console.log({ action, sessionHandle, itemBody });
  db.get('items')
    .push({
      ...itemTemplate,
      ...itemBody,
      countQuantity: itemBody.count1Quantity,
      countDate: itemBody.count1Date,
      count1ByUser: undefined,
      count1Quantity: undefined,
      count1Date: undefined,
    })
    .write();

  return {
    success: true,
    warning: 'false',
    message: '',
  };
};

const updateCount = (req) => {
  const { action, sessionHandle, ...itemBody } = req.body;
  //Using find will only update the first coincidence
  db.get('items')
    .find({
      itemNumber: itemBody.itemNumber,
      turnaroundSequenceNumber: itemBody.turnaroundSequenceNumber,
    })
    .assign({
      countQuantity: itemBody.count1Quantity,
      countDate: itemBody.count1Date,
    })
    .value();

  return {
    success: true,
    warning: 'false',
    message: '',
  };
};

const getEan = (req) => {
  const { emeach } = req.body;
  const searchResult = db.get('eans').filter({ emeach: emeach }).value();
  return buildResponseList(searchResult);
};

const getBatch = (req) => {
  const { batchLot } = req.body;
  const searchResult = db
    .get('batches')
    .filter({ batchLotNumber: batchLot })
    .value();
  return buildResponseList(searchResult);
};

const reset = (req) => {
  db.setState(_.cloneDeep(initialDB)).write();
  return {
    error: '',
    message: 'OK',
  };
};

module.exports = {
  login,
  listCountGroup,
  listCountItems,
  getEan,
  getBatch,
  createCount,
  updateCount,
  reset,
};
