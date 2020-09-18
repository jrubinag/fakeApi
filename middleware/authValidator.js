function sessionHandleValidator(req, res, next) {
  const { sessionHandle, action } = req.body;
  if (
    (sessionHandle && sessionHandle == '-5b664b7:17451071a53:-1d51') ||
    action === 'Login'
  ) {
    next();
  } else {
    return res.status(440).json({
      error: {
        code: 440,
        message:
          'There is no active session matching the given Session Handle. Please, tap the screen and log in again.',
      },
    });
  }
}

module.exports = sessionHandleValidator;
