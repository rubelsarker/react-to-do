import { useState } from "react"

function FoodSearch({ onSearch, recentSearches = [], disabled = false }) {
    const [searchInput, setSearchInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchInput.trim() && !disabled) {
            onSearch(searchInput.trim())
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    const handleRecentSearch = (searchTerm) => {
        if (!disabled) {
            onSearch(searchTerm)
            setSearchInput(searchTerm)
        }
    }

    return (
        <div className="food-search">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search for recipes (e.g., pasta, chicken, dessert)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`search-input ${disabled ? 'disabled' : ''}`}
                    disabled={disabled}
                />
                <button 
                    type="submit" 
                    className={`search-button ${disabled ? 'disabled' : ''}`}
                    disabled={disabled}
                >
                    {disabled ? '⏳' : '🔍'} Search
                </button>
            </form>
            
            <div className="search-suggestions">
                <div className="popular-searches">
                    <span>Popular:</span>
                    {["pasta", "chicken", "dessert", "salad", "pizza"].map((term) => (
                        <button
                            key={term}
                            onClick={() => handleRecentSearch(term)}
                            className={`popular-tag ${disabled ? 'disabled' : ''}`}
                            disabled={disabled}
                            type="button"
                        >
                            {term}
                        </button>
                    ))}
                </div>
                
                {recentSearches.length > 0 && (
                    <div className="recent-searches">
                        <span>Recent:</span>
                        {recentSearches.map((search, index) => (
                            <button
                                key={index}
                                onClick={() => handleRecentSearch(search)}
                                className={`recent-tag ${disabled ? 'disabled' : ''}`}
                                disabled={disabled}
                                type="button"
                            >
                                {search}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FoodSearch 