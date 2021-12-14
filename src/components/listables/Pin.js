import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  deleteItem,
  getItems,
  setItemComplete,
  updateItemName,
} from '../../api/data/items-data';
import { ButtonContainer, Checkbox } from '../StyledComponents';
import { getHousemateByID } from '../../api/data/housemates-data';

const PinButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Item = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 10px;
  border: 1px solid black;
`;

const EditInput = styled.textarea`
  text-align: center;
  border: 1px solid black;
  padding: 2px;
  width: 100%;
`;

export default function Pin({
  data, setItems, showEdit, showDelete,
}) {
  const [checked, setChecked] = useState(data.completed);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editInput, setEditInput] = useState('');
  const [signature, setSignature] = useState('');

  useEffect(async () => {
    let isMounted = true;
    const HM = await getHousemateByID(data.hm_id);
    if (isMounted) { setSignature(HM.name); }
    return () => { isMounted = false; };
  }, []);

  const handleCheck = async () => {
    const checkedBool = await setItemComplete(data.id, !checked);
    setChecked(checkedBool);
    const items = await getItems();
    setItems(items);
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
      {showEditForm ? (
        <EditInput value={editInput} onChange={handleChange} />
      ) : (
        data.name
      )}
      <PinButtonContainer style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Checkbox type="checkbox" onChange={handleCheck} checked={checked} />
        {signature}
        <ButtonContainer>
          {showEdit && (
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleEdit}
          >
            <i className="fas fa-edit" />
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
        </ButtonContainer>
      </PinButtonContainer>
    </Item>
  );
}

Pin.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hm_id: PropTypes.number,
    completed: PropTypes.bool,
  }).isRequired,
  setItems: PropTypes.func.isRequired,
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
};
