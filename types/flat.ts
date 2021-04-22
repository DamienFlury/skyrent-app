import Review from "./review";

type Booking = {
  id: number;
  from: string;
  to: string;
};

type Flat = {
  id: string;
  name: string;
  image: {
    url: string;
  };
  price_per_night: number;
  description: string;
  reviews: Review[];
  bookings: Booking[];
};

export default Flat;
