import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:pr-0">
      <div className="hidden lg:block">
        <Link
          to="/signin"
          className="text-blue-500 text-xl font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signin;