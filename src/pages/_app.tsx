import BaseLayout from "@component/templates/layout/BaseLayout";
import { ConfigProvider } from "antd";
import { NextPage } from "next";
import {  AppProps } from "next/app";
import { Color } from "styles/colors";
import 'styles/globals.css';

type tMyApp = {

} & AppProps

const MyApp: NextPage<tMyApp> = ({ Component, pageProps }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Color.green200,
          colorBgBase: Color.white
        },
      }}
    >
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ConfigProvider>
  )
  
}

export default MyApp

export async function getServerSideProps(){
  return { 
    props:{}
   }
}