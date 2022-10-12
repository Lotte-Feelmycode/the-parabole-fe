import { GET } from '@apis/defaultApi';
import { useEffect, useState } from 'react';

export default function UserSearchBar({}) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    GET(`/user/list`, {}).then((res) => {
      setUserList(res.data);
    });
  }, []);

  return (
    <ul className="user-list">
      {userList &&
        userList.map((user) => (
          <li key={user.id}>
            {user.username}&nbsp;{user.email}&nbsp;{user.phone}
          </li>
        ))}
    </ul>
  );
}
