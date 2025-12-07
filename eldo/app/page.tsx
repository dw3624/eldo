const Home = () => {
  return (
    <div className="mb-auto flex items-center justify-center">
      <main className="flex w-full flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            Financial Insight without Barriers
          </h1>
          <div className="max-w-3xl text-zinc-600 leading-8 dark:text-zinc-400">
            <p className="text-xl">
              ELDO is the next-generation investment data platform
            </p>
            <ul className="mt-4 ml-6 list-disc font-semibold text-lg">
              <li>
                Global financial data platform for companies and industries
              </li>
              <li>AI-driven corporate valuation & industry analysis</li>
              <li>
                Fast, accurate, and transparent insights for the U.S., Korea &
                Japan
              </li>
              <li>
                Low-cost, high-quality solution for investors at all levels
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
