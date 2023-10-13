import AuthProvider from "@component/templates/AuthProvider";
import BaseLayout from "@component/templates/layout/BaseLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ReactElement, ReactNode } from "react";
import { Color } from "styles/colors";
import "styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type tMyApp = {
  Component: NextPageWithLayout;
} & AppProps;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false
    }
  }
});

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
      {/*  Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-9MRD9LGEVY" />
      <Script id={"google-analytics"}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9MRD9LGEVY');
        `}
      </Script>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: Color.green200,
            colorBgBase: Color.white
          }
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
};

export default MyApp;
