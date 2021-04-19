import Link from "next/link";
import Layout from "../components/Layout";

const Contact = () => (
  <Layout title="Contact">
    <div className="container mx-auto my-2">
      <h1 className="text-4xl">Contact</h1>
      <div className="flex shadow-xl p-4 rounded">
        <div>
          <div>
            <h2 className="text-xl">Skyrent</h2>
          </div>
          <div>Damien Flury</div>
          <div>Hagenwiesenstr. 3</div>
          <div>8108 Dällikon</div>
          <div>079 911 48 68</div>
          <a
            className="bg-purple-700 text-white rounded px-4 py-2 uppercase flex mt-2"
            href="mailto:damien.flury@gmail.com"
          >
            <span>
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span className="ml-2">Contact via Email</span>
          </a>
        </div>
      </div>
    </div>
  </Layout>
);

export default Contact;
