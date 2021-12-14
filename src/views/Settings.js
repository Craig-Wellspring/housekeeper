import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  deleteHousehold,
  getHousehold,
  getJoinCode,
  updateHouseholdName,
} from '../api/data/households-data';
import {
  getHousemate,
  getHousematesByHHID,
  leaveHousehold,
  updateHousemateName,
} from '../api/data/housemates-data';
import { getLists } from '../api/data/lists-data';
import ListSetting from '../components/listables/ListSetting';
import { Panel, PanelTitle, Section } from '../components/StyledComponents';
import Housemate from '../components/listables/Housemate';

const NamePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 120%;
`;

const NameInput = styled.input`
  text-align: center;
`;

const LabelPanel = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 120%;
  text-decoration: underline;
`;

export default function Settings({ setHHID }) {
  const history = useHistory();

  const [HHName, setHHName] = useState('');
  const [showHHForm, setShowHHForm] = useState(false);
  const [HHFormInput, setHHFormInput] = useState('');

  const [HMName, setHMName] = useState('');
  const [showHMForm, setShowHMForm] = useState(false);
  const [HMFormInput, setHMFormInput] = useState('');

  const [lists, setLists] = useState([]);

  const [HMs, setHMs] = useState([]);
  const [userHoH, setUserHoH] = useState(false);

  const [showCode, setShowCode] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(async () => {
    let isMounted = true;
    const code = await getJoinCode();
    const hh = await getHousehold();
    const hm = await getHousemate();
    const hmList = await getHousematesByHHID(hh.id);
    const hhLists = await getLists();
    if (isMounted) {
      setInviteCode(code);
      setHHName(hh.name);
      setHMName(hm.name);
      setHMs(hmList.filter((mate) => mate.id !== hm.id));
      setLists(hhLists.filter((list) => !list.private || list.hm_id === hm.id));
      if (hh.HoH_id === hm.id) {
        setUserHoH(true);
      }
    }
    return (() => { isMounted = false; });
  }, []);

  const hhNameEdit = () => {
    if (showHHForm) {
      if (HHFormInput !== HHName) {
        updateHouseholdName(HHFormInput).then(setHHName);
      }
      setShowHHForm(false);
    } else {
      setHHFormInput(HHName);
      setShowHHForm(true);
    }
  };

  const hmNameEdit = () => {
    if (showHMForm) {
      if (HMFormInput !== HMName) {
        updateHousemateName(HMFormInput).then(setHMName);
      }
      setShowHMForm(false);
    } else {
      setHMFormInput(HMName);
      setShowHMForm(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode).then(() => setIsCopied(true));
  };

  const handleLeave = async () => {
    await leaveHousehold();
    setHHID(null);
    history.push('/household');
  };

  const handleDeleteHH = async () => {
    await deleteHousehold();
    setHHID(null);
    history.push('/household');
  };

  return (
    <Panel>
      <PanelTitle>Settings</PanelTitle>

      <NamePanel id="hm-name">
        <LabelPanel>
          <button
            type="button"
            className={`btn btn-sm btn-${showHMForm ? 'success' : 'primary'}`}
            onClick={hmNameEdit}
          >
            <i className={`fas fa-${showHMForm ? 'check' : 'edit'}`} />
          </button>
          <Label>User Name:</Label>
        </LabelPanel>
        {showHMForm ? (
          <NameInput
            value={HMFormInput}
            onChange={(e) => setHMFormInput(e.target.value)}
          />
        ) : (
          <Name>{HMName}</Name>
        )}
      </NamePanel>

      <NamePanel>
        <LabelPanel id="hh-name">
          <button
            type="button"
            className={`btn btn-sm btn-${showHHForm ? 'success' : 'primary'}`}
            onClick={hhNameEdit}
          >
            <i className={`fas fa-${showHHForm ? 'check' : 'edit'}`} />
          </button>
          <Label>Household Name:</Label>
        </LabelPanel>
        {showHHForm ? (
          <NameInput
            value={HHFormInput}
            onChange={(e) => setHHFormInput(e.target.value)}
          />
        ) : (
          <Name>{HHName}</Name>
        )}
      </NamePanel>

      <Section>
        <Label>Show Lists</Label>
        {lists?.map((list) => <ListSetting key={list.id} data={list} />)}
      </Section>

      <Section>
        <Label>Invite Code</Label>
        {showCode ? (
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setShowCode(false);
                setIsCopied(false);
              }}
            >
              {inviteCode}
            </button>
            <button
              type="button"
              className={`btn btn-${isCopied ? 'success' : 'secondary'}`}
              onClick={copyCode}
            >
              <i
                className={`fas fa-${isCopied ? 'clipboard-check' : 'clipboard'}`}
              />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowCode(true)}
          >
            Show Code
          </button>
        )}
      </Section>

      {userHoH && HMs.length > 0 && (
        <Section>
          <Label>Housemates</Label>
          {HMs?.map((hm) => <Housemate hm={hm} key={hm.id} />)}
        </Section>
      )}

      <button type="button" className="btn btn-danger" onClick={handleLeave}>
        Leave Household
      </button>
      {userHoH && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteHH}
        >
          Delete Household
        </button>
      )}
    </Panel>
  );
}

Settings.propTypes = {
  setHHID: PropTypes.func.isRequired,
};
