import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { HttpError } from '../middlewares';
import { petService } from '../services/PetService';
import { PetInfoPostRequest } from '../types/PetTypes';

export async function registerPetCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let image = '';
    if (req.file) {
      image = (req.file as Express.MulterS3.File).location;
      console.log(image);
    } else {
      if (_.isEmpty(req.body)) {
        throw new HttpError(
          400,
          'header의 Content-type이 application/json이 맞는지 확인해주세요.'
        );
      }
    }

    const owner = req.currentUserId;

    const {
      species,
      breed,
      name,
      age,
      sex,
      weight,
      medicalHistory,
      vaccination,
      neutralized,
    } = req.body as PetInfoPostRequest;

    const requiredParams = [
      'species',
      'breed',
      'name',

      'sex',
      'weight',
      'medicalHistory',
    ];

    if (!requiredParams.every((param) => req.body[param])) {
      throw new HttpError(400, '필수 정보가 모두 입력되었는지 확인해주세요.');
    }

    const newPet = await petService.addPet({
      owner,
      species,
      breed,
      name,
      age,
      sex,
      weight,
      medicalHistory,
      vaccination, //...(vaccination && {vaccination})
      neutralized,
      image,
    });

    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
}

export async function getPetCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.currentUserId; //

    if (!userId) {
      throw new HttpError(
        403,
        '로그인 한 사용자가 아닙니다. 자신의 펫 정보 조회인지 확인해주세요'
      );
    }

    const petInfos = await petService.getUserPetData(userId);
    res.status(200).json(petInfos);
  } catch (error) {
    next(error);
  }
}

export async function updatePetCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let image = '';
    if (req.file) {
      image = (req.file as Express.MulterS3.File).location;
    } else {
      if (_.isEmpty(req.body)) {
        throw new HttpError(
          400,
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
    }
    //로그인한 사용자의 펫 정보 업데이트
    const currentOwner = req.currentUserId;

    const {
      petId,
      owner,
      species,
      breed,
      name,
      age,
      sex,
      weight,
      medicalHistory,
      vaccination,
      neutralized,
    } = req.body;

    if (owner === currentOwner) {
      const petInfoRequired = { owner, petId };

      const toUpdate = {
        ...(species && { species }),
        ...(breed && { breed }),
        ...(name && { name }),
        ...(age && { age }),
        ...(sex && { sex }),
        ...(weight && { weight }),
        ...(medicalHistory && { medicalHistory }),
        ...(vaccination && { vaccination }),
        ...(neutralized && { neutralized }),
        ...(image && { image }),
      };

      const updatedPetInfo = await petService.setPet(petInfoRequired, toUpdate);

      res.status(200).json(updatedPetInfo);
    } else {
      throw new HttpError(
        403,
        '잘못된 접근입니다. 펫 주인이 맞는지 확인해주세요.'
      );
    }
  } catch (error) {
    next(error);
  }
}

export async function deletePetCTR(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { petId } = req.body;
    const pet = await petService.getPetData(petId);
    const petOwner = req.currentUserId;
    if (pet.owner === petOwner) {
      const deleteResult = await petService.deletePetData(petId);
      res.status(200).json(deleteResult);
    } else {
      throw new HttpError(403, '펫 정보를 삭제할 권한이 없습니다.');
    }
  } catch (error) {
    next(error);
  }
}
