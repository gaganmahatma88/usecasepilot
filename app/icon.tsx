import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <svg
      width="32"
      height="32"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="8" fill="#1D4ED8" />
      <circle cx="7" cy="21" r="3" fill="white" />
      <path
        d="M7 21 L7 12.5 Q7 9 10.5 9 L19 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M19 6.5 L23.5 9 L19 11.5 Z" fill="white" />
    </svg>,
    { width: 32, height: 32 }
  )
}
