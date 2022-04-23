import './styles.css';

import React from 'react';

import { language } from '../../Context';
import { useLanguageContext } from '../../hook/useLanguageContext';

const ChangeLanguage = () => {
  const { toggleLanguage, selectLanguage } = useLanguageContext();
  return (
    <div className="language__box">
      <p
        className={`language__item ${
          selectLanguage === language.VI && "language__item-active"
        }`}
        onClick={() => toggleLanguage(language.VI)}
      >
        VietNam
      </p>
      <p
        className={`language__item ${
          selectLanguage === language.EN && "language__item-active"
        }`}
        onClick={() => toggleLanguage(language.EN)}
      >
        English
      </p>
    </div>
  );
};

export default ChangeLanguage;
