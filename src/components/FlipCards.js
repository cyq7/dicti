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

    const onPointerEvent = (e) => {
        e.preventDefault();

        let isTouchEvent = e.type === "touchstart" ? true : false;

        let card = e.target;
        let offset = 0;
        let initialX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        let initialY = isTouchEvent ? e.touches[0].clientY : e.clientY;
        
        document.onmousemove = onPointerMove;
        document.onmouseup = onPointerEnd;
        document.ontouchmove = onPointerMove;
        document.ontouchend = onPointerEnd;

        function onPointerMove(e) {
            offset = (isTouchEvent ? e.touches[0].clientX : e.clientX) - initialX;
            card.style.left = offset + "px";

            if(offset <= -100) {
                slideRight();
                document.onmousemove = null;
                document.ontouchmove = null;
                if (index === numberOfCards.length - 1) {
                    card.style.left = 0;
                } else {
                    card.style.left = 0;
                }
                return;
            }

            if(offset >= 100) {
                slideLeft();
                document.onmousemove = null;
                document.ontouchmove = null;
                if (index === 0) {
                    card.style.left = 0;
                } else {
                    card.style.left=0;
                }
                return;
            }
        }

        function onPointerEnd(e) {
            if(offset < 0 && offset > -100) {
                e.preventDefault();
                card.style.left = 0;
            }
            if(offset > 0 && offset < 100) {
                e.preventDefault();
                card.style.left = 0;
            }
            document.onmousemove = null;
            document.onmouseup = null;
            document.ontouchmove = null;
            document.ontouchend = null;
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
                            handlePointerEvent={onPointerEvent}
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