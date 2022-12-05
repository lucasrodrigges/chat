const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const postController = require('../../../../src/controllers/post.controller');
const postService = require('../../../../src/services/post.service');

const mockController = require('../../../helpers/mockController');
const mocks = require('../mocks');

chai.use(sinonChai);

describe('GET /post/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na obtenção de post por id', async () => {
    sinon.stub(postService, 'getPostById').resolves(mocks.service.sucess);

    const params = { id: 4 };
    const { req, res } = mockController({ params });

    await postController.getPostById(req, res);

    expect(postService.getPostById).to.calledWith(params.id);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.controller.sucess);
  });

  it('Sucesso na obtenção de posts por usuário', async () => {
    sinon.stub(postService, 'getPostsByUser').resolves(mocks.service.sucess);

    const params = { id: 4 };
    const { req, res } = mockController({ params });

    await postController.getPostsByUser(req, res);

    expect(postService.getPostsByUser).to.calledWith(params.id);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.controller.sucess);
  });

  it('Sucesso na obtenção de posts por amigos', async () => {
    sinon.stub(postService, 'getPostsByFriends').resolves(mocks.service.sucess);

    const params = { id: 4 };
    const { req, res } = mockController({ params });

    await postController.getPostsByFriends(req, res);

    expect(postService.getPostsByFriends).to.calledWith(params.id);
    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(mocks.controller.sucess);
  });
});
