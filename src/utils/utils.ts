import Journey from '@/models/journey';

export function getRandomId(): number {
    return parseInt(
        Math.random()
        .toString()
        .substring(2, 12),
        10,
    );
}

export function parseDate(dateISO: string): object {
    const arrayDateISO = dateISO.split('');
    arrayDateISO.splice( 4, 0, '-');
    arrayDateISO.splice( 7, 0, '-');
    arrayDateISO.splice( 13, 0, ':');
    arrayDateISO.splice( 16, 0, ':');
    dateISO = arrayDateISO.join('');
    const dateValue = new Date(dateISO);
    const stringifiedDate = dateValue.getDate() + '/' + dateValue.getMonth() + '/' + dateValue.getFullYear();
    let hours = '';
    if (dateValue.getHours().toString().length > 1) {
        hours = '' + dateValue.getHours();
    } else {
        hours = '0' + dateValue.getHours();
    }

    let minutes = '';
    if (dateValue.getMinutes().toString().length > 1) {
        minutes = '' + dateValue.getMinutes();
    } else {
        minutes = '0' + dateValue.getMinutes();
    }
    const tmpObject = {dateValue, stringifiedDate, hours, minutes};

    return tmpObject;
}

export function getStoredJourneys(): Journey[] {
    const tmpStorage = localStorage.getItem('journeys');
    return tmpStorage ? JSON.parse(tmpStorage) : [];
}
