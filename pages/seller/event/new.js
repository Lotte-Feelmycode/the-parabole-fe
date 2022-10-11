import { POST } from '@apis/defaultApi';
import useInput from '@hooks/useInput';
import styled from '@emotion/styled';
import Heading from '@components/input/Heading';
import Input from '@components/input/Input';
import Radio from '@components/input/Radio';
import * as btn from '@components/input/Button';
import { useState } from 'react';
import dayjs from 'dayjs';
import ImageUploader from '@components/input/ImageUploader';
import SellerLayout from '@components/seller/SellerLayout';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';

export default function Event() {
  const router = useRouter();

  const [title, onChangeTitle] = useInput('');
  const [descript, onChangeDescript] = useInput('');
  const [type, setEventType] = useState('');
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());

  // TODO : 라디오버튼 수정예정
  const handleTypeChange = (e) => {
    // console.log(e);
    // const { na0.me, value } = e.target;
    // setSelectData({
    //   [name]: value,
    // });
  };

  // TODO : API 호출 부분 수정 (이미지 업로더, 경품목록)
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const eventParams = {
      //userId: localStorage.getItem("ID"),
      userId: 1,
      createdBy: 'SELLER',
      type: 'RAFFLE',
      startAt: dayjs(startAt).format('YYYY-MM-DDTHH:mm:ss'),
      endAt: dayjs(endAt).format('YYYY-MM-DDTHH:mm:ss'),
      title: title,
      descript: descript,
      eventImage: {
        eventBannerImg: 'dummyimage',
        EventDetailImg: 'dummydetail',
      },
      eventPrizeCreateRequestDtos: [
        { id: 1, type: 'PRODUCT', stock: 30 },
        { id: 2, type: 'PRODUCT', stock: 30 },
      ],
    };

    POST('/event', eventParams).then((res) => {
      if (res && res.data > 0) {
        alert('이벤트가 등록되었습니다. ');
        router.push({ pathname: `/seller/event/list` }, `/seller/event/list`);
      }
    });
  };

  return (
    <SellerLayout>
      <FormTemplate onSubmit={onSubmitHandler}>
        <Heading title="이벤트 등록" type="h1"></Heading>
        <Divider />
        <Heading title="이벤트 제목" type="h2"></Heading>
        <Input
          type="text"
          name="eventTitle"
          value={title}
          onChange={onChangeTitle}
          css={{
            border: '0.1px solid #52525224',
            placeholder: '이벤트 제목을 입력하세요',
          }}
        ></Input>
        <Divider />
        <Heading title="이벤트 설명" type="h2"></Heading>
        <Input
          type="text"
          name="eventDescript"
          value={descript}
          onChange={onChangeDescript}
          css={{
            border: '0.1px solid #52525224',
            placeholder: '이벤트 설명을 입력하세요',
          }}
        ></Input>
        <Divider />
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
        <Divider />
        <Heading title="이벤트 진행 일시" type="h2" />
        <Heading title="시작 일시" type="h3" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarContainer>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              inputFormat="YYYY/MM/DD hh:mm a"
              mask="____/__/__ __:__ _m"
              value={startAt}
              onChange={setStartAt}
            />
          </CalendarContainer>
          <Heading title="종료 일시" type="h3" />
          <CalendarContainer>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              inputFormat="YYYY/MM/DD hh:mm a"
              mask="____/__/__ __:__ _m"
              value={endAt}
              onChange={setEndAt}
            />
          </CalendarContainer>
        </LocalizationProvider>
        <Divider />
        <Heading title="이벤트 경품 선택" type="h2"></Heading>
        {/* TODO: 동적 테이블 추가 */}
        <Divider />
        {/* TODO: 이미지 업로드 추후 수정 */}
        <Heading title="이벤트 배너 이미지" type="h2"></Heading>
        <Div>
          <ImageUploader></ImageUploader>
        </Div>
        <Divider />
        <Heading title="이벤트 상세 이미지" type="h2"></Heading>
        <Div>
          <ImageUploader></ImageUploader>
        </Div>
        <Divider />
        <Div>
          <btn.Blue
            buttonText="등록하기"
            name="btnPost"
            onClickFunc={onSubmitHandler}
          ></btn.Blue>
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

const CalendarContainer = styled.div`
  width: 40%;
  margin-bottom: 20px;
`;
