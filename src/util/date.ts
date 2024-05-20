export const formatDateKrTime = () => {
  const date = new Date()?.toLocaleDateString('ko', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return date;
};
