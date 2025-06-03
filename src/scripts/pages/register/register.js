import RegisterPresenter from './register-presenter.js';

const RegisterPage = {
  async render() {
    return RegisterPresenter.getView().getTemplate();
  },

  async afterRender() {
    RegisterPresenter.init();
  },
};

export default RegisterPage;
