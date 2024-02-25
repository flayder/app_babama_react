import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import styles from './ModalLoginRegistrationHeading.module.scss';

interface ModalLoginRegistrationHeadingProps {
  view: 'login' | 'reg' | 'remember' | 'remember-thank'
  setView: (view: ModalLoginRegistrationHeadingProps['view']) => void
}

export function ModalLoginRegistrationHeading({ view, setView }: ModalLoginRegistrationHeadingProps) {
  const getActiveClass = (currentView: ModalLoginRegistrationHeadingProps['view']) => (view === currentView ? styles.tab_active : '');

  const clickHandler = (currentView: ModalLoginRegistrationHeadingProps['view']) => () => setView(currentView);

  if (view === 'remember' || view === 'remember-thank') {
    return (
      <div className={styles.modal_registration__heading}>
        <div className={`${styles.modal_registration__remember_title} typography-menu _medium _big`}>
          {view === 'remember' && 'Восстановление пароля'}
          {view === 'remember-thank' && 'Успех'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modal_registration__heading}>
      <button
        className={`${styles.modal_registration__tab} ${getActiveClass('login')}`}
        type="button"
        onClick={clickHandler('login')}
      >
        <AppIconSprite className={styles.modal_registration__tab__icon} name="login" />
        <div className={`${styles.modal_registration__tab__title} typography-menu _medium _small`}>Вход</div>
      </button>
      <button
        className={`${styles.modal_registration__tab} ${getActiveClass('reg')}`}
        type="button"
        onClick={clickHandler('reg')}
      >
        <AppIconSprite className={styles.modal_registration__tab__icon} name="reg" />
        <div className={`${styles.modal_registration__tab__title} typography-menu _medium _small`}>Регистрация</div>
      </button>
    </div>
  );
}
