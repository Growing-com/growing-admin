import BaseLayout from "@component/base/layout/BaseLayout"
import 'styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
  
}

export default MyApp

export async function getServerSideProps(){
  return { 
    props:{}
   }
}