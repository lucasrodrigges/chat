const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../helpers/mockController');
const mocks = require('../mocks');

chai.use(sinonChai);

describe('GET /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na obtenção de usuário', async () => {
    sinon.stub(userService, 'getUserById').resolves(mocks.service.sucess);

    const { req, res } = mockController({ params: { id: 24 }});

    await userController.getUserById(req, res);

    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.user);
  });

  it('Busca por usuário inexistente', async () => {
    sinon.stub(userService, 'getUserById').resolves(mocks.service.notFound);

    const { req, res } = mockController({ params: { id: 100 } });

    await userController.getUserById(req, res);

    expect(res.status).to.calledWith(404);
    expect(res.json).to.calledWith(mocks.controller.notFound);
  });
});
