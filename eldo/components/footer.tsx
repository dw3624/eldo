import Link from 'next/link';

const corpInfo = {
  corp: 'GRETA Inc.',
  ceo: 'Joseph-Kim, Jong ho-Lim',
  bizNo: '124-87-59303',
  address: '11, Yeonhui-ro, Mapo-gu, Seoul, South Korea',
  email: 'greta@the-greta.com',
  tel: '070-8648-1024',
  web: 'https://the-greta.com',
};

const Footer = () => {
  return (
    <footer className="z-100 h-40 border-t border-solid bg-white">
      <div className="flex h-full flex-col gap-2 px-6 py-8 text-xs">
        <div className="flex gap-2 font-semibold">
          All ELDO content is protected under applicable copyright laws.
          <br />
          Unauthorized reproduction, distribution, transmission or publication
          is prohibited.
          {/* <Link
            href="/copyright"
            className="underline-offset-4 hover:underline"
          >
            Copyright
          </Link>
          |
          <Link
            href="/privacy-policy"
            className="underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link> */}
        </div>
        {/* <div>ELDO의 모든 컨텐츠는 저작권법에 의거 보호 받고 있습니다.</div> */}
        <div>
          {corpInfo.corp} | CEO: {corpInfo.ceo} | Business No.: {corpInfo.bizNo}{' '}
          | Address: {corpInfo.address}
        </div>
        <div>
          Email: {corpInfo.email} | Tel: {corpInfo.tel} | Web:{' '}
          <Link
            href={corpInfo.web}
            className="cursor:pointer underline-offset-2 hover:underline"
            target="_blank"
          >
            {corpInfo.web}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
