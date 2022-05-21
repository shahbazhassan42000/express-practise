import express from 'express';
// import middlewares from '../middlewares';
import directory from './directory';

const { Router } = express;
const api = Router();

// internal middleware
// router.use(middlewares());


//book directory apis
api.use('/directory', directory);

export default api;
