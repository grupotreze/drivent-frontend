import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function HotelCard({ hotel, selected, selectHotel }) {
  const [roomsAvailable, setRoomsAvailable] = useState(null);
  
  useEffect(() => {
    let totalCapacity = 0;
    let reserved = 0;
    hotel.Rooms.forEach(room => {
      totalCapacity+= room.capacity;
      reserved += room.Booking.length;
    });
    setRoomsAvailable(totalCapacity-reserved);
  }, []);
  return ( 
    <Hotel selected={selected} hotelId={hotel.id} onClick={() => selectHotel(hotel.id, hotel.Rooms)}>
      <Picture src={hotel.image} alt={hotel.name}/>
      <Info>
        <Name>{hotel.name}</Name>
        <Topic>
          <span>Tipos de acomodação:</span>
          <p>{hotel.Rooms.length > 20 ? 'Single, Double e Triple': 'Single e Double'}</p>
        </Topic>
        <Topic>
          <span>Vagas disponíveis:</span>
          <p>{roomsAvailable}</p>
        </Topic>
      </Info>
    </Hotel>
  );
};

const Hotel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  width: 196px;
  height: 264px;
  background-color: ${({ selected, hotelId }) => hotelId === selected ? '#FFEED2': '#EBEBEB'};
  border-radius: 10px;
  color: #343434
`;

const Info = styled.div`
display: flex;
height: 100px;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
`;

const Picture = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
`;

const Name = styled.span`
  font-size: 20px;
  text-align: left;
`;

const Topic = styled.div`
  font-size: 12px;
  line-height: 14px;
  span{
   font-weight: 700;
  }
  p{
   font-weight: 400;
  }
`;

