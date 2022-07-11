import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createItem } from '../../api/data/items-data';

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

export default function CreateItemForm({
  setItems,
  allItems,
  setSearchMatches,
}) {
  const [formInput, setFormInput] = useState('');

  const handleChange = (e) => {
    setFormInput(e.target.value);

    setSearchMatches(
      allItems.filter((i) =>
        i.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
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
        autoComplete="off"
        name="name"
        onChange={handleChange}
        value={formInput}
        placeholder="Add or Search"
        required
      />
      <button type="submit" className="button sm-round-btn primary-btn">
        <i className="fas fa-plus" />
      </button>
    </Form>
  );
}

CreateItemForm.propTypes = {
  setItems: PropTypes.func.isRequired,
  setSearchMatches: PropTypes.func.isRequired,
  allItems: PropTypes.arrayOf(PropTypes.object),
};

CreateItemForm.defaultProps = {
  allItems: [],
};
