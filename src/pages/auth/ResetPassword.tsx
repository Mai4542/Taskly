import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { resetPasswordSchema } from '../../schemas/resetPassword.schema';
import type { ResetPasswordForm as ResetPasswordFormValues } from '../../schemas/resetPassword.schema';
import { useResetPassword } from '../../hooks/useResetPassword';
import show from '../../assets/imgs/show.svg';
import hide from '../../assets/imgs/hide.svg';
import { APP_ROUTES } from '../../constants/router';
import UpdatePasswordChecklist from '../../components/UpdatePasswordCheckList';

export default function ResetPassword() {
  const { hasValidToken, isSubmitting, apiError, success, updatePassword } =
    useResetPassword();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password', '');

  const onSubmit = (data: ResetPasswordFormValues) => {
    updatePassword(data.password);
  };

  if (!hasValidToken) {
    return (
      <div className="w-full max-w-[448px]">
        <div className="rounded-xl border border-[#C3C6D626]/20 bg-white shadow-sm p-8 text-center">
          <h1 className="headline-lg text-neutral-high">
            Invalid or expired reset link.
          </h1>
          <p className="body-md text-neutral-medium mt-2">
            Please request a new password reset link.
          </p>
          <Link
            to={APP_ROUTES.auth.reset_password}
            className="btn-primary mt-6 inline-block"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full max-w-[448px]">
        <div className="rounded-xl border border-[#C3C6D626]/20 bg-white shadow-sm p-8 text-center">
          <h1 className="headline-lg text-neutral-high">Password updated</h1>
          <p className="body-md text-neutral-medium mt-2">
            Your password has been updated successfully. You can now log in.
          </p>
          <p className="body-md text-neutral-low mt-4 text-sm">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[448px]">
      <div className="rounded-xl border border-[#C3C6D626]/20 bg-white shadow-sm p-8">
        <h1 className="headline-lg text-neutral-high">Create a New Password</h1>
        <p className="body-md text-neutral-medium mt-1">
          Create a new, strong password to secure your workstation access.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label
            htmlFor="password"
            className="label-sm text-neutral-medium mb-2 block"
          >
            NEW PASSWORD
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
                  className={
                    errors.password
                      ? 'input-error w-full pr-10'
                      : 'input-default w-full pr-10'
                  }
                  aria-invalid={!!errors.password}
                />
              )}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <img
                src={showPassword ? hide : show}
                alt=""
                className="h-4 w-4"
              />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <label
            htmlFor="confirmPassword"
            className="label-sm text-neutral-medium mb-2 mt-4 block"
          >
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
                className={
                  errors.confirmPassword
                    ? 'input-error w-full'
                    : 'input-default w-full'
                }
                aria-invalid={!!errors.confirmPassword}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="mt-4 rounded-md bg-surface-low p-4">
            <UpdatePasswordChecklist password={passwordValue} />
          </div>

          {apiError && (
            <p role="alert" className="mt-3 text-sm text-red-500">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-6 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to={APP_ROUTES.auth.login}
            className="body-md text-primary hover:underline"
          >
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
