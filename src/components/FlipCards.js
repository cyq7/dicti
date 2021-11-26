import React, {useState, useEffect} from 'react';
import FlipCard from './FlipCard'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import './styles/FlipCards.scss'

export default function FlipCards({isActive}) {
    const [flipCards, setFlipCards] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const storedFlipCards = JSON.parse(localStorage.getItem('learning.flipCards'))
        if (storedFlipCards) setFlipCards(storedFlipCards)
    }, [isActive]);

    const newUserHeader = "Learn new words by flipping dicti cards. Search for a word definition and create your first dicti!"
    const header = "Your flip cards"
    const numberOfCards = flipCards.length;

    const slideLeft = () => {
        if(index - 1 >= 0) {
            setIndex(index - 1);
        }
    }

    const slideRight = () => {
        if(index + 1 <= numberOfCards - 1) {
            setIndex(index + 1)
        }
    }

    return (
        <div style={isActive !== "" ? {display: 'none'} : {display: "flex"}} className="flip-cards">
            <h3>{flipCards[0] ? header : newUserHeader}</h3>
            <div className='carousel'>
                <BsChevronCompactLeft 
                    className="carousel-arrow left"
                    onClick={slideLeft}
                />
                <ul className="cards">{flipCards.map((flipCard, n) => {
                    let position = n > index ? "next-card" : n === index ? "active-card" : "prev-card";
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
                <BsChevronCompactRight 
                    className="carousel-arrow right"
                    onClick={slideRight}
                />
            </div>
            <p>{flipCards[0] ? `3/${numberOfCards}` : ""}</p>
        </div>
    )
}