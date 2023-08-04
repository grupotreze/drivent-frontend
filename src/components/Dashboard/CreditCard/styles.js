import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: auto;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  form {
    height: 183px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
    padding:0 20px 0 0;
    width: 60%;
    input {
        font-size: 18px;
        font-weight: 700;
        color: #9c9c9c;
        text-decoration: none;
        padding:12px;
        width: 100%;
        border-radius: 8px;
        border: 1px solid #e8e8e8;
        -moz-appearance: textfield;
        appearance: textfield;
        ::placeholder {
            color: #cccccc;
        }
        &:focus {
            border-color: #9c9c9c;
            outline: none;
        }
    }
  }
`;

export const InputsSmall = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

export const InputValidThru = styled.div`
    width: 70%;
`;

export const InputCVC = styled.div`
    width: 30%;
`;

export const LabelName = styled.div`
    font-size: 14px;
    margin-top: -5px;
    color: #8E8E8E;
`;

export const PaymentButton = styled.button`
  margin-top: 40px;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  width: 200px;
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

export const PayConfirmation = styled.div`
    display: flex;
    gap: 10px;
    font-size: 16px;
    color: #454545;
`;

export const IconCheck = styled.div`
    font-size: 35px;
    color: #36B853;
`;

export const PayConfirmationR = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    p {
        font-weight: 700;
    }
    span {
        font-weight: 400;
    }
`;
