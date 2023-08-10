export function formatAuditoriumsActivities(activities) {
  const auditoriumsListHash = {};
  activities.forEach((a) => {
    const auditoriumName = a.Auditorium.name;
    if(auditoriumsListHash[auditoriumName] === undefined) {
      auditoriumsListHash[auditoriumName] = [];
    }
    
    auditoriumsListHash[auditoriumName].push(a);
  });
  const auditoriumsListArr = Object.keys(auditoriumsListHash);
  const auditoriums = auditoriumsListArr.map( a => {
    return { name: a, activities: auditoriumsListHash[a] };
  });

  return { auditoriums };
}
