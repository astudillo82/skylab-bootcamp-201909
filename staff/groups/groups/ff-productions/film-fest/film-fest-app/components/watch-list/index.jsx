function Watchlist({title, items, onMovieRender}) {
    console.log(items)
    return <section className="landing">
        <h1 className="landing__title">Personal Watchlist</h1>
        <ul className="landing__results results">
            {items.map(movie => onMovieRender(movie))}
        </ul>
    </section>

}