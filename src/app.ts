import createApp from '@/lib/create-app';

const app = createApp();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/error', (c) => {
  c.status(422);
  c.var.logger.debug('Oh woww!');
  throw new Error('Ohh no!');
});

export default app;
