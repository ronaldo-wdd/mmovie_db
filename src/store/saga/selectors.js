export const activeMovie = state => state.movies.activeMovie;
export const moviesResults = state => state.movies.movies.length;
export const activeFilter = state => state.movies.activeFilter;
export const totalPages = state => state.movies.fetchedMovies.total_pages;
export const page = state => state.movies.fetchedMovies.page;
export const params = state => state.movies.params;