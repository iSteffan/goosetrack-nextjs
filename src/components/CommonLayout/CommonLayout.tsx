import React from 'react';
import { ReactNode } from 'react';

interface CommonLayoutProps {
  children: ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>header</header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};
