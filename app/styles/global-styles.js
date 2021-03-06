import styled, { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html,
    body {
        height: 100%;
        width: 100%;
        font-size: 16px;
        margin: 0;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
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

    .bold {
        font-weight: 500
    }

    p,
    label {
        font-family: 'Roboto', Georgia, Times, 'Times New Roman', serif;
        line-height: 1.5em;
    }

    .createLoader{
        margin: 350px auto;
    }

    `

export const Header = styled.div`
  font-weight: 500;
  font-size: 3em;
  text-align: center;
  margin: 0;
  padding: 20px 0;
`

export const Screen = styled.div`
  margin: 30px 200px;
`

export const Container = styled.div`
  background: #fefcfa;
  padding: 20px;
  border: 1px solid #f3caa0;
  margin-bottom: 30px;
`

export const Subtitle = styled.div`
  font-weight: 400;
  font-size: 25px;
  margin: 0 0 20px 0;
`
