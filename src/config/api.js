// Spoonacular API Configuration
export const SPOONACULAR_CONFIG = {
    API_KEY: "26208faac36f41dfa624d105f3a2ff37",
    BASE_URL: "https://api.spoonacular.com/recipes",
    DEFAULT_LIMIT: 20,
    ENDPOINTS: {
        SEARCH: "/complexSearch",
        RECIPE_INFO: "/information"
    }
}

// API Helper Functions
export const buildSearchUrl = (query, limit = SPOONACULAR_CONFIG.DEFAULT_LIMIT) => {
    return `${SPOONACULAR_CONFIG.BASE_URL}${SPOONACULAR_CONFIG.ENDPOINTS.SEARCH}?apiKey=${SPOONACULAR_CONFIG.API_KEY}&query=${encodeURIComponent(query)}&number=${limit}&addRecipeInformation=true`
}

export const buildRecipeInfoUrl = (id) => {
    return `${SPOONACULAR_CONFIG.BASE_URL}/${id}${SPOONACULAR_CONFIG.ENDPOINTS.RECIPE_INFO}?apiKey=${SPOONACULAR_CONFIG.API_KEY}`
} 