import { ObjectId } from 'mongoose';
import passport from 'passport';
import { userModel } from '../db';
import { passportLocalConfig } from './LocalStrategy';

type User = {
    _id?:ObjectId
}
export function passportConfig() {
  passport.serializeUser((user : User, done) => {
    console.log('serializeUser: ', user);
    console.log('serializeUser의 user._id: ', user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (userId: string, done) => {
    console.log('deserializeUser', userId); // id 불러오는지 확인

    const user = await userModel.findById(userId);
    if (!user) {
      done('회원정보를 찾을 수 없습니다.');
    }
    done(null, user);
  });

  passportLocalConfig();
}
