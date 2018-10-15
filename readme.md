# Peekture Frame
I wanted to build a simple application that allows me to add a border to an image, change it's color and width, and then saved that modified image to my computer. This is that.

## Installation
This is a simple app to setup. Run these two commands:
```sh
# Install dependencies
$ npm install
$ npm install http-server -g
```

## Local development
Depending on your development preferences, there are two npm scripts to choose from. The first runs webpack, which watches for files changing in `src/`, and starts a local server.
```sh
$ npm start
```
The second does the same as the first and adds live reloading.
```sh
$ npm run dev:liveReload
```
No matter which you choose, both will compile everything in `src/` to `dist/`.

### Deployment
To prep your app for deployment, run:
```sh
$ npm build-production
```
This will minify your `js` and `css`, name the files accordingly, and put them in `dist/`.

## Todo
Fix a couple little bugs.