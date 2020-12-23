import express, { Request, Response } from 'express';

const rootController = express.Router();

rootController.get('/', (req: Request, res: Response) => {
  res.send({ response: 'I am alive' }).status(200);
});

export default rootController;
