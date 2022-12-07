const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../../helpers/mockController');
const mocks = require('./mocks/mocks');

chai.use(sinonChai);

describe('GET /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na obtenção de usuário', async () => {
    sinon.stub(userService, 'getUserById').resolves(mocks.user);

    const params = { id: 4 };
    const { req, res } = mockController({ params });

    await userController.getUserById(req, res);

    expect(userService.getUserById).to.calledWith(params.id);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.user);
  });

  it('Sucesso na obtenção de conexões', async () => {
    sinon.stub(userService, 'getConnections').resolves(mocks.user);

    const params = { id: 4 };
    const query = { t: 'a' };
    const { req, res } = mockController({ params, query });

    await userController.getConnections(req, res);

    expect(userService.getConnections).to.calledWith(params.id, query.t);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.user);
  });
});
