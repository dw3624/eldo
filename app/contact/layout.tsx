import type React from 'react';

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mb-auto flex flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            Contact Page
          </h1>
        </div>
      </header>
      {children}
    </section>
  );
};

export default ContactLayout;
