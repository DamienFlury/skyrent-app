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
    </Head>
    <AppBar className={appBarClassName} />
    <div>{children}</div>
    <Footer />
  </div>
);

export default Layout;
