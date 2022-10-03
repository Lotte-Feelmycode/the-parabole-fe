import { POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Heading from '@components/input/heading';
import Input from '@components/input/input';
import Radio from '@components/input/radio';
import PostButton from '@components/input/button';
import { useState } from 'react';
export default function Event() {
  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');
  const [type, setEventType] = useState({ type: "FCFS" });

  const handleTypeChange = (e) => {
    // console.log(e);
    // const { name, value } = e.target;
    // setSelectData({
    //   [name]: value,
    // });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const eventParams = {
      sellerId: 1,
      createdBy: 'SELLER',
      type: document.querySelector('input[name=eventType]:checked').value,
      title: title,
      descript: descript,
    };

    POST('/event', eventParams);
  };

  return (
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

      <Heading title="이벤트 설명" type="h2"></Heading>
      <Input
        type="text"
        name="eventDescript"
        value={descript}
        onChange={onChangeDescript}
        placeHolder="이벤트 설명을 입력하세요"
      ></Input>

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
      <PostButton
        id="btnPost"
        onClick={onSubmitHandler}
        buttonText="등록하기"
      ></PostButton>
    </FormTemplate>
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
  align-items : center;
  flsx-direction : row;
`