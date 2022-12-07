const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha');

const { or } = require('sequelize').Op;

const bcrypt = require('bcrypt');
const User = require('../../../../src/models/User');
const mocks = require('./mocks/mocks');
const userService = require('../../../../src/services/user.service');
const tokenFunctions = require('../../../../src/auth/token');

const { expect } = chai;

chai.use(sinonChai);

describe('POST /user/service', () => {
  afterEach(sinon.restore);

  it('Sucesso ao fazer login', async () => {
    sinon.stub(User, 'findOne').resolves(mocks.findOne.sucess);
    sinon.stub(tokenFunctions, 'createToken').returns(mocks.token);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const result = await userService.login(mocks.loginBody);

    expect(result).to.be.deep.equal({ token: mocks.token });
  });

  it('Sucesso na criação de usuário', async () => {
    sinon.stub(User, 'findOrCreate').resolves(mocks.findOrCreate.sucess);
    sinon.stub(tokenFunctions, 'createToken').returns(mocks.token);
    sinon.stub(bcrypt, 'genSaltSync').returns(mocks.bcrypt.genSaltSync);
    sinon.stub(bcrypt, 'hashSync').returns(mocks.bcrypt.hashSync);

    const result = await userService.createUser(mocks.userWithPassword);

    expect(tokenFunctions.createToken).to.be.calledWith({ id: mocks.findOrCreate.sucess[0].id });
    expect(result).to.be.deep.equal({ token: mocks.token });
  });
});
