import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function RoomCard({ room, selectedRoom, setSelectedRoom, userRoom }) {
  const [isFull, setIsFull] = useState(false);
  const [ocupation, setOcupation] = useState(null);

  useEffect(() => {
    const array = [];
    
    if(room.capacity === room.Booking.length)
      setIsFull(true);
    else
      setIsFull(false);
    
    const available = room.capacity - room.Booking.length;
    
    let userRoomSelected = 0;
    for (let i = 0; i < available; i++) {
      if((selectedRoom === room.id && (i+1 >= available)) ) {
        array.push('selected');
        continue;
      }
      array.push('free');
    }
    for (let i = 0; i < room.Booking.length; i++) {
      if((userRoom?.id === room?.id && !userRoomSelected)) {
        userRoomSelected++;
        array.push('selected');
        continue;
      }
      array.push('reserved');
    }
    setOcupation(array);
  }, [selectedRoom]);
  return(
    <Card disabled={isFull || userRoom?.id === room?.id} isFull={isFull || userRoom?.id === room?.id} onClick={() => setSelectedRoom(room?.id)} selected={selectedRoom === room?.id}>
      <Name>{room.name}</Name>
      <div>
        {ocupation?.map((o, index) => o === 'free' ? <BsPerson key={index}/> : <BsPersonFill key={index} color={(o==='selected') ? '#FF4791' : 'black'}/> )}
      </div>
    </Card>
  );
};

const Card = styled.button`
background-color: transparent;
display: flex;
align-items: center;
justify-content: space-between;
width: 190px;
height: 45px;
padding: 5px;
border-radius: 10px;
background-color: ${({ isFull, selected }) => isFull ? '#E9E9E9' : selected ? '#FFEED2' : ''};
color:${({ isFull }) => isFull ? '#8B8B8B' : '#454545' };
border: 1px solid #CECECE;
cursor: pointer;
svg{
  font-size:27px;
}

&:hover{
  border: 2px solid pink;
}
&:disabled{
  border: none;
  cursor: not-allowed;
}
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
`;
