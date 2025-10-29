import { SidebarTrigger } from '@/components/ui/sidebar';
import { helpContents } from './components/constants';

const HelpPage = () => {
  return (
    <div className="flex flex-col gap-8 px-6 py-8">
      <header className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="scroll-m-20 font-semibold text-3xl tracking-tight sm:text-3xl xl:text-3xl">
          Help Page
        </h1>
      </header>
      <div>
        {helpContents.map((item, i) => (
          <div key={item.id} className="mt-10 lg:mt-16">
            <h2
              id={item.id}
              className="scroll-m-20 font-heading font-semibold text-2xl tracking-tight"
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
    </div>
  );
};

export default HelpPage;
