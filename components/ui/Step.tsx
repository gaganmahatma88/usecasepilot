import React from 'react'

interface StepProps {
  number: number
  title: string
  children?: React.ReactNode
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 my-5">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1D4ED8] text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {number}
      </div>
      <div className="flex-1 pt-0.5 pb-1">
        <div className="font-semibold text-gray-900 text-[15px] leading-snug mb-1">
          {title}
        </div>
        {children && (
          <div className="step-content text-sm text-gray-500 leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
