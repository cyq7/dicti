import React, {useState, useEffect} from 'react';
import './styles/FlipCardForm.scss'

export default function FlipCardForm({currentDefinitions, word, displayForm, handleClose}) {
    const [chosenDefinition, setChosenDefinition] = useState('');

    useEffect(() => {
        setChosenDefinition(currentDefinitions[0])
    }, [currentDefinitions])

    function handleChange(e) {
        setChosenDefinition(e.target.value);
    }

    console.log(chosenDefinition)

    function addFlipCard(e) {
        e.preventDefault();
        console.log('works');
    }

    if(displayForm) {
        return (
            <div className="flip-card-container">
                <button onClick={handleClose} className='close'>X</button>
                <form onSubmit={addFlipCard} className="flip-card-form">
                    <span>{word}</span>
                    <p>Definition</p>
                    <div className="select-wrapper">
                        <select onChange={handleChange} className="select">
                            {currentDefinitions.map(def => {
                                return (
                                    <option className="select-option" key={def}>{def}</option>
                                )
                            })}
                        </select>
                    </div>

                    <textarea maxLength="200" defaultValue={chosenDefinition}></textarea>
                    <button type="submit">Add flip card</button>
                </form>
            </div>
        )
    } else { 
        return null
    }

}