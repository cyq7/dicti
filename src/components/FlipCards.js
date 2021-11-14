import React, {useState, useEffect} from 'react';
import FlipCard from './FlipCard'
import './styles/FlipCards.scss'

export default function FlipCards({isActive}) {
    const [flipCards, setFlipCards] = useState([]);

    useEffect(() => {
        const storedFlipCards = JSON.parse(localStorage.getItem('learning.flipCards'))
        if (storedFlipCards) setFlipCards(storedFlipCards)
    }, [isActive]);

    return (
        <div style={isActive !== "" ? {display: 'none'} : {display: "flex"}} className="flip-cards">
            <h3>Your flip cards</h3>
            <ul>{flipCards.map(flipCard => {
                return (
                    <FlipCard 
                        id={flipCard.id}
                        name={flipCard.name}
                        definition={flipCard.definition}
                    />
                )
            })}
            </ul>
            <p>3/15</p>
        </div>
    )
}