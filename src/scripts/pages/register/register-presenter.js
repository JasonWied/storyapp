import StoryApi from '../../data/api.js';
import RegisterView from './register-view.js';

const RegisterPresenter = {
  init() {
    const form = RegisterView.getFormElement();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = RegisterView.getName();
      const email = RegisterView.getEmail();
      const password = RegisterView.getPassword();

      const result = await StoryApi.register(name, email, password);

      if (!result.error) {
        RegisterView.showSuccess();
      } else {
        RegisterView.showError(result.message);
      }
    });
  },

  getView() {
    return RegisterView;
  }
};

export default RegisterPresenter;
