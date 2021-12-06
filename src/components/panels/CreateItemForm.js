import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createItem } from '../../api/data/items-data';

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

export default function CreateItemForm({ setItems }) {
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
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formInput}
        required
      />
      <button type="submit" className="btn btn-success">
        <i className="fas fa-plus" />
      </button>
    </Form>
  );
}

CreateItemForm.propTypes = {
  setItems: PropTypes.func.isRequired,
};
