import "./PlayButton.css";
import { useLanguage } from '../context/LanguageContext'

export default function PlayButton({ playUrl }) {
    const { language } = useLanguage()

    useEffect(() => {
        getGameById(id, language).then(setGame)
        getCategories(language).then(setCategories)
    }, [id, language])

    const PlayNowTranslation = {
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
            now: "Maintenant",
        },  
        ur: {   
            now: "ابھی!",
        },
        ar: {   
            now: "الآن!",
        }
    }
    
    const p= NowTranslation[language];
    const t = PlayNowTranslation[language];
    return (
        <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="play-now-btn inline-flex items-center gap-2 bg-violet-400 text-black font-bold px-8 py-3.5 rounded-full text-base transition-all mt-6"
        >
            <div className="game-controller">
                <div className="d-pad">
                    <span className="horizontal"></span>
                    <span className="vertical"></span>
                </div>
                <div className="buttons">
                    <span className="button red"></span>
                    <span className="button yellow"></span>
                    <span className="button blue"></span>
                    <span className="button green"></span>
                </div>
                <div className="center-buttons">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <span className="now">{p.now}</span>
            <span className="play">{t.play}</span>
        </a>
    );
}