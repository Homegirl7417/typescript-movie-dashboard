import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Movie } from '../interfaces';
import MovieTemplate from '../components/template/MovieTemplate';
import MovieTable from '../components/organisms/MovieTable';

const API_KEY = process.env.REACT_APP_API_KEY as string;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
const GET_MOVIELIST_API_URL = `https://api.themoviedb.org/4/list/1?page=1&api_key=${API_KEY}`;
const DELETE_MOVIE_API_URL = 'https://api.themoviedb.org/4/list/1/items';
const UPDATE_MOVIE_API_URL = 'https://api.themoviedb.org/4/list/1/items';

const CommentContainer = styled.div<{ isCommentTextAreaHidden: boolean }>`
  display: ${(props) => (props.isCommentTextAreaHidden ? 'none' : 'block')};
  width: 100px;
  height: 50px;
  margin-bottom: 50px;
`;

const CommentTitle = styled.div``;

const CommentTextArea = styled.textarea``;

const SaveButton = styled.button``;

export default function MovieList(): React.ReactElement {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [mideaType, setMideaType] = useState('');
  const [mideaId, setMideaId] = useState(0);
  const [isCommentTextAreaHidden, setIsCommentTextAreaHidden] = useState(true);

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

  const initializeComment = (): void => {
    setComment('');
    setMideaType('');
    setMideaId(0);
  };

  const openCommentTextArea = (media_type: string, media_id: number): void => {
    // 새로운 코멘트 받고 저장할 media_type, media_id 얻기
    initializeComment();
    setIsCommentTextAreaHidden(false);
    setMideaType(media_type);
    setMideaId(media_id);
  };

  const updateMovie = async (): Promise<void> => {
    const movieObject = {
      items: [
        {
          media_type: mideaType,
          media_id: mideaId,
          comment,
        },
      ],
    };
    await axios
      .put(UPDATE_MOVIE_API_URL, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        data: {
          movieObject,
        },
      })
      .then(() => {
        alert('수정이 완료되었습니다.');
        setIsCommentTextAreaHidden(true);
        initializeComment();
      })
      .catch((err: Error): void => {
        alert(err.message);
        setIsCommentTextAreaHidden(true);
        initializeComment();
      });
  };
  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  };
  return (
    <MovieTemplate title="Movie 목록 조회">
      <div>
        <div>Description</div>
        <div>{description}</div>
        <CommentContainer isCommentTextAreaHidden={isCommentTextAreaHidden}>
          <CommentTitle>코멘트 수정</CommentTitle>
          <CommentTextArea value={comment} onChange={onChangeComment} placeholder="Enter your comment." />
          <SaveButton onClick={() => updateMovie()}>저장</SaveButton>
        </CommentContainer>
        {movieList.length > 0 && (
          <MovieTable rows={movieList} openCommentTextArea={openCommentTextArea} deleteMovie={deleteMovie} />
        )}
      </div>
    </MovieTemplate>
  );
}
