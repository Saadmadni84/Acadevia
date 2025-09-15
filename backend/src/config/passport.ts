import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = { id: jwt_payload.id }
      if (user) return done(null, user)
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  })
)

export default passport
