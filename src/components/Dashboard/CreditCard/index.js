import React, { useContext, useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Container, IconCheck, InputCVC, InputValidThru, InputsSmall, LabelName, PayConfirmation, PayConfirmationR, PaymentButton } from './styles.js';
import UserContext from '../../../contexts/UserContext.js';
import { createTicketPayment, getTicket } from '../../../services/ticketsApi.js';
import {
  FaCheckCircle,
} from 'react-icons/fa';

function PaymentForm() {
  const { userData } = useContext(UserContext);
  const [ticket, setTicket] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  useEffect(() => {
    getDataTicket();
  }, [refresh]);

  async function getDataTicket() {
    try {
      const dataTicket = await getTicket(userData.token);
      setTicket(dataTicket);   
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    if (name === 'number') {
      const maxDigits = 16;
      const sanitizedValue = value.slice(0, maxDigits);
      setState((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === 'expiry') {
      const maxDigits = 4;
      const sanitizedValue = value.slice(0, maxDigits);
      setState((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === 'cvc') {
      const maxDigits = 3;
      const sanitizedValue = value.slice(0, maxDigits);
      setState((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  function getCardProperty(cardNumber) {
    const cardTypes = {
      AMEX: /^34[0-9]{14}$/,
      AURA: /^((?!504175))^((?!5067))(^50[0-9])/,
      BANESECARD: /^636117/,
      CABAL: /(60420[1-9]|6042[1-9][0-9]|6043[0-9]{2}|604400)/,
      DINERS: /(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      ELO: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      FORTBRASIL: /^628167/,
      GRANDCARD: /^605032/,
      HIPERCARD: /^606282|^3841(?:[0|4|6]{1})0/,
      JCB: /^(?:2131|1800|35\d{3})\d{11}/,
      MASTERCARD: /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/,
      PERSONALCARD: /^636085/,
      SOROCRED: /^627892|^636414/,
      VALECARD: /^606444|^606458|^606482/,
      VISA: /^4[0-9]{15}$/
    };

    for (const cardType in cardTypes) {
      if (cardTypes.hasOwnProperty(cardType)) {
        if (cardTypes[cardType].test(cardNumber)) {
          return cardType;
        }
      }
    }

    return 'INDEFINIDO';
  }

  async function handlePayment(event) {
    const body = { ticketId: ticket.id, cardData: { ...event, expirationDate: `${parseInt(event.expirationDate.slice(2)) + 2000}-${event.expirationDate.slice(0, 2)}`, issuer: getCardProperty(event.number) } };
      
    try {
      await createTicketPayment(userData.token, body);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>{
      ticket?.status !== 'PAID' ?
        <Container>
          <div>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
          </div>
          <form onSubmit={handlePayment}>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyPress={e => {
                if (isNaN(Number(e.key))) {
                  e.preventDefault();
                }
              }}
              required
            />
            <LabelName>E.g.: 49..., 51..., 36..., 37...</LabelName>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={e => {
                const key = e.key;
                if (isNaN(Number(e.key)) || key === ' ') {
                  return;
                }
                e.preventDefault();
              }}
              maxLength="30"
              required
            />
            <InputsSmall>
              <InputValidThru>
                <input
                  type="number"
                  name="expiry"
                  placeholder="Valid Thru"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyPress={e => {
                    if (isNaN(Number(e.key))) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
              </InputValidThru>
              <InputCVC>
                <input
                  type="number"
                  name="cvc"
                  placeholder="CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyPress={e => {
                    if (isNaN(Number(e.key))) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
              </InputCVC>        
            </InputsSmall>
          </form>
          <PaymentButton type="submit" onClick={() => handlePayment({ number: parseInt(state.number), name: state.name, expirationDate: state.expiry, cvv: state.cvc })}>FINALIZAR PAGAMENTO</PaymentButton>
        </Container>
        :
        <PayConfirmation>
          <IconCheck><FaCheckCircle/></IconCheck>
          <PayConfirmationR>
            <p>Pagamento confirmado!</p>
            <span>Prossiga para a escolha de hospedagem e atividades</span>
          </PayConfirmationR>
                
        </PayConfirmation>
    }</>
  );
};

export default PaymentForm;
