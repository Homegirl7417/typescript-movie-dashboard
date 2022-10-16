export interface Movie {
  id: number;
  backdrop_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  media_type: string;
}

export interface MovieTableColumn {
  field: 'title' | 'voteAverage' | 'voteCount' | 'releaseDate';
  headerName: string;
  width: number;
}

export interface MovieTableProps {
  rows: Movie[];
  deleteMovie: (title: string, media_type: string, media_id: number) => Promise<void>;
  openCommentTextArea: (media_type: string, media_id: number) => void;
}