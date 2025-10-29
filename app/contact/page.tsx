import { contactContents } from './components/constants';

const ContactPage = () => {
  return (
    <div className="px-6 py-8">
      {contactContents.map((item) => (
        <div key={item.id} className="mt-10 lg:mt-16">
          <h2
            id={item.id}
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            {item.title}
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

export default ContactPage;
