import styled from 'styled-components';
import { BsPersonFill, BsPerson } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function RoomCard({ room, selected }) {
  const [isFull, setIsFull] = useState(false);
  const [ocupation, setOcupation] = useState(null);
  
  useEffect(() => {
    const array = [];
    
    if(room.capacity === room.Booking.length)
      setIsFull(true);
    else
      setIsFull(false);
    
    const available = room.capacity - room.Booking.length;
    
    for (let i = 0; i < available; i++) {
      array.push('free');
    }
    for (let i = 0; i < room.Booking.length; i++) {
      array.push('reserved');
    }
    setOcupation(array);
  }, [selected]);

  return(
    <Card isFull={isFull} >
      <Name>{room.name}</Name>
      <div>
        {ocupation?.map((o, index) => o === 'free' ? <BsPerson key={index}/> : <BsPersonFill key={index}/> )}
      </div>
    </Card>
  );
};

const Card = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 190px;
height: 45px;
padding: 5px;
border-radius: 10px;
background-color: ${({ isFull }) => isFull ? '#E9E9E9' : '' };
color:${({ isFull }) => isFull ? '#8B8B8B' : '#454545' };
border: 1px solid #CECECE;
svg{
  font-size:27px;
}
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
`;
