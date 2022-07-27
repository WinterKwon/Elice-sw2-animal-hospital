import React, { useState, useRef, useCallback } from 'react';
import { UploadFileInput } from '../hospital-info/Style';
import {
  Title,
  RadioButton,
  RadioButtonLabel,
  RadioContainer,
  RadioText,
  Item,
  Contents,
  Container,
  AddInput,
  AddTextarea,
  Button,
  InfoContainer,
  Btn,
  UploadFileLabel,
} from './PetInfoStyle';

function AddPet({ onhandleAdd }: any) {
  const [gender, setGender] = useState<string>();
  const [neut, setNeut] = useState<string>();
  const [img, setImg] = useState<File | null>();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const medicalHistoryRef = useRef<HTMLTextAreaElement>(null);
  const vaccinationRef = useRef<HTMLTextAreaElement>(null);

  const onhandleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGender(value);
  };
  const onhandleNeut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNeut(value);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = {
      image: img,
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      weight: weightRef.current?.value,
      species: speciesRef.current?.value,
      breed: breedRef.current?.value,
      medicalHistory: medicalHistoryRef.current?.value,
      vaccination: vaccinationRef.current?.value,
      sex: gender,
      neutralized: neut,
    };
    onhandleAdd(data);
    formRef.current?.reset();
    setImg(null);
    setNeut('');
    setGender('');
  };

  const onLoadImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImg(file);
  };

  return (
    <Container ref={formRef}>
      <Title>펫 정보를 입력해주세요 🐾</Title>
      <InfoContainer>
        <AddInput placeholder="이름" ref={nameRef} />
        <Contents>
          <AddInput placeholder="종" ref={speciesRef} />
          <AddInput placeholder="품종" ref={breedRef} />
        </Contents>
        <AddInput type="number" placeholder="나이" ref={ageRef} />
        <AddInput type="number" placeholder="무게" ref={weightRef} />
        <Contents>
          <Item>
            <RadioText>성별</RadioText>
          </Item>
          <RadioContainer>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="F"
                checked={gender === 'F'}
                onChange={onhandleGender}
              />
              <RadioButtonLabel />
              <RadioText>F</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="gender"
                value="M"
                checked={gender === 'M'}
                onChange={onhandleGender}
              />
              <RadioButtonLabel />
              <RadioText>M</RadioText>
            </Item>
          </RadioContainer>
        </Contents>
        <Contents>
          <Item>
            <RadioText>중성화</RadioText>
          </Item>
          <RadioContainer>
            <Item>
              <RadioButton
                type="radio"
                name="neutralized"
                value="완료"
                checked={neut === '완료'}
                onChange={onhandleNeut}
              />
              <RadioButtonLabel />
              <RadioText>완료</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="neutralized"
                value="미완료"
                checked={neut === '미완료'}
                onChange={onhandleNeut}
              />
              <RadioButtonLabel />
              <RadioText>미완료</RadioText>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                name="neutralized"
                value="모름"
                checked={neut === '모름'}
                onChange={onhandleNeut}
              />
              <RadioButtonLabel />
              <RadioText>모름</RadioText>
            </Item>
          </RadioContainer>
        </Contents>
        <AddTextarea
          placeholder="진료내역(기억나는 것만 작성해주세요)"
          ref={medicalHistoryRef}
        />
        <AddTextarea
          placeholder="접종내역(기억나는 것만 작성해주세요)"
          ref={vaccinationRef}
        />
      </InfoContainer>
      <InfoContainer>
        <UploadFileLabel htmlFor="uploadFile">펫 사진 업로드</UploadFileLabel>
        <UploadFileInput
          type="file"
          id="uploadFile"
          accept="image/*"
          onChange={onLoadImg}
        />
        <AddInput placeholder="이미지파일" value={img?.name} disabled />
      </InfoContainer>
      <Btn onClick={onSubmit}>펫 추가</Btn>
    </Container>
  );
}

export default AddPet;
