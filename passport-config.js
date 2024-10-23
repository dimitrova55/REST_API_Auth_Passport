import passport from "passport";
import { Strategy } from "passport-local";

import { mock_data } from "./MOCK_DATA.js";

/**
 * To maintain a login session,
 * Passport serializes and deserializes user information
 * to and from the session.
 */
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    try {
        const user = mock_data.find((usr) => usr.id === id)
        
        if(!user)
            throw new Error("User not found");

        done(null, user)        
    } catch (error) {
        done(error, null)
    }
});


/**
 * Whenever a POST request is made to an endpoint,
 * which takes care of authentication,
 * "passport" will look for "username" and "password"
 * inside the req.body that was send through that request.
 * It will pass them as arguments to the callback function,
 * inside the Strategy constructor.
 * 
 * If the "username" is passed differently (with different word),
 * we need to specify it inside "options" within the constructor.
 * 
 * new Strategy({usernameField: "email"}, (username, passport, done) => {})
 * 
 * Look for the username field inside the email field.
 * */
export default passport.use(
    "local",
    new Strategy((username, password, done) => {
        console.log(username, password);
        
        // Search for the user
        try {
            const user = mock_data.find((usr) => usr.username === username)
            
            if(!user)
                throw new Error("User not found.")
            if(user.password !== password) 
                throw new Error('Incorrect password.')

            done(null, user)
        } catch (error) {
            done(error, null);
        }
        
        
        
        
    })
)