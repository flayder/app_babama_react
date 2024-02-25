import personal from '@/components/account/Account.module.scss';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { AppNotification } from '@/components/ui/AppNotification';
import { API, ROUTES } from '@/params';
import { getFetchData } from '@/helpers/api/response';
import { TReferInfoAPI } from '@/types/api/refers';
import styles from './AccountReferral.module.scss';

export async function AccountReferralInfo() {
  const data = await getFetchData<TReferInfoAPI>(API.REFERRALS_INFO);
  // const init = useRef(false);
  // const [dataInfo, setData] = useState<TReferInfoAPI>()

  // useEffect(() => {
  //   if(!init.current) {
  //     init.current = true;
  //     getReferralInfo().then((response: any) => {
  //       //console.log('response', response)
  //       setData(response);
  //     })
  //   }
  // }, [])

  const notificationText = `
  Процент выплат зависит от месячного оборота ваших рефералов.
  Всего есть 4 уровня:\n
  <ol><li>Оборот менее 5000 руб. = 15% бонус</li><li>Оборот от 5001 до 15000 руб. = 20%</li><li>Оборот от 15001 до 50000 руб. = 25%</li><li>Оборот от 50001 руб = 30%</li></ol>
  `;

  return (
    <>
      {data
      && (
<>
      <div className={`${personal.personal__content__heading} ${styles.data_block}`}>
          <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
            Ваши данные
          </h2>
        </div>
      <div className={styles.data_chars_block}>
        <div className="data-char-block">
          <div className="icon">
            <AppIconSprite name="acc-crown" />
          </div>
          <div className="n-text">
            Заработано всего
          </div>
          <div className="price">
            {data.total}
            <div className="cur">
              ₽
            </div>
          </div>
        </div>
        <div className="data-char-block">
          <div className="icon">
            <AppIconSprite name="acc-flow" />
          </div>
          <div className="n-text">
            Оборот ваших рефералов
          </div>
          <div className="price">
            {data.cashFlow}
            <div className="cur">
              ₽
            </div>
            <span className="untext">
              в месяц
            </span>
          </div>
        </div>
        <div className="data-char-block middle">
          <div className="icon">
            <AppIconSprite name="acc-star" />
          </div>
          <div className="n-text">
            Уровень
          </div>
          <div className="price">
            {data.level}
          </div>
        </div>
        <div className="data-char-block">
          <div className="icon">
            <AppIconSprite name="acc-wallet" />
          </div>
          <div className="n-text">
            Партнерский баланс
          </div>
          <div className="price">
            {data.referralBalance}
            <span className="cur">
              ₽
            </span>
            <span className="untext">
              <a href={ROUTES.ACCOUNT_REFERRAL_WITHDRAWAL}>вывести</a>
            </span>
          </div>
        </div>
        <div className="data-char-block">
          <div className="icon">
            <AppIconSprite name="acc-wallet" />
            <AppNotification label="Условия" theme="dark" content={notificationText} />
          </div>
          <div className="n-text">
            Размер выплат
          </div>
          <div className="price">
            <b className={styles.purple}>{data.paymentPercent}%</b>
          </div>
        </div>
      </div>
      </>
)}
    </>
  );
}
