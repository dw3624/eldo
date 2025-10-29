const Home = () => {
  return (
    <div className="mb-auto flex items-center justify-center">
      <main className="flex w-full flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            What is Lorem Ipsum?
          </h1>
          <p className="max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
