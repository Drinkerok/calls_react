import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {closeModal} from './../../AC';
import {DATE_OPTIONS} from './../constants';

const ModalEl = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  min-width: 200px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;
const TableHeader = styled.h2`
  text-transform: uppercase;
  margin: 0 0 20px;
`;
const Table = styled.table`
  border-collapse: collapse;
  min-width: 100%;
`;
const Thead = styled.thead`
  background-color: #c4c4c4;
`;
const Tbody = styled.tbody`
  background-color: rgba(0,0,0,0.015);
`;
const Row = styled.tr`
  &:nth-child(even) {
    background-color: #e5e5e5;
  }
`;
const Th = styled.th`
  text-align: center;
  vertical-align: center;
  padding: 10px;
  font-weight: bold;
  border-right: 1px solid rgba(0,0,0,0.7);
  
  &:last-child {
    border-right: none;
  }
`;
const Td = styled.td`
  padding: 5px;
  height: 28px;
  border-right: 1px solid rgba(0,0,0,0.7);
  text-align: center;
  vertical-align: top;
  
  &:last-child {
    border-right: none;
  }
`;


function getDate(filtersDate) {
  const {from, to} = filtersDate;
  if (!from && !to) return `за ${new Date().toLocaleString("ru", DATE_OPTIONS)}`;

  const stringFrom = !from ? `` : `с ${from.toLocaleString("ru", DATE_OPTIONS)}`;
  const stringTo = !to ? `` : `по ${to.toLocaleString("ru", DATE_OPTIONS)}`;

  return `${stringFrom} ${stringTo}`;
}



class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    document.addEventListener('keydown', this.escHandler);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    document.removeEventListener('keydown', this.escHandler);
  }



  escHandler = (evt) => {
    const keyName = evt.key;
    if (keyName !== `Escape`) return;
    this.props.closeModal();
  };
  closeHandler = (evt) => {
    if (evt.target !== this.wrapper.current) return;
    this.props.closeModal();
  };
  getBody = () => {
    const {dataModal, loading, loaded, filters} = this.props;
    if (loading) return `Загрузка...`;
    if (!loading && !loaded) return `Ошибка при загрузке`;
    const {name, calls: {data, pages}, header} = dataModal;

    return (
      <div>
        <TableHeader>{`${header} ${getDate(filters)}`}</TableHeader>
        <Table>
          <Thead>
            <Row>
                <Th>Фио сотрудника ОП</Th>
                <Th>Номер телефона</Th>
                <Th>Дата и время звонка</Th>
                <Th>Длительность звонка</Th>
                <Th>CRM</Th>
            </Row>
          </Thead>
          <Tbody>
            <Row>
                <Td rowSpan={data.length + 1}>{name}</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
            </Row>
            {data.map((call, i) => {
              const {phone, date, time, duration, crm} = call;
              return (
                  <Row key={`${name}_${i}`}>
                      <Td key={`${i}_phone`}>{phone}</Td>
                      <Td key={`${i}_date`}>{date} {time}</Td>
                      <Td key={`${i}_duration`}>{duration}</Td>
                      <Td key={`${i}_crm`}>{this.getCRM(crm)}</Td>
                  </Row>
              )
            })}
          </Tbody>
        </Table>
      </div>
    )
  };

  getCRM = (data) => {
    const {link, audio} = data;
    // const audioEl = audio ? new DOMParser().parseFromString(audio, 'text/html').body.firstChild : false;

    return (
      <div>
        <p>{link.name}: <a src={link.src}>{link.title}</a></p>
        {audio && <audio src={audio} controls></audio>}
      </div>
    )
  }



  render() {
    return ReactDOM.createPortal(
      <ModalEl onClick = { this.closeHandler } ref = {this.wrapper}>
        <ModalContent>
          {this.getBody()}
        </ModalContent>
      </ModalEl>,
      this.el
    )
  }
}


export default connect(state => {
  return {
    dataModal: state.modal.data,
    loading: state.modal.loading,
    loaded: state.modal.loaded,
    filters: state.filters.dateFilter,
  }
}, {closeModal})(Modal);