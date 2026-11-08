import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Play, ArrowLeft, Gamepad2 } from 'lucide-react'
import { getGameById, getCategories, API_BASE } from '../services/gameApi'
import categoryIcons from '../utils/categoryIcons'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import PlayButton from '../components/PlayButton'
import { Spinner, GameNotFound } from '../components/StatusMessage'


function GameDetail() {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const [categories, setCategories] = useState([])
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [loading, setLoading] = useState(true)
    const { language } = useLanguage()

    useEffect(() => {
        setLoading(true)
        getGameById(id, language).then((data) => {
            setGame(data)
            setLoading(false)
        })
        getCategories(language).then(setCategories)
    }, [id, language])

    if (loading) {
        return (
            <>
                <Navbar />
                <Spinner />
            </>
        )
    }

    if (!game || !game.thumbnail) {
        return (
            <>
                <Navbar />
                <GameNotFound />
            </>
        )
    }

    const thumbnailSrc = game.thumbnail.startsWith("http")
        ? game.thumbnail
        : `/Thumbnails/${game.thumbnail}`

    const PlayTranslation = {
        en: {
            play: "Play",
        },
        fr: {
            play: "Jouer",
        },
        ur: {
            play: "کھیلیں",
        },
        ar: {
            play: "يلعب"
        }
    }
    const NowTranslation = {
        en: {
            now: "now!",
        },
        fr: {
            now: "Maintenant"
        },
        ur: {
            now: "ابھی!",
        },
        ar:{
            now: "الآن"
        }
    }
    const BackTranslation={
        en:{
            back:"Back"
        },
        fr:{
            back:"Retour"
        },
        ur:{
            back:"واپس"
        },
        ar:{
            back:"خلف"
        }
    }
    const b= BackTranslation[language];
    const t = PlayTranslation[language];
    const p = NowTranslation[language];
    const categoryMatch = categories.find((cat) => Number(cat.id) === Number(game.category_id))
    const categoryName = categoryMatch ? categoryMatch.category_name : ""
    const CategoryIcon = categoryIcons[Number(categoryName)]
    const playUrl = `${API_BASE}/play/${game.path}`

    return (
        <>

            {/* bg */}
            <section
                className="relative w-full py-29 overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: "url('/GameDetailsImage/GameDetailBg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/55"></div>

                <Link
                    to="/"
                    className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-white/5 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {b.back}
                </Link>

                <div className="relative z-10 flex flex-col lg:flex-row items-start gap-10 max-w-7xl mx-auto pt-14 px-6 sm:px-10">
                    {/* Left: image */}
                    <div className="p-1 rounded-2xl border-2 border-lime-400/70 shrink-0">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block rounded-xl overflow-hidden"
                        >
                            <img
                                src={thumbnailSrc}
                                alt={game.title}
                                className="block max-w-full h-auto rounded-xl"
                            />
                            <div className="absolute inset-0 group-hover:bg-black/40 transition-colors rounded-xl" />
                        </a>
                    </div>

                    {/* Right: tags + title */}
                    <div className="flex-1 max-w-2xl">
                        {categoryName && (
                            <span className="inline-flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/30 text-lime-300 text-xs font-bold tracking-wide px-2 py-1 rounded mb-2">
                                {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5" />}
                                {categoryName}
                            </span>
                        )}

                        <h1
                            className="text-[56px] md:text-[80px] leading-none uppercase font-black tracking-tighter text-white"
                            style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
                        >
                            {game.title}
                        </h1>
                        {/* Description */}
                        <p className={`text-white/80 leading-relaxed line-clamp-3}`}>
                            {game.description}
                        </p>
                        <Link
                            to={`/game/${id}/play`}
                            className="play-now-btn mt-6"
                        >
                            <Play className="w-7 h-7 fill-black" />
                            <span className="now-text">{p.now} </span>
                            <span className="play-text">{t.play}</span>
                        </Link>
                    </div>


                </div>

            </section>

        </>
    )
}

export default GameDetail