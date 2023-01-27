import type { ReactNode } from 'react';
import { useIsModalVisible } from '@/store';

const ButtonWrapper = ({ children }: { children: ReactNode }) => {
  const { setIsModalOpen } = useIsModalVisible();
  return (
    <div
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      {children}
    </div>
  );
};

export default ButtonWrapper;
