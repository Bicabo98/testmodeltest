import { createRoot } from 'react-dom/client';
import { WagmiProvider } from '@privy-io/wagmi';

import AppRouter from './AppRouter';

// import { arbitrum, mainnet, AppKitNetwork } from "@reown/appkit/networks";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { PrivyProvider } from '@privy-io/react-auth';
import { createConfig } from '@privy-io/wagmi';
// eslint-disable-next-line import/order
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import config from './config/index.ts';
import './index.css';

// initResponsive();

import { holesky, mainnet } from 'viem/chains';
import { http } from 'wagmi';

export const config = createConfig({
  chains: [mainnet, holesky], // Pass your required chains as an array
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
    // For each of your required chains, add an entry to `transports` with
    // a key of the chain's `id` and a value of `http()`
  },
});

// 0. Setup queryClient
const queryClient = new QueryClient();

// // 1. Get projectId from https://cloud.reown.com
// const projectId = config.WALLET_CONNECT_PROJECT_ID;

// // 2. Create a metadata object - optional
// const metadata = config.WALLET_CONNECT_METADATA;

// // 3. Set the networks
// const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum];

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: true,
// });

// // 5. Create modal
// createAppKit({
//   adapters: [wagmiAdapter],
//   networks,
//   projectId,
//   metadata,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
// });

createRoot(document.getElementById('root')!).render(
  <>
    <PrivyProvider
      appId="cm843bqwy00t2v7iapo6cl0zd"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          //   logo: 'https://your-logo-url',
        },
        // Create embedded wallets for users who don't have a wallet
        // embeddedWallets: {
        //   ethereum: {
        //     createOnLogin: 'users-without-wallets',
        //   },
        // },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <AppRouter />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  </>
);
