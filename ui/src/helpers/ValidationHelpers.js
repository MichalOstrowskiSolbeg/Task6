export function checkTextRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length >= max) {
        return false;
    }
    return length >= min;
}

export function ValidateEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(value);
}