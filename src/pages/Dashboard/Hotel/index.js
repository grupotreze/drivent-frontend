import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { getPayment } from '../../../services/paymentApi';
import { getTicket } from '../../../services/ticketsApi';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { Container, InfoMessage } from './style';
import HotelContainer from './HotelContainer';
import { getHotels } from '../../../services/hotelApi';

export default function Hotel() {
  const { userData } = useContext(UserContext);
  const [ticket, setTicket] = useState(null);
  const [payment, setPayment] = useState(null);
  const [hotels, setHotels] = useState(null);

  useEffect(async() => {
    await getDataTicket();
    await getDataHotels();
  }, []);

  async function handleData() {
    await getDataTicket();
    await getDataHotels();
  }
  async function getDataTicket() {
    try {
      const dataTicket = await getTicket(userData.token);
      const dataPayment = await getPayment(userData.token, dataTicket.id);
      setTicket(dataTicket);
      setPayment(dataPayment);   
    } catch (error) {
      console.log(`error ${error}`);
    }
  }
  
  async function getDataHotels() {
    try {
      const dataHotels = await getHotels(userData.token);
      setHotels(dataHotels);
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Container>
        { 
          payment 
            ? (
              !ticket.TicketType.includesHotel 
                ? <InfoMessage>Sua modalidade de ingresso não inclui hospedagem<br/>Prossiga para a escolha de atividades</InfoMessage>
                : <HotelContainer hotels={hotels} handleData={handleData}/>
            ) 
            : <InfoMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</InfoMessage>
        }
      </Container>
    </>
  );
}
