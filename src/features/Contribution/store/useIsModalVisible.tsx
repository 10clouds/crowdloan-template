import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';

export const isModalOpen = atom<boolean>(false);

const useIsModalVisible = () => {
  const $isModalOpen = useStore(isModalOpen);

  return { $isModalOpen, setIsModalOpen: isModalOpen.set } as const;
};

export default useIsModalVisible;
