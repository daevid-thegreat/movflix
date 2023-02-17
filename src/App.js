import './App.css';
import {useEffect, useState} from 'react';
import searchIcon from './search.svg'
import MovieCard from './components/movieCard';

function App() {
  const API_URL = "https://www.omdbapi.com/?apikey=225b869";

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const search_movies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(()=>{
    search_movies('Spiderman')
  },[])




  return (
    <div className="App">
      <h1>MovFlix</h1>
      <div className='search'>
        <input
        placeholder='Search for some movies!!!'
        value={searchTerm} 
        onChange={(e)=>setSearchTerm(e.target.value) }/>

        <img 
        src={searchIcon} 
        alt = "search"
        onClick={()=> search_movies(searchTerm)}

        />
      </div>
      {
      movies?.length > 0 
      ? (
        <div className='container'>
        {movies.map((movie)=> (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      ) : (
        <div className='empty'>
          <h2>"No movies found"</h2>
        </div>
      )}

      
    </div>
  );
}

export default App;
