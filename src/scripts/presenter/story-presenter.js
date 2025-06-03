import StoryApi from '../data/api.js';
import StoryView from '../view/story-view.js';
import Auth from '../data/auth.js';  
import Database from '../database.js'; 

const StoryPresenter = {
  async init({ storyContainer, mapContainer }) {
    const token = Auth.getToken();  

    if (!token) {
      StoryView.renderLoginPrompt(storyContainer);
      return;
    }

    let stories = [];

    try {
      const response = await StoryApi.getAllStories();
      stories = response.listStory || [];
    } catch (error) {
      console.error('Gagal memuat stories:', error);
      StoryView.renderError(storyContainer);
      return;
    }

    if (stories.length === 0) {
      StoryView.renderEmpty(storyContainer);
      return;
    }

    StoryView.renderStories(storyContainer, stories);
    StoryView.renderMap(mapContainer, stories);

    this._attachBookmarkListeners(); 
  },

  _attachBookmarkListeners() {
    const buttons = document.querySelectorAll('.bookmark-btn');
    buttons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        try {
          const story = await StoryApi.getStoryDetail(id);
          await Database.putStory(story);
          alert('Story disimpan ke bookmark!');
        } catch (error) {
          console.error('Gagal menyimpan story:', error);
          alert('Gagal menyimpan story.');
        }
      });
    });
  }
};

export default StoryPresenter;
