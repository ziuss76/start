'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Confetti from './Confetti';
import { DoneToday } from './DoneToday';

export default function CalWeight(result: any) {
  const oneRM = result.result[0];

  const TM = [oneRM.press, oneRM.squat, oneRM.bench, oneRM.deadLift].map(
    (w) => w * 0.9
  );

  const training = ['프레스', '스쿼트', '벤치', '데드'];
  const trainingReps = ['5', '5', '5+', '최대'];
  const weekOneCoe = [0.65, 0.75, 0.85, 0.65]; // 1주차 중량 계수
  const weekTwoCoe = [0.7, 0.8, 0.9, 0.7]; // 2주차 중량 계수
  const weekThreeCoe = [0.75, 0.85, 0.95, 0.75]; // 3주차 중량 계수

  const weekOneWeights = TM.map((w) =>
    weekOneCoe.map((per) => roundToTwoPointFive(w * per))
  );

  const weekTwoWeights = TM.map((w) =>
    weekTwoCoe.map((per) => roundToTwoPointFive(w * per))
  );
  const weekThreeWeights = TM.map((w) =>
    weekThreeCoe.map((per) => roundToTwoPointFive(w * per))
  );

  function roundToTwoPointFive(x: number) {
    return Math.round(x / 2.5) * 2.5;
  }

  const [weekWeights, setWeekWeights] = useState([
    weekOneWeights,
    weekTwoWeights,
    weekThreeWeights,
  ]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [thisWeek, setThisWeek] = useState(['1주', '2주', '3주']);
  const [currentDay, setCurrentDay] = useState(0);
  const [trainingDay, setTrainingDay] = useState(['월', '화', '목', '금']);
  const [doneReps, setDoneReps] = useState([0, 0, 0, 0]);

  function goNextDay() {
    if (currentDay === 3) {
      setCurrentWeek((currentWeek + 1) % 3);
      setCurrentDay(0);
      setDoneReps([0, 0, 0, 0]);
    } else {
      setCurrentDay(currentDay + 1);
      setDoneReps([0, 0, 0, 0]);
    }
  }

  function doneRepsHandler(index: number) {
    setDoneReps(
      doneReps.map((done, i) => {
        if (i === index) return done + 1;
        else return done;
      })
    );
  }

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await DoneToday();
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='relative flex w-full flex-col items-center'>
      <div>{thisWeek[currentWeek]}</div>
      {trainingDay.map((day, index) => {
        if (index !== currentDay) return null;

        return (
          <div key={index}>
            <div>
              {day} : {training[index]}
            </div>
            <div className='m-2 flex space-x-4'>
              {weekWeights[currentWeek][index].map((weight, i) => (
                <div key={i} className='flex flex-col items-center space-y-4'>
                  <div>{weight}kg</div>
                  {doneReps[i] === 0 ? (
                    <button
                      onClick={() => doneRepsHandler(i)}
                      className='h-16 w-16 rounded-full bg-slate-50 text-xl font-medium text-slate-900 shadow-md active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:active:bg-slate-600'
                      disabled={i > 0 && doneReps[i - 1] === 0}
                    >
                      {trainingReps[i]}
                    </button>
                  ) : (
                    <button className='h-16 w-16 rounded-full bg-slate-700 text-xl font-medium text-white shadow-md active:bg-slate-600 dark:bg-slate-50 dark:text-slate-900 dark:active:bg-slate-200'>
                      {trainingReps[i]}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {doneReps.includes(0) ? null : (
        // <button
        //   onClick={goNextDay}
        //   className='text-md mt-4 w-24 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
        // >
        //   다음
        // </button>
        <div className='absolute top-full'>
          <form onSubmit={handleSubmit}>
            <button
              type='submit'
              className='text-md mt-4 w-32 rounded-lg bg-slate-50 px-5 py-2 font-medium text-slate-900 shadow-md hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
            >
              빅토리!
            </button>
          </form>

          <Confetti />
        </div>
      )}
    </div>
  );
}
