<template>
  <div class="tile">
    <div class="inner">
      <div 
        class="tag-show"
        v-if="show"
      >
        <span
          v-for="tag in sortedTags"
          :key="tag"
          @click="searchTag(tag)"
        > {{tag}} </span>
      </div>
      <div
        class="tags"
        v-if="photo.tags"
        v-on:click="show = !show"
      >
        <span>tags</span>
      </div>
      <a 
        class="thumb"
        target="_blank"
        :href="photoURL"
        :title="getTitle"        
        >
        <img :src="photoSRC"/>
      </a>
      <div class="text">
        <div 
          class="title"
          :title="getTitle"  
        >
          <span>{{ getTitle }}</span>
        </div>
        <a 
          class="author"
          target="_blank"
          :href="getAuthor"
        >{{ photo.ownername }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import flickr from '../api/flickr';

export default {
  name: 'tile',
  props: ['photo'],
  data() {
    return {
      show: false,
    };
  },
  
  /* Clean up the passed data */
  computed: {
    photoURL() {
      return `https://www.flickr.com/photos/${this.photo.owner}/${this.photo.id}`;
    },

    photoSRC() {
      return `https://farm${this.photo.farm}.staticflickr.com/${this.photo.server}/${this.photo.id}_${this.photo.secret}.jpg`;
    },

    getTitle() {
      return this.photo.title || 'Untitled photo';
    },

    getAuthor() {
      return `https://www.flickr.com/people/${this.photo.owner}`;
    },

    sortedTags() {
      return this.photo.tags.split(' ');
    },
  },

  methods: {
    /* If a tag is clicked, scroll back to the 
      top of the page, and make a query based
      upon it */
    searchTag(tag) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      document.querySelector('.search input').setAttribute('value', tag);
      this.show = false;
      flickr.makeQuery(tag);
    },
  },
};
</script>

<style scoped>

.tile {
  box-sizing: border-box;
  padding: 20px 20px 0;
}

@media (min-width: 768px) {
  .tile {
    display: inline-block;
    vertical-align: top;
    width: 50%;
  }
}

@media (min-width: 1100px) {
  .tile {
    width: 33.33%;
  }
}

@media (min-width: 1400px) {
  .tile {
    width: 25%;
  }
}
.inner {
  position: relative;
  padding: 20px;
  background: #fff;
  box-shadow: 2px 3px 8px 0 rgba(42, 48, 55, 0.04), 
              8px 13px 38px 0 rgba(42, 48, 55, 0.02);
  transition: all .35s ease;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
}

.inner:hover {
  box-shadow: 0 16px 32px 0 rgba(0,0,0,.1);
}

.thumb {
  display: block;
  position: relative;
  height: 0;
  padding-bottom: 66.66%;
  overflow: hidden;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
}

.title {
  padding-top: 10px;
  min-width: 0;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.author {
  display: inline-block;
  color: #409eff;
  padding-top: 5px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.author:hover {
  color: #66b1ff;
}

.tags {
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 15px;
  right: 15px;
  font-size: 12px;
  color: #fff;
  background: #2f2f2f;
  box-shadow: 2px 3px 8px 0 rgba(42, 48, 55, 0.04), 
              8px 13px 38px 0 rgba(42, 48, 55, 0.02);
  border-radius: 2px;
  padding: 5px 10px;
}

.tags:hover {
  background: #272727;
}

.tag-show {
  position: absolute;
  z-index: 2;
  top: 40%;
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: 70%;
  transform: translateY(-50%);
  max-height: 100px;
  overflow: auto;
  padding: 8px 8px 4px;
  margin-top: 10px;
  background: #272727;
  border-radius: 4px;
  font-size: 12px;
}

.tag-show span {
  display: inline-block;
  cursor: pointer;
  margin: 0 4px 4px 0;
  padding: 3px 5px;
  color: #2f2f2f;
  background: #fff;
}
</style>
