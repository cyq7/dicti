import React, {useState, useEffect} from 'react';
import FlipCard from './FlipCard'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import './styles/FlipCards.scss'

export default function FlipCards({isActive}) {
    const [flipCards, setFlipCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [dropArea, setDropArea] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

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
        let isTouchEvent = e.type === "touchstart" ? true : false;

        let card = e.target;
        let offsetX = 0;
        let offsetY = 0;
        let initialX= isTouchEvent ? e.touches[0].clientX : e.clientX;
        let initialY = isTouchEvent ? e.touches[0].clientY: e.clientY;
        
        document.onmousemove = onPointerMove;
        document.onmouseup = onPointerEnd;
        document.ontouchmove = onPointerMove;
        document.ontouchend = onPointerEnd;

        function onPointerMove(e) {
            offsetX = (isTouchEvent ? e.touches[0].clientX : e.clientX) - initialX;
            card.style.left = offsetX + "px";
            offsetY = (isTouchEvent ? e.touches[0].clientY : e.clientY) - initialY;
            card.style.top = offsetY + "px";

            if (offsetX <= -100 && offsetY < 50) {
                slideRight();
                document.onmousemove = null;
                document.ontouchmove = null;
                card.style.left = 0;
                card.style.top = 0;
                return;
            }

            if (offsetX >= 100 && offsetY < 50) {
                slideLeft();
                document.onmousemove = null;
                document.ontouchmove = null;
                card.style.left = 0;
                card.style.top = 0;
                return;
            }

            if (offsetY > 120) {
                setDropArea(true);
                if (offsetY > 200 && offsetY < 400 && offsetX < -50 && offsetX > -300) {
                    setShowCheck(true);
                } else {
                    setShowCheck(false);
                }
                if (offsetY > 200 && offsetY < 400 && offsetX > 50 && offsetX < 300) {
                    setShowDelete(true);
                } else {
                    setShowDelete(false);
                }
            } else {
                setDropArea(false);
            }
        }

        function onPointerEnd(e) {
            e.preventDefault();

            if(offsetY > 200 && offsetX < -60) {
                console.log("check");
            } else if (offsetY > 200 && offsetX > 60) {
                console.log("delete");
            } else {
                card.style.left = 0
                card.style.top = 0;
            }
            setDropArea(false);

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
                <div 
                    style={dropArea ? null : {visibility: "hidden"}} 
                    className={showCheck ? "target save active" : "target save"}></div>
                <div 
                    style={dropArea ? null : {visibility: "hidden"}} 
                    className={showDelete ? "target delete active" : "target delete"}></div>
            </div>
        </div>
    )
}