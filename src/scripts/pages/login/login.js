import LoginPresenter from './login-presenter.js';

const LoginPage = {
  async render() {
    return LoginPresenter.getView().getTemplate();
  },

  async afterRender() {
    LoginPresenter.init();
  },
};

export default LoginPage;
