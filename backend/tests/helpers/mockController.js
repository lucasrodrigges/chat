const sinon = require('sinon');

module.exports = (reqValue) => {
  const res = {};
  const req = reqValue || {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  res.end = sinon.stub().returns();

  return { req, res };
};
