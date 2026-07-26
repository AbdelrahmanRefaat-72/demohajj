import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = 'بحث...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <SearchIcon className="absolute right-3.5 rtl:right-3.5 ltr:left-3.5 ltr:right-auto w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl text-sm px-4 py-2.5 rtl:pr-10 ltr:pl-10 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 dark:focus:border-emerald-500 transition-all duration-200"
      />
    </div>
  );
};
