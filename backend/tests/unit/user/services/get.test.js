const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha');

const User = require('../../../../src/models/User');
const mocks = require('./mocks/mocks');
const userService = require('../../../../src/services/user.service');

const { expect } = chai;

chai.use(sinonChai);

describe('GET /user/service', () => {
  afterEach(sinon.restore);

  it('Sucesso na obtenção de todos os usuários', async () => {
    sinon.stub(User, 'findAll').resolves(mocks.findAll);

    const result = await userService.getUsers();

    expect(result).to.be.deep.equal(mocks.findAll);
  });

  it('Sucesso na obtenção de usuário', async () => {
    sinon.stub(User, 'findByPk').resolves(mocks.findByPk.sucess);

    const result = await userService.getUserById(24);

    expect(result).to.be.deep.equal(mocks.findByPk.sucess);
  });
});
