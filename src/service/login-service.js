import APIService from './API-service';

class LoginService {
    constructor() {
        this.baseUrl = process.env.API_URL;
        this.APIServiceInstance = new APIService();
    }

    async getUser() {
        return this.APIServiceInstance.get();
    }

    async Login(email,pass) {
        return this.APIServiceInstance.search(email,pass);
    }
    
    async Profile(email) {
        return this.APIServiceInstance.search_profile(email);
    }  
}

export default LoginService;
