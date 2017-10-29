# Flickr Api

> A Vue.js project, found at [http://www.beaugust.co.uk/hx/flickr/](http://www.beaugust.co.uk/hx/flickr/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Features

### Basic
* Query photos from the Flickr API (Click/tap search or just hit enter)
* Infinite scrolling

### Images
* If an image has no title it is set to "Untitled photo"
* Clicking the image opens it in a new tab
* Clicking the user opens their profile in a new tab

### Tags
* Photos that have tags will be identified with a `tags` label in the corner
* Clicking tags will open a list of tags associated with the picture
* Clicking an individual tag will make a new search query for that tag

### Local storage
* When coming back to the page, your last query will be retrieved

