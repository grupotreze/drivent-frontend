import { useState } from 'react';
import HotelCard from './HotelCard';
import { Container, RoomContainer, TextConfirmation, SelectHotelsContainer, BookingRoom } from './style';
import RoomCard from './Roomcard';
import { useEffect } from 'react';
import { changeUserBooking, createUserBooking, getUserBooking } from '../../../../services/bookingApi.js';
import { useContext } from 'react';
import UserContext from '../../../../contexts/UserContext.js';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export default function HotelContainer({ hotels, handleData }) {
  const [selected, setSelected] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(null);
  const { userData } = useContext(UserContext);
  const [userBooking, setUserBooking] = useState(null); 
  const [changingRoom, setChangingRoom] = useState(false);
  useEffect(async() => {
    if(selectedRoom) {
      setSelectedRoom(null);
    }
    await handleUserBooking();
  }, [selected, changingRoom]);

  async function handleUserBooking() {
    try {
      const booking = await getUserBooking(userData.token);
      setUserBooking(booking);
      if(selectedRoom) setSelectedRoom(null);
    } catch (error) {
      console.log(error);
    }
  }

  function selectHotel(hotelId, rooms) {
    setSelected(hotelId);
    setRooms(rooms);
  }

  async function bookingRoom(roomId) {
    try {
      if(userBooking) {
        await changeUserBooking(userData.token, { roomId }, userBooking.id);
        toast('Sua reserva foi alterada!');
        setChangingRoom(false);
        await handleData();
        return await handleUserBooking();
      }
      await createUserBooking(userData.token, { roomId });
      toast('Sua reserva foi efetuada!');
      await handleUserBooking();
      setChangingRoom(false);
      await handleData();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangingRoom() {
    setChangingRoom(false);
    setSelectedRoom(null);
    toast('Alterações canceladas!');
    await handleData();
  }
  return (
    <SelectHotelsContainer>
      {userBooking && !changingRoom ? 
      
        <SeeingUserRoomContainer seeingUserRoom = {userBooking && !changingRoom}>
          <TextConfirmation>Você ja escolheu seu quarto: </TextConfirmation>
          <UserHotelCard>
            <Picture src={userBooking.Room.Hotel.image} alt={userBooking.Room.Hotel.name}/>
            <Info>
              <Name>{userBooking.Room.Hotel.name}</Name>
              <Topic>
                <span>Quarto reservado</span>
                <p>{userBooking.Room.name} ({userBooking.Room.capacity === 1 ? 'Single' : userBooking.Room.capacity === 2 ? 'Double' : 'Triple'})</p>
              </Topic>
              <Topic>
                <span>Pessoas no seu quarto</span>
                <p>Você {userBooking.Room._count.Booking > 1 ? `e mais ${userBooking.Room._count.Booking - 1}` : ''}</p>
              </Topic>
            </Info>
          </UserHotelCard>

          <ChangeRoom onClick={() => {
            setChangingRoom(true);
            handleData();
            setSelected(null);
          }}>TROCAR DE QUARTO</ChangeRoom>
        </SeeingUserRoomContainer>
        :
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
                  {rooms?.map((r) => <RoomCard key={r.id} room={r} selectedRoom={selectedRoom} setSelectedRoom= {setSelectedRoom} userRoom={userBooking?.Room}/>)}
                </RoomContainer>
                
                {selectedRoom ? 
                  <BookingRoom onClick={() => bookingRoom(selectedRoom)}>RESERVAR QUARTO</BookingRoom>
                  :
                  <></>
                }
              </>
              :
              <></>
          }
          <CancelActions onClick={handleChangingRoom}>CANCELAR ALTERAÇÕES</CancelActions>
        </>
      }
    </SelectHotelsContainer>
  );
};

const SeeingUserRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 50px;
`;

const UserHotelCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  width: 196px;
  height: 264px;
  background-color:#FFEED2;
  border-radius: 10px;
  color: #343434;
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

const ChangeRoom = styled.button `
  width: 182px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  &:hover{
    background-color: gray;
  }
`;

const CancelActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 182px;
  height: 37px;
  border-radius: 4px;
  font-size: 15px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  &:hover{
    background-color: gray;
  }
  margin-top: 20px;
`;
