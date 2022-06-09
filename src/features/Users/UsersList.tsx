import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser } from './interfaces';
import { userService } from '../../api';

export const UsersList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      try {
        const response = await userService.getUsers();
        isMounted && setUsers(response);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
    };
  }, [location, navigate]);

  return (
    <article>
      <h2>Users List</h2>
      {users.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};
