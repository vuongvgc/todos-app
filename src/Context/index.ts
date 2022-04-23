import { createContext, useContext } from 'react';

import { dataLanguage } from '../language';

export const language: {
  [key: string]: string;
} = {
  VI: "vi",
  EN: "en",
};

export const defaultContext: {
  [key: string]: number | string | any;
} = {
  selectLanguage: language.VI,
  dataLanguage,
  toggleLanguage: () => {},
};
export const LanguageContext = createContext(defaultContext);

export function useLanguageContext() {
  return useContext(LanguageContext);
}
