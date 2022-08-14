import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {userModel} from '../db';


const localConfig = {
    usernameField : "email",
    passwordField : "password"
}
async function passportVerify(email : string, password : string, done : any) {
    try{
        const user = await userModel.findByEmail(email)

        if(!user){
            done(null, false, {
                messasge : "이메일 가입 내역이 없습니다."
            });
            return;
        }

        const isCorrectPW = await bcrypt.compare(password, user.password);
        if(!isCorrectPW) {
            done(null, false, {
                message : "비밀번호가 일치하지 않습니다."
            });
            return;
        }
       

        done(null, user);
        return;
    } catch (error) {
        done(error)
    }
} 

function passportLocalConfig(){
    passport.use(new LocalStrategy(localConfig, passportVerify))
}

export {passportLocalConfig}





