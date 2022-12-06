const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

const postController = require('../../../../src/controllers/post.controller');
const postService = require('../../../../src/services/post.service');

const mockController = require('../../../helpers/mockController');
const mocks = require('../mocks');

chai.use(sinonChai);

describe('DELETE /post/controller', () => {
  afterEach(sinon.restore);

  it('Sucesso na exclusão de post', async () => {
    sinon.stub(postService, 'deletePost').resolves(mocks.post);

    const headers = { userId: 20 };
    const params = { id: 4 };
    const { req, res } = mockController({ headers, params });

    await postController.deletePost(req, res);

    expect(postService.deletePost).to.calledWith(headers.userId, params.id);
    expect(res.status).to.calledWith(200);
    expect(res.end).to.calledWith();
  });
});
