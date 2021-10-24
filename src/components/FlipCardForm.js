import React from 'react';
import './styles/FlipCardForm.scss'

export default function FlipCardForm({currentDefinitions, word, displayForm, handleClose}) {
    if(displayForm) {
        return (
            <div className="flip-card-container">
                <button onClick={handleClose} className='close'>X</button>
                <div className="flip-card-form">
                    <span>{word}</span>
                    <p>Definition</p>
                    <select> 
                        {currentDefinitions.map(def => {
                            return (
                                <option className="select-option" key={def}>{def}</option>
                            )
                        })}
                    </select>
                    <button>Add flip card</button>
                </div>
            </div>
        )
    } else { 
        return null
    }

}