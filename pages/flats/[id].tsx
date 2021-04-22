import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import request, { gql } from "graphql-request";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FlatOrderForm from "../../components/FlatOrderForm";
import Layout from "../../components/Layout";
import StarRating from "../../components/StarRating";
import useJwt from "../../hooks/useJwt";
import Flat from "../../types/flat";
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../components/Map'));

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
      bookings(sort: "from:asc") {
        from
        to
      }
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
  const jwt = useJwt();
  return (
    <Layout title={flat.name}>
      <div className="container mx-auto">
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossOrigin=""
          />
          <script
            src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossOrigin=""
          />
        </Head>
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
            {jwt && (
              <Elements stripe={stripePromise}>
                <FlatOrderForm flat={flat} />
              </Elements>
            )}
          </div>
        </div>
        <div className="my-12">
          <Calendar
            localizer={localizer}
            events={flat.bookings.map((booking) => ({
              allDay: true,
              start: booking.from,
              end: booking.to,
            }))}
            style={{ height: "500px" }}
            startAccessor="start"
            endAccessor="end"
          />
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
        <Map />
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
