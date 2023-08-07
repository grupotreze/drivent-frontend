import { useState } from 'react';
import HotelCard from './HotelCard';
import { Container, RoomContainer, TextConfirmation } from './style';
import RoomCard from './Roomcard';

export default function HotelContainer({ hotels }) {
  const [selected, setSelected] = useState(null);
  const [rooms, setRooms] = useState(null);
  
  function selectHotel(hotelId, rooms) {
    setSelected(hotelId);
    setRooms(rooms);
  }

  return (
    <>
      <TextConfirmation>Primeiro, escolha seu hotel</TextConfirmation>
      <Container>
        {hotels?.map((h) => <HotelCard key={h.id} hotel={h} selected={selected} selectHotel={selectHotel} />)}
      </Container>
      {
        selected ? 
          <>
            <TextConfirmation>Ótima pedida! Agora escolha seu quarto:</TextConfirmation>
            <RoomContainer>
              {rooms?.map((r) => <RoomCard key={r.id} room={r} selected={selected}/>)}
            </RoomContainer>
          </>
          :
          <></>
      }
    </>
  );
};
