import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { currentUser } from '../api/auth';
import { createHousehold } from '../api/data/households-data';
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

const modalStyle = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
};

const initialCreateState = {
  name: '',
  HoH_id: '',
};

const initialJoinState = {
  code: '',
};

export default function HouseholdSelect() {
  const history = useHistory();
  const [showCreate, setShowCreate] = useState(false);
  const [createFormInput, setCreateFormInput] = useState(initialCreateState);

  const [showJoin, setShowJoin] = useState(false);
  const [joinFormInput, setJoinFormInput] = useState(initialJoinState);

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

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createHousehold(createFormInput.name, createFormInput.HoH_id);
    history.push('/select');
  };

  const handleCreateChange = (e) => {
    setCreateFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    console.warn(joinFormInput);
    // Compare invite codes
    // Assign user an HH ID
  };

  const handleJoinChange = (e) => {
    setJoinFormInput((prevState) => ({
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
        <JoinButton
          type="button"
          onClick={() => setShowJoin(true)}
          className="btn btn-primary"
        >
          Join
        </JoinButton>
      </div>

      <Modal
        isOpen={showCreate}
        onRequestClose={() => setShowCreate(false)}
        style={modalStyle}
      >
        <Title className="panel-title">Create a New Household</Title>
        <Form onSubmit={handleCreateSubmit}>
          <Label htmlFor="name">
            Household Name
            <NameInput
              name="name"
              type="text"
              onChange={handleCreateChange}
              value={createFormInput.name}
              required
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

      <Modal
        isOpen={showJoin}
        onRequestClose={() => setShowJoin(false)}
        style={modalStyle}
      >
        <Title className="panel-title">Join a Household</Title>
        <Form onSubmit={handleJoinSubmit}>
          <Label htmlFor="code">
            Invite Code
            <NameInput
              name="code"
              type="text"
              onChange={handleJoinChange}
              value={joinFormInput.code}
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
              onClick={() => setShowJoin(false)}
            >
              X
            </SubmitButton>
          </ButtonTray>
        </Form>
      </Modal>
    </>
  );
}
