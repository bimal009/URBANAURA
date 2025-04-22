import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import login from './login';
import signin from './signin';

export const runtime = 'nodejs';
export const preferredRegion = 'auto';

const app = new Hono().basePath('/api')
.route('/signin', signin)
.route('/login', login)


export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

// App type
export type AppType = typeof app;
