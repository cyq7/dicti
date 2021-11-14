import React, {useState, useEffect, useRef} from 'react';
import uuidv4 from  'uuid/v4'
import './styles/FlipCardForm.scss'


export default function FlipCardForm({currentDefinitions, word, displayForm, handleClose}) {
    const [flipCards, setFlipCards] = useState([]);
    const [chosenDefinition, setChosenDefinition] = useState('');
    const textAreaRef = useRef();

    const LOCAL_STORAGE_KEY = 'learning.flipCards'

    useEffect(() => {
        setChosenDefinition(currentDefinitions[0])
    }, [currentDefinitions])

    function handleChange(e) {
        setChosenDefinition(e.target.value);
    }

    useEffect(()=> {
        const storedFlipCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedFlipCards) setFlipCards(storedFlipCards)
    }, []);

    useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flipCards))
    }, [flipCards])

    function addFlipCard(e) {
        e.preventDefault();
        let definition = textAreaRef.current.innerText.replace(/(\r\n|\n|\r)/gm, "");
        setFlipCards(prevFlipCards => {
            return [...prevFlipCards, {id: uuidv4(), name: word, definition: definition}]
        })
        handleClose();
    }

    if(displayForm) {
        return (
            <div className="flip-card-container">
                <button onClick={handleClose} className='close'>X</button>
                <form onSubmit={addFlipCard} className="flip-card-form">
                    <span>{word}</span>
                    <p>Specify word definition</p>
                    <div className="select-wrapper">
                        <select onChange={handleChange} className="select">
                            {currentDefinitions.map(def => {
                                return (
                                    <option className="select-option" key={def}>{def}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="editableContent" contentEditable suppressContentEditableWarning ref={textAreaRef}>{chosenDefinition}</div>
                    <button type="submit">Add flip card</button>
                </form>
            </div>
        )
    } else { 
        return null
    }

}