import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Movie } from '../interfaces';
import MovieTemplate from '../components/template/MovieTemplate';

const API_KEY = process.env.REACT_APP_API_KEY as string;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
const API_URL = `https://api.themoviedb.org/4/list/1?page=1&api_key=${API_KEY}`;

export default function MovieList(): React.ReactElement {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [description, setDescription] = useState('');
  useEffect(() => {
    const getMovieList = async (): Promise<void> => {
      await axios
        .get(API_URL, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          const {
            data: { description: apiDescription, results },
          } = response;

          const responseMovieList: Movie[] = results.map((movieData: any) => ({
            key: movieData.id,
            id: movieData.id,
            backdrop_path: movieData.backdrop_path,
            release_date: movieData.release_date,
            title: movieData.title,
            vote_average: movieData.vote_average,
            vote_count: movieData.vote_count,
          }));
          setMovieList(responseMovieList);
          setDescription(apiDescription);
        })
        .catch((err: Error): void => console.error(err));
    };
    getMovieList();
  }, []);
  return (
    <MovieTemplate title="영화 목록">
      <div>
        <div>Description</div>
        <div>{description}</div>
        <div>MovieList</div>
        <div>
          {movieList.map((movie: Movie) => (
            <div key={movie.id}>
              <div>Title: {movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </MovieTemplate>
  );
}
