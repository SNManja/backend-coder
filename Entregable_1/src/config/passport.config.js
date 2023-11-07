import express from "express";
import passport from "passport";
import GithubStrategy from "passport-github2";
import local from "passport-local";
import { userModel } from "../dao/Mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const app = express();
/*
    Github Auth
    
    Owned by: @MonkiManja
    App ID: 388105
    Client ID: Iv1.ef39cd7715c6a2a6

    35a6caf447e21580a37d3156fede326c85be0d98
*/

async function getNewCart(){
    try {
        const response = await fetch('http://localhost:8080/api/cart/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Received data:', data);
          // You can access the 'carrito' property from the data object
          const carritoId = data.carrito;
          return carritoId;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        throw error;
      }
}


const LocalStrategy = local.Strategy;

/*
============================================================
                    Github Strategy
============================================================
*/

const initPassport = () =>{
/*
============================================================
                    Github Strategy
============================================================
*/
    passport.use("github", new GithubStrategy({
        clientID: "Iv1.ef39cd7715c6a2a6",
        clientSecret: "35a6caf447e21580a37d3156fede326c85be0d98",
        callbackURL: "https://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log("perfil obtenido del usuario")
        console.log(profile)
        try{
            const user = await userModel.findOne({email: profile._json.email })
            console.log("Usuario encontrado para login")
            console.log(user)

            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile_json.email,
                    password: "",
                    cart: await  getNewCart(),
                    loggedBy: "Github"
                }
                const result =  await userModel.create(newUser)
                return done(null, result)
            }
            return done(null, user)
        } catch (err) {
            return done(err)
        }


    }))

/*
============================================================
                    Local Strategy
============================================================
*/
    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req,username, password, done) =>{
            const { first_name, last_name, email, age } = req.body
            try {
                const exists = await userModel.findOne({ email: username })
                if( exists ){
                    return done(null, false)
                }

                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: await getNewCart(),
                    loggedBy: "App"
                }; // Falta agregar rol y carrito
        
                const result = await userModel.create(user)
                
                return done(null, result)
            } catch (err){
                return done(`Error al crear el usuario: ${err.message}`)
            }
            
        }
    ))

    passport.use('login', new LocalStrategy({ 
            passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use("restorePassword", new LocalStrategy({
        passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                req.logger.debug("User: ")
                const user = await userModel.findOne({ email: username });
                req.logger.debug("Usuario existe:");
                req.logger.debug(user);
                if (!user) {
                    req.logger.warn("User doesn't exist with that mail");
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done)  => {
        let result = await userModel.findById(id);
        done(null, result)
    })
    
}

export default initPassport;