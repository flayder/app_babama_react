import styles from './Advantages.module.scss';

const DATA_PAGE = [
  {
    id: 1,
    title: 'Живые и не живые',
    text: 'Есть крайне простые, но при этом выгодные аккаунты для накрутки. А есть максимально качественные, лучше которых не найти на рынке (у всех либо такие же, либо хуже).',
  }, {
    id: 2,
    title: 'Адекватная техподдержка',
    text: 'Нет, мы не всегда на связи. Зачем нам Вам врать? Но мы решаем абсолютно все вопросы и делаем это очень оперативно. Можете проверить сами, написав нам по любым контактам.',
  }, {
    id: 3,
    title: 'Бесплатные активности',
    text: 'Каждый день мы выкладываем в свой телеграм канал бесплатные активности. Вы просто вводите промокод и получаете накрутку на свой аккаунт за свою лояльность.',
  },
];

export function Advantages() {
  return (
    <section className={`${styles.advantages}`}>
      <div className={` ${styles.advantages__container} container `}>
        <h2 className={`${styles.advantages__title} typography _medium`}>
          <span className={`${styles.advantages__titleSpan} ${styles.advantages__titleSpan_sm}`}>
            Три причины
          </span> быть с нами
        </h2>
        <p className={`${styles.advantages__subtitle} typography-menu _regular _middle`}>
          Для начала, Вы для нас люди, а не просто цифры на счету. Поэтому...
        </p>
        <ul className={styles.advantages__list}>
          {DATA_PAGE.map(({ id, title, text }) => (
            <li className="advantages__item" key={id}>
              <div className={styles.advantagesItem__image} />
              <h3 className={`${styles.advantagesItem__title} typography-heading _medium`}>{title}</h3>
              <p className={`${styles.typographyParagraph} typography-paragraph`}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
