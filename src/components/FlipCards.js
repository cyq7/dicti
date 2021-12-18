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

    const handleMouseDown = (e) => {
        e.preventDefault();
        let card = e.target;
        let offset = 0;
        let initialX = e.clientX;
        let initialY = e.clientY;
        
        document.onmousemove = onMouseMove;
        document.onmouseup = onMouseUp;

        function onMouseMove(e) {
            offset = e.clientX - initialX;
            card.style.left = offset + "px";

            if(offset <= -120) {
                slideRight();
                document.onmousemove = null;
                if (index === numberOfCards.length - 1) {
                    card.style.left = 0;
                } else {
                    setTimeout(() => {
                        card.style.left = 0;
                    }, 500);
                }
                return;
            }

            if(offset >= 120) {
                slideLeft();
                document.onmousemove = null;
                if (index === 0) {
                    card.style.left = 0;
                } else {
                    card.style.left=0;
                }
                return;
            }
        }

        function onMouseUp(e) {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }



    return (
        <div
            className = "flip-cards"
            style = {isActive !== "" ? {display: 'none'} : {display: "flex"}}>
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
                            handleMouseDown={handleMouseDown}
                        />
                    )
                })}
                </ul>
                <BsChevronCompactRight 
                    className="carousel-arrow right"
                    onClick={slideRight}
                />
            </div>
            <p>{flipCards[0] ? `${index+1}/${numberOfCards}` : ""}</p>
            <div className="target-wrapper">
                <div className="target save"></div>
                <div className="target delete"></div>
            </div>
        </div>
    )
}