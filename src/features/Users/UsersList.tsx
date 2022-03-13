import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAxiosPrivate } from '../../hooks';

interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const UsersList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState<IUser[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users/get', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

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
