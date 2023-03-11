import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

export async function getServerSideProps(){
  console.log("props")
  return { 
    props:{}
   }
}