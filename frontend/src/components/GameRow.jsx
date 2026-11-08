import { useState, useEffect } from 'react'
import GameCard from './GameCard'
import { useLanguage } from '../context/LanguageContext'

function GameRow({ title, fetchGames, categories }) {
    const [games, setGames] = useState([])
    const { language } = useLanguage()

    useEffect(() => {
        fetchGames(language).then(setGames)
    }, [language])

    function getCategoryName(categoryId) {
        const match = categories.find((cat) => Number(cat.id) === Number(categoryId))
        return match ? match.category_name : ""
    }

    if (games.length === 0) return null

    return (
        <section className="px-6 sm:px-10 py-8">
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-6">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} categoryName={getCategoryName(game.category_id)} />
                ))}
            </div>
        </section>
    )
}

export default GameRow