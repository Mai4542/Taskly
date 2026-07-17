import { useState, useEffect } from 'react';
import PasswordChecklist from '../../components/PasswordCheckList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../schemas/signUp.schema';
import type { SignUpForm } from '../../schemas/signUp.schema';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { signUpUser, clearError } from '../../store/slices/authSlice';
import eye1 from '../../assets/imgs/eye1.png';
import eye2 from '../../assets/imgs/eye2.png';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, token } = useSelector(
    (state: RootState) => state.auth,
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });

  const passwordValue = watch('password', '');

  useEffect(() => {
    if (token) {
      navigate('/dashboard/projects', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: SignUpForm) => {
    const signUpData = {
      email: data.email,
      password: data.password,
      data: {
        name: data.name,
        ...(data.jobTitle && data.jobTitle.trim() !== ''
          ? { job_title: data.jobTitle.trim() }
          : {}),
      },
    };

    dispatch(signUpUser(signUpData));
  };

  return (
    <>
      <form
        className="max-w-xl mx-h-[838.5px]   mx-auto mt-10 p-16 bg-white rounded-xl shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=" headline-lg text-neutral-high text-center">
          Create your workspace
        </h2>
        <h3 className="body-md mb-6 text-neutral-medium text-center">
          Join the editorial approach to task management.
        </h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="mb-4 mt-10">
          <label
            htmlFor="username"
            className="block text-neutral-medium label-sm mb-2"
          >
            NAME
          </label>
          <input
            {...register('name')}
            type="text"
            id="username"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <h2 className="text-neutral-low text-[11px] ">
            3-50 characters, letters only.
          </h2>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-neutral-medium label-sm mb-2"
          >
            EMAIL
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="yourname@company.com"
            className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="jobTitle"
            className="block text-neutral-medium label-sm  mb-2"
          >
            JOB TITLE <span className="text-extra-grey"> (OPTIONAL) </span>
          </label>
          <input
            {...register('jobTitle')}
            type="text"
            id="jobTitle"
            placeholder="e.g. Project Manager"
            className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className=" flex items-center space-x-0">
          <div className="mb-9">
            <label
              htmlFor="password"
              className="block text-neutral-medium label-sm  mb-2"
            >
              PASSWORD
            </label>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="button"
            className="relative cursor-pointer right-8 bottom-2 z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src={eye2} alt="Toggle Password Visibility" />
            ) : (
              <img src={eye1} alt="Toggle Password Visibility" />
            )}
          </button>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-neutral-medium label-sm  mb-2"
            >
              CONFIRM PASSWORD
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              className="w-full px-5 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <p className="text-red-500 text-[13px] min-h-5">
              {errors.confirmPassword?.message}
            </p>
          </div>
        </div>
        <div className="mb-6 flex items-center bg-[#E8EDFF] rounded-sm">
          <PasswordChecklist password={passwordValue} />
        </div>
        <button type="submit" className="w-full btn-primary">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        <div className="flex justify-center mt-10">
          <p className="text-neutral-medium text-sm">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-primary title-md text-[14px] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
export default SignUp;
