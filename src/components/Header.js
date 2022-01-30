import React from 'react';
import './styles/Header.scss'

export default function Header({title}) {
    return (
        <div className="header">
            <h1 className="logo">
                {title}
            </h1>
        </div>
    )
}