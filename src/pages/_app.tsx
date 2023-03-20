function MyApp({ Component, pageProps }) {
  console.log("Myapp")
  return (
    <Component {...pageProps} />
  )
  
}

export default MyApp

export async function getServerSideProps(){
  console.log("props")
  return { 
    props:{}
   }
}