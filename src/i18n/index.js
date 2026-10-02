import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './fr.json'
import en from './en.json'

export const LANGS = ['fr', 'en']

const saved = localStorage.getItem('lang')
const browser = navigator.language?.slice(0, 2)
const lng = LANGS.includes(saved) ? saved : LANGS.includes(browser) ? browser : 'fr'

i18n.use(initReactI18next).init({
    resources: { fr: { translation: fr }, en: { translation: en } },
    lng,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (l) => {
    localStorage.setItem('lang', l)
    document.documentElement.lang = l
})
document.documentElement.lang = lng

export default i18n