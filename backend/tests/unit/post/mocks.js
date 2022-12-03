const post = {
  title: 'Bufo regularis',
  content: 'Sclerophrys regularis é uma espécie de sapo da família Bufonidae.',
};

const service = {
  sucess: {
    error: null,
    output: post,
  },
};

const controller = {
  sucess: service.sucess.output,
};

module.exports = {
  post,
  service,
  controller,
};
