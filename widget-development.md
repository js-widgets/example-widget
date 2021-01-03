In this page, technical requirements to create widgets compatible with the registry are described.

### Required commands

All widgets need to include a `package.json` file which provides the following two commands:

- `npm install` to install dependencies, libraries or any other components needed by the widget.
- `PUBLIC_URL='<some url>' npm run build` to build a production compilation of the widget. The `PUBLIC_URL` parameter will be discussed later.

### Directory structure

The build command should generate a directory on the root of the project named `build`, and with the following structure:

```
build
├── js
│   └── main.js
└── media
    └── picture.png
```

### Loading the widget on the browser

The widget itself should be fully contained on the `build/js/main.js` file, which should provide a render function to allow the widget to be loaded on the browser. This render function should be injected onto the window object in the browser. It is important to name the render function as `render` + the machine name of the widget in camel case (eg. for the Case Studies widget, whose machine name (or shortcode) is `case-studies-widget`, the expected name for the render function is `renderCaseStudiesWidget`).

This is an example of a render function with a documentation block explaining the different parameters:

```
/**
 * Renders the widget.
 *
 * @param {string} instanceId
 *   The already present HTML element ID where the react app will be rendered.
 * @param {string} langCode
 *   The language code for internationalization purposes.
 * @param {string} origin
 *   Protocol and hostname where a JSONAPI endpoint is available.
 * @param {Function} cb
 *   A callback that executes after the widget has been rendered.
 */
function render(instanceId, langCode, origin, cb) {
  // Do widget stuff
}

window.renderExampleWidget = render;
```

### Loading assets

The `main.js` library has the responsibility to load any asset from the `build/media` directory. To access these files from the `main.js` library, it's required to use relative urls prepended by an environment variable named `PUBLIC_URL`, something like this:

```
  <img src="`${PUBLIC_URL}/media/picture.png`" />
```

This way you can leave the `PUBLIC_URL` variable empty for local development, but, once uploaded to the registry, the production build of the widget will know where it can locate the assets on the registry. More information about the `PUBLIC_URL` parameter can be found [here](https://github.com/js-widgets/widget-registry-boilerplate/wiki/Deployment-process#the-widget-building-process).

If you are using the [Example Widget](https://github.com/js-widgets/example-widget) as a base for your widget, you would need to load assets like this:

```
import logo from 'assets/images/logo.png';

class Widget {
  render() {
    return (
      <img src={logo} alt="Logo" width="100" height="*" />
    }
  }
}
```

A final consideration about styles: All custom CSS should be written using a CSS-in-JS pattern, such as [using object syntax with style attribute](https://reactjs.org/docs/dom-elements.html#style) or including a CSS-in-JS library like [Emotion](https://emotion.sh/docs/introduction) or one of [many other options](https://blog.bitsrc.io/9-css-in-js-libraries-you-should-know-in-2018-25afb4025b9b). The widget registry does not support CSS files in an effort to keep widget styles from having adverse affects on the page in which they're embedded.
