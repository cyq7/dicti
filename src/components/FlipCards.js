import React, {useState, useEffect} from 'react';
import FlipCard from './FlipCard'
import {
    BsChevronCompactLeft,
    BsChevronCompactRight,
    BsTrash,
    BsCheck2
} from 'react-icons/bs'
import './styles/FlipCards.scss'

export default function FlipCards({isActive}) {
    const [flipCards, setFlipCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [dropArea, setDropArea] = useState(false);
    const [cardOption, setCardOption] = useState('');

    const LOCAL_STORAGE_KEY = 'learning.flipCards'
    const storedFlipCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const cardsToLearn = flipCards.filter(card => !card.learned)
    const savedCards = flipCards.filter(card => card.learned);

    useEffect(() => {
        setFlipCards(storedFlipCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flipCards))
    }, [flipCards])

    const newUserHeader = "Learn new words by flipping dicti cards. Search for a word definition and create your first dicti!"
    const header = "Your flip cards"
    const numberOfCards = cardsToLearn.length;

    function removeCard(id) {
        const newCards = flipCards.filter(card => card.id !== id);
        setFlipCards(newCards)
    }

    function saveCard(id) {
        const newCards = [...flipCards]
        const selectedCard = newCards.find(card => card.id === id);
        selectedCard.learned = !selectedCard.learned;
        setFlipCards(newCards);
    }
 
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

            if (offsetY > 80) {
                setDropArea(true);
                if (offsetY > 130 && offsetY < 500 && offsetX < -50 && offsetX > -500) {
                    setCardOption('save');
                }
                if(offsetY > 130 && offsetY < 500 && offsetX > 50 && offsetX < 500) {
                    setCardOption('delete');
                }
            } else {
                setCardOption('');
                setDropArea(false);
            }
        }

        function onPointerEnd(e) {
            const selectedCardID = e.target.id
            if(offsetY > 200 && offsetX < -60) {
                saveCard(selectedCardID);
            } else if (offsetY > 200 && offsetX > 60) {
                removeCard(selectedCardID);
            } else {
                card.style.left = 0
                card.style.top = 0;
            }
            setCardOption("");
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
            style = {isActive !== "" ? {display: 'none'} : {display: "flex"}}
            >
            <h3>{cardsToLearn[0] ? header : newUserHeader}</h3>
            <div className='carousel'>
                <BsChevronCompactLeft 
                    className="carousel-arrow left"
                    onClick={slideLeft}
                />
                <ul className="cards">{cardsToLearn.map((flipCard, n) => {
                    let position = n > index ? "next-card" : n === index ? "active-card" : "prev-card";
                    let label = cardOption === 'save' ? "save-label" : cardOption === 'delete' ? "delete-label" : "";
                    return (
                        <FlipCard 
                            key={flipCard.id}
                            id={flipCard.id}
                            name={flipCard.name}
                            definition={flipCard.definition}
                            position={position}
                            label={label}
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
            <p>{cardsToLearn[0] ? `${index+1}/${numberOfCards}` : ""}</p>
            <div className="target-wrapper">
                <div 
                    style={dropArea ? null : {visibility: "hidden"}} 
                    className={cardOption === 'save' ? "target save active" : "target save"}>
                    <BsCheck2 className = "icon icon-check" />
                    </div>
                <div 
                    style={dropArea ? null : {visibility: "hidden"}} 
                    className={cardOption === 'delete' ? "target delete active" : "target delete"}>
                    <BsTrash className="icon icon-trash" />
                    </div>
            </div>
            <ul>
            {savedCards.map(card => {
                return (
                    <li>
                        <span>{card.name}</span> - {card.definition}
                    </li>
                )
            })}
            </ul>
        </div>
    )
}