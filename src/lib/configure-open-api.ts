import type { AppOpenAPI } from './types';

import packageJSON from '../../package.json';

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Task API',
    },
  });
}
