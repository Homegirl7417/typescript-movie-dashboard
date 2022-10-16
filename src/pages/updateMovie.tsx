import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import MovieTemplate from '../components/template/MovieTemplate';

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
const UPDATE_MOVIE_API_URL = 'https://api.themoviedb.org/4/list/1/items';

const CommentContainer = styled.div`
  width: 200px;
  height: 100px;
`;

const CommentTitle = styled.div``;

const CommentTextArea = styled.textarea``;

const SaveButton = styled.button``;

export default function UpdateMovie(): React.ReactElement {
    const [searchParams] = useSearchParams();
    const [comment, setComment] = useState('');
    const mideaType = searchParams.get('media_type');
    const mideaId = searchParams.get('media_id');
    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setComment(e.target.value);
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
        })
        .catch((err: Error): void => {
          alert(err.message);
        });
    };
  return (
    <MovieTemplate title="수정">
      <CommentContainer>
        <CommentTitle>코멘트 수정</CommentTitle>
        <CommentTextArea value={comment} onChange={onChangeComment} placeholder="Enter your comment." />
        <SaveButton onClick={() => updateMovie()}>저장</SaveButton>
      </CommentContainer>
    </MovieTemplate>
  );
}