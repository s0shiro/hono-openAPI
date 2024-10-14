import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas';

import { insertTaskSchema, selectTaskSchema } from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';

const tags = ['Tasks'];

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTaskSchema), 'The list of tasks'),
  },
});

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(
      insertTaskSchema,
      'The Task to create.',
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'The created task.'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertTaskSchema), 'The validation error(s)'),
  },

});

export const getSingleTask = createRoute({
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'The selected tasks'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found.'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), 'Invalid id error.'),
  },
});

export type ListRoute = typeof list;

export type CreateRoute = typeof create;

export type GetSingleRoute = typeof getSingleTask;
