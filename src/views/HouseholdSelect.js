import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createHousehold, validateJoinCode } from '../api/data/households-data';
import { getUserHMID, joinHousehold } from '../api/data/housemates-data';
import { Panel, PanelTitle } from '../components/StyledComponents';

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

const JoinError = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`;
const joinError = 'This code did not match any Households';

export default function HouseholdSelect({ setHHID }) {
  const history = useHistory();

  const [error, setError] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [createFormInput, setCreateFormInput] = useState(initialCreateState);

  const [showJoin, setShowJoin] = useState(false);
  const [joinFormInput, setJoinFormInput] = useState('');

  useEffect(async () => {
    let isMounted = true;
    const id = await getUserHMID();
    if (isMounted) {
      setCreateFormInput((prevState) => ({
        ...prevState,
        HoH_id: id,
      }));
    }
    return () => { isMounted = false; };
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const HHID = await createHousehold(createFormInput.name, createFormInput.HoH_id);
    setHHID(HHID);
    history.push('/select');
  };

  const handleCreateChange = (e) => {
    setCreateFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const openJoinModal = () => {
    setShowJoin(true);
    setError(false);
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const hhID = await validateJoinCode(joinFormInput);
    if (hhID) {
      await joinHousehold(hhID);
      setHHID(hhID);
      history.push('/select');
    } else {
      setError(true);
    }
  };

  const handleJoinChange = (e) => {
    setJoinFormInput(e.target.value);
  };

  return (
    <>
      <Panel>
        <PanelTitle>Create or Join a Household</PanelTitle>
        <CreateButton
          type="button"
          onClick={() => setShowCreate(true)}
          className="btn btn-success"
        >
          Create
        </CreateButton>
        <JoinButton
          type="button"
          onClick={openJoinModal}
          className="btn btn-primary"
        >
          Join
        </JoinButton>
      </Panel>

      <Modal
        isOpen={showCreate}
        onRequestClose={() => setShowCreate(false)}
        style={modalStyle}
      >
        <PanelTitle>Create a New Household</PanelTitle>
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
        <PanelTitle>Join a Household</PanelTitle>
        <Form onSubmit={handleJoinSubmit}>
          <Label htmlFor="code">
            Invite Code
            <NameInput
              name="code"
              type="text"
              onChange={handleJoinChange}
              value={joinFormInput}
            />
          </Label>
          {error && <JoinError>{joinError}</JoinError>}
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

HouseholdSelect.propTypes = {
  setHHID: PropTypes.func.isRequired,
};
