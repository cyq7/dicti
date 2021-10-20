import React from 'react';
import { RiHomeLine } from 'react-icons/ri'
import { GoSettings } from 'react-icons/go'
import { MdQueryStats } from 'react-icons/md'
import './styles/NavBar.scss'

export default function NavBar({onHomeClick}) {
    return (
        <ul className="nav-bar">
            <li className="statistics"><MdQueryStats/></li>
            <li onClick={onHomeClick} className="gome"><RiHomeLine/></li>
            <li className="settings"><GoSettings/></li>
        </ul>
    )
}