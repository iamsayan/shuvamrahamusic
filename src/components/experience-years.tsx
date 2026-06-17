'use client';

import { useEffect, useState } from 'react';

export default function ExperienceYears() {
  const [years, setYears] = useState(11);

  useEffect(() => {
    const timer = setTimeout(() => {
      setYears(new Date().getFullYear() - 2015);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return <>{years}+</>;
}
