import React from 'react'
import styled from 'styled-components'
import { Calendar } from 'antd';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: '130(20)', content: 'D001' },
        { type: '120(30)', content: 'D002' },
      ];
      break;
    case 10:
      listData = [
        { type: '20', content: 'D003' },
        { type: '45', content: 'D004' },
        { type: '67', content: 'D100' },
      ];
      break;
    case 15:
      listData = [
        { type: '268', content: 'D090' },
        { type: '44', content: 'D080' },
        { type: '33', content: 'D079' }       
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <Events>
      {listData.map(item => (
        <EventsItem key={item.content}>
            <EventsItemCustomer>{item.content}</EventsItemCustomer><span> {item.type}</span>
        </EventsItem>
      ))}
    </Events>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

export const Home = () => {
    return (
        <>
        <Title>План отгрузок</Title>
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </>
    )
}

const Title = styled.h2`    
    text-align: center;    
`
const Events = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;    
`
const EventsItem = styled.li`
    font-size: 12px;
`
const EventsItemCustomer = styled.span`
    color: #dfa914;
`