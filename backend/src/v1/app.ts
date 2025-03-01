import express, { Express, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import createError from 'http-errors';
import cors from 'cors';
import permissionRoute from './modules/userRolesAndPermissions/permissions/permission.routes';
import userRoleRoute from './modules/userRolesAndPermissions/userRoles/userRole.routes';
import corsOption from './shared/utils/corsOptions';
import allowedOrigins from './shared/utils/allowedOrigins';
import sessionConfig from './shared/utils/sessionConfig';
import { limiter } from './shared/utils/rate-limiter';

declare module 'express-session' {
  interface SessionData {
    isAuthenticated: string | any;
  }
}

const app: Express = express();

app.use(limiter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers || '';
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Headers', 'true');
    res.header('Content-Type', 'application/json');
  }
  next();
});

app.use(cors<Request>(corsOption));
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionConfig);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Awesome it works 🐻' });
});

app.use('/api/permissions', permissionRoute);
app.use('/api/user-roles', userRoleRoute);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: 'error',
    errors: err.message,
  });
  return;
});

export default app;
