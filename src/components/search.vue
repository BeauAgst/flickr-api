<template>
  <div class="search">
    <input
      name="search"
      type="text"
      placeholder="Search for photos"
      v-model="query"
      @keyup.enter="changeHandler"
    >
    <div class="button">
      <button
        @click="changeHandler"
      >Search</button>
    </div>
  </div>
</template>

<script>
import flickr from '../api/flickr';

export default {
  name: 'search',
  data() {
    return {
      query: '',
    };
  },

  created() {
    /* Check for a previous query first */
    this.getLastQuery();
  },

  methods: {
    /* Prevent query being made if input
      is empty */
    changeHandler() {
      if (!this.query) return;
      flickr.makeQuery(this.query);
    },

    /* Set current query to the one stored in
      locaLStorage, if it exists */
    getLastQuery() {
      const query = localStorage.getItem('lastQuery');
      this.query = query || '';
      if (query !== null) flickr.makeQuery(query);
    },
  },
};
</script>

<style scoped>
.search {
    padding: 0 20px;
}

label {
  display: block;
  padding-bottom: 10px;
  font-size: 20px;
}

input {
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 40px;
  width: 100%;
  border: none;
  line-height: 60px;
  font-size: 15px;
  box-shadow: 2px 3px 8px 0 rgba(42, 48, 55, 0.04),
              8px 13px 38px 0 rgba(42, 48, 55, 0.02);
  border: 1px solid #e6e6e6;
  transition: all .35s ease;
}

.button {
  box-sizing: border-box;
  display: inline-block;
  padding-top: 10px;
  width: 100%;
}

button {
  display: block;
  cursor: pointer;
  width: 100%;
  padding: 0;
  border: none;
  line-height: 60px;
  color: #fff;
  background: #409eff;
  box-shadow: 2px 3px 8px 0 rgba(42, 48, 55, 0.04),
              8px 13px 38px 0 rgba(42, 48, 55, 0.02);
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-weight: bold;
  font-size: 20px;
  transition: all .3s;
}

button:hover {
  background: #66b1ff;
}

@media (min-width: 768px) {

  input {
    width: 80%;
  }

  .button {
    width: 20%;
    padding-top: 0;
    padding-left: 20px;
  }
}

</style>
