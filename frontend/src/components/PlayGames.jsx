import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { getGameById, API_BASE } from '../services/gameApi'
import { useLanguage } from '../context/LanguageContext'
import Navbar from './Navbar'
import { Spinner, GameNotFound } from './StatusMessage'

function PlayGame() 
{
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const { language } = useLanguage()

    useEffect(() => {
        setLoading(true)
        getGameById(id, language).then((data) => {
            console.log('game data:', data)
            setGame(data)
            setLoading(false)
        })
    }, [id, language])

    if (loading) {
        return (
            <div className="bg-black min-h-screen">
                <Spinner />
            </div>
        )
    }

    if (!game || !game.path) {
        return (
            <div className="bg-black min-h-screen">
                <GameNotFound />
            </div>
        )
    }

    // CHANGED: build the iframe url from game.path
    // full urls are used as-is, relative paths get the backend origin (https://api.fitsgames.com) in front
    const backendOrigin = new URL(API_BASE).origin
    const playUrl = game.path.startsWith('http')
        ? game.path
        : `${backendOrigin}${game.path.startsWith('/') ? '' : '/'}${game.path}`

    console.log('playUrl:', playUrl)

    return (
        <div className="w-screen h-screen bg-black relative">
            <Link
                to={`/game/${id}`}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-black/80 transition-all"
            >
                <ArrowLeft className="w-4 h-4" />
                Exit
            </Link>
            <iframe
                src={playUrl}
                title={game.title}
                className="w-full h-full border-0"
                allowFullScreen
            />
        </div>
    )
    
}

export default PlayGame