import React, { useState } from 'react';
import './styles/FlipCard.scss'

export default function FlipCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div onClick={() => setIsFlipped(!isFlipped)} className={isFlipped ? `flip-card flip ${props.cardStyle}` : `flip-card ${props.cardStyle}`}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <span>{props.name}</span>
                </div>
                <div className="flip-card-back">
                    <p>{props.definition}</p>
                </div>
            </div>
        </div>
    )
}