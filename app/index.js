import React from 'react';
import {render} from 'react-dom';

import Main from './containers/Main.js'

require('./sass/style.scss');

const HelloWorld = () => <h1>Hello World</h1>;

render(
  <Main />,
  document.getElementById('app')
);
