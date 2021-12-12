import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListIcon from '../components/listables/ListIcon';
import { getLists } from '../api/data/lists-data';
import AddListButton from '../components/buttons/AddListButton';
import { Panel, PanelTitle } from '../components/StyledComponents';
import { getUserHMID } from '../api/data/housemates-data';

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

  useEffect(async () => {
    let isMounted = true;
    const hhLists = await getLists();
    const hmID = await getUserHMID();
    if (isMounted) { setLists(hhLists.filter((list) => !list.private || list.hm_id === hmID)); }
    return (() => { isMounted = false; });
  }, []);

  return (
    <Panel>
      <PanelTitle>List Select</PanelTitle>
      <ListContainer>
        {lists?.map((list) => (
          <ListIcon key={list.id} list={list} />
        ))}
        <AddListButton setLists={setLists} />
      </ListContainer>
    </Panel>
  );
}
