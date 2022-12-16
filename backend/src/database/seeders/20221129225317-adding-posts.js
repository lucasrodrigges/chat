/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('posts', [{
      body: 'já meditaram hj?',
      owner: 4,
      created_at: '2022-12-10 14:09:51',
    }, {
      body: 'to doidinha pra tomar um chá de hibisco, gente',
      owner: 6,
      created_at: '2022-12-15 12:54:51',
    }, {
      body: 'O Congresso Nacional aprovou nesta sexta-feira (16) a resolução que determina como será a distribuição das chamadas emendas de relator – conhecidas como "orçamento secreto" – conforme o tamanho das bancadas dos partidos.',
      owner: 3,
      created_at: '2022-12-15 15:54:51',
    }, {
      body: 'BIXCOITO OU BOLACHA???????????????????????',
      owner: 3,
      created_at: new Date(),
    }, {
      body: 'estão me mandando mensagem aqui no pv, ein...',
      owner: 1,
      created_at: '2022-12-09 14:09:51',
    }, {
      body: 'sério que typeof NaN é "number" ?',
      owner: 1,
      created_at: '2022-10-08 14:09:51',
    }, {
      body: 'MARROCOS DESDE CRIANÇA',
      owner: 5,
      created_at: new Date(),
    }, {
      body: 'tocar pra ela >>',
      owner: 7,
      created_at: new Date(),
    }, {
      body: 'mds n fiz uma refeição decente esse fds',
      owner: 8,
      created_at: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Post', null, {});
  },
};
