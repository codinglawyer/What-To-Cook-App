import { injectGlobal } from 'styled-components';
import styled from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html,
    body {
        height: 100%;
        width: 100%;
        font-size: 16px;
        margin: 0;
    }

    body {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    body.fontLoaded {
        font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    #app {
        background: #fcf4eb;
        min-height: 100%;
        min-width: 100%;
    }
  
    a {
        text-decoration: none   
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
`;

export const Header = styled.div`
    font-weight: 500;
    font-size: 2em;
    text-align: center;
    margin: 0;
    padding: 20px 0;
`
