import Link from "next/link";

const Footer = () => (
  <footer className="bg-gray-100 mt-10 p-4">
    <span>&copy; 2021 Damien Flury</span>
    <div>
      <Link href="/legal-notice">
        <a className="text-blue-800">Impressum</a>
      </Link>
    </div>
  </footer>
);

export default Footer;
