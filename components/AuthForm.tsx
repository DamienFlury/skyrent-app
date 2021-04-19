import { useForm } from "react-hook-form";

type OnSubmitProps = {
  email: string;
  password: string;
};

type FormProps = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: ({ email, password }: OnSubmitProps) => void;
  submitButtonText: string;
};

const AuthForm = ({ onSubmit, submitButtonText }: Props) => {
  const { register, handleSubmit } = useForm<FormProps>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2">
        <label htmlFor="email" className="block text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          ref={register({ required: true, minLength: 2 })}
          className="px-4 py-2 rounded shadow w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          ref={register({ required: true })}
          className="px-4 py-2 rounded shadow w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 uppercase rounded w-full"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default AuthForm;
