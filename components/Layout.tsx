import Head from "next/head";
import { PropsWithChildren } from "react";
import AppBar from "./AppBar";

type Props = {
  title: string;
};

const Layout = ({ title, children }: PropsWithChildren<Props>) => (
  <div>
    <Head>
      <title>Skyrent | {title}</title>
    </Head>
    <AppBar />
    <div>
        {children}
    </div>
  </div>
);

export default Layout;
