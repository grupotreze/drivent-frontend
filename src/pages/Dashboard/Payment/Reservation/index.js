import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../../contexts/UserContext.js';
import { getPersonalInformations } from '../../../../services/enrollmentApi.js';
import { toast } from 'react-toastify';
import { ConfirmationArea, Container, Content, Description, FinishOrderMessage, HotelPrice, HotelsOptionsItem, HotelsOptionsList, Instruction, Message, OrderPrice, ReservationButton, TicketsTypeList } from './styles.js';
import { StyledTypography } from '../../../../components/PersonalInformationForm/index.js';
import { createTicketReservation, getTicket, getTicketsTypes } from '../../../../services/ticketsApi.js';
import TicketType from '../../../../components/TicketTypeItem/index.jsx';
import { useNavigate } from 'react-router';

export default function Payment() {
  const { userData } = useContext(UserContext);
  const [enrollment, setEnrollment] = useState(null);
  const [ticketsTypes, setTicketsTypes] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [hotelOption, setHotelOption] = useState({ option: null, value: null });
  const navigate = useNavigate();

  useEffect(() => {
    checkReservation();
    getUserEnrollment();
    getTicketsTypesList();
  }, []);

  async function getUserEnrollment() {
    try {
      const data = await getPersonalInformations(userData.token);
      setEnrollment(data);
    } catch (error) {
      toast('Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso');
    }
  }

  async function getTicketsTypesList() {
    try {
      const data = await getTicketsTypes(userData.token);
      setTicketsTypes(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkReservation() {
    try {
      const data = await getTicket(userData.token);
      if (data) navigate('/dashboard/checkPayment');
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  function handleHotelOption(option) {
    setHotelOption(option);
  }
  console.log(hotelOption.option);

  //TODO : Implementar a função responsável por efetivar a reserva e seguir para a tela de pagamento
  //TODO: Não implementar a tela de reserva de ingresso junto com a tela de pagamento
  async function handleReservation(ticketTypeId) {
    try {
      await createTicketReservation(userData.token, hotelOption.option === false ? 2 : ticketTypeId);
      toast('Ingresso reservado com sucesso!!');
      navigate('/dashboard/checkPayment');
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Container>
        {!enrollment ? 
          <Message>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Message> 
          : 
          <Content>
            <Instruction>Primeiro, escolha sua modalidade de ingresso</Instruction>
            <TicketsTypeList>
              {ticketsTypes.map(ticket =>  {
                if (ticket.id !== 2) {
                  return(
                    <TicketType 
                      isRemote={ticket.isRemote} 
                      ticket={ticket.name} 
                      includesHotel={ticket.includesHotel} 
                      price={ticket.price} 
                      key={ticket.id}
                      id={ticket.id}
                      selectedTicket= {selectedTicket}
                      setSelectedTicket = {setSelectedTicket}
                      currentTicket={ticket}
                      setHotelOption = {setHotelOption}
                    />
                  );
                }
              })}
            </TicketsTypeList>
            {selectedTicket ?
              <>
                {!selectedTicket.isRemote && selectedTicket.includesHotel ?
                  <Instruction>Ótimo! Agora escolha sua modalidade de hospedagem</Instruction> 
                  : 
                  <ConfirmationArea>
                    <FinishOrderMessage>Fechado! O total ficou em <OrderPrice>R$ {`${parseInt(selectedTicket.price/100)}`}</OrderPrice>. Agora é só confirmar:</FinishOrderMessage>
                    <ReservationButton onClick={() => handleReservation(selectedTicket.id)}>RESERVAR INGRESSO</ReservationButton>
                  </ConfirmationArea> 
                }
                
                {(!selectedTicket.isRemote && selectedTicket.includesHotel === true) || !selectedTicket.includesHotel === false?
                  <>
                    <HotelsOptionsList>
                      <HotelsOptionsItem selected = {hotelOption.option === false} onClick={() => handleHotelOption({ option: false, value: 0 })}>
                        <Description>Sem Hotel</Description>
                        <HotelPrice>{'+ R$ 0'}</HotelPrice>
                      </HotelsOptionsItem>
                      <HotelsOptionsItem selected = {hotelOption.option === true} onClick={() => handleHotelOption({ option: true, value: 350 })}>
                        <Description>Com Hotel</Description>
                        <HotelPrice>{'+ R$ 350'}</HotelPrice>
                      </HotelsOptionsItem>
                    </HotelsOptionsList>
                    {hotelOption.value !== null && hotelOption.option !== null ? 
                      <ConfirmationArea>
                        <FinishOrderMessage>Fechado! O total ficou em <OrderPrice>R$ {`${parseInt(selectedTicket.price/100)+hotelOption.value}`}</OrderPrice>. Agora é só confirmar:</FinishOrderMessage>
                        <ReservationButton onClick={() => handleReservation(selectedTicket.id)}>RESERVAR INGRESSO</ReservationButton>
                      </ConfirmationArea>
                      :
                      ''  
                    }
                  </>
                  :
                  ''
                }
                
              </>
              
              : ''
            }
          </Content>
        }
      </Container>
    </>

  );
}
