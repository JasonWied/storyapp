import StoryApi from '../../data/api.js';
import DetailView from '../detail/detail-view.js';

const DetailPresenter = {
  async init({ container, id }) {
    const story = await StoryApi.getStoryDetail(id);

    DetailView.renderStoryDetail(container, story);

    if (story.lat && story.lon) {
      DetailView.renderMap(story);
    } else {
      DetailView.renderMapFallback();
    }
  }
};

export default DetailPresenter;
