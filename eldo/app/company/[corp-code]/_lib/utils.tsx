export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return <span className="font-medium text-blue-600">오늘</span>;
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return <span className="text-gray-600">어제</span>;
  }

  return dateStr;
};
