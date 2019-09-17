import React from 'react';
import { ApiData } from '../../types/ApiData.interface';
import './styles.scss';
import { ColorTag } from '../ColorTag/ColorTag';

type VehiclePropTypes = {
    details: ApiData;
};

export const Vehicle: React.FunctionComponent<VehiclePropTypes> = React.memo(
    props => {
        const { details } = props;
        const { brand, type, colors, img } = details;
        return (
            <article className={'vehicle'}>
                <img src={img} alt={brand} />
                <div className={'content'}>
                    <p>
                        <b>Brand:</b> {brand}
                    </p>
                    <p>
                        <b>Type:</b> {type}
                    </p>
                    <p>
                        <b>Available in:</b>{' '}
                        {colors &&
                            colors
                                .sort()
                                .map(color => (
                                    <ColorTag key={color} color={color} />
                                ))}
                    </p>
                </div>
            </article>
        );
    }
);

Vehicle.displayName = 'Vehicle';
