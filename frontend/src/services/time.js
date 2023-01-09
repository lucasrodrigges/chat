import moment from 'moment';

export const getInterval = (date) => moment(date).fromNow(true);
