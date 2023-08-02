import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 100%;
`;

export const Message = styled.div`
  width: 60%;
  text-align: center;
  color:#8E8E8E;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

export const TicketsTypeList = styled.ul`
  display: flex;
  margin-bottom: 44px;
`;

export const Instruction = styled.p`
  color:#8E8E8E;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const HotelsOptionsList = styled.ul`
  display: flex;
  margin-bottom: 40px;
`;

export const HotelsOptionsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  cursor: pointer;
  margin-right: 20px;
  padding: 5px;
  background: ${({ selected }) => selected ? '#FFEED2' : 'transparent'};
  &:hover{
    border: 5px solid pink;
  }
`;

export const Description = styled.p`
  color: #454545;
  margin-bottom: 5px;
  text-align: center;
`;

export const HotelPrice = styled.p`
  color: #898989;
  font-size: 14px;
`;

export const ConfirmationArea = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FinishOrderMessage = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #8E8E8E;
`;

export const ReservationButton = styled.button`
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  width: 170px;
  height: 37px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &:hover{
    background-color: gray;
  }
`;

export const OrderPrice = styled.span`
  font-weight: 700;
`;
