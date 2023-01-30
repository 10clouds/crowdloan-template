import type { ReactNode } from 'react';
import { useIsModalVisible } from '@/store';

const ButtonWrapper = ({ children }: { children: ReactNode }) => {
  const { setIsModalOpen } = useIsModalVisible();
  return (
    <div
      onClick={() => {
        setIsModalOpen(true);
      }}
      className="w-fit"
    >
      {children}
    </div>
  );
};

export default ButtonWrapper;
