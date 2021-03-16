import {Namespace} from '../reducer';

export const getSelectedGenre = (state) => state[Namespace.SETTINGS].genre;
export const getShowedFilmsCount = (state) => state[Namespace.SETTINGS].showedFilmsCount;
