import { useForm } from "react-hook-form";
import { format, isAfter, isBefore, isFuture, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import Flat from "../types/flat";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import request, { gql } from "graphql-request";

type FormState = {
  from: string;
  to: string;
  email: string;
};

type Props = {
  flat: Flat;
};

const numberFormatter = new Intl.NumberFormat("ch-DE", {
  style: "currency",
  currency: "CHF",
});

const createBookingMutation = gql`
  mutation CreateBooking($user: ID!, $flat: ID!, $from: Date!, $to: Date!) {
    createBooking(
      input: { data: { user: $user, flat: $flat, from: $from, to: $to } }
    ) {
      booking {
        id
        secret
      }
    }
  }
`;

const FlatOrderForm = ({ flat }: Props) => {
  const { register, watch, errors, handleSubmit } = useForm<FormState>({
    defaultValues: {
      from: format(new Date(), "yyyy-MM-dd"),
      to: format(new Date(), "yyyy-MM-dd"),
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const from = watch("from");
  const to = watch("to");

  const days = useMemo(() => {
    const fromDate = parseISO(from);
    const toDate = parseISO(to);
    const difference = toDate.getTime() - fromDate.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
  }, [from, to]);

  const handleOrder = async (values: FormState) => {
    setIsProcessing(true);
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardElement)!,
      billing_details: {
        address: {
          country: "CH",
          city: "Zurich",
          postal_code: "12345",
        },
        email: values.email,
      },
    });
    const { createBooking } = await request(
      `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`,
      createBookingMutation,
      {
        user: 1,
        flat: flat.id,
        from: values.from,
        to: values.to,
      }
    );
    const confirmedCardPayment = await stripe?.confirmCardPayment(
      createBooking.booking.secret,
      {
        payment_method: paymentMethod?.id,
      }
    );
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit(handleOrder)}>
      <div>
        <label htmlFor="from" className="block">
          From
        </label>
        <input
          type="date"
          id="from"
          className="px-4 py-2 rounded shadow w-full"
          name="from"
          ref={register({
            validate: (val) => isFuture(parseISO(val)),
          })}
        />
      </div>
      <div className="py-4">
        <label htmlFor="to" className="block">
          To
        </label>
        <input
          type="date"
          id="to"
          className="px-4 py-2 rounded shadow w-full"
          name="to"
          ref={register({
            validate: (val) => {
              const date = parseISO(val);
              if (!isFuture(date)) {
                return "To should be in the future";
              }
              if (isBefore(date, parseISO(from))) {
                return "To should occur after from";
              }
              return true;
            },
          })}
        />
      </div>
      <div className="py-4">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="px-4 py-2 rounded shadow w-full"
          name="email"
          ref={register}
        />
      </div>
      {days > 0 && (
        <div className="bg-gray-800 rounded py-2 px-4 mb-4 text-white">
          {numberFormatter.format(days * flat.price_per_night)}
        </div>
      )}
      <CheckoutForm />
      <button
        className="px-4 py-2 bg-purple-600 rounded text-white disabled:bg-gray-400 disabled:cursor-default"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing...": "Place order"}
      </button>
    </form>
  );
};

export default FlatOrderForm;
