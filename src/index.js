import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Widget from './components/Widget';
import * as serviceWorker from './core/bin/serviceWorker';
import { IntlProvider } from 'react-intl';
import i18n from './core/bin/i18n.js';

/**
 * Renders the widget.
 *
 * It renders a react application as the widget.
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
  const element = document.getElementById(instanceId);
  const translation = new i18n(langCode || serviceWorker.getUrlLocale());

  ReactDOM.render(
    <React.StrictMode>
      <IntlProvider locale={translation.locale} messages={translation.messages}>
        <Widget element={element} />
      </IntlProvider>
    </React.StrictMode>,
    element,
    () => cb(element),
  );
  serviceWorker.unregister();
}

window.renderExampleWidget = render;
