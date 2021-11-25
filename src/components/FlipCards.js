import React, {useState, useEffect} from 'react';
import FlipCard from './FlipCard'
import './styles/FlipCards.scss'

export default function FlipCards({isActive}) {
    const [flipCards, setFlipCards] = useState([]);

    useEffect(() => {
        const storedFlipCards = JSON.parse(localStorage.getItem('learning.flipCards'))
        if (storedFlipCards) setFlipCards(storedFlipCards)
    }, [isActive]);

    const newUserHeader = "Learn new words by flipping dicti cards. Search for a word definition and create your first dicti!"
    const header = "Your flip cards"
    const numberOfCards = flipCards.length;

    return (
        <div style={isActive !== "" ? {display: 'none'} : {display: "flex"}} className="flip-cards">
            <h3>{flipCards[0] ? header : newUserHeader}</h3>
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
            <p>{flipCards[0] ? `3/${numberOfCards}` : ""}</p>
        </div>
    )
}