const categoryColors = 
{
    1: ["text-orange-300", "text-red-400", "text-amber-400", "text-yellow-400"],   // Arcade
    2: ["text-emerald-400", "text-green-400", "text-pink-400"],                    // Puzzle
    3: ["text-sky-400", "text-red-400", "text-purple-400"],                         // IQ
    4: ["text-red-400", "text-teal-400", "text-orange-400"],                       // Shooting
    6: ["text-violet-400", "text-yellow-400", "text-fuchsia-400"],                 // Adventure
    7: ["text-yellow-400", "text-amber-400"],                                      // Educational
    8: ["text-pink-400", "text-green-400", "text-fuchsia-400"],                     // Racing
    9: ["text-cyan-400", "text-teal-400", "text-brown-400"],                         // Strategy
    10: ["text-lime-400", "text-orange-400"],                                       // Physics
    11: ["text-amber-400", "text-orange-400"],                                     // Sports
    12: ["text-fuchsia-400", "text-pink-400", "text-purple-400"],                  // Leisure
    13: ["text-teal-400", "text-cyan-400", "text-emerald-400"],                    // Casual
}

export function getCategoryColor(categoryId, gameId) {
    const palette = categoryColors[Number(categoryId)]
    if (!palette || palette.length === 0) return "text-violet-400"
    const index = Number(gameId) % palette.length
    return palette[index]
}

export default categoryColors