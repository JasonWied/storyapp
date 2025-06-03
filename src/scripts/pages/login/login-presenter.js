import StoryApi from '../../data/api.js';
import LoginView from './login-view.js';
import Auth from '../../data/auth.js'; 

const LoginPresenter = {
  init() {
    const form = LoginView.getFormElement();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = LoginView.getEmail();
      const password = LoginView.getPassword();

      const result = await StoryApi.login(email, password);

      if (!result.error) {
        Auth.setToken(result.loginResult.token);  
        LoginView.navigateToHome();
      } else {
        LoginView.showError(result.message);
      }
    });
  },

  getView() {
    return LoginView;
  }
};

export default LoginPresenter;
