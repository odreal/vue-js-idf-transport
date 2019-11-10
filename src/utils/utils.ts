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
    const hours = dateValue.getHours().toString().length > 1 ? '' + dateValue.getHours() : '0' + dateValue.getHours();
    const minutes = dateValue.getMinutes().toString().length > 1 ? '' + dateValue.getMinutes() : '0' + dateValue.getMinutes();
    const tmpObject = {dateValue: dateValue, stringifiedDate: stringifiedDate, hours: hours, minutes: minutes};
    return tmpObject;
}

export function getStoredJourneys(): Journey[] {
    const tmpStorage = localStorage.getItem('journeys');
    return tmpStorage ? JSON.parse(tmpStorage) : [];
}
