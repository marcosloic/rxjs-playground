import { ApiData } from '../types/ApiData.interface';

export const filterArrayOnParameters = (
    dataArray: ApiData[],
    parameters: { [k: string]: string }
): ApiData[] => {
    const parametersArray = Object.entries(parameters);

    return dataArray.filter(entry => {
        const isValid = parametersArray.reduce((acc, val) => {
            const [key, filterVal] = val;
            const target = entry[key];
            if (Array.isArray(target)) {
                return acc && target.indexOf(filterVal) !== -1;
            }
            return acc && entry[key] === filterVal;
        }, true);
        return isValid;
    });
};
