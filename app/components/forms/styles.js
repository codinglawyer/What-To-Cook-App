import styled from 'styled-components';
import plus from '../../styles/icons/plus.svg';

export const RecipeHeading = styled.div`
    font-weight: 300;
    font-size: 2em;
    padding: 20px 0;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    top: -90px;
    left: 160px;
    margin: 20px;
    background-image: url(plus)
`;

export const RelativeContainer = styled.div`
    position: relative;
`;
