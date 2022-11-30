/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('posts', [{
      title: 'Dólar fecha em queda e volta a ficar abaixo de R$ 5,30',
      body: 'O dólar fechou em queda nesta terça-feira (2), com a melhora nas perspectivas de flexibilização das medidas de isolamento social na China . Além disso, investidores seguem monitorando os passos da equipe de transição do governo Lula.',
      owner: 1,
    }, {
      title: 'Deslizamento na BR-376: Corpo de Bombeiros confirma segunda morte',
      body: 'O Corpo de Bombeiros do Paraná confirmou na tarde desta terça-feira (29) ter encontrado o corpo da segunda vítima do acidente na BR-376, em Guaratuba, onde um deslizamento arrastou 15 carros e seis caminhões, na noite de segunda-feira (28). Segundo a corporação, a vítima é homem.',
      owner: 1,
    }, {
      title: 'Irã x EUA: Americano foi retirado da arquibancada à força por usar braçadeira de arco-íris',
      body: 'Mais uma cena lamentável viralizou nas redes sociais antes mesmo que a bola rolasse. O torcedor americano Brian Davis foi até o Estádio Al Thumama, em Doha, onde os EUA e Irã se enfrentam buscando uma vaga nas oitavas de final da Copa. Ele estava usando braçadeira com as cores do arco-íris quando chegou para ver a partida, e depois que já estava sentado para ver o jogo, seguranças o retiraram de seu lugar de maneira agressiva, de acordo com ele, e pediram que ele retirasse o acessório. Ao se recusar, foi retirado da arquibancada pelos seguranças.',
      owner: 2,
    }, {
      title: 'Escalação da Seleção: comissão avisa jogadores que Brasil terá time reserva contra Camarões',
      body: 'Um Brasil totalmente modificado para encerrar a fase de grupos da Copa do Mundo. Com a classificação garantida, a primeira colocação bem encaminhada e alguns problemas médicos, a comissão técnica decidiu que escalará um time reserva diante de Camarões, sexta-feira, e já informou aos jogadores.',
      owner: 3,
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Post', null, {});
  },
};
