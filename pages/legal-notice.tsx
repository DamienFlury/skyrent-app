import Layout from "../components/Layout";

const LegalNotice = () => (
  <Layout title="Impressum">
    <div className="container mx-auto">
      <h1 className="text-4xl">Impressum</h1>
      <h2 className="text-2xl">Disclaimer</h2>
      <p>
        If any flat isn't in the same state as in the pictures or as expected,
        Skyrent evades all liability.
      </p>
      <h2 className="text-2xl">Urheberrecht</h2>
      <p>
        All images are either from myself or from{" "}
        <a className="text-blue-800" href="https://unsplash.com/">
          Unsplash
        </a>
        .
      </p>
      <h2 className="text-2xl">Datenschutz</h2>
      <p>Your data will be secure and safe.</p>
    </div>
  </Layout>
);

export default LegalNotice;
