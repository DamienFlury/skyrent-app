import request, { gql } from "graphql-request";
import Image from "next/image";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import Flat from "../../types/flat";

const londonQuery = gql`
  query {
    flats(where: { city: "lcy" }) {
      id
    }
  }
`;

const London = () => {
  const { data } = useQuery("london", async () => {
    const response = await request<{ flats: Flat[] }>(
      `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`,
      londonQuery
    );
    return response;
  });
  return (
    <Layout title="London">
      <div className="container mx-auto">
        <h1 className="text-4xl my-4">London</h1>
        <Image src="/images/london.jpg" width={400} height={400} />
        <div>{data?.flats.length}</div>
      </div>
    </Layout>
  );
};

export default London;
