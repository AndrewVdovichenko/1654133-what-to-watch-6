import {Namespace} from '../reducer';

export const getMovie = (state) => state[Namespace.MOVIE].movie;
export const getLoadedMovieStatus = (state) => state[Namespace.MOVIE].isMovieLoaded;
export const getComments = (state) => state[Namespace.MOVIE].comments;
