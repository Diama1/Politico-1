import morgan from 'morgan';
import express from 'express';
import '@babel/polyfill';
import routes from './server/routes/routes';


const app = express();


if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));


app.use(express.json());
app.use(routes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});


export default app;
