const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/model/connection');
const userModel = require('../../../src/model/user.model');

const { users } = require('./mocks/user.model.mock');

describe('funcionamento do model users', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('obtenção de lista de usuários', async () => {
    sinon.stub(connection, 'execute').resolves([users]);

    const result = await userModel.findAll();
    expect(result).to.be.deep.equal(users);
  });

  it('criação de um novo user', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 30 }]);

    const insertId = await userModel.insert(users[0]);
    expect(insertId).to.be.equal(30);
  });
});
