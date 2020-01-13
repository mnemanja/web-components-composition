# web-components-composition
An example on how to share a library between the composition layer and the web components

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

Communication between the composition layer and the components is done via events. The events are published on the `window` object.

Pay attention on the `front-end-components/src/directory-service/utils/dependencies` folder and the content there.

For now this is just a showcase of how the libraries could be exchanged and managed during the development / production phases.

In production, the component's development dependencies, that are served from the composition layer are omitted.
