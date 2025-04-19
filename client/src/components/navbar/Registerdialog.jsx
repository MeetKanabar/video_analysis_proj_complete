import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:pr-0">
      <div className="hidden lg:block">
        <Link
          to="/signup"
          className="bg-blue-100 text-blue-500 text-xl font-medium py-4 w-40 block m-4 rounded-tl-2xl rounded-tr-full rounded-bl-full rounded-br-full shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 text-center"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Register;