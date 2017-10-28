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
  methods: {
    changeHandler() {
      if (this.query === '') flickr.getRecent();
      return flickr.makeQuery(this.query);
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
  background: #006dac;
  box-shadow: 2px 3px 8px 0 rgba(42, 48, 55, 0.04),
              8px 13px 38px 0 rgba(42, 48, 55, 0.02);
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-weight: bold;
  font-size: 20px;
  transition: all .3s;
}

button:hover {
  background: #005180;
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
