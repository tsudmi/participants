import {injectGlobal} from 'styled-components';

injectGlobal([`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  
  body {
    padding: 0;
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  #root {
    min-height: 100%;
    min-width: 100%;
  }
`]);
