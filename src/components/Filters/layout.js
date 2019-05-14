import React from 'react';
import styled from 'styled-components';
import CitySelector from './../CitySelector';
import UserInput from './../UserInput';
import Calendar from './../Calendar';


const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px;
`;


const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 32px;
  margin-right: 15px;
  flex-shrink: 0;
`;



export default (props) => {
  const {cities} = props;
  return (
    <Filters>
      <Filter>
        <Label>Дата</Label>
        <Calendar />
      </Filter>
      { cities.size > 1 &&
        <Filter>
          <Label>Филиал</Label>
          <CitySelector cities = {cities} />
        </Filter>
      }
      <Filter>
        <Label>Сотрудник</Label>
        <UserInput/>
      </Filter>
    </Filters>
  )
}