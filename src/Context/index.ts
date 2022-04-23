import { createContext } from 'react';

import { dataLanguage } from '../language';

export const defaultLanguage = "vi";
export const languageList = [
  { short: "vi", full: "VietNam" },
  { short: "en", full: "English" },
  { short: "jp", full: "Japan" },
];

export const defaultContext: {
  [key: string]: number | string | any;
} = {
  selectLanguage: defaultLanguage,
  dataLanguage,
  toggleLanguage: () => {},
};
export const LanguageContext = createContext(defaultContext);
