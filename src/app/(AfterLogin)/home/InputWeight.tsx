import clientPromise from '@/../util/db';
import { revalidatePath } from 'next/cache';

export default async function inputWeight() {
  async function handleSubmit(formData: FormData) {
    'use server';
    let shouldRedirect = false;
    try {
      let db = (await clientPromise)?.db('StartSmall');
      await db?.collection('weights').insertOne({
        press: Number(formData.get('press')),
        squat: Number(formData.get('squat')),
        bench: Number(formData.get('bench')),
        deadLift: Number(formData.get('deadLift')),
      });
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      return;
    }
    if (shouldRedirect) revalidatePath('/home');
  }
  return (
    <form action={handleSubmit} className='w-4/5'>
      <div className='flex w-full flex-col items-center'>
        <input
          type='number'
          min='20'
          name='press'
          required
          placeholder='OHP 1RM의 숫자만 입력해주세요.'
          className=' m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
        />
        <input
          type='number'
          min='20'
          name='squat'
          required
          placeholder='스쿼트 1RM의 숫자만 입력해주세요.'
          className='m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
        />
        <input
          type='number'
          min='20'
          name='bench'
          required
          placeholder='벤치 1RM의 숫자만 입력해주세요.'
          className='m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
        />
        <input
          type='number'
          min='20'
          name='deadLift'
          required
          placeholder='데드 1RM의 숫자만 입력해주세요.'
          className='m-1.5 w-full rounded-lg p-2 text-slate-900 shadow-md focus:outline-slate-400'
        />
        <button
          type='submit'
          className='text-md mt-3 w-1/5 rounded-lg bg-slate-50 py-2 font-medium text-slate-900 shadow-md hover:bg-slate-200 focus:outline-slate-400 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-700'
        >
          제출
        </button>
      </div>
    </form>
  );
}
