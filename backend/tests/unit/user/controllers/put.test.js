const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../../helpers/mockController');
const mocks = require('./mocks/mocks');

chai.use(sinonChai);

describe('PUT /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na edição de usuário', async () => {
    sinon.stub(userService, 'updateUser').resolves(mocks.user);

    const headers = { userId: 4 };
    const body = mocks.user;
    const { req, res } = mockController({ body, headers });

    await userController.updateUser(req, res);

    expect(userService.updateUser).to.calledWith(headers.userId, body);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.user);
  });
});
