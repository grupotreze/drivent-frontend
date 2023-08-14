import styled from 'styled-components';

export const TextConfirmation = styled.p`
  color:#8E8E8E;
  font-size: 20px;
  margin: 20px 0;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
`;

export const RoomContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  padding: 20px 0;
`;

export const SelectHotelsContainer = styled.div`
  padding-bottom: 20px;
`;

export const BookingRoom = styled.button`
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
