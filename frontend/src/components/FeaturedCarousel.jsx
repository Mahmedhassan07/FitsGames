import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getGames } from '../services/gameApi'
import { useLanguage } from '../context/LanguageContext'

const CARD_GAP = 16 // px
// Images in /public/Carousels — carousel shows these games, in this order
const FEATURED_IMAGES = [
    'darkninja.jpg',
    'Find07DifferencesEducational.jpg',
    'LittleDinoAdventure.jpg',
    'NaveXRacer.jpg',
    'PuzzleGameCartoon.jpg',
    'TappyDumont.jpg',
]

// "https://cdn.fitsgames.com/thumbnails/AliensMemory.jpg" -> "AliensMemory.jpg"
const fileName = (url) => (url ? url.split('/').pop() : '')
function FeaturedCarousel() {
    const [games, setGames] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef(null)
    const [isPaused, setIsPaused] = useState(false)
    const [loading, setLoading] = useState(true)
    const { language } = useLanguage()

    useEffect(() => {
        setLoading(true)
        getGames(language).then((data) => {
            setLoading(false)
            const featured = FEATURED_IMAGES
                .map((img) => data.find((g) => fileName(g.thumbnail) === img))
                .filter(Boolean)
            setGames(featured.length > 0 ? featured : data.slice(0, 6))
            setActiveIndex(0)
        })
    }, [language])


    useEffect(() => {
        function updateWidth() {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth)
            }
        }
        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [games])

    useEffect(() => {
        if (games.length === 0 || isPaused) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % games.length)
        }, 2500)

        return () => clearInterval(interval)
    }, [games, isPaused])

    function goPrev() {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
    }

    function goNext() {
        setActiveIndex((prev) => Math.min(prev + 1, games.length - 1))
    }

    if (loading) {
        return (
            <section className="bg-black py-8 px-4">
                <div className="mx-auto max-w-[700px] h-[260px] sm:h-[320px] md:h-[400px] rounded-lg bg-white/5 animate-pulse" />
            </section>
        )
    }

    // nothing to feature (e.g. no games in this language) - GameGrid shows the message
    if (games.length === 0) return null

    // card width scales with screen size, capped at 700px on large screens
    const cardWidth = Math.min(containerWidth * 0.85, 700)
    const slotWidth = cardWidth + CARD_GAP
    const trackWidth = games.length * slotWidth
    const desiredOffset = activeIndex * slotWidth - (containerWidth / 2 - cardWidth / 2)
    const maxOffset = Math.max(trackWidth - containerWidth, 0)
    const offset = Math.min(Math.max(desiredOffset, 0), maxOffset)

    return (
        <section className="relative bg-black py-8">
            <div ref={containerRef}
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${offset}px)` }}
                >
                    {games.map((game, index) => (
                        <Link
                            key={game.id}
                            to={`/game/${game.id}`}
                            style={{ width: `${cardWidth}px` }}
                            className={`shrink-0 px-2 transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-40'
                                }`}
                        >
                            <div className="relative h-[260px] sm:h-[320px] md:h-[400px] rounded-lg overflow-hidden bg-white/5 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
                                <img
                                    src={`/Carousels/${fileName(game.thumbnail)}`}
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = game.thumbnail }}
                                    alt={game.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
                                    <h3 className="text-white font-bold text-base sm:text-xl md:text-2xl truncate">
                                        {game.title}
                                    </h3>
                                    <p className="text-white/70 text-xs sm:text-sm line-clamp-1">
                                        {game.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <button
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    aria-label="Go Left"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center disabled:opacity-0"
                >
                    &larr;
                </button>
                <button
                    onClick={goNext}
                    disabled={activeIndex === games.length - 1}
                    aria-label="Go Right"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center disabled:opacity-0"
                >
                    &rarr;
                </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {games.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/30'}`}
                    ></span>
                ))}
            </div>
        </section>
    )
}

export default FeaturedCarousel