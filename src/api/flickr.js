import axios from 'axios';

const YOUR_API_KEY = '';

const flickr = {

  request(page, method, query = '') {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.flickr.com/services/rest/?method=${method}&format=json&api_key=${YOUR_API_KEY}&nojsoncallback=1&extras=owner_name,tags&page=${page}&per_page=40${query}`)
        .then((response) => {
          resolve(response.data.photos.photo);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  makeQuery(string, page = 1) {
    return new Promise((resolve) => {
      const cleanString = string.split(' ').join('+');
      const method = 'flickr.photos.search';
      const query = `&text=${cleanString}`;
      this.request(page, method, query)
        .then((data) => {
          window.eventHub.$emit('new-request', data);
          resolve();
        });
    });
  },

  getRecent(page = 1) {
    return new Promise((resolve) => {
      const method = 'flickr.photos.getRecent';
      this.request(page, method)
        .then((data) => {
          window.eventHub.$emit('new-request', data);
          resolve();
        });
    });
  },
};

export { flickr as default };
