# Example Widget [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This example contains documentation and example code for creating widgets using React.

[View the demo](https://js-widgets.github.io/example-widget/index.html)

## Requirements

- [npm](https://www.npmjs.com/) 6.9.0 or higher
- [create-react-app](https://www.npmjs.com/package/create-react-app) 3.0.1 or higher

## Getting started

1. On the [example-widget](https://github.com/js-widgets/example-widget) project page click the **"Use this template"** button to setup a new widget.
2. Give the new repository a **name** and a **description** and then click the "**Create repository from template**" button.
3. Clone the new repository and change the project [**name**](https://github.com/js-widgets/example-widget/blob/master/package.json#L2), [**version**](https://github.com/js-widgets/example-widget/blob/master/package.json#L3), and [**homepage**](https://github.com/js-widgets/example-widget/blob/master/package.json#L4) inside **package.json**.
4. Change the name of the [widget render function](https://github.com/js-widgets/example-widget/blob/master/src/index.js#L35)(`renderExampleWidget`) in **src/index.js**. _Note: It is recommended to use something unique to the widget in order to avoid potential conflicts with other widgets, like the widget repository name._
5. Change the [**renderFunctionName**](https://github.com/js-widgets/example-widget/blob/master/src/public/index.html#L20) in the header of **public/index.html** to match the designated widget render function from the previous step (i.e. `renderExampleWidget`)
6. Install the project dependencies using `npm install`
7. Run the project locally using `npm start`

**IMPORTANT:** Make sure you check the [widget development documentation](/widget-development.md) when developing your own.

## `widget.json`

There is a special file called `widget.json` in the root of the widget. Widget registries, [like this
example](https://github.com/js-widgets/widget-registry-boilerplate), need this file to learn about
this widget. It contains the following keys:

| Name                     | Required | Example                                | Description                                                                                    |
| ------------------------ | -------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| shortcode                | yes      | product-catalog                        | The machine name identifier for the widget.                                                    |
| description              | no       | A catalog of products for our company. | A longer description for the widget. This is shown in the widget catalog.                      |
| availableTranslations    | yes      | `['en', 'es']`                         | Language codes this widget is available in for internationalization purposes.                  |
| settingsSchema           | no       |                                        | A JSON Schema object decribing the input parameters for the widgets at embed time.             |
| externalPeerDependencies | no       |                                        | List of runtime dependencies for this widget that embedders need to add along with the widget. |
| status                   | yes      | stable                                 | One of `stable`, `beta`, `wip`, or `deprecated`.                                               |

### Configurable widgets
Configuration parameters are specified during the embed process. Drupal will create a form element
automatically to gather those parameters in the editorial screens. For the CMS to know what form
element to use, the widget definition needs to include a [JSON Schema](https://json-schema.org)
definition for every parameter.

This repository contains an example of a configurable parameter. In this case it's the text of the
button. This is [described in `widget.json`](https://github.com/js-widgets/example-widget/blob/master/widget.json#L20-L36) as:

```json
  "settingsSchema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "fields": {
        "type": "object",
        "properties": {
          "button-text": {
            "type": "string",
            "title": "Button text",
            "description": "Some random string to be displayed when the widget is rendered.",
            "examples": ["I am a button", "Please, click me", "CLICK"]
          }
        }
      }
    }
  },
```

And then accessed in the [widget code `Widget.jsx`](https://github.com/js-widgets/example-widget/blob/master/src/components/Widget.jsx#L25):

```jsx
<p className="is-size-6 pb-4">
  <button className="button is-primary">{element.getAttribute('data-button-text')}</button>
</p>
```

Note that since the field name is `button-text`, the value is accessed as `'data-button-text'`.

### External dependencies

`externalPeerDependencies` is a tool designed to share JS dependencies across different widgets.
This module provides an example how to avoid bundling `react`, `react-dom`, and `react-intl` with
the widget's JS, while making Drupal (or any other available integrations) load the dependencies
automatically.

For each dependency you will need to:

1. [Tell Webpack to not include the library](https://github.com/js-widgets/example-widget/blob/master/craco.config.js#L32-L35) in the resulting JS file(s) for this widget.
```js
    // webpack.config.js or craco.config.js
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-intl': 'ReactIntl',
    },
    // ...
```
1. [Tell the widget registry (in `widget.json`)](https://github.com/js-widgets/example-widget/blob/master/widget.json#L37-L46), and ultimately the CMS integrations where to find these libraries that were excluded.
```json
"externalPeerDependencies": {
    "react": {"src": "https://unpkg.com/react@^17/umd/react.production.min.js"},
    "react-dom": {"src": "https://unpkg.com/react-dom@^17/umd/react-dom.production.min.js"},
    "react-intl": {"src": "https://unpkg.com/react-intl-bundle@^1/dist/react-intl.production.min.js"}
},
```

### Continuous Integration

Testing and deployment scripts available inside this example repository using [GitHub Actions](https://github.com/features/actions).

## Usage

_Note: Changes made to the **src/public/index.html** file are for development and preview purposes only and will not be compiled into the production version of the widget._

Widgets are referenced in the header of the page and rendered using an orchestrator script. The `document.loadWidget` and `document.loadWidgets` functions allow rendering of multiple widgets, and multiple instances of a single widget.

### loader.js

Within the `<head>` tag reference the widget load callback(renderFunctionName) and tell it which div(instanceId) to render the widget in.

Projects embedding widgets should include the [loader script](https://js-widgets.github.io/widget-registry-boilerplate/widget-registry/production/loader.js) maintained in the Widget Registry. Include the script in the HTML as:

```html
<script
  src="//js-widgets.github.io/widget-registry-boilerplate/widget-registry/production/loader.js"
  type="application/javascript"
></script>
```

- [See an example](https://github.com/js-widgets/example-widget/blob/master/src/public/index.html#L12) of the loader script implementation.

Remember to use your version of the widget registry instead of `widget-registry-boilerplate`.

#### `document.loadWidget()`

```js
document.loadWidget({
  renderFunctionName: 'renderExampleWidget',
  instanceId: 'example-widget-1',
  language: 'de',
  onRenderFinish: (renderedElement) => {
    alert('Render process finished.');
  },
});
```

- [See an example](https://github.com/js-widgets/example-widget/blob/master/src/public/index.html#L14) of the `loadWidget()` function.

Within the `<body>` tag add the instanceId div wherever you want this widget to render.

```html
<div id="example-widget-1" data-button-text="foobar"></div>
```

- [See an example](https://github.com/js-widgets/example-widget/blob/master/src/public/index.html#L79) of the widget placement implementation.

#### `document.loadWidgets()`

```js
document.loadWidgets({
  'widget-1': {
    renderFunctionName: 'renderExampleWidget',
    instanceId: 'example-widget-1',
  },
  'widget-2': {
    renderFunctionName: 'renderExampleWidget',
    instanceId: 'example-widget-2',
  },
});
```

```html
<div id="example-widget-1" data-button-text="foo"></div>
<div id="example-widget-2" data-button-text="bar"></div>
```

#### Parameters

| Name               | Required | Default                  | Example                 | Description                                                               |
| ------------------ | -------- | ------------------------ | ----------------------- | ------------------------------------------------------------------------- |
| renderFunctionName | yes      |                          | `renderExampleWidget`   | The render function callback.                                             |
| instanceId         | yes      |                          | `example-widget-1`      | The already present HTML element ID where the react app will be rendered. |
| language           | no       | en                       | de                      | The language code for internationalization purposes.                      |
| origin             | no       | `window.location.origin` | https://www.example.org | Protocol and hostname where a JSONAPI endpoint is available.              |
| onRenderFinish     | no       |                          |                         | A callback that executes after the widget has been rendered.              |

### Attributes

Data attributes of the instanceId div are accessible from the `<App />` React component using the `getAttribute()` method.

```jsx
import React, { Component } from 'react';

class Widget extends Component {
  render() {
    return <div className="App">{this.props.obj.getAttribute('data-button-text')}</div>;
  }
}

export default Widget;
```

- [See an example](https://github.com/js-widgets/example-widget/blob/master/src/components/Widget.js#L25) of the `getAttribute()` method.

#### DIV attributes

```html
<div id="example-widget-1" data-button-text="Hello world!"></div>
```

- [See an example](https://github.com/js-widgets/example-widget/blob/master/src/public/index.html#L79) of the widget attribute implementation.

#### Query string values

```
http://localhost:3000/?data-button-text=Hello%20world!
```

Note: DIV attributes are the preferred method and will always take precedence over the use of query
string values. Query string values are a good way to test a widget quickly without having to alter
the HTML source code.

### Translations

The boilerplate widget has built-in translation support using the **react-intl** module. Use the `FormattedMessage` to create translatable strings within the widget.

```jsx
<FormattedMessage id="App.welcomeMsg" defaultMessage="Welcome!" />
```

- [See an example](https://github.com/js-widgets/example-widget/blob/master/src/components/Widget.js#L15) of the `FormattedMessage` component.

Create all translation messages in `src/messages.js`, following the provided example. Generate locales using the `npm run build:locales` command. This will scan `src/messages.js` for translatable strings and compile them into JSON files for translation under **src/locales/\*.json**.

#### Supported Languages

| Language               | Code  |
| ---------------------- | ----- |
| Arabic                 | ar    |
| German                 | de    |
| English                | en    |
| Spanish                | es    |
| Latin American Spanish | esla  |
| French                 | fr    |
| Italian                | it    |
| Japanese               | ja    |
| Korean                 | ko    |
| Polish                 | pl    |
| Portuguese             | pt    |
| Russian                | ru    |
| Turkish                | tr    |
| Simplified Chinese     | zh-cn |
| Traditional Chinese    | zh-tw |

### Typescript

In an effort to improve overall code quality and reduce run-time exceptions, we strongly encourage widget developers to use [Typescript](typescriptlang.org). We understand, though, that using Typescript can be challenging if you don't have prior experience with it and we don't want to impose that restriction upon you.

If you feel comfortable with Typescript or are willing to learn about it ([here](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and [here](https://fettblog.eu/typescript-react/) are good resources), you can run `npm run use-typescript`, which will install all the libraries you'll need, update file extensions, and make appropriate configuration changes.

### Styling

In order to scope widget styles to the widget without adversely affecting the styles of the page within which it's embedded, we're using a library called [craco](https://github.com/gsoft-inc/craco). This library allows us to override configuration in apps bootstrapped with Create React App, which is otherwise a closed system. By using this method, we can make alterations to confuration without needing to eject the app. This along with a PostCSS plugin called [postcss-wrap](https://github.com/ruslansavenok/postcss-wrap) allows us to define a CSS class that will be prepended to all CSS selectors, effectively namespacing all styles.

_Uncomment the style rule specified in `index.css` and start the app to see the prepended class from `postcss.config.js` added._ **Remember to define your custom namespace class in `postcss.config.js` and add it to the top-most element in the app, as seen in `Widget.jsx`. If you need to use this method, please remove the `index.css` file and where it's imported in `index.js`.**

It is recommended to rely on the above method strictly for usage of installable component libraries. For custom styling, we recommend installing [Emotion](https://emotion.sh/), which is a library for writing CSS-in-JS.

### Testing

This boilerplate is setup to use [Jest](https://jestjs.io/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) for testing. See `Widget.test.js` for an example of how to use these libraries.

## Current Maintainer(s)

- Mateu Aguiló Bosch ([e0ipso](https://github.com/e0ipso))
- Hunter MacDermut ([huntermacd](https://github.com/huntermacd))
