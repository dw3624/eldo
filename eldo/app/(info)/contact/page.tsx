import Link from 'next/link';

const ContactPage = () => {
  return (
    <section className="mb-auto flex flex-col">
      <div className="mx-auto w-full max-w-2xl px-6 py-8">
        <div className="mt-10 lg:mt-16 [&:first-child]:mt-0">
          <h2
            id="contact"
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            Contact
          </h2>
          <p className="leading-relaxed [&:not(:first-child)]:mt-6">
            The current release is the ELDO Alpha version. We plan to open the
            platform to the public by January 2026. It will be completely free
            for everyone to use.
          </p>
          <p>
            We welcome your feedback and suggestions to improve our service and
            content.
          </p>
          <p className="mt-8">
            Please contact us at:{` `}
            <Link
              href={'mailto:dev_virgo@the-greta.com'}
              className="cursor-pointer underline-offset-4 underline hover:opacity-50"
            >
              dev_virgo@the-greta.com
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
