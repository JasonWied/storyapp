const RegisterView = {
    getTemplate() {
      return `
      <div id="main-content" tabindex="-1" aria-label="Halaman Registrasi">
        <section class="auth-container" aria-label="Halaman Registrasi">
          <form id="registerForm" class="auth-form">
            <h2>Register</h2>
            <div class="form-group">
              <label for="name">Nama</label>
              <input type="text" id="name" required aria-label="Nama" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" required aria-label="Email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" required aria-label="Password" />
            </div>
            <button type="submit">Register</button>
          </form>
        </section>
      </div>
      `;
    },
  
    getFormElement() {
      return document.querySelector('#registerForm');
    },
  
    getName() {
      return document.querySelector('#name').value;
    },
  
    getEmail() {
      return document.querySelector('#email').value;
    },
  
    getPassword() {
      return document.querySelector('#password').value;
    },
  
    showSuccess() {
      alert('Berhasil daftar, silakan login');
      location.hash = '/login';
    },
  
    showError(message = 'Registrasi gagal') {
      alert(message);
    },
  };
  
  export default RegisterView;
  