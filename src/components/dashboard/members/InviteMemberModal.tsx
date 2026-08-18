import { useForm } from 'react-hook-form';
import { useInviteMember } from '../../../hooks/useinvitemember';
import { toast } from 'sonner';
import peopleIcon from '../../../assets/imgs/peopleIcon.svg';
import exit from '../../../assets/imgs/exit.svg';
import mailIcon from '../../../assets/imgs/mailIcon.svg';

interface InviteMemberModalProps {
  projectId: string;
  projectName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface InviteFormData {
  email: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const InviteMemberModal = ({
  projectId,
  projectName = 'Architectural Studio',
  isOpen,
  onClose,
  onSuccess,
}: InviteMemberModalProps) => {
  const { inviteMember, isLoading, isSuccess, isError, errorMessage, reset } =
    useInviteMember();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormData>({
    defaultValues: {
      email: '',
    },
  });

  if (!isOpen) return null;

  const handleClose = () => {
    resetForm();
    reset();
    onClose();
  };

  const onSubmit = async (data: InviteFormData) => {
    if (isLoading || isSubmitting) return;

    try {
      await inviteMember(data.email, projectId);

      toast.success('Invitation sent successfully!', {
        description: `An invitation email has been sent to ${data.email}`,
      });

      resetForm();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to send invitation',
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-[456px] max-w-full rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div className="bg-surface-low flex h-12 w-12 items-center justify-center rounded-md">
            <img src={peopleIcon} alt="peopleIcon" />
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-neutral-medium hover:text-neutral-high flex justify-center items-center pt-3 cursor-pointer hover:bg-gray-200 rounded-full p-3"
          >
            <img src={exit} alt="exit" />
          </button>
        </div>

        <h2 className="text-[24px] leading-[32px] text-neutral-high mb-1 font-[700]">
          Invite Team Member
        </h2>
        <p className="body-md text-neutral-medium mb-6">
          Send an invitation to join the {projectName} workspace.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="label-sm text-neutral-medium mb-2 block">
            EMAIL ADDRESS
          </label>
          <div className="relative w-full max-w-[366px]">
            <input
              type="email"
              placeholder="Enter email address"
              disabled={isLoading || isSubmitting}
              className={`${errors.email ? 'input-error' : 'input-default'} w-98`}
              {...register('email', {
                required: 'Email address is required.',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Please enter a valid email address.',
                },
              })}
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
              <img src={mailIcon} alt="mailIcon" />
            </span>
          </div>

          {errors.email && (
            <p className="body-md text-error mt-1">{errors.email.message}</p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading || isSubmitting}
              className="btn-ghost flex-1 h-10 px-4 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="btn-primary flex-1 h-10 px-4 rounded-md disabled:opacity-50"
            >
              {isLoading || isSubmitting ? 'Sending...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
