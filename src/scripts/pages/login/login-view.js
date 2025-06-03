const LoginView = {
    getTemplate() {
      return `
      <div id="main-content" tabindex="-1" aria-label="Halaman Login">
        <section class="auth-container" aria-label="Halaman Login">
          <form id="loginForm" class="auth-form">
            <h2>Login</h2>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" required aria-label="Email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" required aria-label="Password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </section>
      </div>
      `;
    },
  
    getFormElement() {
      return document.querySelector('#loginForm');
    },
  
    getEmail() {
      return document.querySelector('#email').value;
    },
  
    getPassword() {
      return document.querySelector('#password').value;
    },
  
    showError(message) {
      alert('Login gagal: ' + message);
    },
  
    navigateToHome() {
      location.hash = '/';
    }
  };
  
  export default LoginView;
  