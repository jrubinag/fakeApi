const jsonServer = require('json-server');
const server = jsonServer.create();
const db = require('./db.json');
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const mockAPIRouter = require('./routers/mockAPI');
const sessionValidator = require('./middleware/authValidator');

const port = process.env.PORT || 3000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router

// Verify sessionHandler
server.use(sessionValidator);

server.use('/api', mockAPIRouter);
// console.log(router.db.get('users').value());

//use default router
server.use(router);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log({ err });
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port);
