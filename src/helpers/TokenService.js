import { storage } from './Storage';
import { TOKEN_KEY } from '../constants';

class TokenService {
  getToken() {
    return storage.get(TOKEN_KEY);
  }
  setToken(token) {
    storage.set(TOKEN_KEY, token);
  }
  removeToken() {
    storage.remove(TOKEN_KEY);
  }
}

const tokenService = new TokenService();

export { tokenService };
