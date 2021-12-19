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
import { getHousemateByID } from '../../api/data/households-data';

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
  background: linear-gradient(var(--bgColor), var(--bgColor)) padding-box,
    linear-gradient(to right top, #993c73, #9a4e99, #8e65bf, #6e7de2, #0096ff)
      border-box;
  border: 3px solid transparent;
  border-radius: 6px;
  box-shadow: 3px 3px 3px black;
`;

const EditInput = styled.textarea`
  padding: 2px;
  width: 100%;
`;

const SignatureContainer = styled.div`
  font-size: 60%;
  display: flex;
  gap: 5px;
  align-items: flex-end;
`;

const Signature = styled.div`
  font-size: 140%;
  text-decoration: underline;
`;

export default function Pin({
  data, setItems, showEdit, showDelete,
}) {
  const [isChecked, setIsChecked] = useState(data.completed);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editInput, setEditInput] = useState('');
  const [signature, setSignature] = useState('');

  useEffect(async () => {
    let isMounted = true;
    const HM = await getHousemateByID(data.hm_id);
    if (isMounted) {
      setSignature(HM.name);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCheck = async () => {
    const checkedBool = await setItemComplete(data.id, !isChecked);
    setIsChecked(checkedBool);
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
        <EditInput value={editInput} onChange={handleChange} rows="6" />
      ) : (
        data.name
      )}
      <PinButtonContainer
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
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
        <SignatureContainer>
          <i className="fas fa-signature" />
          <Signature>{signature}</Signature>
        </SignatureContainer>
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
              className="button primary-btn sm-round-btn"
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
