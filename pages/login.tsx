import request, { gql } from "graphql-request";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import AuthForm, { AuthFormState } from "../components/AuthForm";
import Layout from "../components/Layout";

const loginMutation = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const { mutate } = useMutation(
    "login",
    async ({ email, password }: AuthFormState) => {
      const {
        login: { jwt },
      } = await request(
        `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`,
        loginMutation,
        {
          identifier: email,
          password,
        }
      );
      Cookies.set("jwt", jwt);
      router.push("/");
    }
  );
  return (
    <Layout title="Login">
      <div className="w-96 shadow rounded p-4 mx-auto mt-4">
        <h1 className="text-xl mb-4">Login</h1>
        <AuthForm onSubmit={mutate} submitButtonText="Login" />
        <div className="my-2">
          Don't have an account yet?{" "}
          <Link href="/register">
            <a className="text-blue-800">Register</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
