import { Link } from "react-router-dom"
import categoryIcons from "../utils/categoryIcons"
import CategoryColors from "../utils/CategoryColors"
import { getCategoryColor } from "../utils/categoryColors"


function GameCard({ game, categoryName }) {
    const thumbnailSrc = game.thumbnail.startsWith("http")
        ? game.thumbnail
        : `/Thumbnails/${game.thumbnail}`

    const Icon = categoryIcons[categoryName]
    const colorClass = getCategoryColor(game.category_id, game.id)

    return (
        <Link
            to={`/game/${game.id}`}
            className="block group rounded-sm border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.25)]"
        >
            <div className="overflow-hidden aspect-[3/4]">
                <img
                    src={thumbnailSrc}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="mt-8 px-1">
                {categoryName && (
                    <p className={`font-label-sm text-[10px] text-secondary uppercase relative -top-4 ${colorClass} text-xs font-semibold tracking-wide flex items-center gap-1`}>
                        {categoryName}
                        {Icon && <Icon className="w-3 h-3" />}
                    </p>
                )}
                <h4 className="relative -top-3 text-white text-sm font-medium truncate">
                    {game.title}
                </h4>
            </div>
        </Link>
    )
}

export default GameCard