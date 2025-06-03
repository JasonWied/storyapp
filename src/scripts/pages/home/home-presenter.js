import StoryPresenter from '../../presenter/story-presenter.js';
import HomeView from './home-view.js';

const HomePresenter = {
  init() {
    StoryPresenter.init({
      storyContainer: HomeView.getStoryContainer(),
      mapContainer: HomeView.getMapContainer()
    });
  },

  getView() {
    return HomeView;
  }
};



export default HomePresenter;
