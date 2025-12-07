import { helpContents } from './_components/constants';

const HelpPage = () => {
  return (
    <div className="px-6 py-8">
      {helpContents.map((item, i) => (
        <div key={item.id} className="mt-10 lg:mt-16 [&:first-child]:mt-0">
          <h2
            id={item.id}
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            {i + 1}. {item.title}
          </h2>
          {item.contents.map((content) => (
            <p
              key={content.slice(0, 10)}
              className="leading-relaxed [&:not(:first-child)]:mt-6"
            >
              {content}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HelpPage;
