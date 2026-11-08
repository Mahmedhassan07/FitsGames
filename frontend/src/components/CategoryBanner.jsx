import { useState } from 'react'
import categoryIcons from "../utils/categoryIcons"
import { useLanguage } from '../context/LanguageContext'
function CategoryBanner({ categories, selectedCategory, onSelectCategory }) {
    const [showFilters, setShowFilters] = useState(false)
    const uiText = {
        en: {
            browseTitle: "Browse Games By Categories",
            subtitle: "Hundreds of free games across every genre. Pick a category and jump straight in.",
            categories: "Categories",
            showAll: "Show All"
        },
        ur: {
            browseTitle: "زمرہ جات کے لحاظ سے گیمز دیکھیں",
            subtitle: "ہر صنف میں سیکڑوں مفت گیمز۔ ایک زمرہ منتخب کریں اور سیدھا کھیلنا شروع کریں۔",
            categories: "زمرے",
            showAll: "سب دکھائیں"
        },
        ar: {
            browseTitle: "تصفح الألعاب حسب الفئات",
            subtitle: "مئات الألعاب المجانية في كل الأنواع. اختر فئة وابدأ اللعب على الفور.",
            categories: "الفئات",
            showAll: "عرض الكل"
        },
        fr: {
            browseTitle: "Parcourir les jeux par catégories",
            subtitle: "Des centaines de jeux gratuits dans tous les genres. Choisissez une catégorie et lancez-vous directement.",
            categories: "Catégories",
            showAll: "Tout afficher"
        },
    }
    const { language } = useLanguage()
    const t = uiText[language]

    const activeCategoryName = selectedCategory
        ? categories.find((cat) => Number(cat.id) === Number(selectedCategory))?.category_name
        : null

    function handleSelect(categoryId) {
        onSelectCategory(categoryId)
        setShowFilters(false)
    }

    return (
        <div
            className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex flex-col items-start justify-center text-left px-4 sm:px-8 md:px-16 lg:pl-[100px] bg-cover bg-center py-10"
            style={{ backgroundImage: "url('/Banners/CatBanner.jpg')" }}
        >
            <h2 className="text-left text-[32px] xs:text-[38px] sm:text-[52px] md:text-[72px] lg:text-[100px] leading-none uppercase font-black tracking-tighter text-white [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)] max-w-full"
                style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}>
                {t.browseTitle}
            </h2>
            <p className="text-left text-white/60 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-md mb-6 sm:mb-8 drop-shadow-md [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
                {t.subtitle}
            </p>

            <div className="relative mt-2 sm:mt-3 w-full sm:w-auto">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-bold hover:bg-white/20 transition-all w-full sm:w-auto justify-between sm:justify-start"
                >
                    <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <circle cx="9" cy="6" r="2" fill="currentColor" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <circle cx="15" cy="12" r="2" fill="currentColor" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                            <circle cx="7" cy="18" r="2" fill="currentColor" />
                        </svg>
                        <span className="truncate max-w-[160px] sm:max-w-none">
                            {activeCategoryName ? activeCategoryName : t.categories}
                        </span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {showFilters && (
                    <div className="absolute top-full mt-3 left-0 w-[92vw] sm:w-[90vw] max-w-2xl bg-[#0a0e14] border border-white/15 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 shadow-2xl z-20 max-h-[60vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">
                                Genre
                            </p>
                            {selectedCategory && (
                                <button
                                    onClick={() => handleSelect(null)}
                                    className="text-lime-400 text-xs font-medium hover:text-lime-300"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map((cat) => {
                                const isActive = Number(selectedCategory) === Number(cat.id)
                                const Icon = categoryIcons[cat.category_name]
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleSelect(Number(cat.id))}
                                        className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${isActive
                                            ? 'border-lime-400 text-black bg-lime-300 shadow-[0_0_20px_rgba(144,124,17,0.6),0_0_40px_rgba(144,124,17,0.3)]'
                                            : 'border-white/15 text-white/80 hover:border-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        {Icon && <Icon className="w-4 h-4 shrink-0" />}
                                        {cat.category_name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryBanner