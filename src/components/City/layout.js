import React from 'react';
import styled from 'styled-components';
import User from './../User';
import Cell from './../Cell';
import {percentsToColor} from './../utils';


const City = styled.div`
  background-color: #e5e5e5;
`;

const CityRow = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props => props.color ? props.color : `transparent`};
  font-weight: bold;
  height: ${props => props.fullHeight ? '100%' : `auto`};
`;




function getBody(users = [], isOpen, popupHandler) {
  if (!isOpen) return null;

  return users.map(user => <User
    key={user.id}
    user={user}
    popupHandler={popupHandler}
  />);
}



export default ({cityData, isOpen, openHandler, popupHandler}) => {
  const {city, users, percents, summ} = cityData;
  if (users.length === 0) return null;

  const bgColor = percentsToColor(percents);

  return (
    <City>
      <CityRow color = {bgColor}>
        {Cell({
          data: {
            value: city.name,
          },
          key: `${city.id}_name`,
          onClick: openHandler,
          large: true,
          cursor: `pointer`,
          borderBottom: true,
        })}

        {Cell({
          data: {
            value: `${percents}%`,
          },
          key: `${city.id}_percents`,
          large: true,
          cursor: `default`,
          borderBottom: true,
        })}

        {summ.map((item, i) => Cell({
          data: {
            value: item.value,
          },
          key: `${city.id}_sum_${item.type}_${item.status}`,
          large: true,
          cursor: `pointer`,
          borderBottom: true,
          onClick: popupHandler({
            id: `${city.id}`,
            type: `department`,
            call_type: item.type,
            call_status: item.status,
            name: city.name
          }),
        }))}
      </CityRow>
      {getBody(users, isOpen, popupHandler)}
    </City>
  )
}