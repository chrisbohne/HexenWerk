import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <h1>Sorry you are not authorized</h1>
      <button onClick={goBack}>go back</button>
    </div>
  );
};

export default Unauthorized;
