<template>
  <div id="app" >
    <div class="container">
      <div class="page-title">Flickr Tag Search</div>
    </div>
    <div class="container">
      <search/>
    </div>
    <div class="container">
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
    window.eventHub.$on('new-request', (data) => {
      this.photos = data;
    });

    flickr.getRecent();
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
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
  color: #505050;
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
