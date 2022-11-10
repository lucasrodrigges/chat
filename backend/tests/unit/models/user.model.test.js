const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const userModel = require('../../../src/models/user.model');

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

  it('criação de um novo usuário', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 30 }]);

    const result = await userModel.insert(users[0]);
    expect(result).to.be.equal(30);
  });
});
