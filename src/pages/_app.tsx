import BaseLayout from "@component/base/layout/BaseLayout"

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