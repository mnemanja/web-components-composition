# web-components-composition
An example on how to share a library between the composition layer and the web components

Status - draft

To get started, install dependencies for `front-end-composition` and `front-end-components`.

### front-end-components
```ts
npm start // starts the web components development environment
npm run build & serve web component // builds the web component and serves it on a url localhost:5001

```

### front-end-composition
```ts
npm start // starts the composition layer's development environment
npm run start-mock-server // serves a small set of data
```
Communication between the composition layer and web components is done via DOM events. The event names are published, for the sharing purposes, on the `window` object.

In the `front-end-components/src/directory-service/utils/dependencies` folder can be found a method that checks if the environment is  development and applies local (web component) dependencies for local development of web components.


In production, the web component's dependencies, that are being served from the composition layer are omitted to reduce the bundle size.

## Notice
For now this is just a showcase of how the libraries could be shared and managed during the development / production phases. The code is a prototype and does not represent the final version of what the methods should represent nor what the code quality should be. 
