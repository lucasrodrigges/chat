
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../helpers/mockController');
const mocks = require('../mocks');

chai.use(sinonChai);

describe('POST /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na criação de usuário', async () => {
    sinon.stub(userService, 'createUser').resolves(mocks.service.sucess);

    const { req, res } = mockController({ body: mocks.user });

    await userController.createUser(req, res);

    expect(res.status).to.calledWith(201);
    expect(res.json).to.calledWith(mocks.user);
  });
});
