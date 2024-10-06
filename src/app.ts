import createApp from '@/lib/create-app';
import index from '@/routes/index.route';

import configureOpenAPI from './lib/configure-open-api';

const app = createApp();

const routes = [index];

configureOpenAPI(app);
routes.forEach((route) => {
  app.route('/', route);
});
export default app;
