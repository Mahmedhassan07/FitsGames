import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { getGames } from '../services/gameApi';
import { useLanguage } from '../context/LanguageContext';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginReminder from './LoginReminder';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
];

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [selectedValue, setSelectedValue] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [allGames, setAllGames] = useState([]);
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { language, setLanguage } = useLanguage();
    const searchRef = useRef(null);
    const langRef = useRef(null);
    const navigate = useNavigate();
    const [showLoginReminder, setShowLoginReminder] = useState(true)

    useEffect(() => {
        getGames(language).then(setAllGames);
    }, [language]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
            if (langRef.current && !langRef.current.contains(e.target)) {
                setShowLangMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleChange(e) {
        setSelectedValue(e.target.value);
    }

    function handleSearch(e) {
        const value = e.target.value;
        setSearchItem(value);

        if (value.trim() === "") {
            setResults([]);
            setShowResults(false);
            return;
        }

        const matches = allGames.filter((game) =>
            game.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(matches.slice(0, 6));
        setShowResults(true);
    }

    function handleResultClick(gameId) {
        setSearchItem("");
        setResults([]);
        setShowResults(false);
        navigate(`/game/${gameId}`);
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0a0e14]/70 backdrop-blur-md px-4 sm:px-5 py-2.5 border-b border-white/10">
            <div className="flex flex-wrap md:grid md:grid-cols-3 items-center gap-3 md:gap-0">

                {/* Left: logo */}
                <div className="flex items-center gap-2 order-1">
                    <img src="/Logo/fitsgames-logo.png" alt="Logo" className="h-10 sm:h-12 w-auto object-contain" />
                </div>

                {/* Right: language + sign in/out — comes second on mobile, third column on desktop */}
                <div className="flex items-center gap-2 sm:gap-3 justify-end order-2 md:order-3 ml-auto">

                    {/* Language dropdown */}
                    <div ref={langRef} className="relative">
                        <button
                            onClick={() => setShowLangMenu((prev) => !prev)}
                            className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="hidden sm:inline">{language.toUpperCase()}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {showLangMenu && (
                            <div className="absolute top-full mt-2 right-0 w-36 bg-[#0a0e14] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-30">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === lang.code
                                            ? 'text-lime-400 bg-white/5'
                                            : 'text-white/80 hover:bg-white/10'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sign in / Log out */}
                    {!user ? (
                        <div className="relative">
                            <button
                                onClick={() => navigate("/auth")}
                                className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2"
                            >
                                <LogIn className="w-4 h-4" />
                                <span className="hidden sm:inline">Sign In</span>
                            </button>

                            {showLoginReminder && (
                                <LoginReminder onClose={() => setShowLoginReminder(false)} />
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Log Out</span>
                        </button>
                    )}
                </div>

                {/* Center: search — full width on mobile (wraps to its own row), centered column on desktop */}
                <div className="w-full md:w-auto flex justify-center order-3 md:order-2">
                    <div ref={searchRef} className="relative w-full max-w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            value={searchItem}
                            placeholder="Search for Games..."
                            onChange={handleSearch}
                            onFocus={() => searchItem && setShowResults(true)}
                            className="bg-[#1a1f2e] text-white text-sm placeholder-white/40 rounded-full pl-9 pr-4 py-3 sm:py-4 outline-none focus:ring-1 focus:ring-lime-300 w-full"
                        />

                        {showResults && results.length > 0 && (
                            <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0e14] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-30">
                                {results.map((game) => (
                                    <button
                                        key={game.id}
                                        onClick={() => handleResultClick(game.id)}
                                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-white/10 transition-colors text-left"
                                    >
                                        <img
                                            src={game.thumbnail.startsWith("http") ? game.thumbnail : `/Thumbnails/${game.thumbnail}`}
                                            alt={game.title}
                                            className="w-8 h-8 rounded object-cover bg-white/10"
                                        />
                                        <span className="text-white text-sm truncate">{game.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {showResults && searchItem.trim() !== "" && results.length === 0 && (
                            <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0e14] border border-white/15 rounded-xl shadow-2xl p-3 z-30">
                                <p className="text-white/50 text-sm">No games found</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    )
};
export default Navbar;