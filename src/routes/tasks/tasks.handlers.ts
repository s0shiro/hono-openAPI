import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';

import type { AppRouteHandler } from '@/lib/types';

import db from '@/db';
import { tasks } from '@/db/schema';

import type { CreateRoute, GetSingleRoute, ListRoute } from './task.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json');

  const [inserted] = await db.insert(tasks).values(task).returning();

  return c.json(inserted, HttpStatusCodes.OK);
};

export const getSingle: AppRouteHandler<GetSingleRoute> = async (c) => {
  const { id } = c.req.valid('param');
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!task) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(task, HttpStatusCodes.OK);
};
