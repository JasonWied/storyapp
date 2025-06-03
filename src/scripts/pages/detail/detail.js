import DetailPresenter from './detail-presenter.js';
import DetailView from './detail-view.js';

const DetailPage = {
  async render() {
    return DetailView.getTemplate();
  },

  async afterRender() {
    const id = location.hash.split('/')[2];
    const container = document.querySelector('#detail');

    await DetailPresenter.init({ container, id });
  }
};

export default DetailPage;
