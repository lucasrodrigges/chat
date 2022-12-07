const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha');

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

    const result = await userService.login(mocks.loginBody);

    expect(result).to.be.deep.equal({ token: mocks.token });
  });
});
