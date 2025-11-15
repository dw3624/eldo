'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      size={'sm'}
      variant={'link'}
      onClick={() => router.back()}
      className="cursor-pointer px-0"
    >
      뒤로가기
    </Button>
  );
};

export default BackButton;
