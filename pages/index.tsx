import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Home" appBarClassName="bg-blue-600 text-white">
      <div className="bg-blue-600 text-white flex justify-center h-32 items-end">
        <h1 className="text-4xl">Skyrent</h1>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-blue-600 fill-current">
        <path
          fillOpacity="1"
          d="M0,256L30,234.7C60,213,120,171,180,176C240,181,300,235,360,240C420,245,480,203,540,181.3C600,160,660,160,720,176C780,192,840,224,900,213.3C960,203,1020,149,1080,122.7C1140,96,1200,96,1260,112C1320,128,1380,160,1410,176L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
      <div className="container mx-auto mt-2">
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
