import { ReactNode } from 'react';
interface props {
  children: ReactNode;
}

export function Modal({ children }: props) {
  return (
    <div className="w-full h-full flex justify-center items-center fixed z-50 bg-opacity-70 bg-black top-0 left-0">
      {children}
    </div>
  );
}
