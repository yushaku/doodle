import { BigLogo } from 'library';
import React from 'react';

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-[100vw] h-[100vh]">
      <div className="bg-[#051320] flex items-center justify-center min-h-[250px]">
        <BigLogo />
      </div>

      <div className="lg:bg-[#F1F2F3] flexCenter">{children}</div>
    </section>
  );
};

export default layout;
