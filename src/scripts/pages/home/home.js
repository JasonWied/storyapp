import HomePresenter from './home-presenter.js';

const HomePage = {
  async render() {
    return `
      ${HomePresenter.getView().getTemplate()}
    `;
  },

  async afterRender() {
    HomePresenter.init();
  },
};

export default HomePage;
