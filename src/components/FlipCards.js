import React from 'react';
import FlipCard from './FlipCard'
import './styles/FlipCards.scss'

export default function FlipCards({isActive}) {
    return (
        <div style={isActive !== "" ? {display: 'none'} : {display: "flex"}} className="flip-cards">
            <h3>Your flip cards</h3>
            <ul>
                <FlipCard 
                    name="title"
                    definition="some kind of bullshit"
                />
            </ul>
            <p>3/15</p>
        </div>
    )
}