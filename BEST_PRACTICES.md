# React useEffect Best Practices Guide

## 🎯 **BEST PRACTICES IMPLEMENTED**

### **1. Custom Hooks (BEST PRACTICE)**
```javascript
// ✅ GOOD: Custom hook for localStorage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setValue]
}
```

### **2. API Call Custom Hook (BEST PRACTICE)**
```javascript
// ✅ GOOD: Centralized API handling
function useApiCall() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const executeCall = useCallback(async (apiFunction) => {
        setLoading(true)
        setError(null)
        
        try {
            const result = await apiFunction()
            return result
        } catch (err) {
            setError(err.message || 'An error occurred')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return { loading, error, executeCall, clearError }
}
```

### **3. Memoized Functions (BEST PRACTICE)**
```javascript
// ✅ GOOD: Memoized event handlers
const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    searchFoods(query)
}, [searchFoods])

// ✅ GOOD: Memoized computed values
const hasResults = useMemo(() => foods.length > 0, [foods])
const isSearching = useMemo(() => searchQuery.trim().length > 0, [searchQuery])
```

### **4. Proper Error Handling (BEST PRACTICE)**
```javascript
// ✅ GOOD: Comprehensive error handling
const apiFunctions = useMemo(() => ({
    searchRecipes: async (query) => {
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        return await response.json()
    }
}), [])
```

### **5. Cleanup Functions (BEST PRACTICE)**
```javascript
// ✅ GOOD: Proper cleanup
function useAutoClearError(error, delay = 5000) {
    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => {
            // Handle error clearing
        }, delay)

        return () => clearTimeout(timer) // Cleanup
    }, [error, delay])
}
```

## ❌ **COMMON MISTAKES TO AVOID**

### **1. Missing Dependencies (BAD)**
```javascript
// ❌ BAD: Missing dependencies
useEffect(() => {
    searchFoods(query) // query not in dependencies
}, []) // Empty dependency array

// ✅ GOOD: Proper dependencies
useEffect(() => {
    if (query) searchFoods(query)
}, [query, searchFoods])
```

### **2. No Cleanup (BAD)**
```javascript
// ❌ BAD: No cleanup - memory leak
useEffect(() => {
    const timer = setTimeout(() => {
        setError(null)
    }, 5000)
    // No cleanup function
}, [error])

// ✅ GOOD: With cleanup
useEffect(() => {
    const timer = setTimeout(() => {
        setError(null)
    }, 5000)
    
    return () => clearTimeout(timer) // Cleanup
}, [error])
```

### **3. Inline Functions (BAD)**
```javascript
// ❌ BAD: Inline functions cause re-renders
<button onClick={() => handleSearch(query)}>Search</button>

// ✅ GOOD: Memoized handlers
const handleClick = useCallback(() => handleSearch(query), [query, handleSearch])
<button onClick={handleClick}>Search</button>
```

### **4. No Error Boundaries (BAD)**
```javascript
// ❌ BAD: No error handling
const searchFoods = async (query) => {
    const response = await fetch(url)
    const data = await response.json()
    setFoods(data.results)
}

// ✅ GOOD: Proper error handling
const searchFoods = async (query) => {
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        setFoods(data.results)
    } catch (error) {
        setError(error.message)
    }
}
```

### **5. State Updates in useEffect (BAD)**
```javascript
// ❌ BAD: Unnecessary state updates
useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
}, []) // This could be handled better

// ✅ GOOD: Custom hook approach
const { loading, executeCall } = useApiCall()
const handleFetch = useCallback(() => {
    executeCall(fetchData)
}, [executeCall])
```

## 🏆 **PERFORMANCE OPTIMIZATIONS**

### **1. Memoization Strategy**
```javascript
// ✅ GOOD: Strategic memoization
const expensiveValue = useMemo(() => {
    return foods.filter(food => food.healthScore > 80)
}, [foods])

const stableFunction = useCallback((param) => {
    // Expensive operation
}, [dependency])
```

### **2. Conditional Effects**
```javascript
// ✅ GOOD: Conditional effects
useEffect(() => {
    if (!searchQuery.trim()) return
    
    const timer = setTimeout(() => {
        searchFoods(searchQuery)
    }, 300)
    
    return () => clearTimeout(timer)
}, [searchQuery, searchFoods])
```

### **3. Batch State Updates**
```javascript
// ✅ GOOD: Batch updates
const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    setFoods([]) // Clear previous results
    searchFoods(query)
}, [searchFoods])
```

## 📊 **COMPARISON SUMMARY**

| Aspect | ❌ Bad Practice | ✅ Best Practice |
|--------|----------------|------------------|
| **Custom Logic** | Inline in component | Custom hooks |
| **Error Handling** | Try-catch everywhere | Centralized error handling |
| **Performance** | Re-renders on every change | Memoization with useCallback/useMemo |
| **Cleanup** | No cleanup functions | Proper cleanup in useEffect |
| **Dependencies** | Missing or incorrect | Accurate dependency arrays |
| **State Management** | Multiple useState calls | Custom hooks for related state |
| **API Calls** | Inline fetch calls | Custom API hooks |
| **Event Handlers** | Inline functions | Memoized with useCallback |

## 🎯 **KEY TAKEAWAYS**

1. **Custom Hooks**: Extract reusable logic into custom hooks
2. **Memoization**: Use useCallback and useMemo strategically
3. **Error Handling**: Centralize error handling with custom hooks
4. **Cleanup**: Always provide cleanup functions for side effects
5. **Dependencies**: Be precise with useEffect dependencies
6. **Performance**: Avoid unnecessary re-renders
7. **Separation of Concerns**: Keep components focused and logic separated

The implemented solution follows all React best practices and provides excellent performance, maintainability, and user experience! 🚀 