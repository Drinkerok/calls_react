import React from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  width: 11.111111%;
  flex-shrink: 0;
  border-right: 1px solid #c4c4c4;
  border-bottom: ${props => props.borderBottom ? `1px solid #c4c4c4` : `none`};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color ? props.color : `transparent`};
  padding: ${props => props.large ? `15px 0` : `5px 0`};
  cursor: ${props => props.cursor ? props.cursor : `default`};


  &:last-child {
    border-right: none;
  }
`;

const UserWrapper = styled(Cell)`
  padding: 0;
`;

const UserName = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 5px;
`;
const UserPercent = styled.div`
  border-left: 1px solid #c4c4c4;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
  padding: 0 5px;
  min-width: 55px;
`;

const CellEl = ({data, type, ...props}) => {
  switch (type) {
    case `user_percents`:
      const {user, percent} = data;
      return (
        <UserWrapper {...props}>
          <UserName>{user}</UserName>
          <UserPercent>{percent}%</UserPercent>
        </UserWrapper>
      )
  }
  return (
    <Cell {...props}>{data.value}</Cell>
  )
}



CellEl.defaultProps = {
  data: ``,
  key: false,
  onClick: () => {},
  color: false,
  large: false,
  borderBottom: true,
  cursor: `default`,
  type: undefined,
};



export default CellEl;