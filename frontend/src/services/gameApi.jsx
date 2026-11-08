export const API_BASE = "https://api.fitsgames.com/v2";

export async function getGames(lang = "en") {
    try {
        const res = await fetch(`${API_BASE}/games?lang=${lang}`);
        if (!res.ok) throw new Error(`Failed to fetch games: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("getGames error:", err);
        return [];
    }
}

export async function getGameById(id, lang = "en") {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(`${API_BASE}/games/${id}?lang=${lang}`,
            {headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (!res.ok) throw new Error(`Failed to fetch game ${id}: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("getGameById error:", err);
        return null;
    }
}

export async function getCategories(lang = "en") {
    try {
        const res = await fetch(`${API_BASE}/categories?lang=${lang}`);
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("getCategories error:", err);
        return [];
    }
}

export async function getNewGames(lang = "en") {
    try {
        const res = await fetch(`${API_BASE}/games/newGames?lang=${lang}`);
        if (!res.ok) throw new Error(`Failed to fetch new games: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("getNewGames error:", err);
        return [];
    }
}

export async function getPopularGames(lang = "en") {
    try {
        const res = await fetch(`${API_BASE}/games/popularGames?lang=${lang}`);
        if (!res.ok) throw new Error(`Failed to fetch popular games: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("getPopularGames error:", err);
        return [];
    }
}