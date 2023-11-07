// Export this component for use in MainView
// Card has onClick as an event listener inside of a div, as the listener cannot apply directly to a component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {book.title}
    </div>
  );
};