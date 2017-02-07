import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
    text-align: center;
  }

  p,
  label {
    font-family: 'Roboto', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .addIngredient {
    margin: 20px
  }
  
  .submitButton {
        margin: 20px

  }
  
  .clearButton {
        margin: 20px
s
  }
`;
