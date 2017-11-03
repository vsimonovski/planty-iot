webpack-starter
==============================

Webpack project setup, suitable for both websites/web apps.

## What's in the 📦 ?

* 🔥 webpack, webpack-dev-server (config splitted into webpack.dev and webpack.prod)
* 💪 babel (env presset)
* 🦄 scss support, postcss autoprefix, normalize.css included
* 🖼️ image support (png|jpg|gif|svg)
* 💅 [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) configured 

## Tips & Tricks

If you want to use `background: url()` inside `*.scss` file, always create path relative to scss folder, even if the current .scss file is, for example, inside `modules/` folder.

```scss
/* current location: scss/modules/_somefile.scss */
background: url('../assets/mypicture.png'); 👍 
background: url('../../assets/mypicture.png'); 👎 
```
---
css-loader will [ignore path starting with /](https://github.com/webpack-contrib/css-loader#root), to prevent that behaviour add option "root: '.'"

## Build Setup

```bash
# install dependencies
yarn install / npm install

# serve with hot reload at localhost:8080
yarn dev / npm run dev

# build for production @dist/ folder
yarn build / npm run build
```
