export interface Movie {
  id: number;
  backdrop_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieTableColumn {
  field: 'title' | 'voteAverage' | 'voteCount' | 'releaseDate';
  headerName: string;
  width: number;
}