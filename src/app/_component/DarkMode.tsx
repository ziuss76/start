'use client';

import { useEffect, useState } from 'react';

export default function DarkMode() {
  let [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let res = document.cookie.split('; ').filter((item) => {
      return item.includes('mode');
    });
    if (res[0].includes('dark')) {
      document.documentElement.classList.add('dark'); // html 태그에 dark 클래스 추가
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const darkModeToggle = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      document.cookie = 'mode=light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      document.cookie = 'mode=dark';
      setDarkMode(true);
    }
  };

  return darkMode ? (
    <button
      type='button'
      className='rounded-lg bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-200'
      onClick={darkModeToggle}
    >
      ☀️ 밝은 모드로
    </button>
  ) : (
    <button
      type='button'
      className='rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700'
      onClick={darkModeToggle}
    >
      🌙 어두운 모드로
    </button>
  );
}
