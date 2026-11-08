import { useLanguage } from "../context/LanguageContext"
import { Link } from "react-router-dom"

function Footer() {
    
    return (
        <footer
            className="relative border-t border-white/10 px-6 sm:px-10 py-12 mt-16 bg-cover bg-center"
            style={{
                backgroundImage: "url('/Banners/FooterBanner.jpg')",
                backgroundSize: '100%'
            }}
        >
            {/* Dark overlay so text stays readable over the image */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10 max-w-7xl mx-auto">
                <div className="max-w-xs">
                    <h3 className="text-lime-400 text-xl font-bold italic mb-3">Fits Games</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                        Discover and play hundreds of free browser games, all in one place.
                    </p>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-white/70 text-xs ">
                © {new Date().getFullYear()} Fits Games. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer