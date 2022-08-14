import { Router } from 'express';
import * as _ from 'lodash';
import {
  deletePetCTR,
  getPetCTR,
  registerPetCTR,
  updatePetCTR,
} from '../controllers/PetController';

import { loginRequired } from '../middlewares/LoginRequired';
import { upload } from '../utils';

const router = Router();

// 펫 정보 등록
router.post(
  '/register',
  loginRequired,
  upload.single('image'),
  registerPetCTR
);

// 펫 정보 조회
router.get('/mypets', loginRequired, getPetCTR);

//펫 정보 수정
router.patch('/update', loginRequired, upload.single('image'), updatePetCTR);

//펫 정보 삭제
router.delete('/delete', loginRequired, deletePetCTR);

export { router as petRouter};
