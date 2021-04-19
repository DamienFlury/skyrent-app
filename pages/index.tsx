import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Home">
      <div className="container mx-auto mt-2">
        <h1 className="text-4xl mb-2">Skyrent</h1>
        <div className="my-4">
          <h2 className="text-xl font-bold">Who we are</h2>
          <p>
            We are a Skyrent. Everyone can submit his home to our website and
            rent it and share it with everybody else on this planet. If you'd
            like to get started renting somebody's place for a night or if you
            want to rent your own home, you can get started right away!
          </p>
          <Link href="/flats">
            <a className="px-4 py-2 rounded bg-purple-700 text-white uppercase mt-2 inline-flex">
              <span className="mr-2">Check out the flats</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div>
          <h2 className="text-xl font-bold">What we want</h2>
          <p>
            We want to give everyone the opportunity to rent his home to other
            people. And we want to give travelers the chance to stay anywhere
            without complications. The prices are up to the users.
          </p>
        </div>
      </div>
    </Layout>
  );
}
