const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../../src/services/user.service');

const mocks = require('./mocks/user.service.mock');

describe('funcionamento do service user', () => {
  describe('cadastramento de novo usuário', () => {
    afterEach(sinon.restore);

    it('falha ao tentar cadastrar usuário com nome inválido', async () => {
      const { rules, userWithInvalidName } = mocks;
      const result = await userService.createUser(userWithInvalidName);

      expect(result.error).to.equal('INVALID_FIELD');
      expect(result.message).to.equal(
        `"name" length must be at least ${rules.minNameLength} characters long`,
      );
    });

    it('falha ao tentar cadastrar usuário com senha inválida', async () => {
      const { rules, userWithInvalidPass } = mocks;
      const result = await userService.createUser(userWithInvalidPass);

      expect(result.error).to.equal('INVALID_FIELD');
      expect(result.message).to.equal(
        `"password" length must be at least ${rules.minPassLength} characters long`,
      );
    });
  });
});
