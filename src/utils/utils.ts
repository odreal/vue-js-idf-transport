export function getRandomId(): number {
    return parseInt(
        Math.random()
        .toString()
        .substring(2, 12),
        10,
    );
}

export function parseDate(dateISO: string): string {
    const arrayDateISO = dateISO.split('');
    arrayDateISO.splice( 4, 0, '-');
    arrayDateISO.splice( 7, 0, '-');
    arrayDateISO.splice( 13, 0, ':');
    arrayDateISO.splice( 16, 0, ':');
    dateISO = arrayDateISO.join('');
    return dateISO;
}
