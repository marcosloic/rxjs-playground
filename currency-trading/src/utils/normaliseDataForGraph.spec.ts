import { normaliseDataForGraph } from './normaliseDataForGraph';

describe('The normaliseDataForGraph function', () => {
    it('Converts the series data from the API into a GraphData array', () => {
        const seed: any = {
            series: {
                a: { close: 'a' },
                b: { close: 'b' },
                c: { close: 'c' }
            }
        };
        const result = normaliseDataForGraph(seed);
        expect(result).toEqual([
            { x: 1, y: 'a' },
            { x: 2, y: 'b' },
            { x: 3, y: 'c' }
        ]);
    });
});
