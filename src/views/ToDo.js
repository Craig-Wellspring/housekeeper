import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getItems } from '../api/data/items-data';
import ListItem from '../components/listables/ListItem';
import CreateItemForm from '../components/panels/CreateItemForm';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export default function ToDo() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    getItems().then(setItems);
    setFilteredItems(items.filter((item) => !item.completed));
  }, []);

  useEffect(() => {
    setFilteredItems(items.filter((item) => item.completed === showHidden));
  }, [showHidden, items]);

  return (
    <div className="panel">
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
        <div className="panel-title">To-Do</div>
      </div>
      <CreateItemForm setItems={setItems} />
      <ListContainer>
        {filteredItems?.map((item) => (
          <ListItem key={item.id} data={item} setItems={setItems} />
        ))}
      </ListContainer>
    </div>
  );
}
