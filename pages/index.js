import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
export default function Home() {
  const { isConnected } = useAccount()
  const { push } = useRouter();
  useEffect(() => {
    if (!isConnected) {
    push("/signin")
    } else {
      push("/display")
  }

  }, [])
  
  return (
    <div >
      <Head>
        <title>CryptoPunk Display</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
  

      </main>

      <footer>
       
      </footer>
    </div>
  )
}
