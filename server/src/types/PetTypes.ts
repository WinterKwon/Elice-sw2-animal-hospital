import { Types } from 'mongoose';

export interface PetInfo {
  owner: string;
  species: string;
  breed: string;
  name: string;
  age: number;
  sex: string;
  weight: number;
  medicalHistory: string;
  vaccination?: string;
  neutralized?: string;
  image?: string;
}

export interface PetData {
  _id: Types.ObjectId;
  owner: string;
  species: string;
  breed: string;
  name: string;
  age: number;
  sex: string;
  weight: number;
  medicalHistory: string;
  vaccination?: string;
  neutralized?: string;
  image?: string;
}

export interface PetToUpdate {
  petId: string;
  update: {
    [key: string]: string | number;
  };
}

export interface PetInfoPostRequest {
  owner: string;
  species: string;
  breed: string;
  name: string;
  age: number;
  sex: string;
  weight: number;
  medicalHistory: string;
  vaccination?: string;
  neutralized?: string;
  image?: string;
}
