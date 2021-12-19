import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../api/auth';
import { getItems } from '../api/data/items-data';
import {
  currentListID,
  currentListType,
  deleteList,
  getListByType,
  getListByID,
  setListName,
  setListPrivate,
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
    let listItems;
    let subscription;
    const list = currentListID()
      ? await getListByID(currentListID())
      : await getListByType();
    if (list) {
      listItems = await getItems();
    } else {
      isMounted = false;
      history.push('/select');
    }
    if (isMounted) {
      setItems(listItems);
      setIsPrivate(list?.private);
      setName(list?.name);
      setNameFormInput(list?.name);
      subscription = subscribeToItems(list?.id);
    }
    return () => {
      isMounted = false;
      if (subscription) supabase.removeSubscription(subscription);
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

  const listNameEdit = async () => {
    if (showNameForm) {
      if (nameFormInput !== name) {
        await setListName(currentListID(), nameFormInput);
        setName(nameFormInput);
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
            className={`button sm-round-btn ${isPrivate ? 'secondary' : 'primary'}-btn`}
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
        ) : (
          <PanelTitle>{name}</PanelTitle>
        )}
        <ButtonContainer>
          {currentListType() === 'custom' && (
            <>
              {showEdit && (
                <button
                  type="button"
                  className={`button sm-round-btn ${
                    showNameForm ? 'secondary' : 'primary'
                  }-btn`}
                  onClick={listNameEdit}
                >
                  <i className={`fas fa-${showNameForm ? 'check' : 'edit'}`} />
                </button>
              )}
              {showDelete && (
                <button
                  type="button"
                  className="button sm-round-btn primary-btn"
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
