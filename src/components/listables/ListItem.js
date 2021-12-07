import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  deleteItem,
  getItems,
  setItemComplete,
  updateItemName,
} from '../../api/data/items-data';

const Item = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 10px;
  border: 1px solid black;
`;

const Checkbox = styled.input`
  height: 25px;
  width: 25px;
`;

const EditInput = styled.input`
  text-align: center;
  border: 1px solid black;
  padding: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

function ListItem({
  data, setItems, showEdit, showDelete,
}) {
  const [checked, setChecked] = useState(data.completed);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editInput, setEditInput] = useState('');

  const handleCheck = () => {
    setItemComplete(data.id, !checked).then((checkedBool) => {
      setChecked(checkedBool);
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
    <Item>
      <Checkbox type="checkbox" onChange={handleCheck} checked={checked} />
      {showEditForm ? (
        <EditInput type="text" value={editInput} onChange={handleChange} />
      ) : (
        data.name
      )}
      <ButtonContainer>{
        showEdit
        && (
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={handleEdit}
        >
          <i className="fas fa-edit" />
        </button>
        )
}
        {
          showDelete && (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            <i className="fas fa-trash" />
          </button>
          )
}
      </ButtonContainer>
    </Item>
  );
}

ListItem.propTypes = {
  data: PropTypes.shape().isRequired,
  setItems: PropTypes.func.isRequired,
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
};

export default ListItem;
