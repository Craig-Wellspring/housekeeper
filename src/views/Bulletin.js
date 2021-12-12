import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getItems } from '../api/data/items-data';
import Pin from '../components/listables/Pin';
import CreatePinForm from '../components/panels/CreatePinForm';
import {
  ButtonContainer, CategoryLabel, ListContainer, Panel, PanelTitle,
} from '../components/StyledComponents';

const Board = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export default function Bulletin() {
  const [items, setItems] = useState([]);
  const [completeItems, setCompleteItems] = useState([]);
  const [incompleteItems, setIncompleteItems] = useState([]);

  const [showHidden, setShowHidden] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(async () => {
    let isMounted = true;
    const listItems = await getItems();
    if (isMounted) {
      setItems(listItems);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIncompleteItems(items?.filter((item) => !item.completed));
    setCompleteItems(items?.filter((item) => item.completed));
  }, [items]);

  return (
    <Panel>
      <PanelTitle>Bulletin Board</PanelTitle>
      <CreatePinForm setItems={setItems} />
      <ButtonContainer>
        <button
          type="button"
          className={`btn btn-${showHidden ? 'success' : 'secondary'}`}
          onClick={() => {
            setShowHidden(!showHidden);
          }}
        >
          <i className="fas fa-check" />
        </button>
        <button
          type="button"
          className={`btn btn-${showEdit ? 'primary' : 'secondary'}`}
          onClick={() => {
            setShowEdit(!showEdit);
          }}
        >
          <i className="fas fa-edit" />
        </button>
        <button
          type="button"
          className={`btn btn-${showDelete ? 'danger' : 'secondary'}`}
          onClick={() => {
            setShowDelete(!showDelete);
          }}
        >
          <i className="fas fa-trash" />
        </button>
      </ButtonContainer>
      <ListContainer>
        {showHidden && <CategoryLabel>Incomplete</CategoryLabel>}
        <Board>
          {incompleteItems?.map((item) => (
            <Pin
              key={item.id}
              data={item}
              setItems={setItems}
              showEdit={showEdit}
              showDelete={showDelete}
            />
          ))}
        </Board>
        {showHidden && <CategoryLabel>Complete</CategoryLabel>}
        <Board>
          {showHidden
          && completeItems?.map((item) => (
            <Pin
              key={item.id}
              data={item}
              setItems={setItems}
              showEdit={showEdit}
              showDelete={showDelete}
            />
          ))}
        </Board>
      </ListContainer>
    </Panel>
  );
}
