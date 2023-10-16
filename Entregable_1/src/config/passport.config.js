import passport from "passport";
import GithubStrategy from "passport-github2";
import local from "passport-local";
import { userModel } from "../dao/Mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

/*
    Github Auth
    
    Owned by: @MonkiManja
    App ID: 388105
    Client ID: Iv1.ef39cd7715c6a2a6

    35a6caf447e21580a37d3156fede326c85be0d98
*/


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
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: createHash(password),
                    role: "user",
                    cart: "New cart id"
                }
        
                const result = await userModel.create(user)
                
                return done(null, result)
            } catch (err){
                return done(`Error al crear el usuario: ${err.message}`)
            }
            
        }
    ))

    passport.use("login", new LocalStrategy({usernameField: "email"}, async (username, password, done)=> {
        try{
            const user= await userModel.findOne({ email: username })
        
            if (!user){ 
                res.status(401).send({ status: "error", error: "Incorrect credentials"})
                return done(null, false)
            }

            if(!isValidPassword(user, password)){
                res.status(403).send({ status: "error", error: "Incorrect password"})
            }
        /*
            Esto estaba rompiendo todo, ver pq
            
            req.session.user = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: user.role,
                cart: user.cart
            } 

        */
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done)  => {
        let result = await userModel.findById(id);
        done(null, result)
    })
    
}

export default initPassport;