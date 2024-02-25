import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import personal from '@/components/account/Account.module.scss';
import { LkLayout } from '@/components/layouts/lk_layout/LkLayout';
import { TFaqAPI } from '@/types/api/static-pages';
import { getFetchData } from '@/helpers/api/response';
import { API } from '@/params';
import { FaqGroup } from '@/components/static_pages/faq/FaqGroup';
import { FaqButton } from '@/components/static_pages/faq/FaqButton';
import styles from './AccountReferralFeedback.module.scss';

export async function AccountReferralFeedback() {
  const data = await getFetchData<TFaqAPI>(API.FEEDBACK_QUESTIONS);
  return (
    <LkLayout className={styles.lk} isHeader={false}>
      <div className={styles.feedback}>
        {/* <div className={`${personal.personal__content__heading}`}>
          <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
            Частые вопросы
          </h2>
        </div> */}
        {data.map((elem) => (
          <FaqGroup elem={elem} key={elem.heading} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', opacity: 0 }}>
        <FaqButton name="Задать вопрос" />
      </div>
    </LkLayout>
  );
}
