import { missionContents } from './_components/constants';

const MissionPage = () => {
  return (
    <div className="px-6 py-8">
      <div className="text-center">
        <p className="font-semibold">
          “Ultimately, our vision is to make ELDO a public good—an open and
          equitable infrastructure for financial intelligence that anyone can
          access, regardless of geography, income, or institutional
          affiliation.”
        </p>
        <p className="mt-4">- Joseph Kim, Co-CEO of GRETA</p>
      </div>
      {missionContents.map((item, i) => (
        <div key={item.id} className="mt-10 lg:mt-16 [&:first-child]:mt-0">
          <h2
            id={item.id}
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            {i + 1}. {item.title}
          </h2>
          <ul className="mt-4 list-outside list-disc">
            {item.contents.map((content) => (
              <li key={content.slice(0, 10)} className="mt-2 ml-6">
                {content}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MissionPage;
