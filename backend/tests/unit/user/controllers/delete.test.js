const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const userController = require('../../../../src/controllers/user.controller');
const userService = require('../../../../src/services/user.service');

const mockController = require('../../../helpers/mockController');

chai.use(sinonChai);

describe('DELETE /user/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na deleção de usuário', async () => {
    sinon.stub(userService, 'deleteUser').resolves();

    const headers = { userId: 4 };
    const { req, res } = mockController({ headers });

    await userController.deleteUser(req, res);

    expect(userService.deleteUser).to.calledWith(headers.userId);
    expect(res.status).to.calledWith(204);
    expect(res.end).to.calledWith();
  });

  it('Sucesso na deleção de conexão', async () => {
    sinon.stub(userService, 'deleteConnection').resolves();

    const headers = { userId: 4 };
    const params = { targetId: 20 };
    const { req, res } = mockController({ headers, params });

    await userController.deleteConnection(req, res);

    expect(userService.deleteConnection).to.calledWith(headers.userId, params.targetId);
    expect(res.status).to.calledWith(204);
    expect(res.end).to.calledWith();
  });
});
