import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgetPasswordSchema } from '../../schemas/forgetPassword.schema';
import type { ForgetPasswordForm as ForgotPasswordFormValues } from '../../schemas/forgetPassword.schema';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import timer from '../../assets/imgs/timer.svg';
import forgotIcon from '../../assets/imgs/forget-password.svg';
import { APP_ROUTES } from '../../constants/router';

export default function ForgotPassword() {
  const {
    submitted,
    apiError,
    noAttemptsLeft,
    isSubmitting,
    countdown,
    sendResetEmail,
  } = useForgotPassword();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    if (noAttemptsLeft || countdown.isRunning) return;
    sendResetEmail(data.email);
  };

  function handleResend() {
    if (noAttemptsLeft || countdown.isRunning || isSubmitting) return;
    sendResetEmail(getValues('email'));
  }

  return (
        <div className="w-full max-w-[448px] ">
          <div className="rounded-xl border border-[#C3C6D626]/20 bg-white shadow-sm p-10! sm:p-8 ">
            {submitted && (
              <div className="mb-6 flex justify-center sm:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-highest">
                  <img src={forgotIcon} alt="" className="h-5 w-5" />
                </div>
              </div>
            )}

            <h1 className="headline-lg! text-neutral-high text-center sm:text-left">
              Forgot password?
            </h1>
            <p className="body-md text-neutral-medium mt-1 text-center sm:text-left">
              No worries, we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <label htmlFor="email" className="label-sm text-neutral-medium mb-2 block">
                EMAIL ADDRESS
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled={isSubmitting || noAttemptsLeft}
                    className={errors.email ? 'input-error w-full' : 'input-default  w-full'}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                )}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}

              {apiError && (
                <p role="alert" className="mt-2 text-sm text-red-500">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || noAttemptsLeft || countdown.isRunning}
                className="cursor-pointer btn-primary  mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                to={APP_ROUTES.auth.login}
                className=" body-md text-primary! text-4 inline-flex items-center gap-1 hover:underline"
              >
                ← Back to log in
              </Link>
            </div>

            {submitted && (
              <>
                <hr className="my-6 border-[#C3C6D626]" />

               {submitted && (
  <>
    <div className="sm:hidden mt-6">
      <div
        role="status"
        aria-live="polite"
        className="rounded-md bg-[#82F9BE33] p-3"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#005235] text-white text-[10px]">
            ✓
          </span>
          <p className="body-md text-neutral-high text-[13px] leading-snug">
            If an account exists with this email, we've sent a password reset link.
          </p>
        </div>

        <hr className="my-3 border-[#00523533]" />

        <div className="flex items-center justify-between">
          <span className="label-sm text-[#434654]">DIDN'T RECEIVE EMAIL?</span>

          {noAttemptsLeft ? (
            <span className="label-sm text-error">No attempts left</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown.isRunning || isSubmitting}
              aria-label={
                countdown.isRunning
                  ? `Resend available in ${countdown.minutes} minutes ${countdown.seconds} seconds`
                  : 'Resend email'
              }
              className="label-sm font-bold text-primary disabled:cursor-not-allowed disabled:text-neutral-low"
            >
              {countdown.isRunning
                ? `RESEND IN ${countdown.minutes}:${countdown.seconds}`
                : 'RESEND'}
            </button>
          )}
        </div>
      </div>
    </div>

    <div className="hidden sm:block">
      <hr className="my-6 border-[#C3C6D626]" />

      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 rounded-md bg-[#82F9BE33] p-3"
      >
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#005235] text-white text-[10px]">
          ✓
        </span>
        <p className="body-md text-neutral-high text-[13px] leading-snug">
          If an account exists with this email, we've sent a password reset link.
        </p>
      </div>

      <div className="mt-3 flex flex-col items-center gap-2 sm:flex-col">
        <div className="label-sm text-[#434654]">
          DIDN'T RECEIVE THE EMAIL?
        </div>

        {noAttemptsLeft ? (
          <div className="label-sm text-error">
            No more attempts left. Please try again later.
          </div>
        ) : (
          <div className="mt-1 flex items-center justify-center gap-2 bg-surface-low w-full h-12">
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown.isRunning || isSubmitting}
              aria-label={
                countdown.isRunning
                  ? `Resend available in ${countdown.minutes} minutes ${countdown.seconds} seconds`
                  : 'Resend email'
              }
              className="cursor-pointer flex items-center justify-center gap-2 label-sm title-md text-extra-grey disabled:cursor-not-allowed disabled:text-neutral-low"
            >
              <img src={timer} alt="" className="h-5 w-5" />
              {countdown.isRunning
                ? `Resend in ${countdown.minutes}:${countdown.seconds}`
                : 'Resend'}
            </button>
          </div>
        )}
      </div>
    </div>
  </>
)}
              </>
            )}
          </div>
        </div>
  );
}