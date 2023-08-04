import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import { getTicket } from '../../../services/ticketsApi.js';
import { StyledTypography } from '../../../components/PersonalInformationForm/index.js';
import { CardConfirmation, Container, IconCheck, PayConfirmation, PayConfirmationR, TextConfirmation } from './styles.js';
import PaymentForm from '../../../components/Dashboard/CreditCard/index.js';

export default function finishPayment() {
  const { userData } = useContext(UserContext);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getDataTicket();
  }, []);

  async function getDataTicket() {
    try {
      const dataTicket = await getTicket(userData.token);
      setTicket(dataTicket);   
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Container>
        <TextConfirmation>Ingresso Escolhido</TextConfirmation>
        <CardConfirmation>
          <h2>{
            ticket?.TicketType.name === 'Online' ? ticket?.TicketType.name
              : ticket?.TicketType.name === 'Presencial' && ticket?.TicketType.includesHotel === true ? `${ticket?.TicketType.name} + Com Hotel`
                : `${ticket?.TicketType.name} + Sem Hotel`
          }</h2>
          <h3>{`R$ ${(parseInt(ticket?.TicketType.price/100)+((ticket?.TicketType.includesHotel === true ? 35000 : 0)/100))}`}</h3>
        </CardConfirmation>

        <TextConfirmation>Pagamento</TextConfirmation>
        <PaymentForm/>

      </Container>
    </>
  );
}
