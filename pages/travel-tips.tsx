import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

type TipCardProps = {
  title: string;
  image: string;
  link: string;
};
const TipCard = ({ title, image, link }: TipCardProps) => (
  <div className="w-80 shadow rounded flex overflow-hidden flex-col">
    <h3 className="text-lg font-bold m-4">{title}</h3>
    <Image src={image} width={400} height="auto" />
    <Link href={link}>
      <a className="mx-4 my-2 text-purple-600 rounded py-2 px-4 text-center">
        Check it out
      </a>
    </Link>
  </div>
);

const TravelTips = () => (
  <Layout title="Travel Tips">
    <div className="container mx-auto">
      <h1 className="text-4xl">Travel Tips</h1>
      <div className="flex gap-4 my-4">
        <TipCard
          title="Costa Rica"
          image="/images/costa-rica.jpeg"
          link="/places/costa-rica"
        />
        <TipCard
          title="London"
          image="/images/london.jpg"
          link="/places/london"
        />
      </div>
    </div>
  </Layout>
);

export default TravelTips;
