import FoodCard from "./FoodCard"

function FoodList({ foods, loading, onFoodSelect, searchQuery }) {
    if (loading) {
        return (
            <div className="food-list">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Searching for delicious recipes...</p>
                </div>
            </div>
        )
    }

    if (!searchQuery) {
        return (
            <div className="food-list">
                <div className="empty-state">
                    <div className="empty-icon">🍽️</div>
                    <h3>Search for Recipes</h3>
                    <p>Enter a food item above to discover amazing recipes!</p>
                </div>
            </div>
        )
    }

    if (foods.length === 0) {
        return (
            <div className="food-list">
                <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No recipes found</h3>
                    <p>Try searching for something else or check your spelling.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="food-list">
            <div className="results-header">
                <h2>Found {foods.length} recipes for "{searchQuery}"</h2>
            </div>
            <div className="food-grid">
                {foods.map((food) => (
                    <FoodCard 
                        key={food.id} 
                        food={food} 
                        onSelect={onFoodSelect}
                    />
                ))}
            </div>
        </div>
    )
}

export default FoodList 