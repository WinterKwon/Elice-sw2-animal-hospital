import { reviewService, userService } from '../services';
import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { blockInvalidRequest } from './Utils';
import { HttpError } from '../middlewares';


//리뷰 등록
export async function postReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, targetHospital, date, content, like } = req.body;
    const requiredParams = [
      'userId',
      'targetHospital',
      'date',
      'content',
      'like',
    ];
    blockInvalidRequest(req.body, requiredParams);

    const currentUserId = req.currentUserId;
    const isPermittedUser = await userService.blockUnauthorized(userId);

    if (!isPermittedUser || currentUserId !== userId) {
      throw new HttpError(
        403,
        '작성권한이 없거나 로그인한 사용자와 작성자가 일치하지 않습니다.'
      );
    }

    const reviewInfo = { userId, targetHospital, date, content, like };
    const newReview = await reviewService.addReview(reviewInfo);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
}

//각 병원페이지에서의 해당병원 리뷰
export async function getReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    blockInvalidRequest(req.body);

    const { hospitalId } = req.body;

    const hospitalReviews = await reviewService.getReviewsByHospital(hospitalId);
    res.status(200).json(hospitalReviews);
  } catch (error) {
    next(error);
  }
}

//개인 사용자의 자기 작성 리뷰 조회
export async function getMyReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.currentUserId;
    const userRole = req.userRole;

    if (userRole === 'basic-user') {
      const reviews = await reviewService.getReviewsByUser(userId);
      res.status(200).json(reviews);
    } else {
      throw new HttpError(403, '해당 리뷰를 조회할 권한이 없습니다.');
    }
  } catch (error) {
    next(error);
  }
}

//관리자의 전체 리뷰 조회
export async function getAllReviewsCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userRole = req.userRole;
    if (userRole === 'admin') {
      const reviews = await reviewService.getAllReviews();
      res.status(200).json(reviews);
    } else {
      throw new HttpError(403, '조회 권한이 없습니다.');
    }
  } catch (error) {
    next(error);
  }
}

// 일반 회원의 리뷰 수정
export async function updateReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    blockInvalidRequest(req.body);

    const { reviewId, userId, targetHospital, date, content, like } = req.body;

    const currentUserId = req.currentUserId;
    const userRole = req.userRole;

    if (userId !== currentUserId || userRole === 'admin') {
      throw new HttpError(403, '잘못된 접근입니다.');
    }
    const toUpdate = {
      ...(date && { date }),
      ...(content && { content }),
      ...(like && { like }),
    };

    const updatedReview = await reviewService.updateReview(reviewId, toUpdate);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
}

export async function deleteReviewCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { reviewId, userId, targetHospital } = req.body;
    const requiredParams = ['reviewId', 'userId', 'targetHospital'];
    blockInvalidRequest(req.body);
    const currentUserId = req.currentUserId;
    const userRole = req.userRole;
    const review = await reviewService.getEachReview(reviewId);

    // 사용자 및 삭제 대상 병원 확인
    if (
      userRole === 'admin' ||
      (userId === currentUserId && targetHospital === review.targetHospital)
    ) {
      const deleteResult = await reviewService.deleteReviewData(reviewId);
      res.status(200).json(deleteResult);
    } else {
      throw new HttpError(403, '잘못된 삭제 시도입니다.');
    }
  } catch (error) {
    next(error);
  }
}

//병원의 평균리뷰점수
export async function getHospitalRatingCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const avgReview = await reviewService.getHospitalRating();
    res.status(200).json(avgReview);
  } catch (error) {
    next(error);
  }
}
