import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';

import type { AppBindings, AppRouteHandler } from '@/lib/types';

import type { ListRoute } from './task.route';

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    { name: 'Learn Hono', done: false },
  ]);
};
