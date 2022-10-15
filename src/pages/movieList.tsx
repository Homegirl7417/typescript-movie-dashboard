import React from 'react';
import MovieTemplate from '../components/template/MovieTemplate';

export default function MovieList(): React.ReactElement {
  return (
    <MovieTemplate title="영화 목록">
      <div>영화 목록 페이지네이션 구현</div>
    </MovieTemplate>
  );
}
