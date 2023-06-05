import AuthProvider from "@component/templates/AuthProvider";
import BaseLayout from "@component/templates/layout/BaseLayout";
import { ConfigProvider } from "antd";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { Color } from "styles/colors";
import "styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type tMyApp = {
  Component: NextPageWithLayout;
} & AppProps;

const MyApp: NextPage<tMyApp> = ({ Component, pageProps }) => {
  const getLayout =
    Component?.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);
  return (
    <>
      <Head>
        <title>Growing</title>
        <meta property="description" content="환영합니다 그로잉입니다." />
        <meta property="og:description" content="환영합니다 그로잉입니다." />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Color.green200,
            colorBgBase: Color.white
          }
        }}
      >
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </ConfigProvider>
    </>
  );
};

export default MyApp;

export async function getServerSideProps() {
  return {
    props: {}
  };
}
