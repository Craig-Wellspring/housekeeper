import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getItems } from '../api/data/items-data';
import { currentListType } from '../api/data/lists-data';
import ListItem from '../components/listables/ListItem';
import CreateItemForm from '../components/panels/CreateItemForm';
import listNames from '../JSON/listNames.json';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const CategoryLabel = styled.div`
  text-align: center;
  font-size: 120%;
  text-decoration: underline;
`;

export default function List() {
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
      setIncompleteItems(items.filter((item) => !item.completed));
      setCompleteItems(items.filter((item) => item.completed));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIncompleteItems(items.filter((item) => !item.completed));
    setCompleteItems(items.filter((item) => item.completed));
  }, [items]);

  return (
    <div className="panel">
      <div className="panel-title">{listNames[currentListType()]}</div>
      <CreateItemForm setItems={setItems} />
      <div style={{ display: 'flex', gap: '10px' }}>
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
      </div>
      <ListContainer>
        {showHidden && <CategoryLabel>Incomplete</CategoryLabel>}
        {incompleteItems?.map((item) => (
          <ListItem
            key={item.id}
            data={item}
            setItems={setItems}
            showEdit={showEdit}
            showDelete={showDelete}
          />
        ))}
        {showHidden && <CategoryLabel>Complete</CategoryLabel>}
        {showHidden && completeItems?.map((item) => (
          <ListItem
            key={item.id}
            data={item}
            setItems={setItems}
            showEdit={showEdit}
            showDelete={showDelete}
          />
        ))}
      </ListContainer>
    </div>
  );
}
