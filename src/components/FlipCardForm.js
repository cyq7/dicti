import React, {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GrClose } from 'react-icons/gr'
import './styles/FlipCardForm.scss'


export default function FlipCardForm({currentDefinitions, word, displayForm, handleClose, resetActiveWord}) {
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
        let definition = textAreaRef.current.innerText;
        if (definition.length < 200) {
            await addFlipCard(e);
            resetActiveWord();
        } else if (definition.length === 0){
            alert('Definition cannot be empty')
        } else {
            alert('Definition can contain only 300 characters')
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
            </div>
        )
    } else { 
        return null
    }

}