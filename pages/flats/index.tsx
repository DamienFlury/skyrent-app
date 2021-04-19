import Layout from "../../components/Layout";
import Image from "next/image";
import { gql, request } from "graphql-request";
import { GetServerSideProps } from "next";
import Link from "next/link";

type Tag = {
  id: string;
  title: string;
  color: string;
};

type Flat = {
  id: number;
  name: string;
  image: {
    url: string;
  };
  tags: Tag[];
};

type Props = {
  flats: Flat[];
};

const Flats = ({ flats }: Props) => {
  return (
    <Layout title="Flats">
      <div className="container mx-auto">
        <h1 className="text-2xl my-2">Flats</h1>
        <div className="md:flex -mx-2">
          {flats.map((f) => (
            <div className="shadow p-4 w-96 mx-2 rounded" key={f.id}>
              <h4 className="text-xl mb-2">{f.name}</h4>
              <Image
                src={`${process.env.NEXT_PUBLIC_CMS_URL}${f.image.url}`}
                width={600}
                height={400}
              />
              <div className="h-14 overflow-hidden">
                {f.tags.map((tag) => (
                  <div
                    className="rounded-full text-white mx-1 text-sm px-2 inline-block bg-gray-400"
                    key={tag.id}
                  >
                    {tag.title}
                  </div>
                ))}
              </div>
              <Link href={`/flats/${f.id}`}>
                <a className="rounded py-2 px-4 bg-blue-400 text-white mt-2 inline-block w-full text-center transition-colors hover:bg-blue-600 duration-300">
                  Check it out
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const query = gql`
  query {
    flats {
      id
      name
      image {
        url
      }
      tags {
        id
        title
        color
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await request<{ flats: Flat[] }>(
    `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`,
    query
  );
  return {
    props: {
      flats: res.flats,
    },
  };
};

export default Flats;
