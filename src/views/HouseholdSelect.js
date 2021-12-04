import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { currentUser } from '../api/auth';
import { getHousemate } from '../api/data/housemates-data';

const Title = styled.div``;

const Form = styled.form``;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
`;

const CreateButton = styled.button``;

const JoinButton = styled.button``;

const NameInput = styled.input`
  text-align: center;
`;

const SubmitButton = styled.button``;

const ButtonTray = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px;
`;

Modal.setAppElement('#root');

const initialState = {
  name: '',
  HoH_id: '',
};

export default function HouseholdSelect() {
  const [showCreate, setShowCreate] = useState(false);
  const [createFormInput, setCreateFormInput] = useState(initialState);

  const getHousemateID = async () => {
    const mate = await getHousemate(currentUser().id);
    setCreateFormInput((prevState) => ({
      ...prevState,
      HoH_id: mate.id,
    }));
  };

  useEffect(() => {
    getHousemateID();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(createFormInput);
    // insert new row into Households table
  };

  const handleChange = (e) => {
    setCreateFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="panel">
        <Title className="panel-title">Create or Join a Household</Title>
        <CreateButton
          type="button"
          onClick={() => setShowCreate(true)}
          className="btn btn-success"
        >
          Create
        </CreateButton>
        <JoinButton type="button" className="btn btn-primary">
          Join
        </JoinButton>
      </div>

      <Modal
        isOpen={showCreate}
        onRequestClose={() => setShowCreate(false)}
        style={{
          content: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
          },
        }}
      >
        <Title className="panel-title">Create a New Household</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">
            Household Name
            <NameInput
              name="name"
              type="text"
              onChange={handleChange}
              value={createFormInput.name}
            />
          </Label>
          <ButtonTray>
            <SubmitButton
              type="submit"
              className="btn btn-success"
            >
              Submit
            </SubmitButton>
            <SubmitButton
              type="button"
              className="btn btn-danger"
              onClick={() => setShowCreate(false)}
            >
              X
            </SubmitButton>
          </ButtonTray>
        </Form>
      </Modal>
    </>
  );
}
