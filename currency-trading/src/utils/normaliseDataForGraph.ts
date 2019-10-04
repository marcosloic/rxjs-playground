import { DailyTimeSeries } from '../types/DailyTimeSeries';

export type GraphData = {
    x: number;
    y: string;
};
export const normaliseDataForGraph = (data: DailyTimeSeries): GraphData[] => {
    const target = Object.entries(data.series);
    const lastMonth = target.splice(0, 29);
    return lastMonth.reduce(
        (acc, val, idx) => {
            const [, value] = val;
            const res = { x: idx + 1, y: value.close };
            acc.push(res);
            return acc;
        },
        [] as GraphData[]
    );
};
