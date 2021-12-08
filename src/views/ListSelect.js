import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListIcon from '../components/listables/ListIcon';
import { getLists } from '../api/data/lists-data';
import AddListButton from '../components/buttons/AddListButton';
import { getCustomLists } from '../api/data/customlists-data';

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
  const [customLists, setCustomLists] = useState([]);

  useEffect(async () => {
    let isMounted = true;
    const hhLists = await getLists();
    const cLists = await getCustomLists();
    if (isMounted) {
      setLists(hhLists);
      setCustomLists(cLists);
    }
    return (() => { isMounted = false; });
  }, []);

  return (
    <div className="panel">
      <div className="panel-title">List Select</div>
      <ListContainer>
        {lists?.map((list) => (
          <ListIcon key={list.id} list={list} />
        ))}
        {customLists?.map((cList) => (
          <ListIcon key={cList.id} cList={cList} />
        ))}
        <AddListButton />
      </ListContainer>
    </div>
  );
}
