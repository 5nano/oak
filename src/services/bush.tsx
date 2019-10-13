class BushService {
  static bushUrl = 'https://nanivo-bush.herokuapp.com';
  static doRequest = (path, method, body?) => {
    const bodyToSend = body ? JSON.stringify(body) : {};
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
        if(!response.ok) throw response
        debugger;
       return response.json()
      })
     .catch(err => {
       if (err.status === 401) {
         document.cookie = `user=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`; // Logout
         window.location.href = '/';
        }
     })
  }

  static get = (path) => BushService.doRequest(path, 'GET');

  static put = (path, body) => BushService.doRequest(path, 'PUT', body);

  static post = (path, body) => BushService.doRequest(path, 'POST', body);

  static delete = (path) => BushService.doRequest(path, 'DELETE');
}

export default BushService;