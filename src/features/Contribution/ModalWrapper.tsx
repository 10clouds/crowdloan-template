import Modal from 'react-modal';
import useIsModalVisible from './store/useIsModalVisible';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

Modal.setAppElement('body');

const ModalWrapper = ({ children }: Props) => {
  const { $isModalOpen, setIsModalOpen } = useIsModalVisible();

  return (
    <Modal
      isOpen={$isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
      contentLabel="Crowdload Contribution"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100vh',
          backgroundColor: 'rgb(65 64 68 / 76%)',
          zIndex: '99999',
        },
        content: {
          position: 'absolute',
          top: '10%',
          left: '0',
          right: '0',
          bottom: '10%',
          marginInline: 'auto',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '16px',
          outline: 'none',
          padding: '20px',
          width: '50%',
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
