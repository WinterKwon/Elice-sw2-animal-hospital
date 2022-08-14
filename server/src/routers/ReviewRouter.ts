import { Router } from 'express';
import {
  postReviewCTR,
  getReviewCTR,
  getMyReviewCTR,
  updateReviewCTR,
  getAllReviewsCTR,
  deleteReviewCTR,
  getHospitalRatingCTR,
} from '../controllers/ReviewController';

import { loginRequired } from '../middlewares';

const router = Router();

//리뷰 등록
router.post('/posting', loginRequired, postReviewCTR);

//병원상세페이지에서 병원 리뷰 조회
router.get('/vet', getReviewCTR);

//개별 병원의 리뷰 평균
router.get('/vet/star', getHospitalRatingCTR);

//일반유저의 자신이 작성한 리뷰 조회
router.get('/user', loginRequired, getMyReviewCTR);

//관리자의 모든 리뷰 조회
router.get('/admin', loginRequired, getAllReviewsCTR);

//일반유저의 자기 리뷰 수정
router.patch('/update', loginRequired, updateReviewCTR);

//일반유저의 자기 리뷰 삭제
router.delete('/delete', loginRequired, deleteReviewCTR);

export { router as reviewRouter };
