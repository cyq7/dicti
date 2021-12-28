import React, { useState } from 'react';
import './styles/FlipCard.scss'

export default function FlipCard({id, name, definition, handlePointerEvent, position, label}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const cardClass = `flip-card-inner ${label}`

    return (
        <article className={position}>
            <div
            onClick={() => setIsFlipped(!isFlipped)} className={isFlipped ? `flip-card flip` : `flip-card`}
            onMouseDown={handlePointerEvent}
            onTouchStart={handlePointerEvent}
            >
            <div id={id} className={cardClass}>
                <div className="flip-card-front">
                    <span>{name}</span>
                </div>
                <div className="flip-card-back">
                    <p>{definition}</p>
                </div>
            </div>
        </div>
        </article>
    )
}