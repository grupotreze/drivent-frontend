import dayjs from 'dayjs';
import { ActivityData, ActivityTime, ActivityTitle, AuditoriumActivities, ConfirmedIcon, EntryButton, EntryDoorIcon, FullfilledIcon } from './styles.js';
import { useEffect } from 'react';
import { enrollActivity, getEnrolledActivitiesCount, unenrollActivity } from '../../../services/activitiesApi.js';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function Activity({ activity, enrolledActivities, setEnrolledActivities, activities }) {
  const startTime = dayjs(activity.startTime).format('HH:mm');
  const endTime = dayjs(activity.endTime).format('HH:mm');
  const diff = dayjs(activity.endTime).diff(activity.startTime, 'hours');
  const minHeight = 80;
  const height = diff * minHeight;
  const { userData } = useContext(UserContext);
  const [capacity, setCapacity] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  useEffect( async() => {
    await getActivitiesEnrollmentCount();
  }, [enrolledActivities]);

  async function getActivitiesEnrollmentCount() {
    try {
      const { enrollments } = await getEnrolledActivitiesCount(userData.token, activity.id);
      setCapacity(activity.capacity - enrollments);
      setEnrolled(enrolledActivities?.some(a => a.id === activity.id));
    } catch (error) {
      /* eslint-disable-next-line */
      console.log(error);
    }
  }

  async function handleActivityEnroll(activityId) {
    try {
      if(!enrolled) {
        const hasTimeConflict = enrolledActivities.some(({ startTime: start, endTime: end }) => {
          const hasSameStartOrEnd = dayjs(activity.startTime).isSame(start) || dayjs(activity.endTime).isSame(end);
          const startsBeforeEndsAfter = dayjs(activity.startTime).isBefore(start) && dayjs(activity.endTime).isAfter(end);
          const startsAfterEndsBefore = dayjs(activity.startTime).isAfter(start) && dayjs(activity.endTime).isBefore(end);

          return (hasSameStartOrEnd || startsBeforeEndsAfter || startsAfterEndsBefore);
        });

        if(hasTimeConflict) return toast.error('Conflito de horários!');

        await enrollActivity(userData.token, activityId);
        const newEnrollData = [...enrolledActivities];
        newEnrollData.push(activity);
        
        setEnrolled(true);
        setEnrolledActivities(newEnrollData);
        toast('Inscrição Realizada');
        return;
      }
      
      await unenrollActivity(userData.token, activityId);
      const newEnrollData = enrolledActivities.filter(a => a.id !== activityId);
  
      setEnrolled(false);
      setEnrolledActivities(newEnrollData);
      toast('Inscrição Desfeita');
    } catch (error) {
      
    }
  }
  return(
    <AuditoriumActivities height = {height} enrolled =  { enrolled }>
      <ActivityData>
        <ActivityTitle>{activity.name}</ActivityTitle>
        <ActivityTime>{startTime} - {endTime}</ActivityTime>
      </ActivityData>
      <EntryButton 
        disabled={ !(capacity > 0) } 
        onClick={() => handleActivityEnroll(activity.id)}
        enrolled =  { enrolled }
      >{enrolled ? <><ConfirmedIcon/>Inscrito</> : capacity > 0 ? <><EntryDoorIcon/>{`\n${capacity} vagas` }</> : <><FullfilledIcon/>Esgotado</>}</EntryButton>
    </AuditoriumActivities>
  );
}
