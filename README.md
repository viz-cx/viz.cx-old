# VIZ.cx

Welcome to [viz.cx](https://viz.cx/). It's a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) for interacting with [VIZ blockchain](https://github.com/VIZ-Blockchain/viz-cpp-node).

## Getting Started

### Prequisites

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM)
* [NPM](https://www.npmjs.com/get-npm)

You should also be familiar with [TypeScript](https://www.typescriptlang.org/) which we use for this project. This helps give you more guidance as you code from [intellisense](https://code.visualstudio.com/docs/editor/intellisense) when using [VSCode](https://code.visualstudio.com/).

### Recommended development setup

We recommend the following tools for your dev setup:

* Editor: [VSCode](https://code.visualstudio.com/)
* Terminal: [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab) or [hyper](https://hyper.is/)
* PWABuilder VSCode extension: [PWABuilder VSCode extension](https://marketplace.visualstudio.com/items?itemName=PWABuilder.pwabuilder-extension)
* lit-html VSCode extension: [lit-html VSCode extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)

### Development

Run `npm install` and then run `npm run dev`, the starter should open in your default browser. From here you can start developing, your changes will be rebuilt and reloaded in the browser as you develop.

### Building for Production

Make sure the `index.prod.html` and `manifest.json` files are updated to your liking and then run `npm run build:prod`, the `dist/` folder will contain your built PWA. The production build will also generate a pre-caching service worker using [Workbox](https://developers.google.com/web/tools/workbox/modules/workbox-precaching) and handles that service worker using the [PWABuilder pwa-update component](https://github.com/pwa-builder/pwa-update#pwa-update) web component. 

