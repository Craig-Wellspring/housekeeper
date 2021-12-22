import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 140%;
  text-decoration: underline;
  text-shadow: 2px 2px black;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  margin: 10px;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
  justify-content: center;
  background-image: linear-gradient(to right top, #993c73, #9a4e99, #8e65bf, #6e7de2, #0096ff);
  width: 120px;
  height: 120px;

  font-weight: bold;
  color: #1e2024;

  padding: 10px;
  border-radius: 6px;
  box-shadow: 4px 4px 4px black;
  margin: 10px;
  
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:active {
    background-image: linear-gradient(to left bottom, #993c73, #9a4e99, #8e65bf, #6e7de2, #0096ff);
    color: #DEF2FF;
    transform: scale(1.1);
    box-shadow: 8px 8px 8px 0px black;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 8px 8px 8px 0px black;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;

export const Checkbox = styled.input``;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

export const PanelTitle = styled.div`
  font-size: 30pt;
  font-weight: 320;
  text-align: center;
  background: linear-gradient(to right top, #993c73, #9a4e99, #8e65bf, #6e7de2, #0096ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-stroke: 3px transparent;
  text-shadow: 3px 3px 3px black;
`;
