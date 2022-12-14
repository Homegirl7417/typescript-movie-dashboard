import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MovieTemplate from '../components/template/MovieTemplate';
import { StoreState } from '../store/modules';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
const ADD_MOVIE_API_URL = 'https://api.themoviedb.org/4/list/1/items';

const CommentContainer = styled.div`
  width: 300px;
  height: 100px;
`;

const Title = styled.div`
`;

const SaveButton = styled.button``;

export default function AddMovie(): React.ReactElement {
  const [mediaType, setMediaType] = useState('movie');
  const [mediaId, setMediaId] = useState<number | string>('');
  const userEmail = useSelector((state: StoreState) => state.userReducer.email);

  const onChangeAddType = (e: React.FormEvent<HTMLSelectElement>): void => {
    setMediaType(e.currentTarget.value);
  };
  const onChangeMovieId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof Number(e.currentTarget.value) === 'number') {
      setMediaId(Number(e.currentTarget.value));
    } 
  };
  const addMovie = async (): Promise<void> => {
    if (String(mediaType).length === 0 || String(mediaId).length === 0) alert('모든 항목을 입력해주시기 바랍니다.');
    else {
      const movieObject = {
        items: [
          {
            media_type: mediaType,
            media_id: mediaId,
          },
        ],
      };
      await axios
        .put(ADD_MOVIE_API_URL, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          data: {
            movieObject,
          },
        })
        .then(() => {
          alert('신규 생성이 완료되었습니다.');
        })
        .catch((err: Error): void => {
          alert(err.message);
        });
    }
  };
  return (
    <MovieTemplate title="수정" userEmail={userEmail}>
      <CommentContainer>
        <Title>Movie Type</Title>
        <select name="type" id="add-type" onChange={onChangeAddType}>
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select>
        <Title>Movie Id (only number type)</Title>
        <input type="number" value={mediaId} onChange={onChangeMovieId} />
        <br />
        <SaveButton onClick={() => addMovie()}>저장</SaveButton>
      </CommentContainer>
    </MovieTemplate>
  );
}
