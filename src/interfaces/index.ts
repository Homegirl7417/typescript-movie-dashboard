export interface Person {
  id: number;
  name: string;
  popularity: string;
  known_for_department: string;
}

export interface TV {
  id: number;
  name: string;
  backdrop_path: string;
  first_air_date: string;
  popularity: number;
}

export interface Movie {
  id: number;
  backdrop_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  media_type: string;
}

export interface MovieTemplateProps {
  title: string;
  userEmail: string;
  children: JSX.Element;
}

export interface MovieTableColumn {
  field: 'title' | 'voteAverage' | 'voteCount' | 'releaseDate';
  headerName: string;
  width: number;
};

export interface TvTableColumn {
  field: 'name' | 'first_air_date' | 'popularity';
  headerName: string;
  width: number;
};

export interface PersonTableColumn {
  field: 'name' | 'known_for_department' | 'popularity';
  headerName: string;
  width: number;
};

export interface MovieTableProps {
  rows: Movie[];
  deleteMovie?: (title: string, media_type: string, media_id: number) => Promise<void>;
  moveToUpdateMovie?: (media_type: string, media_id: number) => void;
}

export interface TvTableProps {
  rows: TV[];
}

export interface PersonTableProps {
  rows: Person[];
}

export interface HeaderProps {
  title: string;
  userName: string;
  userEmail: string;
}

export interface UpdateMovieRouterProps {
  media_type: string;
  media_id: number;
}