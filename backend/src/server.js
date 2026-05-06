import './utils/tracing.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import { env } from './config/env.js';
import { schema, root } from './graphql/schema.js';
import { metricsMiddleware } from './middleware/metricsMiddleware.js';
import healthRoutes from './routes/healthRoutes.js';
import ingestRoutes from './routes/ingestRoutes.js';
import spendRoutes from './routes/spendRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(metricsMiddleware);

app.use(healthRoutes);
app.use(ingestRoutes);
app.use(spendRoutes);
app.use(alertRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    console.log(`FrostSight backend running on port ${env.port}`);
  });
}
