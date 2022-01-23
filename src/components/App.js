import React, { useState, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';
import Header from './Header'
import WordDetails from './WordDetails'
import FlipCards from './FlipCards'
import NavBar from './NavBar'
import Notification from './Notification'
import Stats from './Stats'
import Settings from './Settings'
import { FiSearch } from 'react-icons/fi'
import './styles/App.scss'

function App() {
  const [activeWord, setActiveWord] = useState('');
  const [errorOccurred, setErrorOccurred] = useState(false);
  const inputValueRef = useRef();

    const LOCAL_STORAGE_KEY = 'learning.flipCards'
    const storedFlipCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

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
  }

  if(errorOccurred) {
    setTimeout(() => {
      setErrorOccurred(false);
    }, 4000)
  }

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={
          <div className="app">
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
        storedFlipCards={storedFlipCards}
      />
    </div>
      }></Route>
      <Route path='stats' element={
        <Stats 
          storedFlipCards={storedFlipCards}
        />
      }></Route>
      <Route path='settings' element={<Settings />}></Route>
    </Routes>
          <NavBar
        onHomeClick={handleHomeClick}
      />
      {errorOccurred ? 
      <Notification 
        message={'No such word in the dictionary'}
      /> 
      : null}
  </BrowserRouter>
  );
}

export default App;
