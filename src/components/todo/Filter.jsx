function Filter({ currentFilter, onFilterChange }) {
    const filters = ["all", "active", "completed"]

    return (
        <div className="filters">
            {filters.map(filter => (
                <button 
                    key={filter}
                    className={`filter ${currentFilter === filter ? "active" : ""}`}
                    data-filter={filter}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default Filter
