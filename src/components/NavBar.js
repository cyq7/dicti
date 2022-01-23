import React from 'react';
import {
    Link
} from "react-router-dom";
import { RiHomeLine } from 'react-icons/ri'
import { GoSettings } from 'react-icons/go'
import { MdQueryStats } from 'react-icons/md'
import './styles/NavBar.scss'

export default function NavBar({onHomeClick}) {
    return (
        <ul className="nav-bar">
            <li className="statistics">
                <Link to="stats"><MdQueryStats/></Link>
            </li>
            <li onClick={onHomeClick} className="home">
                <Link to="/"><RiHomeLine/></Link>
            </li>
            <li className="settings">
                <Link to="settings"><GoSettings/></Link>
            </li>
        </ul>
    )
}