# What's That Theme

> Upload a screenshot of your favorite code editor color theme and find the best match in more than 1.500 Visual Studio Code themes.

## Running locally

What's That Theme is a Vue application that uses a Web Worker for the heavy lifting. In order to run it locally, run

```
yarn
```

```
yarn serve
```

## Fetching extensions

The color data needed for the matching process is fetched from the Visual Studio Marketplace. I was inspired for this approach by the excellent [VSCodeThemes](https://github.com/jschr/vscodethemes) project. In order to run the scraper, open the `/scraper` directory in the terminal and run

```
yarn
```

```
yarn getthemes
```

The resulting color data will be saved to `/public/data/themes.json`.

## This project was built with

- [Vue](https://www.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Netlify](https://www.netlify.com/)
