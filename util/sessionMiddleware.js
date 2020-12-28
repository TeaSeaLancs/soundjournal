import session from "express-session";

export default session({
    secret: "some-test-secret",
    resave: false,
    saveUninitialized: false,
});
