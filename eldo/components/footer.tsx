import Link from 'next/link';

const corpInfo = {
  corp: 'GRETA Inc.',
  ceo: '김현태, 임종호',
  bizNo: '123-21-1234',
  address: '서울시 서대문구 연세로2다길 20 208',
  email: 'greta@the-greta.com',
  tel: '070-8648-1024',
  web: 'https://the-greta.com',
};

const Footer = () => {
  return (
    <footer className="z-100 h-40 border-t border-solid bg-white">
      <div className="flex h-full flex-col gap-2 px-6 py-8 text-xs">
        <div className="flex gap-2 font-semibold">
          <Link
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
          </Link>
        </div>
        <div>ELDO의 모든 컨텐츠는 저작권법에 의거 보호 받고 있습니다.</div>
        <div>
          {corpInfo.corp} | 대표: {corpInfo.ceo} | 사업자번호: {corpInfo.bizNo}{' '}
          | 주소: {corpInfo.address}
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
