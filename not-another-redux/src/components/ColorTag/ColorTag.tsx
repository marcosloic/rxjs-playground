import React from 'react';
import './styles.scss';

type ColorTagPropTypes = {
    color: string;
};

export const ColorTag: React.FunctionComponent<ColorTagPropTypes> = React.memo(
    props => {
        const { color } = props;
        const style = {
            backgroundColor: color
        };
        return <span className="colorTag" style={style} />;
    }
);

ColorTag.displayName = 'ColorTag';
