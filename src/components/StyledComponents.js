import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const CategoryLabel = styled.div`
  text-align: center;
  font-size: 120%;
  text-decoration: underline;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  border: 1px solid black;
  margin: 10px;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
  justify-content: center;
  background-color: gray;
  width: 120px;
  height: 120px;

  font-weight: bold;

  padding: 10px;
  border: 2px solid black;
  margin: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Checkbox = styled.input`
  height: 25px;
  width: 25px;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  background-color: white;
`;

export const PanelTitle = styled.div`
  font-size: 24pt;
  text-align: center;
`;
