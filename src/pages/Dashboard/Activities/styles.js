import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90%;
  width: 100%;
  gap: 70px;
`;
export const ListDaysButtons = styled.ul`
  display: flex;
  gap: 15px;
`;

export const DayButton = styled.button`
  border: none;
  width: 131px;
  height: 37px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  cursor: pointer;
  background: ${({ selected }) => selected ? '#FFD37D' : '#E0E0E0'};
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  &:hover{
    border: 1px solid black;
    background-color: pink;
  }
`;
export const AuditoriumInfo = styled.div`
    height: 90%;
    width: 100%;
`;

export const AuditoriumName = styled.h2`

  color: #7B7B7B;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 13px;


`;
export const AuditoriumsList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const AuditoriumContent = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #d7d7d7;
  display: flex;
  flex-direction:column;
  align-items: center;
  padding: 10px;
  gap: 10px ;
`;

export const InfoMessage = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #8E8E8E;
  width: 480px;
  height: 48px;
  display: flex;
  align-self: center;
`;
