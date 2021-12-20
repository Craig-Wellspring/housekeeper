import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  deleteHousehold,
  getHousehold,
  getJoinCode,
  updateHouseholdName,
  getHousemate,
  getHousematesByHHID,
  leaveHousehold,
  updateHousemateName,
  regenerateJoinCode,
} from '../api/data/households-data';
import { getLists } from '../api/data/lists-data';
import ListSetting from '../components/listables/ListSetting';
import {
  ButtonContainer,
  CategoryLabel, Panel, PanelTitle, Section,
} from '../components/StyledComponents';
import Housemate from '../components/listables/Housemate';
import { supabase } from '../api/auth';

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

const LabelPanel = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const InviteCode = styled.div`
  font-size: 140%;
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

  const updateLists = async () => {
    const hhLists = await getLists();
    setLists(hhLists);
  };

  const subscribeToLists = (HHID) => {
    const subscription = supabase
      .from(`lists:hh_id=eq.${HHID}`)
      .on('*', updateLists)
      .subscribe();
    return subscription;
  };

  const updateHousehold = async (payload) => {
    if (payload.new.hm_count !== payload.old.hm_count) {
      const hm = await getHousemate();
      if (hm.hh_id) {
        const hh = await getHousehold();
        const hmList = await getHousematesByHHID(hh.id);
        setHMs(hmList.filter((mate) => mate.id !== hm.id));
      }
    }
    if (payload.new.name !== payload.old.name) {
      const hh = await getHousehold();
      setHHName(hh.name);
    }
    if (payload.new.HoH_id !== payload.old.HoH_id) {
      const hm = await getHousemate();
      const hh = await getHousehold();
      setUserHoH(hh.HoH_id === hm.id);
    }
    if (payload.new.invite_code !== payload.old.invite_code) {
      const hh = await getHousehold();
      setInviteCode(hh.invite_code);
    }
  };

  const subscribeToHousehold = (HHID) => {
    const subscription = supabase
      .from(`households:id=eq.${HHID}`)
      .on('UPDATE', updateHousehold)
      .subscribe();
    return subscription;
  };

  useEffect(async () => {
    let isMounted = true;
    let listsSub;
    let hhSub;
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
      setLists(hhLists);
      if (hh.HoH_id === hm.id) {
        setUserHoH(true);
      }
      listsSub = subscribeToLists(hh.id);
      hhSub = subscribeToHousehold(hh.id);
    }
    return () => {
      isMounted = false;
      if (listsSub) supabase.removeSubscription(listsSub);
      if (hhSub) supabase.removeSubscription(hhSub);
    };
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

  const regenerateCode = async () => {
    const newCode = await regenerateJoinCode();
    setInviteCode(newCode);
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
          <CategoryLabel>User Name:</CategoryLabel>
          <button
            type="button"
            className={`button sm-round-btn ${showHMForm ? 'secondary' : 'primary'}-btn`}
            onClick={hmNameEdit}
          >
            <i className={`fas fa-${showHMForm ? 'check' : 'edit'}`} />
          </button>
        </LabelPanel>
        {showHMForm ? (
          <input
            type="text"
            value={HMFormInput}
            onChange={(e) => setHMFormInput(e.target.value)}
          />
        ) : (
          <Name>{HMName}</Name>
        )}
      </NamePanel>

      <NamePanel>
        <LabelPanel id="hh-name">
          <CategoryLabel>Household Name:</CategoryLabel>
          {userHoH && (
            <button
              type="button"
              className={`button sm-round-btn ${showHHForm ? 'secondary' : 'primary'}-btn`}
              onClick={hhNameEdit}
            >
              <i className={`fas fa-${showHHForm ? 'check' : 'edit'}`} />
            </button>
          )}
        </LabelPanel>
        {showHHForm ? (
          <input
            type="text"
            value={HHFormInput}
            onChange={(e) => setHHFormInput(e.target.value)}
          />
        ) : (
          <Name>{HHName}</Name>
        )}
      </NamePanel>

      <Section>
        <CategoryLabel>Show Lists</CategoryLabel>
        {lists?.map((list) => (
          <ListSetting key={list.id} data={list} />
        ))}
      </Section>

      <Section>
        <CategoryLabel>Invite Code</CategoryLabel>
        {showCode ? (
          <ButtonContainer>
            {userHoH && (
            <button
              type="button"
              className="button round-btn primary-btn"
              onClick={regenerateCode}
            >
              <i className="fas fa-recycle" />
            </button>
            )}
            <button
              type="button"
              className="button text-btn primary-btn"
              onClick={() => {
                setShowCode(false);
                setIsCopied(false);
              }}
            >
              <InviteCode>{inviteCode}</InviteCode>
            </button>
            <button
              type="button"
              className={`button round-btn ${isCopied ? 'secondary' : 'primary'}-btn`}
              onClick={copyCode}
            >
              <i
                className={`fas fa-${
                  isCopied ? 'clipboard-check' : 'clipboard'
                }`}
              />
            </button>
          </ButtonContainer>
        ) : (
          <button
            type="button"
            className="button text-btn secondary-btn"
            onClick={() => setShowCode(true)}
          >
            <InviteCode>Show Code</InviteCode>
          </button>
        )}
      </Section>

      {HMs.length > 0 && (
        <Section>
          <CategoryLabel>Housemates</CategoryLabel>
          {HMs?.map((hm) => (
            <Housemate key={hm.id} hm={hm} setHMs={setHMs} userHoH={userHoH} />
          ))}
        </Section>
      )}

      <button type="button" className="button text-btn primary-btn" onClick={handleLeave}>
        Leave Household
      </button>
      {userHoH && (
        <button
          type="button"
          className="button text-btn primary-btn"
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
