import api from '../http/index.js'

export default class AuthService {
    static async login(username, password) {
        return api
            .post('/login', { username, password })
            .then((response) => response.data)
    }
    static async register(username, password) {
        return api
            .post('/register', { username, password })
            .then((response) => response.data)
    }

    static async logout() {
        return api.post('/logout')
    }
}
