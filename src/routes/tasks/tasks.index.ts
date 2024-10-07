import { createRouter } from '@/lib/create-app';

import * as routes from './task.routes';
import * as handlers from './tasks.handlers';

const router = createRouter().openapi(routes.list, handlers.list);

export default router;
