const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

const mocks = require('./mocks/user.controller.mocks');

describe('funcionamento em conjunto da entidade user', () => {
  afterEach(sinon.restore);

  it('adição completa de um novo usuário', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

    const { status, body } = await chai
      .request(app)
      .post('/user')
      .send(mocks.validUser);

    expect(status).to.equal(201);
    expect(body).to.equal(10);
  });
});
