import { useState, useEffect } from 'react'
import { getGames } from '../services/gameApi'
import GameCard from './GameCard'
import {useLanguage} from './../context/LanguageContext'
import { Gamepad2, Puzzle, Brain, Target, Compass, GraduationCap, Car, Swords, Atom, Trophy, Palette, Smile } from 'lucide-react'
import categoryIcons from "../utils/categoryIcons"
const GAMES_PER_PAGE = 12
const uiText = {
    en: {
        allGames: "All Games",
        showAll: "Show All",
        loadMore: "LOAD MORE GAMES",
        showing: (shown, total) => `SHOWING ${shown} OF ${total} TITLES`,
        noGamesTitle: "No games available in this language yet",
        noGamesText: "We're working on translations. Meanwhile, you can enjoy all our games in English.",
        switchToEnglish: "Switch to English",
    },
    ur: {
        allGames: "تمام گیمز",
        showAll: "سب دکھائیں",
        loadMore: "مزید گیمز دکھائیں",
        showing: (shown, total) => `${total} میں سے ${shown} دکھائے جا رہے ہیں`,
        noGamesTitle: "اس زبان میں ابھی کوئی گیم دستیاب نہیں",
        noGamesText: "ہم ترجمے پر کام کر رہے ہیں۔ تب تک آپ تمام گیمز انگریزی میں کھیل سکتے ہیں۔",
        switchToEnglish: "انگریزی میں دیکھیں",
    },
    ar: {
        allGames: "جميع الألعاب",
        showAll: "عرض الكل",
        loadMore: "تحميل المزيد من الألعاب",
        showing: (shown, total) => `عرض ${shown} من ${total} لعبة`,
        noGamesTitle: "لا توجد ألعاب متاحة بهذه اللغة بعد",
        noGamesText: "نحن نعمل على الترجمة. في هذه الأثناء، يمكنك الاستمتاع بجميع ألعابنا باللغة الإنجليزية.",
        switchToEnglish: "التبديل إلى الإنجليزية",
    },
    fr: {
        allGames: "Tous les jeux",
        showAll: "Tout afficher",
        loadMore: "CHARGER PLUS DE JEUX",
        showing: (shown, total) => `AFFICHAGE DE ${shown} SUR ${total} TITRES`,
        noGamesTitle: "Aucun jeu disponible dans cette langue pour le moment",
        noGamesText: "Nous travaillons sur les traductions. En attendant, profitez de tous nos jeux en anglais.",
        switchToEnglish: "Passer à l'anglais",
    },
}

function GameGrid({ categories, selectedCategory, onClearCategory }) {
    
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE)
    const { language, setLanguage } = useLanguage()
    const t = uiText[language] || uiText.en

    useEffect(() => {
        setLoading(true)
        getGames(language).then((data) => {
            setGames(data)
            setLoading(false)
        })
    }, [language])




    useEffect(() => {
        setVisibleCount(GAMES_PER_PAGE)
    }, [selectedCategory])

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <div className="w-10 h-10 border-4 border-white/20 border-t-lime-400 rounded-full animate-spin" />
            </div>
        )
    }

    if (games.length === 0) {
        return (
            <section className="px-6 sm:px-10 py-16">
                <div className="max-w-xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl px-6 py-10">
                    <Gamepad2 className="w-12 h-12 text-lime-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2">{t.noGamesTitle}</h3>
                    <p className="text-white/60 text-sm sm:text-base mb-6">{t.noGamesText}</p>
                    {language !== 'en' && (
                        <button
                            onClick={() => setLanguage('en')}
                            className="bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-2.5 rounded-full transition-colors"
                        >
                            {t.switchToEnglish}
                        </button>
                    )}
                </div>
            </section>
        )
    }

    function getCategoryName(categoryId) {
        const match = categories.find((cat) => Number(cat.id) === Number(categoryId))
        return match ? match.category_name : ""
    }

const filteredGames = selectedCategory
        ? games.filter((game) => Number(game.category_id) === Number(selectedCategory))
        : games

    const visibleGames = filteredGames.slice(0, visibleCount)
    const hasMore = visibleCount < filteredGames.length
    const activeCategoryName = selectedCategory ? getCategoryName(selectedCategory) : null
    const Icon = selectedCategory ? categoryIcons[Number(selectedCategory)] : null

    console.log("selectedCategory:", selectedCategory, "games:", games.length, "filteredGames:", filteredGames.length, "visibleGames:", visibleGames.length)

    return (
        <section className="px-6 sm:px-10 py-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                    {activeCategoryName ? activeCategoryName : t.allGames}
                    {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-lime-400" />}
                </h3>
                {selectedCategory && (
                    <button
                        onClick={onClearCategory}
                        className="text-lime-400 text-sm font-semibold hover:text-lime-300"
                    >
                        {t.showAll}
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                {visibleGames.map((game) => (
                    <GameCard key={game.id} game={game} categoryName={getCategoryName(game.category_id)} categoryId={game.category_id} />
                ))}
            </div>

            {hasMore && (
                <div className="flex flex-col items-center mt-10 gap-3">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + GAMES_PER_PAGE)}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
                    >
                        {t.loadMore}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                </div>
            )}
        </section>
    )
}

export default GameGrid