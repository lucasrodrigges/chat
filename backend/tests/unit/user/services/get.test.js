const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { describe } = require('mocha');

const User = require('../../../../src/models/User');
const mocks = require('./mocks/mocks');
const userService = require('../../../../src/services/user.service');

const { expect } = chai;

chai.use(sinonChai);

describe('GET /user/service', () => {
  afterEach(sinon.restore);

  it('Sucesso na obtenção de todos os usuários', async () => {
    sinon.stub(User, 'findAll').resolves(mocks.findAll);

    const result = await userService.getUsers();

    expect(result).to.be.deep.equal(mocks.findAll);
  });

  it('Sucesso na obtenção de usuário', async () => {
    sinon.stub(User, 'findByPk').resolves(mocks.findByPk.sucess);

    const result = await userService.getUserById(24);

    expect(result).to.be.deep.equal(mocks.findByPk.sucess);
  });

  it('Sucesso na obtenção de amizades', async () => {
    sinon.stub(User, 'findByPk').resolves(mocks.getConnections);
    sinon.stub(mocks.getConnections, 'getFriends').resolves(mocks.users);

    const result = await userService.getConnections(mocks.user.id);

    expect(User.findByPk).to.be.calledWith(mocks.user.id);
    expect(mocks.getConnections.getFriends).to.be.calledWith();
    expect(result).to.be.deep.equal(mocks.users);
  });

  it('Sucesso na obtenção de solicitações de amizade', async () => {
    sinon.stub(User, 'findByPk').resolves(mocks.getConnections);
    sinon.stub(mocks.getConnections, 'getRequests').resolves(mocks.users);

    const result = await userService.getConnections(mocks.user.id, 'r');

    expect(User.findByPk).to.be.calledWith(mocks.user.id);
    expect(mocks.getConnections.getRequests).to.be.calledWith();
    expect(result).to.be.deep.equal(mocks.users);
  });

  it('Sucesso na obtenção de seguidores', async () => {
    sinon.stub(User, 'findByPk').resolves(mocks.getConnections);
    sinon.stub(mocks.getConnections, 'getFollowing').resolves(mocks.users);

    const result = await userService.getConnections(mocks.user.id, 'a');

    expect(User.findByPk).to.be.calledWith(mocks.user.id);
    expect(mocks.getConnections.getFollowing).to.be.calledWith();
    expect(result).to.be.deep.equal(mocks.users);
  });
});
