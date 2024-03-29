import styles from './styles.module.css';
import human1 from '../../assets/standing1.svg';
import human2 from '../../assets/human2.svg';
import human3 from '../../assets/human3.svg';
import cardSquare from '../../assets/Card_Square.svg';
import headerBlock from '../../assets/Header_blocks.svg';
import humanlLeft from '../../assets/humanLeftFor5.svg';
import humanRight from '../../assets/humanRightFor5.svg';
import iviCard from '../../assets/iviFor5.svg';
import litresCard from '../../assets/litresFor5.svg';
import okkoCard from '../../assets/okkoFor5.svg';
import plusCard from '../../assets/plusFor5.svg';
import ivi from '../../assets/ivi110.svg';
import okko from '../../assets/oko72.svg';
import yaplus from '../../assets/plus64.svg';
import spoti from '../../assets/Spotify40.svg';
import start from '../../assets/Start32.svg';
import litres from '../../assets/litres24.svg';
import activeCard from '../../assets/Subs_activeFor3.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ActionButton from '../ActionButton';
import { useState } from 'react';

export default function OnBoardingPage({
  setIsOnboardingOpen,
}: {
  setIsOnboardingOpen: (isOnboardingOpen: boolean) => void;
}) {
  const [isLastSlide, setIsLastSlide] = useState(false);
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className={styles.swiper}
        onReachEnd={() => {
          setIsLastSlide(true);
        }}
      >
        <SwiperSlide className="slide">
          <h2 className={styles.swiper__headerSlide}>Добро пожаловать</h2>
          <img
            src={human1}
            alt="человек с телефоном"
            className={`${styles.slide__img} ${styles.slide__human1}`}
          />
          <img
            src={ivi}
            alt="иконка иви"
            className={`${styles.slide__img} ${styles.slide__ivi}`}
          />
          <img
            src={okko}
            alt="иконка окко"
            className={`${styles.slide__img} ${styles.slide__okko}`}
          />
          <img
            src={yaplus}
            alt="иконка яндекс плюс"
            className={`${styles.slide__img} ${styles.slide__yandexplus}`}
          />
          <img
            src={spoti}
            alt="иконка спотифай"
            className={`${styles.slide__img} ${styles.slide__spotify}`}
          />
          <img
            src={start}
            alt="иконка старт"
            className={`${styles.slide__img} ${styles.slide__start}`}
          />
          <img
            src={litres}
            alt="иконка литрес"
            className={`${styles.slide__img} ${styles.slide__litres}`}
          />
          <p className={styles.slide__description}>
            Управляйте подписками по-новому:выгоднее, проще и в одном месте
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <h2 className={styles.swiper__headerSlide}>Выбор подписки</h2>
          <img
            src={human2}
            alt="человек сидит"
            className={`${styles.slide__img} ${styles.slide__human2}`}
          />
          <img
            src={cardSquare}
            alt="иконка иви"
            className={`${styles.slide__img} ${styles.slide__iviCard}`}
          />
          <p className={styles.slide__description}>
            Выберите понравившуюся подписку и получайте кешбэк. Если подписка
            уже есть, переподключите её у нас. Быстро и без потерь.
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <h2 className={styles.swiper__headerSlide}>Выбор тарифа</h2>
          <img
            src={human3}
            alt="человек идет"
            className={`${styles.slide__img} ${styles.slide__human3}`}
          />
          <img
            src={activeCard}
            alt="иконка иви"
            className={`${styles.slide__img} ${styles.slide__iviCard3}`}
          />
          <p className={styles.slide__description}>
            Всё прозрачно. Вы сразу видите все тарифы и размер кешбэка
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <h2 className={styles.swiper__headerSlide}>Информация о подписке</h2>
          <img
            src={headerBlock}
            alt="пример подписки"
            className={`${styles.slide__img} ${styles.slide__slide4}`}
          />
          <p className={styles.slide__description}>
            Ознакомьтесь с условиями подписки и, если всё устраивает, переходите
            к оплате
          </p>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <h2 className={styles.swiper__headerSlide}>Присоединяйтесь к нам</h2>
          <img
            src={humanRight}
            alt="человек справа"
            className={`${styles.slide__img} ${styles.slide__slide5HumanRight}`}
          />
          <img
            src={humanlLeft}
            alt="человек слева"
            className={`${styles.slide__img} ${styles.slide__slide5HumanLeft}`}
          />
          <img
            src={iviCard}
            alt="пример подписки"
            className={`${styles.slide__img} ${styles.slide__slide5IviCard}`}
          />
          <img
            src={litresCard}
            alt="пример подписки"
            className={`${styles.slide__img} ${styles.slide__slide5LitresCard}`}
          />
          <img
            src={okkoCard}
            alt="пример подписки"
            className={`${styles.slide__img} ${styles.slide__slide5OkkoCard}`}
          />
          <img
            src={plusCard}
            alt="пример подписки"
            className={`${styles.slide__img} ${styles.slide__slide5YaPlusCard}`}
          />
          <p className={styles.slide__description}>
            Присоединяйтесь к нам: пользуйтесь подписками и получайте выгоду
          </p>{' '}
        </SwiperSlide>
      </Swiper>

      <div
        className={styles.onBoarding__button}
        onClick={() => setIsOnboardingOpen(false)}
      >
        {!isLastSlide ? (
          <ActionButton title="пропустить" />
        ) : (
          <ActionButton title="Вперед к подпискам" active />
        )}
      </div>
    </div>
  );
}
