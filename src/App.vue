<template>
  <div id="app" >
    <div class="container">
      <div class="page-title">Flickr Search</div>
    </div>
    <div class="container">
      <search/>
    </div>
    <div id="feed" class="container">
      <tile v-for="photo in this.photos" :photo="photo" :key="photo.id"/>
    </div>
  </div>
</template>

<script>
import flickr from './api/flickr';
import search from './components/search';
import tile from './components/tile';

export default {
  name: 'app',
  components: {
    tile,
    search,
  },

  data() {
    return {
      photos: [],
    };
  },

  created() {
    /* Infinite scroll */
    const infiniteScroll = () => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      const wHeight = window.innerHeight;
      const feedHeight = document.getElementById('feed').clientHeight;
      if (scrollPos + wHeight >= feedHeight) {
        window.removeEventListener('scroll', infiniteScroll);
        flickr.getMore();
      }
    };

    /* Updated photo array based on new requests.
      Returned data is added to localStorage. */
    window.eventHub.$on('new-request', (data) => {
      this.photos = data;
      localStorage.setItem('lastFeed', JSON.stringify(this.photos));
    });

    /* Same as above but for extra requests. Re-apply
      Infinite-scroll once data is retrieved.  */
    window.eventHub.$on('update-request', (data) => {
      this.photos.push(...data);
      localStorage.setItem('lastFeed', JSON.stringify(this.photos));
      window.addEventListener('scroll', infiniteScroll);
    });

    /* Check for a previous query, and add infinite-scroll
      listener. */
    const lastQuery = localStorage.getItem('lastFeed');
    if (lastQuery !== null) this.photos = JSON.parse(lastQuery);
    else flickr.getRecent();

    window.addEventListener('scroll', infiniteScroll);
  },
};
</script>

<style>
html,
body {
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}

body {
  line-height: 1.2;
  background: #f1f1f1;
}

#app {
  padding-bottom: 100px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5e6d82;
}

.container {
  margin: 0 auto;
  max-width: 1600px;
  font-size: 0;
}

@media (min-width: 768px) {

  .container {
    padding: 10px;
  }
}

.page-title {
  padding: 50px 0;
  text-align: center;
  font-weight: bold;
  font-size: 50px;
}
</style>
