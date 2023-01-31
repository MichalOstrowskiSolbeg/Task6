export function getFormattedDateTime(dateSource) {
    return dateSource.replace('T', ' ').split('.')[0].slice(0, -3).toString();
}

export function getFormattedDate(dateSource) {
    return dateSource.split('T')[0].toString();
}