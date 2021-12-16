import passport from "passport";
import { generateAccessToken } from "./generateToken.js";
import GoogleStrategy from "passport-google-oauth20";

const googleCloudStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/users/googleRedirect`,
    },
    async (accessToken, refreshToken, profile, passportNext) => {
      try {
        // This callback is executed when Google gives us a successful response
        // We are receiving also some informations about the user from Google (profile, email)
  
        console.log("GOOGLE PROFILE: ", profile)
  
        // 1. Check if the user is already in our db
        const user = await UserModel.findOne({ googleId: profile.id })
  
        if (user) {
          // 2. If the user is already there --> create some tokens for him/her
          const tokens = await generateAccessToken(user)
          // 4. passportNext()
          passportNext(null, { tokens })
        } else {
          // 3. If it is not --> add user to db and then create some tokens for him/her
  
          const newUser = new UserModel({
            name: profile.name.givenName,
            surname: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
          })
  
          const savedUser = await newUser.save()
  
          const tokens = await generateAccessToken(savedUser)
  
          // 4. passportNext()
          passportNext(null, { tokens })
        }
      } catch (error) {
        passportNext(error)
      }
    }
  )
  
  passport.serializeUser(function (data, passportNext) {
    passportNext(null, data)
  })

  passport.deserializeUser(function (data, passportNext) {
    passportNext(null, data)
  })
  
  export default googleCloudStrategy