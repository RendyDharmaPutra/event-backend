export class AuthService {
  async login() {
    return "Login successfully";
  }

  async register() {
    return "Register successfully";
  }
}

export const authService = new AuthService();
