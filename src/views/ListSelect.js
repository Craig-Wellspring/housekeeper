import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListIcon from '../components/listables/ListIcon';
import { currentUser } from '../api/auth';
import { getHousemate } from '../api/data/housemates-data';
import { getLists } from '../api/data/lists-data';

const Title = styled.div``;

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

  useEffect(() => {
    getHousemate(currentUser().id).then((user) => getLists(user.hh_id).then((hhLists) => setLists(hhLists)));
  }, []);

  return (
    <div className="panel">
      <Title className="panel-title">List Select</Title>
      <ListContainer>
        {lists?.map((list) => (
          <ListIcon key={list.id} list={list} />
        ))}
        {/* <AddListButton /> */}
      </ListContainer>
    </div>
  );
}
