import Review from "./review";

type Flat = {
  id: string;
  name: string;
  image: {
    url: string;
  };
  price_per_night: number;
  description: string;
  reviews: Review[];
};

export default Flat;
