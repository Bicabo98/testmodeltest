import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

function GetStarted(){
  const navigate = useNavigate()
  const signUp = () => {
    navigate('/signup')
  }

  const login = () => {
    navigate('/login')
  }

  return (
    <div className='mt-[150px] flex flex-col items-center justify-center'>
      <div>
        <img src='/logo.png' className='w-[90px] h-[90px] mb-[23px]' />
        <p className='text-xl font-medium text-primary '>Model Dao</p>
      </div>
      <div className='w-full px-4 absolute bottom-[97px] flex flex-col'>
        <Button className='h-[48px] rounded mb-5 text-base' onClick={() => signUp()}>Sign up</Button>
        <Button onClick={() => login()} variant="secondary" className='h-[48px] rounded text-base'>Log in</Button>
      </div>
    </div>
  )
}

export default GetStarted;