import moment from 'moment';

export const TimeDay = (timeValue) => {
    const time = moment(timeValue);
    const now = moment();

    const diffMinutes = now.diff(time, 'minutes');
    const diffDays = now.diff(time, 'days');
    const diffHours = now.diff(time, 'hours');
    const diffWeeks = now.diff(time, 'weeks');

    if (diffMinutes < 1) {
        return 'Just now'; // Dưới 1 phút
    } else if (diffMinutes < 60) {
        return `${diffMinutes}m ago`; // Dưới 1 giờ, hiển thị số phút
    } else if (diffHours < 24) {
        return `${diffHours}h ago`; // Dưới 1 ngày, hiển thị số giờ
    } else if (diffDays < 7) {
        return `${diffDays}d ago`; // Dưới 1 tuần, hiển thị số ngày
    } else {
        return `${diffWeeks}w ago`; // Trên 1 tuần, hiển thị số tuần
    }
};
