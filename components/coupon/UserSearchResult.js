export default function UserSearchResult({ userList }) {
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
