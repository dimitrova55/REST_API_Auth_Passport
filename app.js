import express from "express";
import passport from "passport";
import session from "express-session";

import "./local-strategy.js";


const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    session({
    secret: "secretword",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60
    }
})
)
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json({message: `Rest API Authentication using Passport.`})
})

app.post('/api/login', passport.authenticate("local"), (req, res) => {
    res.status(200).json({message: 'User authenticated.'})
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})