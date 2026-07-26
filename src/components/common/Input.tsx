import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute right-3 rtl:right-3 ltr:left-3 ltr:right-auto text-slate-400 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-xl text-sm px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 dark:focus:border-emerald-500 transition-all duration-200 ${
              error ? 'border-red-500 dark:border-red-500 focus:ring-red-500/30' : 'border-slate-200 dark:border-slate-700/80'
            } ${leftIcon ? 'rtl:pr-10 ltr:pl-10' : ''} ${rightIcon ? 'rtl:pl-10 ltr:pr-10' : ''} ${className}`}
            {...props}
          />

          {rightIcon && (
            <span className="absolute left-3 rtl:left-3 ltr:right-3 ltr:left-auto text-slate-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
