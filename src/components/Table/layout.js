import React from 'react';
import styled from 'styled-components';
import {THEAD} from './../constants';
import City from './../City';
import Modal from './../Modal';


const Table = styled.div`
  width: 100%;
`;

const Row = styled.div`
  background: #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const Cell = styled.div`
  padding: 20px;
  font-size: 14px;
  font-weight: bold;
  border-right: 1px solid #c4c4c4;
  flex-shrink: 0;
  width: 11.111111%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:last-child {
    border-right: none;
  }
`;



const getThead = () => {
  const heads = THEAD.map((head, i) => <Cell key={i}>{head}</Cell>)

  return (
    <Row>
      {heads}
    </Row>
  )
};


export default ({cities, isModalOpen}) => {
  const elements = cities.map(city => <City key={city.id} id={city.id} />)

  return (
    <Table>
      {getThead()}
      {elements}
      {isModalOpen && <Modal/>}
    </Table>
  )
}