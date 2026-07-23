import { useState, useEffect } from 'react';
import PasswordChecklist from '../../components/PasswordCheckList';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../schemas/signUp.schema';
import type { SignUpForm } from '../../schemas/signUp.schema';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import show from '../../assets/imgs/show.svg';
import hide from '../../assets/imgs/hide.svg';
import { APP_ROUTES } from '../../constants/router';

export default function SignUp() {
  const { signUp, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      jobTitle: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        jobTitle: data.jobTitle,
      });
    } catch (err) {
    }
  };

  return (
    <form
      className="max-w-xl mx-auto  p-16 bg-white rounded-xl shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="headline-lg text-neutral-high text-center">
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
        <label htmlFor="name" className="block text-neutral-medium label-sm mb-2">
          NAME
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
        <h2 className="text-neutral-low text-[11px] mt-1">
          3-50 characters, letters only.
        </h2>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-neutral-medium label-sm mb-2">
          EMAIL
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              id="email"
              placeholder="yourname@company.com"
              className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-neutral-medium label-sm mb-2">
          JOB TITLE <span className="text-extra-grey"> (OPTIONAL) </span>
        </label>
        <Controller
          name="jobTitle"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="jobTitle"
              placeholder="e.g. Project Manager"
              className="w-full px-3 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          )}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
  <div className="mb-9 flex-1">
    <label htmlFor="password" className="block text-neutral-medium label-sm mb-2">
      PASSWORD
    </label>

    <div className="relative">
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 pr-10 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        )}
      />

      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <img src={hide} alt="" />
        ) : (
          <img src={show} alt="" />
        )}
      </button>
    </div>

    {errors.password && (
      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
    )}
  </div>

  {/* CONFIRM PASSWORD */}
  <div className="mb-4 flex-1">
    <label htmlFor="confirmPassword" className="block text-neutral-medium label-sm mb-2">
      CONFIRM PASSWORD
    </label>
    <Controller
      name="confirmPassword"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-2 bg-surface-highest rounded-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      )}
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
          <Link to={APP_ROUTES.auth.login} className="text-primary title-md text-[14px] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}