import { POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';

export default function Event() {
  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');

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
      <PageTitleTemplate>이벤트 등록</PageTitleTemplate>
      <Divider></Divider>

      <FormTitleTemplate>이벤트 제목</FormTitleTemplate>
      <InputTemplate
        type="text"
        value={title}
        onChange={onChangeTitle}
        placeholder="이벤트 제목을 입력하세요"
      ></InputTemplate>

      <FormTitleTemplate>이벤트 설명</FormTitleTemplate>
      <InputTemplate
        type="text"
        value={descript}
        onChange={onChangeDescript}
        placeholder="이벤트 설명을 입력하세요"
      ></InputTemplate>

      <FormTitleTemplate>이벤트 타입</FormTitleTemplate>
      <label>
        <input type="radio" value={'RAFFLE'}></input>
        래플
      </label>
      <label>
        <input type="radio" value={'RAFFLE'}></input>
        래플
      </label>

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

const InputTemplate = styled.input`
  color: black;
  border: 1px solid #cccccc;
  font-size: 12px;
  padding: 1% 2%;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const PageTitleTemplate = styled.h1`
  font-size: 24px;
`;

const FormTitleTemplate = styled.h3`
  font-size: 18px;
`;

const Divider = styled.hr`
  color: black;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: rgb(99, 102, 241, 1);
  color: white;
  focust: outline-none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5em 1.5em 0.5em 1.5em;
`;
