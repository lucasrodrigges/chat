const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../../helpers/mockController');
const mocks = require('./mocks/mocks');

chai.use(sinonChai);

describe('POST /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na criação de usuário', async () => {
    sinon.stub(userService, 'createUser').resolves(mocks.user);

    const body = mocks.user;
    const { req, res } = mockController({ body });

    await userController.createUser(req, res);

    expect(userService.createUser).to.calledWith(body);
    expect(res.status).to.calledWith(201);
    expect(res.json).to.calledWith(mocks.user);
  });

  it('Sucesso na criação de conexão', async () => {
    sinon.stub(userService, 'createConnection').resolves(mocks.connection);

    const params = { targetId: 20 };
    const headers = { userId: 4 };
    const { req, res } = mockController({ params, headers });

    await userController.createConnection(req, res);

    expect(userService.createConnection).to.calledWith(headers.userId, params.targetId);
    expect(res.status).to.calledWith(201);
    expect(res.json).to.calledWith(mocks.connection);
  });

  it('Sucesso no login', async () => {
    sinon.stub(userService, 'login').resolves({ token: mocks.token });

    const body = mocks.login;
    const { req, res } = mockController({ body });

    await userController.login(req, res);

    expect(userService.login).to.calledWith(body);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith({ token: mocks.token });
  });
});
