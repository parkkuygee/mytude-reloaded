export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    console.log(res.locals);
    res.locals.siteName= "Mytube";
    next();
};