import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCList } from '../api/data/customlists-data';
import { getItems } from '../api/data/items-data';
import ListItem from '../components/listables/ListItem';
import CreateItemForm from '../components/panels/CreateItemForm';
import {
  CategoryLabel, ListContainer, Panel, PanelTitle,
} from '../components/StyledComponents';

export default function CustomList() {
  const [listName, setListName] = useState('Custom List');

  const [items, setItems] = useState([]);
  const [completeItems, setCompleteItems] = useState([]);
  const [incompleteItems, setIncompleteItems] = useState([]);

  const [showHidden, setShowHidden] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { id } = useParams();

  useEffect(async () => {
    let isMounted = true;
    const list = await getCList(id);
    const listItems = await getItems();
    if (isMounted) {
      setListName(list.name);
      setItems(listItems);
    }
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    setIncompleteItems(items?.filter((item) => !item.completed));
    setCompleteItems(items?.filter((item) => item.completed));
  }, [items]);

  return (
    <Panel>
      <PanelTitle>{listName}</PanelTitle>
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
    </Panel>
  );
}
