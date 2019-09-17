// Can be tripped up by Date objects without the constructor check
// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object

export const isEmptyObject = obj =>
    Object.entries(obj).length === 0 && obj.constructor === Object;
