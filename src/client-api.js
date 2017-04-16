const API = {

  config: {
    host: 'http://localhost:3000'
  },

  call(path, data) {
    const config = API.config; // ? API.config : config;

    function status(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    }

    function json(response) {
      return response.json();
    }

    let bodyTmp = '';
    if (typeof data === 'object') {
      for (let i = 0; i < Object.keys(data).length; i += 1) {
        const key = Object.keys(data)[i];
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let value = data[key];
          if (typeof value === 'object') {
            value = JSON.stringify(value);
          }
          bodyTmp += `${(bodyTmp.length ? '&' : '')}${key}=${value}`;
        }
      }
    } else {
      bodyTmp = data;
    }

    return fetch(`${config.host}/${path}`, {
      // method: 'post',
    })
    .then(status)
    .then(json)
    .catch((error) => {
      console.log('Request failed', error); // eslint-disable-line no-console
    });
  }
};

export default API;
