import { Link } from 'react-router-dom'
import { Gamepad2, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const uiText = {
    en: {
        notFoundTitle: "Game not available",
        notFoundText: "We couldn't load this game. It may not be available in this language yet.",
        switchToEnglish: "Switch to English",
        backHome: "Back to Home",
    },
    ur: {
        notFoundTitle: "گیم دستیاب نہیں",
        notFoundText: "ہم یہ گیم لوڈ نہیں کر سکے۔ ہو سکتا ہے یہ ابھی اس زبان میں دستیاب نہ ہو۔",
        switchToEnglish: "انگریزی میں دیکھیں",
        backHome: "ہوم پر واپس جائیں",
    },
    ar: {
        notFoundTitle: "اللعبة غير متاحة",
        notFoundText: "تعذر تحميل هذه اللعبة. قد لا تكون متاحة بهذه اللغة بعد.",
        switchToEnglish: "التبديل إلى الإنجليزية",
        backHome: "العودة إلى الرئيسية",
    },
    fr: {
        notFoundTitle: "Jeu indisponible",
        notFoundText: "Impossible de charger ce jeu. Il n'est peut-être pas encore disponible dans cette langue.",
        switchToEnglish: "Passer à l'anglais",
        backHome: "Retour à l'accueil",
    },
}

export function Spinner({ className = "py-20" }) {
    return (
        <div className={`flex justify-center ${className}`}>
            <div className="w-10 h-10 border-4 border-white/20 border-t-lime-400 rounded-full animate-spin" />
        </div>
    )
}

export function GameNotFound() {
    const { language, setLanguage } = useLanguage()
    const t = uiText[language] || uiText.en

    return (
        <section className="px-6 sm:px-10 py-20">
            <div className="max-w-xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl px-6 py-10">
                <Gamepad2 className="w-12 h-12 text-lime-400 mx-auto mb-4" />
                <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2">{t.notFoundTitle}</h3>
                <p className="text-white/60 text-sm sm:text-base mb-6">{t.notFoundText}</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {language !== 'en' && (
                        <button
                            onClick={() => setLanguage('en')}
                            className="bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-2.5 rounded-full transition-colors"
                        >
                            {t.switchToEnglish}
                        </button>
                    )}
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t.backHome}
                    </Link>
                </div>
            </div>
        </section>
    )
}
