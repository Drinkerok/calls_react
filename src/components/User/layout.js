import React from 'react';
import styled from 'styled-components';
import {dataValues} from './../constants';
import Cell from './../Cell';
import {percentsToColor} from './../utils';


const UserRow = styled.div`
  display: flex;
  width: 100%;
`;



function getBody(user, color, popupHandler) {
  const tds = [];

  for (let typeName in dataValues) {
    const type = dataValues[typeName];

    type.forEach(val => tds.push(
      Cell({
        data: {value: `${user[typeName][val]}`},
        key: `${user.id}_${typeName}_${val}`,
        color,
        cursor: `pointer`,
        borderBottom: true,
        onClick: popupHandler({
          id: `${user.id}`,
          type: `user`,
          call_type: typeName,
          call_status: val,
          name: user.name
        })
      })
    ));
  }
  return tds;
}


export default ({user, popupHandler}) => {
  if (!user) return null;
  const bgColor = percentsToColor(user.percent);

  return (
    <UserRow>
      {Cell({
        data: {value: ``},
        key: `${user.id}_empty`,
        borderBottom: false,
      })}
      {Cell({
        data: {
          user: user.name,
          percent: user.percent
        },
        key: user.id,
        color: bgColor,
        cursor: `default`,
        type: `user_percents`,
        borderBottom: true,
      })}
      {getBody(user, bgColor, popupHandler)}
    </UserRow>
  )
}