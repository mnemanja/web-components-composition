import { withComponent } from 'skatejs/dist/es';
import withReact from '@skatejs/renderer-react';

/**
 * Define base class without Shadow DOM and with React renderer
 * @type {ReactComponentWithoutShadowRoot}
 */
export default class extends withComponent(withReact()) {
  /**
   * You need to return where you want to render your content,
   * in our case we wanna render directly to our custom element children
   */
  get renderRoot() {
    return this;
  }
}
