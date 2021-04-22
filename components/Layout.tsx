import Head from "next/head";
import { PropsWithChildren } from "react";
import AppBar from "./AppBar";
import Footer from "./Footer";

type Props = {
  title: string;
  appBarClassName?: string;
};

const Layout = ({
  title,
  children,
  appBarClassName,
}: PropsWithChildren<Props>) => (
  <div>
    <Head>
      <title>Skyrent | {title}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
    </Head>
    <AppBar className={appBarClassName} />
    <div>{children}</div>
    <Footer />
  </div>
);

export default Layout;
