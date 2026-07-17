import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { loginSchema } from '../../schemas/login.schema';
import type { LoginForm } from '../../schemas/login.schema';
import eye1 from '../../assets/imgs/eye1.png';
import eye2 from '../../assets/imgs/eye2.png';
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: LoginForm) => {
    dispatch(clearError());

    const result = await dispatch(
      loginUser({
        userData: data,
        rememberMe,
      }),
    );

    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };
  return (
    <>
      <form
        className="max-w-xl mx-h-[838.5px]   mx-auto mt-10 p-16 bg-white rounded-xl shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className=" headline-lg text-neutral-high text-center">
          Welcome Back
        </h2>
        <h3 className="body-md mb-6 text-neutral-medium text-center">
          Please enter your details to access your workspace
        </h3>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-neutral-medium label-sm mb-2"
          >
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="yourname@company.com"
            className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-9">
          <label
            htmlFor="password"
            className="block text-neutral-medium label-sm mb-2"
          >
            PASSWORD
          </label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src={eye2} alt="Toggle Password Visibility" />
              ) : (
                <img src={eye1} alt="Toggle Password Visibility" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border border-[#D6D8E4] 
                 bg-[#F4F5FA] accent-indigo-600
                 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="text-[14px] text-[#434654] text-bold!"
              >
                Remember Me
              </label>
            </div>

            <a
              href="/forgot-password"
              className="text-[14px] text-[#003D9B] font-medium"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Login...' : 'Login'}
        </button>
        <div className="flex justify-center mt-10">
          <p className="text-neutral-medium text-sm">
            Don't have an account?{' '}
            <Link
              to="/auth/sign-up"
              className="text-primary title-md text-[14px] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
