import Image from "next/image";
import Layout from "../../components/Layout";

const CostaRica = () => (
  <Layout title="Costa Rica">
    <div className="container mx-auto">
      <h1 className="text-4xl my-4">Costa Rica</h1>
      <Image src="/images/costa-rica.jpeg" width={400} height={400} />
    </div>
  </Layout>
);

export default CostaRica;
