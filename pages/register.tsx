import request, { gql } from "graphql-request";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AuthForm, { AuthFormState } from "../components/AuthForm";
import Layout from "../components/Layout";

const query = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(
      input: { email: $email, username: $username, password: $password }
    ) {
      jwt
    }
  }
`;


const Register = () => {
  const router = useRouter();
  const handleSubmit = async ({ email, password }: AuthFormState) => {
    const { register } = await request(
      `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`,
      query,
      {
        email,
        username: email,
        password,
      }
    );
    Cookies.set("jwt", register.jwt);
    router.push("/");
  };

  return (
    <Layout title="Register">
      <div className="w-96 shadow rounded p-4 mx-auto mt-4">
        <h1 className="text-xl mb-4">Register</h1>
        <AuthForm onSubmit={handleSubmit} submitButtonText="Register" />
      </div>
    </Layout>
  );
};

export default Register;
