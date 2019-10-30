class BushService {
  static bushUrl = 'https://nanivo-bush.herokuapp.com';
  static doRequest = (path, method, body?) => {
    const bodyToSend = body ? {body: JSON.stringify(body)} : {};
    return fetch(BushService.bushUrl + path, {
        method,
        mode:'cors',
        credentials: 'include',
        headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
       },
       ...bodyToSend
    })
     .then(response => {
        if(!response.ok || (response.status > 300 || response.status < 200)) throw response
        return response.json() 
      })
     .catch(err => {
       if (err.status === 401) {
         document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
         window.location.href = '/';
        }
        throw err;
     })
  }

  static get = (path) => BushService.doRequest(path, 'GET');

  static put = (path, body) => BushService.doRequest(path, 'PUT', body);

  static post = (path, body?) => BushService.doRequest(path, 'POST', body);

  static patch = (path, body?) => BushService.doRequest(path, 'PATCH', body);

}

export default BushService;