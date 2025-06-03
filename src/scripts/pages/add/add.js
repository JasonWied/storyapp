import AddView from '../add/add-view.js';
import AddPresenter from '../add/add-presenter.js';

const AddPage = {
  async render() {
    return AddView.getTemplate();
  },

  async afterRender() {
    AddPresenter.init({
      form: document.querySelector('#addForm'),
      descriptionInput: document.querySelector('#description'),
      video: document.querySelector('#video'),
      canvas: document.querySelector('#canvas'),
      previewImage: document.querySelector('#previewImage'),
      startCameraBtn: document.querySelector('#startCamera'),
      captureBtn: document.querySelector('#capture'),
      imageFileInput: document.querySelector('#imageFile'),
      latInput: document.querySelector('#lat'),
      lonInput: document.querySelector('#lon'),
      mapContainer: 'map'
    });
  },

  destroy() {
    AddPresenter.destroy();
  }
};

export default AddPage;
