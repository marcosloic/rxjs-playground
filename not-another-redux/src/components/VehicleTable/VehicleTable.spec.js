import React from 'react';
import TestRenderer from 'react-test-renderer';
import { VehicleTable } from './VehicleTable';
import { useObservable } from '../../utils/useObservable';

jest.mock('../../utils/useObservable');

const tableData = [{ id: 1 }, { id: 2 }];
// Not the most exciting tests but these have no logic at all
describe('The Vehicle component', () => {
    beforeEach(() => {
        useObservable.mockReturnValue(tableData);
    });
    it('Matches the snapshot', () => {
        const vehicleTable = TestRenderer.create(<VehicleTable />);
        expect(vehicleTable.toJSON()).toMatchSnapshot();
    });

    it('Renders vehicles data', () => {
        const vehicleTable = TestRenderer.create(<VehicleTable />).toJSON();

        expect(vehicleTable.children.length).toBe(tableData.length);
    });
});
