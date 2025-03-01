import config from 'config';
import app from './app';
import logger from './shared/utils/logger';
import connectDB from './shared/utils/dbConnect';

const HOST = config.get('environment.host') as string;
const PORT = config.get('environment.port') as number;
app.listen(PORT, () => {
  connectDB();
  logger.info(`🚀 Server running at ${HOST}:${PORT}`);
});
