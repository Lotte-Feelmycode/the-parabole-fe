import { POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Heading from '@components/input/Heading';
import Input from '@components/input/Input';
import Radio from '@components/input/Radio';
import PostButton from '@components/input/Button';
import { useState, useRef } from 'react';
import ImageUploader from '@components/input/ImageUploader';
import SellerLayout from '@components/seller/SellerLayout';

export default function Event() {
  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');
  const [type, setEventType] = useState('');

  // TODO : 라디오버튼 수정예정
  const handleTypeChange = (e) => {
    // console.log(e);
    // const { na0.me, value } = e.target;
    // setSelectData({
    //   [name]: value,
    // });
  };

  // TODO : API 호출 부분 수정 (Date, 이미지, 경품목록)
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const eventParams = {
      userId: 1,
      createdBy: 'SELLER',
      type: 'RAFFLE',
      startAt: '2022-10-22T00:00:00',
      endAt: '2022-10-28T18:00:00',
      //type: document.querySelector('input[name=eventType]:checked').value,
      title: title,
      descript: descript,
    };

    const data = POST('/event', eventParams);
    // TODO : 등록 후 이벤트 목록 페이지로 리다이렉트
  };

  return (
    <SellerLayout>
      <FormTemplate onSubmit={onSubmitHandler}>
        <Heading title="이벤트 등록" type="h1"></Heading>
        <Divider></Divider>
        <Heading title="이벤트 제목" type="h2"></Heading>
        <Input
          type="text"
          name="eventTitle"
          value={title}
          onChange={onChangeTitle}
          placeHolder="이벤트 제목을 입력하세요"
        ></Input>
        <Divider></Divider>
        <Heading title="이벤트 설명" type="h2"></Heading>
        <Input
          type="text"
          name="eventDescript"
          value={descript}
          onChange={onChangeDescript}
          placeHolder="이벤트 설명을 입력하세요"
        ></Input>
        <Divider></Divider>
        <Heading title="이벤트 타입" type="h2"></Heading>
        <Div>
          <Radio
            name="eventType"
            value="RAFFLE"
            text="추첨 이벤트"
            onChange={handleTypeChange}
          ></Radio>

          <Radio
            name="eventType"
            value="FCFS"
            text="선착순 이벤트"
            onChange={handleTypeChange(this)}
          ></Radio>
        </Div>
        <Divider></Divider>

        {/* TODO: 이미지 업로드 추후 수정 */}
        <Heading title="이벤트 배너 이미지" type="h2"></Heading>
        <Div>
          <ImageUploader></ImageUploader>
        </Div>
        <Divider></Divider>
        <Heading title="이벤트 상세 이미지" type="h2"></Heading>
        <Div>
          <ImageUploader></ImageUploader>
        </Div>

        <Divider></Divider>
        <Div>
          <PostButton
            id="btnPost"
            onClickFunc={onSubmitHandler}
            buttonText="등록하기"
          ></PostButton>
        </Div>
      </FormTemplate>
    </SellerLayout>
  );
}

const FormTemplate = styled.form`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
