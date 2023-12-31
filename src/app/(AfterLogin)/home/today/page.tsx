import clientPromise from '@/../util/db';
import CalWeight from '../CalWeight';
import InputWeight from '../InputWeight';

export default async function Home() {
  let db = (await clientPromise)?.db('StartSmall');
  let result = await db?.collection('weights').find().toArray();

  result = result.map((a: any) => {
    a._id = a._id.toString();
    return a;
  });

  return (
    <div className='mx-3 flex h-full w-full flex-col justify-start text-center'>
      <div className='mb-3 flex h-4/6 w-full items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
        {result.length ? <CalWeight result={result} /> : <InputWeight />}
      </div>
      {/* <div className='flex h-1/5 w-full flex-col items-center justify-center rounded-lg bg-slate-300 text-center dark:bg-slate-500'>
      </div> */}
    </div>
  );
}
