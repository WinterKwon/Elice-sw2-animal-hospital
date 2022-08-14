import { model} from 'mongoose';
import { ReviewSchema } from '../schemas/ReviewSchema';
import { ReviewInfo, ReviewData } from '../../types/ReviewTypes';
import { HttpError } from '../../middlewares';


const Review = model('reviews', ReviewSchema);

interface ToUpdate {
    reviewId : string,
    update : {
        [key : string] : string | number |Date
    }
}
export class ReviewModel {
  async findByOwnerId(userId: string): Promise<ReviewData[]> {
    const review = await Review.find({ userId });
    if (!review) {
      throw new HttpError(
        400,
        '유저가 작성한 리뷰가 없습니다.');
    }
    return review;
  }

  async findByHospitalId(hospitalId : string): Promise<ReviewData[]> {
    const review = await Review.find({targetHospital : hospitalId});
    if(!review){
        throw new HttpError(
          400,
          '해당 병원에 대한 리뷰가 없습니다.')
    }
    return review;
  }

  async findById(id :string) : Promise<ReviewData>{
    const review = await Review.findOne({_id:id});
    if(!review){
        throw new HttpError(
          404,
          '리뷰를 찾을 수 없습니다.')
    }
    return review;

  }

  async createReview(requiredInfo : ReviewInfo): Promise<ReviewData> {
    const newReview = await Review.create(requiredInfo);
    return newReview;
  }

  
  //관리자용 모든 리뷰 조회
  async findAll(): Promise<ReviewInfo[]> {
    const reviews = await Review.find({});
    return reviews;
  }

  async updateReview({reviewId, update} : ToUpdate): Promise<ReviewData> {
    const filter = {_id : reviewId};
    const option = {returnOriginal : false};
    const updatedReview = await Review.findOneAndUpdate(filter, update, option);
    if(!updatedReview){
        throw new HttpError(
          400,
          "요청한 리뷰를 찾을 수 없습니다.")
    }
    return updatedReview;

  }

  async deleteReview(reviewId : string): Promise<{deletedCount : number}> {
    const result = await Review.deleteOne({_id : reviewId});
    return result;
  }

  async getHospitalRating(){
    const avgStar = await Review.aggregate([
      {
        $group: {_id : '$targetHospital', avg : {$avg : '$like'}}
      
      }
    ])
    return avgStar;
  }
}

const reviewModel = new ReviewModel();

export {reviewModel};