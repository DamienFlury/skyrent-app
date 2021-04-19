import request, { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Image from "next/image";
import FlatOrderForm from "../../components/FlatOrderForm";
import Flat from "../../types/flat";
import StarRating from "../../components/StarRating";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const serverUrl = process.env.NEXT_PUBLIC_CMS_URL;

const query = gql`
  query Flat($id: ID!) {
    flat(id: $id) {
      id
      name
      image {
        url
      }
      reviews {
        id
        title
        description
        rating
      }
      price_per_night
      description
    }
  }
`;

type Props = {
  flat: Flat;
};

const numberFormatter = new Intl.NumberFormat("ch-DE", {
  style: "currency",
  currency: "CHF",
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

const FlatDetails = ({ flat }: Props) => {
  return (
    <Layout title={flat.name}>
      <div className="container mx-auto">
        <h1 className="text-2xl my-2">{flat.name}</h1>
        <div className="flex">
          <div>
            <Image
              width={600}
              height={400}
              src={`${serverUrl}${flat.image.url}`}
              className="rounded"
              alt={flat.name}
            />
            <p>{flat.description}</p>
            <div className="my-4">
              <span className="rounded bg-gray-600 text-white p-2 mr-2">
                {numberFormatter.format(flat.price_per_night)}
              </span>
              per night
            </div>
          </div>
          <div className="ml-4 lg:w-96">
            <Elements stripe={stripePromise}>
              <FlatOrderForm flat={flat} />
            </Elements>
          </div>
        </div>
        <div className="shadow mt-4 rounded p-4">
          <h2 className="text-2xl mb-2">Reviews</h2>
          {flat.reviews.map((review) => (
            <div key={review.id}>
              <StarRating rating={review.rating} />
              <h3 className="font-bold">{review.title}</h3>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FlatDetails;

export const getServerSideProps: GetServerSideProps<{ flat: Flat }> = async (
  ctx
) => {
  const data = await request<{ flat: Flat }>(`${serverUrl}/graphql`, query, {
    id: ctx.query.id,
  });
  return {
    props: {
      flat: data.flat,
    },
  };
};
