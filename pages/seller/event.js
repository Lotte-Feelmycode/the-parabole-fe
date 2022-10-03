import { POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Heading from '@components/input/heading';
import Input from '@components/input/input';
import Radio from '@components/input/radio';
export default function Event() {
  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');

  const eventTypeList = [
    {
      text: '래플 이벤트',
      value: 'RAFFLE',
    },
    {
      text: '선착순 이벤트',
      value: 'FCFS',
    },
  ]

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const eventParams = {
      sellerId: 1,
      createdBy: 'SELLER',
      type: 'RAFFLE',
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

      <Radio name="eventType" options={eventTypeList}></Radio>
      <Divider></Divider>

      <div className="posting-button-container">
        <Button type="submit" onClick={onSubmitHandler}>
          등록하기
        </Button>
      </div>
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

const Button = styled.button`
  background-color: tomato;
  color: white;
  focust: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5em 1.5em 0.5em 1.5em;
`;
