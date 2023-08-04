import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const TextConfirmation = styled.p`
  color:#8E8E8E;
  font-size: 20px;
  margin: 20px 0;
`;

export const CardConfirmation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 108px;
    width: 290px;
    background-color: #FFEED2;
    border-radius: 20px;
    gap: 10px;
    margin-bottom:20px;
    h2 {
        font-size: 16px;
        font-weight: 400;
        color: #454545;
    }
    h3{
        font-size: 14px;
        font-weight: 400;
        color: #898989;
    }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: column;
`;
