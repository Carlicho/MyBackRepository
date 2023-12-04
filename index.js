import app from './src/server.js';
import expressListRoutes from 'express-list-routes';

const port = 3001;

expressListRoutes(app);

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
