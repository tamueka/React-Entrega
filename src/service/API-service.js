class APIService {
  constructor() {
    this.baseUrl = 'https://randomuser.me/api?';
  }
  
  async get(uri) {
    try {
        const response = require('../Data/user.json')
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.results.json();
      } catch (error) {
          console.warn('Error', error); 
          return { error };
      }
  }
  
  async post(body, uri) {
    try {
      const response = await fetch(`${this.baseUrl}${uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
        return true;
    } catch (error) {
        console.warn('Error', error); 
        return { error };
    }
  }

  // metodo para buscar todos los datos de usuarios de la API.
  async search(email,pass) {
    try {  
      var data = require('../Data/user.json'); 
      for(var i = 0; i < data.results.length; i++) {
        if(email === data.results[i].email && pass === data.results[i].login.password)
        {
          return data.results[i];
        }
      }
    }catch (error) {
      console.warn('Error', error); 
      return { error };
    }
  }
  
// metodo para buscar los datos de un usuario.
  async search_profile(email) {
    try {  
      var data = require('../Data/user.json'); 
      for(var i = 0; i < data.results.length; i++) {
        if(email === data.results[i].email)
        {
          return data.results[i];
        } 
      }
   }catch (error) {
      console.warn('Error', error); 
      return { error };
    }
  }
}
  
export default APIService;
  