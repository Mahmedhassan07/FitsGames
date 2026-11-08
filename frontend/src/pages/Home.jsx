import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import FeaturedCarousel from '../components/FeaturedCarousel'
import CategoryBanner from '../components/CategoryBanner'
import GameGrid from '../components/GameGrid'
import GameRow from '../components/GameRow'
import Footer from '../components/Footer'
import { getCategories, getNewGames, getPopularGames } from '../services/gameApi'
import { useLanguage } from '../context/LanguageContext'

function Home() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const { language } = useLanguage()

    useEffect(() => {
        getCategories(language).then(setCategories)
    }, [language])


    return (
        <>
            <Navbar />

            <FeaturedCarousel />


            <GameRow title="New Games" fetchGames={getNewGames} categories={categories} />
            <GameRow title="Popular Games" fetchGames={getPopularGames} categories={categories} />
            <CategoryBanner
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <GameGrid
                categories={categories}
                selectedCategory={selectedCategory}
                onClearCategory={() => setSelectedCategory(null)}
            />
            <Footer />
        </>
    )
}

export default Home