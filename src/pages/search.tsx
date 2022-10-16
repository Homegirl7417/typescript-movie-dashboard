import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Movie, TV, Person } from '../interfaces';
import MovieTemplate from '../components/template/MovieTemplate';
import MovieTable from '../components/organisms/MovieTable';
import TvTable from '../components/organisms/TvTable';
import PersonTable from '../components/organisms/PersonTable';
import { StoreState } from '../store/modules';

const API_KEY = process.env.REACT_APP_API_KEY as string;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
const SEARCH_API_URL = (type: string, query: string): string =>
  `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;


export default function Search(): React.ReactElement {
  const [type, setType] = useState('movie');
  const [keyword, setKeyword] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [tvList, setTvList] = useState<TV[]>([]);
  const [personList, setPersonList] = useState<Person[]>([]);
  const userEmail = useSelector((state: StoreState) => state.userReducer.email);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };
  const onChangeKeywordType = (e: React.FormEvent<HTMLSelectElement>): void => {
    setType(e.currentTarget.value);
  }
  const initializeList = (): void => {
    setMovieList([]);
    setTvList([]);
    setPersonList([]);
  }
  const getSearchList = async (): Promise<void> => {
    await axios
      .get(SEARCH_API_URL(type, keyword), {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        const {
          data: { results },
        } = response;
        initializeList();
        if (type === 'movie') {
          const responseMovieList: Movie[] = results.map((movieData: any) => ({
            key: movieData.id,
            id: movieData.id,
            backdrop_path: movieData.backdrop_path,
            release_date: movieData.release_date,
            title: movieData.title,
            vote_average: movieData.vote_average,
            vote_count: movieData.vote_count,
            media_type: movieData.media_type
          }));
          setMovieList(responseMovieList);
        } else if (type === 'tv') {
          const responseTvList: TV[] = results.map((tvData: any) => ({
            key: tvData.id,
            id: tvData.id,
            backdrop_path: tvData.backdrop_path,
            first_air_date: tvData.first_air_date,
            name: tvData.name,
            popularity: tvData.popularity,
          }));
          setTvList(responseTvList);          
        } else {
          const responsePersonList: Person[] = results.map((personData: any) => ({
            key: personData.id,
            id: personData.id,
            name: personData.name,
            known_for_department: personData.known_for_department,
            popularity: personData.popularity,
          }));
          setPersonList(responsePersonList);  
        }
      })
      .catch((err: Error): void => alert(err.message));
  };

  const detectEnterKey = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getSearchList();
    }
  };
  return (
    <MovieTemplate title="검색" userEmail={userEmail}>
      <div>
        <form>
          <select name="type" id="search-type" onChange={onChangeKeywordType}>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
            <option value="person">Person</option>
          </select>
          <input
            autoFocus
            type="text"
            name="keyword"
            value={keyword}
            onKeyDown={detectEnterKey}
            onChange={onChangeKeyword}
          />
          <button type="button" onClick={getSearchList}>
            검색
          </button>
        </form>
        {movieList.length > 0 && <MovieTable rows={movieList} />}
        {tvList.length > 0 && <TvTable rows={tvList} />}
        {personList.length > 0 && <PersonTable rows={personList} />}
      </div>
    </MovieTemplate>
  );
}
