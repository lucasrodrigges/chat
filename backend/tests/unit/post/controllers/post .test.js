const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const postController = require('../../../../src/controllers/post.controller');
const postService = require('../../../../src/services/post.service');

const mockController = require('../../helpers/mockController');
const mocks = require('../mocks');

chai.use(sinonChai);

describe('POST /post/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na criação de post', async () => {
    sinon.stub(postService, 'createPost').resolves(mocks.service.sucess);

    const headers = { userId: 20 };
    const body = mocks.post;
    const { req, res } = mockController({ headers, body });

    await postController.createPost(req, res);

    expect(postService.createPost).to.calledWith(headers.userId, body);
    expect(res.status).to.calledWith(201);
    expect(res.json).to.calledWith(mocks.controller.sucess);
  });

  it('Sucesso na adição de voto', async () => {
    sinon.stub(postService, 'addVote').resolves(mocks.service.sucess);

    const headers = { userId: 20 };
    const params = { targetId: 4 };
    const { req, res } = mockController({ headers, params });

    await postController.addVote(req, res);

    expect(postService.addVote).to.calledWith(headers.userId, params.targetId);
    expect(res.status).to.calledWith(201);
    expect(res.json).to.calledWith(mocks.controller.sucess);
  });
});
