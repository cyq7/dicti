import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import {AiOutlineAudio} from 'react-icons/ai'
import {VscDiffAdded} from 'react-icons/vsc'
import FlipCardForm from './FlipCardForm';
import './styles/WordDetails.scss'

export default function WordDetails({details, handleSearch, resetActiveWord}) {
    const [currentWord, setCurrentWord] = useState('');
    const [currentDefinitions, setCurrentDefintions] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);

    let definitions = [];

    function handleClick(e) {
        setCurrentWord(e.target.previousSibling.firstChild.innerHTML);
        setCurrentDefintions(definitions);
        setDisplayForm(true);
        return definitions = [];
    }

    function closeForm() {
        setDisplayForm(false);
    }

    function playAudio(e) {
        const audio = new Audio(e);
        audio.play();
    }

    if (details !== "") {
        const definitionsList = details.map(word => {
        const title = word.word;
        const meanings = word.meanings
        const phonetics = word.phonetics;

        const singleMeaning = meanings.map(item => {
            const partOfSpeech = item.partOfSpeech;
             return item.definitions.map(el => {
                 const definition = el.definition.replace(/\.$/, "");
                 const example = el.example ? el.example.charAt(0).toUpperCase() + el.example.slice(1) : null;
                 const synonyms = el.synonyms.map(synonym => {
                     return <li onClick={(event) => handleSearch(event.target.innerHTML)} key={synonym} className="list-item">{synonym} </li>
                 })
                 const antonyms = el.antonyms.map(antonym => {
                     return <li onClick={(event) => handleSearch(event.target.innerHTML)} key={antonym} className="list-item"> {antonym} </li>
                 })

                 definitions.push(definition);

                 return (
                     <li key={definition} className="meaning">
                        <div className="meaning-section part-of-speech">{partOfSpeech}</div>
                         <div className=" meaning-section definition">{definition}</div>
                         <div className="meaning-section example">{example}</div>
                         {synonyms.length > 0 ? 
                            <ul className = "meaning-section" >
                                <h4>Synonyms</h4>
                                <div className='synonyms-wrap'>{synonyms}</div>
                            </ul> : null
                         }
                        {antonyms.length > 0 ? 
                            <ul className = "meaning-section" >
                                <h4>Antonyms</h4>
                                <div className='synonyms-wrap'>{antonyms}</div>
                            </ul> : null
                         }
                     </li>
                 )
             })
        });

        return (
            <div key={`${title} ${uuidv4()}`} className="definitions">
                <div className="word-label">
                    <button 
                        onClick={() => {playAudio(phonetics[0].audio)}} 
                        className="audio">
                        {phonetics[0].audio ? <AiOutlineAudio className='icon'/> : null}
                    </button>
                    <div>
                        <h2>{title}</h2>
                        <p className="phonetic">- {phonetics.length > 0 ? phonetics[0].text : null} -</p>
                    </div>
                    <button onClick={handleClick} className = "open-card-form-btn" > <VscDiffAdded className='icon'/></button>
                </div>
                <ul className="definitions">
                    {singleMeaning}
                </ul>
            </div>
        )
        })

        return (
            <div className="word-details">
                {definitionsList}
                <FlipCardForm
                    word={currentWord}
                    currentDefinitions = {currentDefinitions}
                    displayForm = {displayForm}
                    handleClose = {closeForm}
                    resetActiveWord={resetActiveWord}
                />
            </div>
        )
    } else {
        return null
    }
}