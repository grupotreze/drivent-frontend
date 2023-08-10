import styled from 'styled-components';
import { GiExitDoor, GiConfirmed } from 'react-icons/gi';
import { RxCrossCircled } from 'react-icons/rx';
export const ActivityData = styled.div`

`;
export const ActivityTitle =styled.h2 `
  color: #343434;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ActivityTime = styled.p`
  color: #343434;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const EntryButton = styled.button`
  border: none;
  width: 20%;
  height: 100%;
  border-left: 1px solid ${({ enrolled }) => enrolled ? '#99E8A1' : '#CFCFCF' };
  background-color: ${({ enrolled }) => enrolled ? '#D0FFDB' : '#F1F1F1' };
  cursor: pointer;
  align-self: center;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #078632;
  &:disabled{
    color:${({ enrolled }) => enrolled ? '#078632' : '#CC6666' };
  }
`;

export const AuditoriumActivities = styled.div`
  display: flex;
  justify-content: space-between;
  width: 265px;
  min-height: ${({ height }) => height}px;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: ${({ enrolled }) => enrolled ? '#D0FFDB' : '#F1F1F1' };
  color: #343434;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 12px;
`;

export const EntryDoorIcon = styled(GiExitDoor)`
  font-size: 24px;

`;

export const ConfirmedIcon = styled(GiConfirmed)`
  font-size: 24px;
`;

export const FullfilledIcon = styled(RxCrossCircled)`
  font-size: 24px;
`;
