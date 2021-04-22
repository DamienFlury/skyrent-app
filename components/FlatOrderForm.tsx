import { useForm } from "react-hook-form";
import { format, isBefore, isFuture, parseISO } from "date-fns";
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
import Accordion from "./Accordion";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type FormState = {
  from: string;
  to: string;
  email: string;
  laundry: boolean;
  cleaning: boolean;
};

type Props = {
  flat: Flat;
};

const numberFormatter = new Intl.NumberFormat("ch-DE", {
  style: "currency",
  currency: "CHF",
});

const createBookingMutation = gql`
  mutation CreateBooking(
    $user: ID!
    $flat: ID!
    $from: Date!
    $to: Date!
    $laundry: Boolean!
    $cleaning: Boolean!
  ) {
    createBooking(
      input: {
        data: {
          user: $user
          flat: $flat
          from: $from
          to: $to
          laundry: $laundry
          cleaning: $cleaning
        }
      }
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
  const [showOptions, setShowOptions] = useState(false);
  const [isPricetagExtended, setIsPricetagExpanded] = useState(false);
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const from = watch("from");
  const to = watch("to");
  const laundry = watch("laundry");
  const cleaning = watch("cleaning");

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
        laundry: values.laundry,
        cleaning: values.cleaning,
      }
    );
    const confirmedCardPayment = await stripe?.confirmCardPayment(
      createBooking.booking.secret,
      {
        payment_method: paymentMethod?.id,
      }
    );
    setIsProcessing(false);
    router.push('/thank-you')
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
      <div>
        <div className="my-4">
          <button
            className="border border-solid border-2 block w-full px-4 py-2 rounded flex"
            type="button"
            onClick={() => setShowOptions((prev) => !prev)}
          >
            <span className="flex-1">Additional Options</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{}}
              animate={{
                transform: showOptions ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
          <Accordion open={showOptions}>
            <div className="border border-2 rounded border-solid p-4">
              <div>
                <input
                  type="checkbox"
                  name="laundry"
                  ref={register}
                  id="laundry"
                  className="mr-2"
                />
                <label htmlFor="laundry">Laundry (+ CHF 50)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="cleaning"
                  ref={register}
                  id="cleaning"
                  className="mr-2"
                />
                <label htmlFor="cleaning">Cleaning (+ CHF 100)</label>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
      {days > 0 && (
        <button
          className="w-full text-left"
          type="button"
          onClick={() => setIsPricetagExpanded((prev) => !prev)}
        >
          <div className="bg-gray-800 rounded py-2 px-4 text-white">
            {isPricetagExtended ? (
              <table>
                <tr>
                  <td>Price for {days} days:</td>
                  <td>{numberFormatter.format(days * flat.price_per_night)}</td>
                </tr>
                {laundry && (
                  <tr>
                    <td>+ Laundry:</td>
                    <td>{numberFormatter.format(50)}</td>
                  </tr>
                )}
                {cleaning && (
                  <tr>
                    <td>+ Cleaning:</td>
                    <td>{numberFormatter.format(100)}</td>
                  </tr>
                )}
                <tr className="border-t">
                  <td />
                  <td>
                    {numberFormatter.format(
                      days * flat.price_per_night +
                        (laundry ? 50 : 0) +
                        (cleaning ? 100 : 0)
                    )}
                  </td>
                </tr>
              </table>
            ) : (
              <div className="flex">
                <span className="flex-1">
                {numberFormatter.format(
                  days * flat.price_per_night +
                    (laundry ? 50 : 0) +
                    (cleaning ? 100 : 0)
                )}
                </span>
                <span className="text-gray-400">Click to expand</span>
              </div>
            )}
          </div>
        </button>
      )}
      <CheckoutForm />
      <button
        className="px-4 py-2 bg-purple-600 rounded text-white disabled:bg-gray-400 disabled:cursor-default"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Place order"}
      </button>
    </form>
  );
};

export default FlatOrderForm;
