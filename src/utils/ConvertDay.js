import moment from 'moment';
export const MonthDay = (value) => {
    let day = moment(value);
    return day.format('DD/MM');
};
