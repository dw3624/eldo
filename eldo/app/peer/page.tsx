import React from 'react';

const PeerPage = () => {
  return (
    <section className="mb-auto flex flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        <div className="mt-10 lg:mt-16 [&:first-child]:mt-0">
          <h2
            id="peer"
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            Peer
          </h2>
          <p className="leading-relaxed [&:not(:first-child)]:mt-6">
            For a given firm, find its peer group and compare them. Find the
            peer groups using AI-guided or user defined.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PeerPage;
