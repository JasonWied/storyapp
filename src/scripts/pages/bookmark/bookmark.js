import BookmarkPresenter from './bookmark-presenter.js';
import BookmarkView from './bookmark-view.js';

const BookmarkPage = {
  async render() {
    return BookmarkView.getTemplate();
  },

  async afterRender() {
    await BookmarkPresenter.init({
      container: document.querySelector('#bookmark-list')
    });
  }
};

export default BookmarkPage;