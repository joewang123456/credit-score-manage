import React from 'react';
import * as style from './index.scss';

export default (sectionID, rowID) => (
    <div key={`${sectionID}-${rowID}`} className={style.separator} />
);