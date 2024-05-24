import { useEffect } from 'react';

export default function useSome() {
  useEffect(() => {
    console.log('hi');
    return () => {
      console.log('bye');
    };
  }, []);
  return <></>;
}
