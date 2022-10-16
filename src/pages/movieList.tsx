import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Movie } from '../interfaces';
import { StoreState } from '../store/modules';
import MovieTemplate from '../components/template/MovieTemplate';
import MovieTable from '../components/organisms/MovieTable';

const API_KEY = process.env.REACT_APP_API_KEY as string;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
const GET_MOVIELIST_API_URL = `https://api.themoviedb.org/4/list/1?page=1&api_key=${API_KEY}`;
const DELETE_MOVIE_API_URL = 'https://api.themoviedb.org/4/list/1/items';

const ModifyButton = styled.button`
  width: 80px;
  height: 24px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
`;

export default function MovieList(): React.ReactElement {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const userEmail = useSelector((state: StoreState) => state.userReducer.email);

  useEffect(() => {
    const getMovieList = async (): Promise<void> => {
      await axios
        .get(GET_MOVIELIST_API_URL, {
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
            media_type: movieData.media_type,
          }));
          setMovieList(responseMovieList);
          setDescription(apiDescription);
        })
        .catch((err: Error): void => alert(err.message));
    };
    getMovieList();
  }, []);
  const deleteMovie = async (title: string, media_type: string, media_id: number): Promise<void> => {
    const confirm = window.confirm(`${title}을 삭제하시겠습니까?`);
    if (confirm) {
      const movieObject = {
        items: [
          {
            media_type,
            media_id,
          },
        ],
      };
      await axios
        .delete(DELETE_MOVIE_API_URL, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          data: {
            movieObject,
          },
        })
        .then(() => {
          alert('삭제가 완료되었습니다.');
        })
        .catch((err: Error): void => alert(err.message));
    }
  };

  const moveToUpdateMovie = (media_type: string, media_id: number): void => {
    navigate(`/movie/item/update?media_id=${media_id}&media_type=${media_type}`);
  };

  const moveToAddMovie = (): void => {
    navigate('/movie/item/add');
  };

  return (
    <MovieTemplate title="Movie 목록 조회" userEmail={userEmail}>
      <div>
        <div>Description</div>
        <div>{description}</div>
        {movieList.length > 0 && (
          <MovieTable rows={movieList} moveToUpdateMovie={moveToUpdateMovie} deleteMovie={deleteMovie} />
        )}
        <ModifyButton type="button" onClick={moveToAddMovie}>
          추가
        </ModifyButton>
      </div>
    </MovieTemplate>
  );
}
