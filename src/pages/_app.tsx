import BaseLayout from "@component/base/layout/BaseLayout"
import { ConfigProvider } from "antd"
import { Color } from "styles/colors"
import 'styles/globals.css'
function MyApp({ Component, pageProps }) {
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