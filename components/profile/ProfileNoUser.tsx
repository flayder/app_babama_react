'use client';

import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { ComponentProps, useState } from 'react';
import { ModalLoginRegistration } from '@/components/modals/modal_login_registration/ModalLoginRegistration';
import styles from './ProfileNoUser.module.scss';

type ModalLoginRegistrationProps = Pick<ComponentProps<typeof ModalLoginRegistration>, 'view'>

export function ProfileNoUser() {
  const [isOpened, setIsOpened] = useState(false);
  const [modalView, setModalView] = useState<ModalLoginRegistrationProps['view']>('login');

  const modalHandler = (view: ModalLoginRegistrationProps['view']) => () => {
    setModalView(view);
    setIsOpened((prev) => !prev);
  };

  return (
    <div className={styles.profile_no_user} data-profile-no-user>
      <button
        type="button"
        className={styles.profile_no_user__button}
        onClick={modalHandler('login')}
        data-profile-enter
      >
        <AppIconSprite className={styles.profile_no_user__icon} name="login-box" size={20} />
        <div className={`${styles.profile_no_user__text} typography-menu _bold _small`}>Войти</div>
      </button>
      <button
        type="button"
        className={styles.profile_no_user__button}
        onClick={modalHandler('reg')}
        data-profile-registration
      >
        <AppIconSprite className={styles.profile_no_user__icon} name="user-follow" size={20} />
        <div className={`${styles.profile_no_user__text} typography-menu _bold _small`}>Зарегистрироваться</div>
      </button>
      <ModalLoginRegistration isOpened={isOpened} onClose={() => setIsOpened(false)} view={modalView} />
    </div>
  );
}
