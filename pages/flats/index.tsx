import Layout from "../../components/Layout";
import Image from "next/image";
import { gql, request } from "graphql-request";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { format } from "date-fns";
import formatISO from "date-fns/formatISO";

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
  bookings: {
    id: string;
  }[];
};

type Props = {
  flats: Flat[];
};

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

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

              {f.bookings.length > 0 ? (
                <div className="flex items-center text-yellow-600 text-sm">
                  <ClockIcon />
                  <span className="ml-2">Currently booked out</span>
                </div>
              ) : (
                <div className="flex items-center text-green-500 text-sm">
                  <CheckIcon />
                  <span className="ml-2">Available</span>
                </div>
              )}
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
  query GetFlats($currentDate: Date!) {
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
      bookings(where: { from_lt: $currentDate, to_gt: $currentDate }) {
        from
        to
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("Getting flats...")
  console.log(process.env.NEXT_PUBLIC_CMS_URL)
  const res = await request<{ flats: Flat[] }>(
    `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`,
    query,
    {
      currentDate: formatISO(new Date(), { representation: "date" }),
    }
  );
  return {
    props: {
      flats: res.flats,
    },
  };
};

export default Flats;
