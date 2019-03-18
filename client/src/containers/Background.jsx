import React from 'react';
import './background.css';

const Background = (props) =>{
    return (
        <div className='backgroundImg'>
            {props.children}
        </div>
    );
}

export default Background;