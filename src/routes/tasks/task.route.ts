import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

const list = createRoute({
  path: '/tasks',
  method: 'get',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(z.object({
      name: z.string(),
      done: z.boolean(),
    })), 'The list of tasks'),
  },
});

export type ListRoute = typeof list;
