import { FC, useState } from 'react';

interface ILogin {
  onSubmit(username: string, password: string): void;
}

const Login: FC<ILogin> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault;
          onSubmit(username, password);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
