import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const logo = () => (
    <div className="d-inline-flex">
        <FontAwesomeIcon icon="umbrella" size="2x" className="text-primary"/>
        <div className="ml-3">
            <h2 className="mb-0 font-weight-bold">Fake Umbrella</h2>
            <small>"We Keep You Dry"</small>
        </div>
    </div>
)

export default logo;
