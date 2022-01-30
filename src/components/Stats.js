import React from 'react';
import './styles/Stats.scss';

export default function Stats() {

    const LOCAL_STORAGE_KEY = 'learning.flipCards'
    const storedFlipCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const savedCards = storedFlipCards
        .filter(card => card.learned)
        .sort((a, b) => a.name.localeCompare(b.name))
    const easyCards = storedFlipCards.filter(card => card.level === "easy")
    const mediumCards = storedFlipCards.filter(card => card.level === "medium")
    const hardCards = storedFlipCards.filter(card => card.level === "hard")

    return (
        <div className='container'>
            <h2>Achievements</h2>
            <div className="achievements">
                <div className="tile">
                    <div className="chart"></div>
                    You have learned {savedCards.length} new words. Gratz!
                </div>
                <div div className="tile" >
                    <div className="chart"></div>
                    <li>
                        {easyCards.length} easy {easyCards.length === 1 ? "card" : "cards"}
                    </li>
                    <li>
                        {mediumCards.length} medium {mediumCards.length === 1 ? "card" : "cards"}
                    </li>
                    <li>
                        {hardCards.length} hard {hardCards.length === 1 ? "card" : "cards"}
                    </li>
                </div>
            </div>
            <div className = "wordsList" >
               <ul className = "tile">
               <h2>All learned words:</h2>
                {savedCards.map(card => {
                    return (
                        <li key={card.id}>
                            <span>{card.name}</span> - {card.definition}
                        </li>
                    )
                })}
                </ul>
            </div>
        </div>
    )
}