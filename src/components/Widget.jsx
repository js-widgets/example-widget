import React from 'react';
import logo from '../assets/logo.png';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

function Widget({ element }) {
  return (
    <div className="Widget example-widget">
      <h1 className="is-size-4 pb-2">
        <FormattedMessage id="widget.welcome-msg" defaultMessage="Welcome!" />
      </h1>
      <p className="is-size-6 pb-2">
        <FormattedMessage
          id="widget.welcome-paragraph"
          defaultMessage="This is a template for creating widgets."
        />
      </p>
      <p className="is-size-7 pb-4">
        <FormattedMessage
          id="widget.details-paragraph"
          defaultMessage="It is not very complex, but it has a button with configurable text (added by the editors while embedding in the CMS), some CSS, some JS, some media, it is translatable, &#8230;"
        />
      </p>
      <p className="is-size-6 pb-4">
        <button className="button is-primary">{element.getAttribute('data-button-text')}</button>
      </p>
      <p>
        <img src={logo} alt="Logo" width="48" height="*" />
      </p>
    </div>
  );
}

Widget.propTypes = {
  element: PropTypes.instanceOf(Element),
};

export default Widget;
