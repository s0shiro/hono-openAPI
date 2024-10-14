import { createRouter } from '@/lib/create-app';

import * as routes from './task.routes';
import * as handlers from './tasks.handlers';

const router = createRouter().openapi(routes.list, handlers.list).openapi(routes.create, handlers.create).openapi(routes.getSingleTask, handlers.getSingle);

export default router;
