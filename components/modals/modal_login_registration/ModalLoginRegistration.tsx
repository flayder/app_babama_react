import { ModalBase } from '@/components/ui/modal/ModalBase';
import { ModalLoginRegistrationHeading } from '@/components/modals/modal_login_registration/ModalLoginRegistrationHeading';
import { ComponentProps, useState } from 'react';
import { ModalLoginForm } from '@/components/modals/modal_login_registration/ModalLoginForm';
import { ModalRegistrationForm } from '@/components/modals/modal_login_registration/ModalRegistrationForm';
import { ModalRememberForm } from '@/components/modals/modal_login_registration/ModalRememberForm';
import { ModalRememberThank } from '@/components/modals/modal_login_registration/ModalRememberThank';
import styles from './ModalLoginRegistration.module.scss';

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>
type ModalLoginFormProps = Pick<ComponentProps<typeof ModalLoginForm>, 'onClose'>
type ModalLoginRegistrationHeadingProps = Pick<ComponentProps<typeof ModalLoginRegistrationHeading>, 'view'>

interface ModalLoginRegistrationProps extends ModalBaseProps, ModalLoginRegistrationHeadingProps {}

export function ModalLoginRegistration({
  isOpened, onClose, view,
}: ModalLoginRegistrationProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      {isOpened && <ModalContent onClose={onClose} view={view} />}
    </ModalBase>
  );
}

interface ModalContentProps extends ModalLoginRegistrationHeadingProps, ModalLoginFormProps {}

function ModalContent({ view, onClose }: ModalContentProps) {
  const [currentView, setCurrentView] = useState<ModalLoginRegistrationProps['view']>(view);

  return (
    <div className={styles.modal_registration}>
      <ModalLoginRegistrationHeading view={currentView} setView={setCurrentView} />
      <div className="modal-content">
        {currentView === 'login' && <ModalLoginForm onClose={onClose} setRemember={() => setCurrentView('remember')} />}
        {currentView === 'reg' && <ModalRegistrationForm onClose={onClose} />}
        {currentView === 'remember' && (
          <ModalRememberForm
            setThank={() => setCurrentView('remember-thank')}
            setLogin={() => setCurrentView('login')}
          />
        )}
        {currentView === 'remember-thank' && <ModalRememberThank onClose={onClose} />}
      </div>
    </div>
  );
}
