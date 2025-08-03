function FoodDetail({ food, onBack, loading }) {
    if (loading) {
        return (
            <div className="food-detail">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading recipe details...</p>
                </div>
            </div>
        )
    }

    if (!food) {
        return (
            <div className="food-detail">
                <div className="empty-state">
                    <p>No recipe selected</p>
                </div>
            </div>
        )
    }

    return (
        <div className="food-detail">
            <button className="back-button" onClick={onBack}>
                ← Back to Search
            </button>
            
            <div className="detail-header">
                <div className="detail-image">
                    {food.image ? (
                        <img src={food.image} alt={food.title} />
                    ) : (
                        <div className="image-placeholder">🍽️</div>
                    )}
                </div>
                
                <div className="detail-info">
                    <h1>{food.title}</h1>
                    
                    <div className="detail-meta">
                        <div className="meta-item">
                            <span className="meta-icon">⏱️</span>
                            <span>{food.readyInMinutes || 'N/A'} minutes</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">👥</span>
                            <span>{food.servings || 'N/A'} servings</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">⭐</span>
                            <span>{food.spoonacularScore || 'N/A'}/100</span>
                        </div>
                    </div>
                    
                    {food.healthScore && (
                        <div className="health-info">
                            <span>Health Score: {food.healthScore}%</span>
                            <div className="health-bar">
                                <div 
                                    className="health-fill" 
                                    style={{ width: `${food.healthScore}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                    
                    {food.diets && food.diets.length > 0 && (
                        <div className="diet-info">
                            <span>Dietary Info:</span>
                            <div className="diet-tags">
                                {food.diets.map((diet, index) => (
                                    <span key={index} className="diet-tag">
                                        {diet}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {food.summary && (
                <div className="detail-section">
                    <h2>Summary</h2>
                    <div 
                        className="summary-content"
                        dangerouslySetInnerHTML={{ __html: food.summary }}
                    />
                </div>
            )}
            
            {food.extendedIngredients && food.extendedIngredients.length > 0 && (
                <div className="detail-section">
                    <h2>Ingredients</h2>
                    <ul className="ingredients-list">
                        {food.extendedIngredients.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">
                                <span className="ingredient-amount">
                                    {ingredient.amount} {ingredient.unit}
                                </span>
                                <span className="ingredient-name">
                                    {ingredient.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {food.analyzedInstructions && food.analyzedInstructions.length > 0 && (
                <div className="detail-section">
                    <h2>Instructions</h2>
                    <ol className="instructions-list">
                        {food.analyzedInstructions[0].steps.map((step, index) => (
                            <li key={index} className="instruction-step">
                                <span className="step-number">{step.number}</span>
                                <span className="step-text">{step.step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
            
            {food.nutrition && food.nutrition.nutrients && (
                <div className="detail-section">
                    <h2>Nutrition Information</h2>
                    <div className="nutrition-grid">
                        {food.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                            <div key={index} className="nutrition-item">
                                <span className="nutrient-name">{nutrient.name}</span>
                                <span className="nutrient-amount">
                                    {nutrient.amount} {nutrient.unit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FoodDetail 