function FoodCard({ food, onSelect }) {
    const handleClick = () => {
        onSelect(food)
    }

    return (
        <div className="food-card" onClick={handleClick}>
            <div className="food-image">
                {food.image ? (
                    <img 
                        src={food.image} 
                        alt={food.title}
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                        }}
                    />
                ) : null}
                <div className="image-placeholder">
                    🍽️
                </div>
            </div>
            
            <div className="food-info">
                <h3 className="food-title">{food.title}</h3>
                
                <div className="food-meta">
                    <span className="cooking-time">
                        ⏱️ {food.readyInMinutes || 'N/A'} min
                    </span>
                    <span className="servings">
                        👥 {food.servings || 'N/A'} servings
                    </span>
                </div>
                
                {food.healthScore && (
                    <div className="health-score">
                        <span className="score-label">Health Score:</span>
                        <div className="score-bar">
                            <div 
                                className="score-fill" 
                                style={{ width: `${food.healthScore}%` }}
                            ></div>
                        </div>
                        <span className="score-value">{food.healthScore}%</span>
                    </div>
                )}
                
                {food.diets && food.diets.length > 0 && (
                    <div className="diet-tags">
                        {food.diets.slice(0, 3).map((diet, index) => (
                            <span key={index} className="diet-tag">
                                {diet}
                            </span>
                        ))}
                        {food.diets.length > 3 && (
                            <span className="diet-tag more">+{food.diets.length - 3}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FoodCard 