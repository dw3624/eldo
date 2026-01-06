import React from 'react';

const ComparePage = () => {
  return (
    <section className="mb-auto flex flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        <div className="mt-10 lg:mt-16 [&:first-child]:mt-0">
          <h2
            id="compare"
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            Compare
          </h2>
          <p className="leading-relaxed [&:not(:first-child)]:mt-6">
            Multiple comparison of sector, sub-sector, and macro economic
            indices.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparePage;
