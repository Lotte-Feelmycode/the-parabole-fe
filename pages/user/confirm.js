import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GET } from '@apis/defaultApi';

const Confirm = () => {
  const [signupInfo, setSignupInfo] = useState([]);
  const [id, setId] = useState((useRouter().query.id || 1).toString());
  // TODO: 방금 회원가입한 계정의 userId 불러오기 실패. 그냥 1로 처리하고 넘어갔음
  console.log('router query id: ' + useRouter().query.id);
  console.log('id: ' + id);

  useEffect(() => {
    GET(`/user/${id}`).then((data) => {
      if (data) {
        setSignupInfo(data);
      }
    });
  }, []);

  return (
    <div className="signup-info">
      <ul>
        <li>{signupInfo.email}</li>
        <li>{signupInfo.username}</li>
        <li>{signupInfo.nickname}</li>
        <li>{signupInfo.phone}</li>
      </ul>
    </div>
  );
};

export default Confirm;
