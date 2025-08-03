import { useState, useEffect } from "react"
import FoodList from "./FoodList"
import FoodDetail from "./FoodDetail"
import FoodSearch from "./FoodSearch"
import { buildSearchUrl, buildRecipeInfoUrl } from "../../config/api"
import "./food.css"

function Food() {
    const [foods, setFoods] = useState([])
    const [selectedFood, setSelectedFood] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [recentSearches, setRecentSearches] = useState([])

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches')
        if (saved) {
            setRecentSearches(JSON.parse(saved))
        }
    }, [])

    // Save recent searches to localStorage
    useEffect(() => {
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }, [recentSearches])

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const searchFoods = async (query) => {
        if (!query.trim()) return
        
        setLoading(true)
        setError(null)
        
        try {
            const response = await fetch(buildSearchUrl(query))
            
            if (!response.ok) {
                throw new Error('Failed to fetch recipes')
            }
            
            const data = await response.json()
            setFoods(data.results || [])
            
            // Add to recent searches
            setRecentSearches(prev => {
                const newSearches = [query.trim(), ...prev.filter(s => s !== query.trim())]
                return newSearches.slice(0, 5)
            })
        } catch (err) {
            setError('Failed to load recipes. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getFoodDetail = async (id) => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await fetch(buildRecipeInfoUrl(id))
            
            if (!response.ok) {
                throw new Error('Failed to fetch recipe details')
            }
            
            const data = await response.json()
            setSelectedFood(data)
        } catch (err) {
            setError('Failed to load recipe details. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
        searchFoods(query)
    }

    const handleFoodSelect = (food) => {
        setSelectedFood(food)
    }

    const handleBackToList = () => {
        setSelectedFood(null)
    }

    return (
        <div className="food-container">
            <h1>
                <span>🍽️</span>
                Food Recipes
            </h1>
            
            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}

            {!selectedFood ? (
                <>
                    <FoodSearch 
                        onSearch={handleSearch} 
                        recentSearches={recentSearches}
                        disabled={loading}
                    />
                    <FoodList 
                        foods={foods} 
                        loading={loading}
                        onFoodSelect={handleFoodSelect}
                        searchQuery={searchQuery}
                    />
                </>
            ) : (
                <FoodDetail 
                    food={selectedFood} 
                    onBack={handleBackToList}
                    loading={loading}
                />
            )}
        </div>
    )
}

export default Food 