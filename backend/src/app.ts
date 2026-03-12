import cors from 'cors';
import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './common/constants.ts';
import swaggerSpec from './docs/swaggerDef.ts';
import categoriesRouter from './routes/categories.ts';
import indexRouter from './routes/index.ts';
import providersRouter from './routes/providers.ts';
import rssRouter from './routes/rss.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', indexRouter);
app.use('/rss', rssRouter);
app.use('/providers', providersRouter);
app.use('/categories', categoriesRouter);
app.use((_: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`),
);

export default app;
