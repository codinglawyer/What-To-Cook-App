import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 16px;
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
    // text-align: center;
  }

  .title {
    font-weight: normal;
    font-size: 40px;
  }
  
  p,
  label {
    font-family: 'Roboto', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .addIngredient {
    margin: 20px;
  }
  
  .submitButton {
    margin: 20px;

  }
  
  .clearButton {
    margin: 20px;
  }
  
  
  
  .recipeForm {
    text-align: center;
  }
  
 
  

  .recipeDetail{
  
  }
  .recipeTitle {
    font-weight: 500;
    font-size: 50px;
  }
  
  .recipeDirectionsTitle, .ingredientsTitle {
    font-weight: 400;
    font-size: 25px;
    margin: 10px auto;
  }
  
  .recipeDirections{
    font-style: italic;
  }
  
  .ingredients{
    
  }
  
  .activeLink{
    color: green;
  }
`;

