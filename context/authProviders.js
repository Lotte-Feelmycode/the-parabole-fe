import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  let userInfo;
  useEffect(() => {
    userInfo = {
      // TODO : 객체 확정되면 변경
      token: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      userRole: localStorage.getItem('ROLE'),
    };
  });

  // 회원 아이디 정보
  const [user, setUser] = useState(userInfo);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
