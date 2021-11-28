import React from 'react';
import './styles/Notification.scss';

export default function Notification({message}) {
    return (<div className='notification'>
        {message}
    </div>)
}