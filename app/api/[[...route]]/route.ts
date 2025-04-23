import { Hono } from 'hono';
import signin from './signin';
import login from './login';

export const runtime = 'nodejs';
export const preferredRegion = 'auto';

const app = new Hono()
  .basePath('/api')
  .route('/login', login)
  .route('/signin', signin);

export async function GET(request: Request) {
  return app.fetch(request);
}

export async function POST(request: Request) {
  return app.fetch(request);
}

export async function PUT(request: Request) {
  return app.fetch(request);
}

export async function DELETE(request: Request) {
  return app.fetch(request);
}

// Optional type export
export type AppType = typeof app;
