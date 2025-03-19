import {  useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';

function Signup(){
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className='mt-[150px] flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center'>
        <img src='/images/login/wallet.png' className='w-[116px] h-[128px] mb-[24px]' />
        <p className='text-2xl font-medium text-primary'>Sign in to get started</p>
      </div>
      <div className='w-full px-4 absolute bottom-[99px] flex flex-col'>
        {address ? (
          <Button onClick={() => disconnect()} className='h-[48px] rounded mb-5 text-base'>Disconnect</Button>
        ) : (
          <Button onClick={() => open()} className='h-[48px] rounded mb-5 text-base'>Connect Wallet</Button>
        )}
        {/* <Button onClick={() => open()} className='h-[48px] rounded mb-5 text-base'>Connect wallet</Button> */}
      </div>
    </div>
  )
}

export default Signup;