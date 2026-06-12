import Link from 'next/link';

import { BiHomeAlt } from 'react-icons/bi';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <div className="mx-auto max-w-sm">
        <p className="text-9xl font-bold tracking-tighter text-slate-300 dark:text-slate-700">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
          Oops! Page Not Found
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="group from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 mt-8 inline-flex items-center gap-2 rounded-lg bg-linear-to-r px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <BiHomeAlt className="transition-transform group-hover:rotate-3 size-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
