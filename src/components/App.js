import React, { useState, useRef } from 'react';
import axios from 'axios';
import Header from './Header'
import WordDetails from './WordDetails';
import FlipCards from './FlipCards'
import NavBar from './NavBar'
import Notification from './Notification'
import { FiSearch } from 'react-icons/fi'
import './styles/App.scss'

function App() {
  const [activeWord, setActiveWord] = useState('');
  const [errorOccurred, setErrorOccurred] = useState(false);
  const inputValueRef = useRef();

  function handleSearch() {
    const word = inputValueRef.current.value;
    if (word === '') return
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => setActiveWord(response.data))
    .catch(error => {
      setErrorOccurred(true);
      console.log(error.message);
    })
  }

  function handleSearchOnClick(e) {
    inputValueRef.current.value = e;
    handleSearch();
  }

  function handleHomeClick() {
      setActiveWord("");
      inputValueRef.current.value = "";
  }

  if(errorOccurred) {
    setTimeout(() => {
      setErrorOccurred(false);
    }, 4000)
  }

  return (
    <div className="app">
      <Header />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}>
        <input ref={inputValueRef} className="search-bar" type="text"></input>
        <FiSearch onClick={handleSearch} className="search-icon"/>
      </form>
      <WordDetails
        details = {activeWord}
        handleSearch = {handleSearchOnClick}
        resetActiveWord = {() => setActiveWord('')}
      />
      <FlipCards
        isActive={activeWord}
      />
      <NavBar
        onHomeClick={handleHomeClick}
      />

      {errorOccurred ? 
      <Notification 
        message={'No such word in the dictionary'}
      /> 
      : null}
    </div>
  );
}

export default App;
