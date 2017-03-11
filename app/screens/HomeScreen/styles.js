import styled from 'styled-components';
import myImage from './img/header.jpg';

export const Title = styled.div`
    font-weight: 500;
    font-size: 1.5em;
    text-align: center;
    margin: 0;
    padding: 20px 0
`

export const Header = styled.div`
    content: url(${myImage})
    width: 80%
    margin: 0 auto
`;
