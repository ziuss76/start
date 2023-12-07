import '../globals.css';

export default function Home() {
  return (
    <div className='flex justify-center'>
      <div className='h-[100dvh] w-[100dvw] max-w-screen-md'>
        <div className='mb-2 h-20'>
          <div className='flex h-full w-full items-center justify-center bg-blue-500 text-center'>
            <div>홈</div>
          </div>
        </div>
        <div className='flex h-5/6'>
          <div className='flex h-full w-full flex-col justify-start text-center'>
            <div className='mb-2 flex h-1/5 w-full items-center justify-center bg-blue-300 text-center'>
              <div>월</div>
            </div>
            <div className='mb-2 flex h-1/5 w-full items-center justify-center bg-blue-300 text-center'>
              <div>수</div>
            </div>
            <div className='mb-2 flex h-1/5 w-full items-center justify-center bg-blue-300 text-center'>
              <div>금</div>
            </div>
            <div className='mb-2 flex h-1/5 w-full items-center justify-center bg-blue-300 text-center'>
              <div>운동 시작 / 현재 진행 중 운동</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
