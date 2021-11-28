import React, {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GrClose } from 'react-icons/gr'
import Notification from './Notification'
import './styles/FlipCardForm.scss'


export default function FlipCardForm({currentDefinitions, word, displayForm, handleClose, resetActiveWord}) {
    const [flipCards, setFlipCards] = useState([]);
    const [chosenDefinition, setChosenDefinition] = useState('');
    const [errorOccured, setErrorOccurred] = useState('');
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

    if (errorOccured) {
        setTimeout(() => {
            setErrorOccurred('');
        }, 4000)
    }

    function addFlipCard(e) {
        e.preventDefault();
        let definition = textAreaRef.current.innerText.replace(/(\r\n|\n|\r)/gm, "");
        setFlipCards(prevFlipCards => {
            return [...prevFlipCards, {
                id: uuidv4(),
                name: word,
                definition: definition
            }]
        })
        handleClose()
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        let definition = textAreaRef.current.innerText.replace(/(\r\n|\n|\r)/gm, "");
        if (definition.length > 200 ) {
            setErrorOccurred('Definition can contain only 200 characters');
        } else if (definition.length < 1){
            setErrorOccurred('Specify definition of the word');
        } else {
            await addFlipCard(e);
            resetActiveWord();
        }
    }

    if(displayForm) {
        return (
            <div className="flip-card-container">
                <form onSubmit={handleAdd} className="flip-card-form">
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
                    <button type="submit" className="add">Add flip card</button>
                    <GrClose onClick={handleClose} className="cancel" />
                </form>
                {errorOccured !== '' ? 
                    <Notification 
                        message={errorOccured}
                    /> 
                : null}
            </div>
        )
    } else { 
        return null
    }

}