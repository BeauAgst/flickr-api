import axios from 'axios';

const YOUR_API_KEY = '533a21abda25662bfd72647b7a9ad941';

const flickr = {

  /* Store most recent query data here,
    in case user scrolls to bottom of page */
  lastPage: 1,
  lastMethod: 'flickr.photos.getRecent',
  lastQuery: '',

  /* Simple request, taking necessary params */
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

  /* Making a query, and adding to storage.
    We can retrieve this later if the user
    were to come back. */
  makeQuery(string) {
    localStorage.setItem('lastQuery', string);
    const cleanString = string.split(' ').join('+');
    this.lastMethod = 'flickr.photos.search';
    this.lastQuery = `&text=${cleanString}`;
    this.lastPage = 1;
    this.request(1, this.lastMethod, this.lastQuery)
    .then((data) => {
      window.eventHub.$emit('new-request', data);
    });
  },

  getRecent() {
    this.lastMethod = 'flickr.photos.getRecent';
    this.lastPage = 1;
    this.request(1, this.lastMethod)
    .then((data) => {
      window.eventHub.$emit('new-request', data);
    });
  },

  /* Creates a request based on the stored data
    inside this object. Can be appended to content
    pre-existing on the page. */
  getMore() {
    this.lastPage += 1;
    this.request(this.lastPage, this.lastMethod, this.lastQuery)
    .then((data) => {
      window.eventHub.$emit('update-request', data);
    });
  },
};

export { flickr as default };
