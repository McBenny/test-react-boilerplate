/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';

export default function HomePage() {
  const headerMessage = 'My title';
  return (
    <Fragment>
      <h1>{headerMessage}</h1>
      <a href="#0">Link</a>
    </Fragment>
  );
}
