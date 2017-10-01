import React from 'react';
import ImageArea from './ImageArea';

class FlowArea extends React.Component {
    render() {
        return (
            <div>
                <ImageArea id="area_1" />
                <ImageArea id="area_2" />
                <ImageArea id="area_3" />
            </div>
        );
    }
}

export default FlowArea;