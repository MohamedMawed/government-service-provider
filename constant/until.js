

export const convertDate = (date) => {
  if (date) {
    const convertTo = new Date(date.replace(' ', 'T'));
    const newFormat = convertTo.toString().split(' ');
    const getTime = date.split(' ')[1];
    const time = `${getTime.split(':')[0]}:${getTime.split(':')[1]}`;
    const timing = getTime.split(':')[0] < 12 ? 'AM' : 'PM';
    return { date: `${newFormat[0]}, ${newFormat[1]} ${newFormat[2]}`, time, timing };
  }
  return { date: '', time: '', timing: '' };
};
