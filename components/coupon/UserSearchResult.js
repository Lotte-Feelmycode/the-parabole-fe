import { useEffect, useState } from 'react';

export default function UserSearchResult({ userList }) {
  const [getList, setGetList] = useState([]);

  useEffect(() => {
    setGetList(userList);
  }, []);

  if (getList) {
    return (
      <ul className="user-list">
        {getList &&
          getList.map((user) => (
            <li key={user.id}>
              {user.username}&nbsp;{user.email}&nbsp;{user.phone}
            </li>
          ))}
      </ul>
    );
  }
  return '';
}
