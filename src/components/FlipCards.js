import React, {useState, useEffect} from 'react';
import FlipCard from './FlipCard'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
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
            <div className='carousel'>
                <BiChevronLeft className="carousel-arrow left"/>
                <ul className="cards">{flipCards.map((flipCard, index) => {
                    let position = index > 0 ? "next-card" : index === 0 ? "active-card" : "prev-card";
                    return (
                        <FlipCard 
                            key={flipCard.id}
                            id={flipCard.id}
                            name={flipCard.name}
                            definition={flipCard.definition}
                            cardStyle={position}
                        />
                    )
                })}
                </ul>
                <BiChevronRight className="carousel-arrow right"/>
            </div>
            <p>{flipCards[0] ? `3/${numberOfCards}` : ""}</p>
        </div>
    )
}