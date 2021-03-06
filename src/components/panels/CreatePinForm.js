import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createItem } from '../../api/data/items-data';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TextInput = styled.textarea`
  width: 250px;
`;

export default function CreatePinForm({ setItems }) {
  const [formInput, setFormInput] = useState('');

  const handleChange = (e) => {
    setFormInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem(formInput).then(setItems);
    setFormInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput
        name="name"
        rows="6"
        onChange={handleChange}
        value={formInput}
        placeholder="Create a New Pin"
        required
      />
      <button type="submit" className="button round-btn primary-btn">
        <i className="fas fa-plus" />
      </button>
    </Form>
  );
}

CreatePinForm.propTypes = {
  setItems: PropTypes.func.isRequired,
};
