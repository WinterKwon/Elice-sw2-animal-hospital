import { Router } from 'express';
import * as _ from 'lodash';

import { loginRequired, adminOnly } from '../middlewares';
import {
  registerUserCTR,
  getUserInfoCTR,
  updateUserInfoCTR,
  getAllUsersCTR,
  ExpireUserCTR,
  loginPassportCTR,
  setUserStatusCTR,
} from '../controllers/UserController';

const router = Router();

//회원가입
router.post('/register', registerUserCTR);

//로그인
router.post('/login', loginPassportCTR);

//일반회원 개인정보 조회
router.get('/user', loginRequired, getUserInfoCTR);

//일반회원 개인정보 수정
router.patch('/users/:userEmail', loginRequired, updateUserInfoCTR);

// 관리자의 일반 회원 전체 조회
router.get('/userlist', adminOnly, getAllUsersCTR);

// 관리자의 일반회원 상태 변경
router.patch('/admin/status', loginRequired, adminOnly, setUserStatusCTR);

// 일반 회원 탈퇴
router.patch('/expiration', loginRequired, ExpireUserCTR);

export { router as userRouter };
