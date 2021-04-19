import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <div className="rounded bg-gray-800 h-32 shadow my-4 p-4 w-full">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#fafafa",
            },
          },
          hidePostalCode: true,
        }}
      />
    </div>
  );
};

export default CheckoutForm;
