import React from 'react';
import uuidv4 from 'uuid/v4'
import './styles/WordDetails.scss'

export default function WordDetails({details, handleSearch}) {
    if (details !== "") {
        const definitionsList = details.map(word => {
        const title = word.word;
        const meanings = word.meanings
        const phoneticText = word.phonetics;

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
                <h2>{title}</h2>
                <p className="phonetic">- {phoneticText.length > 0 ? phoneticText[0].text : null} -</p>
                <ul className="definitions">
                    {singleMeaning}
                </ul>
            </div>
        )
        })

        return (
            <div className="word-details">
                {definitionsList}
            </div>
        )
    } else {
        return null
    }
}