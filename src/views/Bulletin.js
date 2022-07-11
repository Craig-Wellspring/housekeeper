import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getItems } from '../api/data/items-data';
import Pin from '../components/listables/Pin';
import { supabase } from '../api/auth';
import CreatePinForm from '../components/panels/CreatePinForm';
import {
  ButtonContainer, CategoryLabel, ListContainer, Panel, PanelTitle,
} from '../components/StyledComponents';
import { getListID } from '../api/data/lists-data';

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

  const updateItems = async () => {
    const listItems = await getItems();
    setItems(listItems);
  };

  const subscribeToItems = (listID) => {
    const subscription = supabase
      .from(`items:list_id=eq.${listID}`)
      .on('*', updateItems)
      .subscribe();
    return subscription;
  };

  useEffect(async () => {
    let isMounted = true;
    let subscription;
    const listItems = await getItems();
    const listID = await getListID();
    if (isMounted) {
      setItems(listItems);
      subscription = subscribeToItems(listID);
    }
    return () => {
      isMounted = false;
      if (subscription) supabase.removeSubscription(subscription);
    };
  }, []);

  useEffect(() => {
    setIncompleteItems(items?.filter((item) => !item.completed).sort((a, b) => a.created_at.localeCompare(b.created_at)));
    setCompleteItems(items?.filter((item) => item.completed).sort((a, b) => a.created_at.localeCompare(b.created_at)));
  }, [items]);

  return (
    <Panel>
      <PanelTitle>Bulletin Board</PanelTitle>
      <CreatePinForm setItems={setItems} />
      <ButtonContainer>
        <button
          type="button"
          className={`button sm-round-btn ${showHidden ? 'secondary' : 'primary'}-btn`}
          onClick={() => {
            setShowHidden(!showHidden);
          }}
        >
          <i className="fas fa-check" />
        </button>
        <button
          type="button"
          className={`button sm-round-btn ${showEdit ? 'secondary' : 'primary'}-btn`}
          onClick={() => {
            setShowEdit(!showEdit);
          }}
        >
          <i className="fas fa-edit" />
        </button>
        <button
          type="button"
          className={`button sm-round-btn ${showDelete ? 'secondary' : 'primary'}-btn`}
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
