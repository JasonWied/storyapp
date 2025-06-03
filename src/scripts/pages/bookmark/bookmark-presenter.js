import Database from '../../database.js';
import BookmarkView from './bookmark-view.js';

const BookmarkPresenter = {
  async init({ container }) {
    const stories = await Database.getAllStories();
    BookmarkView.renderBookmarks(container, stories);

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        await Database.deleteStory(id);
        await this.init({ container });
      });
    });
  }
};

export default BookmarkPresenter;