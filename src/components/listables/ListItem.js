import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  deleteItem,
  getItems,
  setItemComplete,
  updateItemName,
} from '../../api/data/items-data';
import { ButtonContainer, Checkbox } from '../StyledComponents';

const Item = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 10px;
`;

const EditInput = styled.input`
  text-align: center;
  border: 1px solid black;
  padding: 2px;
`;

function ListItem({
  data, setItems, showEdit, showDelete,
}) {
  const [isChecked, setIsChecked] = useState(data.completed);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editInput, setEditInput] = useState('');

  const handleCheck = () => {
    setItemComplete(data.id, !isChecked).then((checkedBool) => {
      setIsChecked(checkedBool);
      getItems().then(setItems);
    });
  };

  const handleChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEdit = () => {
    if (showEditForm) {
      updateItemName(data.id, editInput).then(setItems);
    } else {
      setEditInput(data.name);
    }
    setShowEditForm(!showEditForm);
  };

  const handleDelete = () => {
    deleteItem(data.id).then(setItems);
  };

  return (
    <Item className="border-square">
      <Checkbox
        className="btn-check"
        id={`btn-check ${data.id}`}
        autocomplete="off"
        type="checkbox"
        onChange={handleCheck}
        checked={isChecked}
      />
      <label
        className={`border-square${isChecked ? '-fill' : ''}`}
        style={{ width: '30px', height: '30px' }}
        htmlFor={`btn-check ${data.id}`}
      >
        <i className={`fas fa-${isChecked ? 'check' : 'times'}`} />
      </label>
      {showEditForm ? (
        <EditInput type="text" value={editInput} onChange={handleChange} />
      ) : (
        data.name
      )}
      <ButtonContainer>
        {showEdit && (
          <button
            type="button"
            className={`button sm-round-btn ${
              showEditForm ? 'secondary' : 'primary'
            }-btn`}
            onClick={handleEdit}
          >
            <i className={`fas fa-${showEditForm ? 'check' : 'pen'}`} />
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
      </ButtonContainer>
    </Item>
  );
}

ListItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  setItems: PropTypes.func.isRequired,
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
};

export default ListItem;
