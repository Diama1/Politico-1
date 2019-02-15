import express from 'express';
import routers from './server/routes/routes';

const app = express();

app.use(express.json());
app.use(routers);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to POLITICO');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});


export default app;
