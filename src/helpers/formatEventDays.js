import dayjs from 'dayjs';

export function fortmatEventDays(auditoriums) {
  const hashDates = {};
  auditoriums.forEach(({ Activity }) => {
    Activity.forEach((activity) => {
      const inputDate = activity.startTime;
      const formattedDate = dayjs(inputDate).format('dddd, DD/MM');
      if(hashDates[formattedDate] === undefined) {
        hashDates[formattedDate] = [];
      };

      hashDates[formattedDate].push(activity);
    });
  });

  const daysList = Object.keys(hashDates);

  return { hashDates, daysList };
}
