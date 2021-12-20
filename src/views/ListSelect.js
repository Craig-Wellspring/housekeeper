import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListIcon from '../components/listables/ListIcon';
import { getLists } from '../api/data/lists-data';
import AddListButton from '../components/buttons/AddListButton';
import { Panel, PanelTitle } from '../components/StyledComponents';
import { getHousemate } from '../api/data/households-data';
import { supabase } from '../api/auth';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  min-width: 300px;
  max-width: 90%;
`;

export default function ListSelect() {
  const [lists, setLists] = useState([]);

  const updateLists = async () => {
    const hhLists = await getLists();
    setLists(hhLists);
  };

  const subscribeToLists = (HHID) => {
    const subscription = supabase
      .from(`lists:hh_id=eq.${HHID}`)
      .on('*', updateLists)
      .subscribe();
    console.warn(subscription);
    return subscription;
  };

  useEffect(async () => {
    let isMounted = true;
    let subscription;
    const hhLists = await getLists();
    const hm = await getHousemate();
    if (isMounted) {
      subscription = subscribeToLists(hm.hh_id);
      setLists(hhLists);
    }
    return (() => {
      isMounted = false;
      supabase.removeSubscription(subscription);
    });
  }, []);

  return (
    <Panel>
      <PanelTitle>List Select</PanelTitle>
      <ListContainer>
        {lists?.map((list) => (
          <ListIcon key={list.id} list={list} tabIndex="0" />
        ))}
        <AddListButton setLists={setLists} />
      </ListContainer>
    </Panel>
  );
}
