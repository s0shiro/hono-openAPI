import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError } from 'stoker/middlewares';

import { pinoLogger } from './middlewares/pino-logger';

const app = new OpenAPIHono();
app.use(pinoLogger());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/error', (c) => {
  c.status(422);
  throw new Error('Ohh no!');
});

app.notFound(notFound);
app.onError(onError);

export default app;
