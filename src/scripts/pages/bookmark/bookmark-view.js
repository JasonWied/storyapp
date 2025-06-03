import StoryView from '../../view/story-view.js';  // Pastikan path sesuai

const BookmarkView = {
  getTemplate() {
    return `
      <div id="main-content" tabindex="-1" aria-label="Halaman bookmark">
        <section id="bookmark-list" class="story-list" aria-label="Daftar cerita yang disimpan"></section>
      </div>
    `;
  },

  renderBookmarks(container, stories) {
    if (!stories.length) {
      container.innerHTML = '<p>Tidak ada cerita yang disimpan.</p>';
      return;
    }

    // Render story dengan tombol hapus, menggunakan fungsi dari StoryView
    StoryView.renderStories(container, stories, {
      customButton: (story) => `
        <div class="button-group">
          <button class="detail-btn" onclick="location.hash = '/detail/${story.id}'" aria-label="Lihat detail untuk ${story.name}">
            Lihat Detail
          </button>
          <button class="delete-btn" data-id="${story.id}" aria-label="Hapus bookmark untuk ${story.name}">
            Hapus
          </button>
        </div>
      `
    });
  }
};

export default BookmarkView;
