import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';
import * as btn from '@components/input/Button';

export default function UserSearchBar({}) {
  const [userList, setUserList] = useState([]);

  // useEffect(() => {
  //   GET(`/user/list`, {}).then((res) => {
  //     setUserList(res.data);
  //   });
  // }, []);

  function userSearch(name) {
    GET(`/user/listbyname`, { name }).then((res) => {
      if (res.response.status === 200) {
        console.log(res.data.data);
        setUserList(res.data.data);
      }
    });
  }

  return (
    <div>
      <input type="text" placeholder="Search..">
        <btn.LineBlue
          buttonText="회원가입하기"
          type="submit"
          onClickFunc={() => userSearch()}
        />
      </input>
      <ul className="user-list">
        {userList &&
          userList.map((user) => (
            <li key={user.id}>
              {user.username}&nbsp;{user.email}&nbsp;{user.phone}
            </li>
          ))}
      </ul>
    </div>
  );
}
