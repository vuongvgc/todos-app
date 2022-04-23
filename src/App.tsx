import './App.css';

import React, { useState } from 'react';

import ChangeLanguage from './components/ChangeLanguage';
import { defaultLanguage, LanguageContext } from './Context';
import { dataLanguage } from './language';
import ToDoPage from './ToDoPage';

function App() {
  const [languageAction, setLanguageActive] = useState<string>(defaultLanguage);
  const toggleTheme = (lang: string) => {
    setLanguageActive(lang);
  };
  return (
    <LanguageContext.Provider
      value={{
        selectLanguage: languageAction,
        dataLanguage: dataLanguage,
        toggleLanguage: (lang: string) => toggleTheme(lang),
      }}
    >
      <main className="App">
        <h1 className="title">todos</h1>
        <ToDoPage />
      </main>
      <ChangeLanguage />
    </LanguageContext.Provider>
  );
}

export default App;
