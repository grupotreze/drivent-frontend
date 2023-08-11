import {  useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import useEvent from '../../../hooks/api/useEvent.js';
import { StyledTypography } from '../../../components/PersonalInformationForm/index.js';
import { AuditoriumContent, AuditoriumInfo, AuditoriumName, AuditoriumsList, Container, DayButton, ListDaysButtons, InfoMessage } from './styles.js'; // Defina o locale como pt-br
import { fortmatEventDays } from '../../../helpers/formatEventDays.js';
import { formatAuditoriumsActivities } from '../../../helpers/formatAuditoriumsActivities.js';
import { Activity } from '../../../components/Dashboard/Activity/index.js';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import { getPersonalInformations } from '../../../services/enrollmentApi.js';
import { getPayment } from '../../../services/paymentApi.js';
import { getTicket } from '../../../services/ticketsApi.js';
import { getUserBooking } from '../../../services/bookingApi.js';

dayjs.locale('pt-br');

export default function Activities() {
  const { event } = useEvent();
  const [activities, setActivities] = useState(null);
  const [days, setDays] = useState([]);
  const [seeingDay, setSeeingDay] = useState(null);
  const [auditoriumsList, setAuditoriumList] = useState(null);
  const { userData } = useContext(UserContext);
  const [enrolledActivities, setEnrolledActivities] = useState(null);
  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [ticket, setTicket] = useState(null); 
  useEffect(async() => {
    if(event?.Auditorium) {
      const { hashDates, daysList } = fortmatEventDays(event.Auditorium);
      setActivities(hashDates);
      setDays(daysList);
      setSeeingDay(daysList[0]);
      const { auditoriums } = formatAuditoriumsActivities(hashDates[daysList[0]]);
      setAuditoriumList(auditoriums);
      try {
        await getEnrolledActivities();
        const dataTicket = await getTicket(userData.token);
        const dataPayment = await getPayment(userData.token, dataTicket.id);
        setPayment(dataPayment);
        setTicket(dataTicket);
        const userBooking = await getUserBooking(userData.token);
        setBooking(userBooking);
      } catch (error) {
        console.log(error);
      }
    }
  }, [event]);

  function handleActivitiesList(day) {
    setSeeingDay(day);
    const { auditoriums } = formatAuditoriumsActivities(activities[day]);
    setAuditoriumList(auditoriums);
  }

  async function getEnrolledActivities() {
    const { Activity } = await getPersonalInformations(userData.token);
    if(Activity) {
      setEnrolledActivities(Activity);
    }
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Container>
        { payment && (!ticket?.TicketType.isRemote && ((ticket?.TicketType.includesHotel && booking)|| !ticket?.TicketType.includesHotel))? 
          <>
            <ListDaysButtons>
              {days.map((day, i) => {
                return (
                  <li key={i}>
                    <DayButton onClick={() => handleActivitiesList(day)} selected = {day === seeingDay}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </DayButton>
                  </li>
                );
              })}
            </ListDaysButtons>
            <AuditoriumsList>
              {auditoriumsList?.map(({ name, activities }, index) => {
                return(
                  <AuditoriumInfo key={index}>
                    <AuditoriumName>{name}</AuditoriumName>
                    <AuditoriumContent>
                      {activities.map((activity, i) => (
                        <Activity 
                          key={activity.id} 
                          activity = {activity} 
                          enrolledActivities = {enrolledActivities}
                          setEnrolledActivities = {setEnrolledActivities}
                          activities = {activities}
                        />
                      ))}

                    </AuditoriumContent>
            
                  </AuditoriumInfo>
                );
              })}
            </AuditoriumsList>
          </>
          :
          <InfoMessage>{
            !ticket?.TicketType.includesHotel ?
              `Sua modalidade de ingresso não necessita escolher
              atividade. Você terá acesso a todas as atividades.`
              :
              `Você precisa ter confirmado pagamento e reserva de quarto antes
              de fazer a escolha de atividades`
          }</InfoMessage>  
        }
      </Container>
    </>
  );
}
