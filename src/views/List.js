import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getItems } from '../api/data/items-data';
import {
  currentListID, currentListType, deleteList, getListByType, getListByID, setListName, setListPrivate,
} from '../api/data/lists-data';
import ListItem from '../components/listables/ListItem';
import CreateItemForm from '../components/panels/CreateItemForm';
import {
  ButtonContainer,
  CategoryLabel,
  ListContainer,
  Panel,
  PanelTitle,
} from '../components/StyledComponents';

const NameInput = styled.input`
  text-align: center;
  font-size: 120%;
`;

export default function List() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [showNameForm, setShowNameForm] = useState(false);
  const [nameFormInput, setNameFormInput] = useState('');

  const [isPrivate, setIsPrivate] = useState(false);

  const [items, setItems] = useState([]);
  const [completeItems, setCompleteItems] = useState([]);
  const [incompleteItems, setIncompleteItems] = useState([]);

  const [showHidden, setShowHidden] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(async () => {
    let isMounted = true;
    const listItems = await getItems();
    const list = currentListID() ? await getListByID(currentListID()) : await getListByType();
    if (isMounted) {
      setItems(listItems);
      setIsPrivate(list.private);
      setName(list.name);
      setNameFormInput(list.name);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIncompleteItems(items?.filter((item) => !item.completed));
    setCompleteItems(items?.filter((item) => item.completed));
  }, [items]);

  const handlePrivatize = async () => {
    await setListPrivate(currentListID(), !isPrivate);
    setIsPrivate(!isPrivate);
  };

  const listNameEdit = () => {
    if (showNameForm) {
      if (nameFormInput !== name) {
        setListName(currentListID(), nameFormInput).then(() => setName(nameFormInput));
      }
      setShowNameForm(false);
    } else {
      setNameFormInput(name);
      setShowNameForm(true);
    }
  };

  const handleDelete = async () => {
    await deleteList(currentListID());
    history.push('/select');
  };

  return (
    <Panel>
      <ButtonContainer>
        {currentListType() === 'custom' && (
          <button
            type="button"
            className={`btn btn-sm btn-${isPrivate ? 'success' : 'danger'}`}
            onClick={handlePrivatize}
          >
            <i className={`fas fa-${isPrivate ? 'lock' : 'unlock'}`} />
          </button>
        )}
        {showNameForm ? (
          <NameInput
            value={nameFormInput}
            onChange={(e) => setNameFormInput(e.target.value)}
          />
        ) : (<PanelTitle>{name}</PanelTitle>)}
        <ButtonContainer>
          {currentListType() === 'custom' && (
            <>
              {showEdit && (
              <button
                type="button"
                className={`btn btn-sm btn-${showNameForm ? 'success' : 'primary'}`}
                onClick={listNameEdit}
              >
                <i className={`fas fa-${showNameForm ? 'check' : 'edit'}`} />
              </button>
              )}
              {showDelete && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={handleDelete}
              >
                <i className="fas fa-trash" />
              </button>
              )}
            </>
          )}
        </ButtonContainer>
      </ButtonContainer>

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
        {showHidden
          && completeItems?.map((item) => (
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
