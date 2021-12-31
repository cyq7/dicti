import React from 'react';
import './styles/Stats.scss';

export default function Stats() {

    const LOCAL_STORAGE_KEY = 'learning.flipCards'
    const storedFlipCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const savedCards = storedFlipCards.filter(card => card.learned)

    return (
        <div className='container'>
            <ul>
            {savedCards.map(card => {
                return (
                    <li key={card.id}>
                        <span>{card.name}</span> - {card.definition}
                    </li>
                )
            })}
            </ul>
        </div>
    )
}