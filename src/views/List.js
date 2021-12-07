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

export default function List() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [showHidden, setShowHidden] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getItems().then((i) => {
      if (isMounted) {
        setItems(i);
        setFilteredItems(items.filter((item) => !item.completed));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setFilteredItems(items.filter((item) => item.completed === showHidden));
  }, [showHidden, items]);

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
        {filteredItems?.map((item) => (
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
