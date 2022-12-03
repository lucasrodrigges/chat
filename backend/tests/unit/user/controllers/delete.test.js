const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../helpers/mockController');
const mocks = require('../mocks');

chai.use(sinonChai);

describe('DELETE /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na deleção de usuário', async () => {
    sinon.stub(userService, 'deleteUser').resolves({ error: null });

    const headers = { userId: 4 };
    const { req, res } = mockController({ headers });

    await userController.deleteUser(req, res);

    expect(userService.deleteUser).to.calledWith(headers.userId);
    expect(res.status).to.calledWith(204);
    expect(res.end).to.calledWith();
  });
});
