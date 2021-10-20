import React from 'react';
import './styles/FlipCard.scss'

export default function FlipCard() {
    return (
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <span>Title</span>
                </div>
                <div class="flip-card-back">
                    <p>Definition of the word, meaning, etc. Translation will be implemented soon.</p>
                </div>
            </div>
        </div>
    )
}