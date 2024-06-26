/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as fal from '@fal-ai/serverless-client';
import * as falProxy from '@fal-ai/serverless-proxy/express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';

dotenv.config({path: './.env.local'});

const app = express();

// Middlewares
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

// fal.ai client proxy
app.all(falProxy.route, cors(), falProxy.handler);

// Your API endpoints
app.get('/api/healthcheck', (_req, res) => {
  res.send({ message: 'OK' });
});

app.get('/api/musicgen', async (req, res) => {
  const result = await fal.subscribe('fal-ai/musicgen', {
    input: {
      prompt: req.query.prompt
    },
    logs: true,
    onQueueUpdate: update => {
      if (update.status === 'IN_PROGRESS') {
        // update.logs?.map(log => log.message).forEach(console.log);
      }
    }
  });
  res.send(result);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
