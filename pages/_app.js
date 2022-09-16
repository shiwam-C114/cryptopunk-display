import { ChakraProvider } from '@chakra-ui/react'
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public';

function MyApp({ Component, pageProps }) {

  const {chains, provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      })]
  });

  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
