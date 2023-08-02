import styled from 'styled-components';

export const TicketTypeItem = styled.li`
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

export const Type = styled.p`
  color: #454545;
  margin-bottom: 5px;
  text-align: center;
`;

export const Price = styled.p`
  color: #898989;
  font-size: 14px;
`;
