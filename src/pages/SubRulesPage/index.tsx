import styles from './styles.module.css';
import BackTo from '../../components/BackTo';

export default function SubRulesPage() {

  return (
    <section className={styles.subRules}>
      <BackTo/>
      <h1 className={styles.subRules__title}>Правила подписки</h1>
      <p className={styles.subRules__text}>
        Дата размещения: 29 января 2024 г. Дата вступления в силу: 30 января
        2024 г. Термины Подписка Яндекс Плюс — это предоставление Пользователю и
        не более чем добавленным им трём Членам его семьи возможности за плату в
        течение ограниченного промежутка времени получать удаленный доступ к
        Контенту, описание которого приведено на
        странице: https://yandex.ru/legal/yandex_plus_privilege_list. С
        30.01.2024 г. доступно оформление и приобретение Подписки Яндекс Плюс с
        Периодом подписки месяц и три месяца и продление ранее оформленной и/или
        приобретённой Подписки Яндекс Плюс с Периодом подписки год, в том числе
        путём получения промокода с активным сроком активации. Сервис «Яндекс
        Музыка» — сервис «Яндекс Музыка», доступный по
        адресу: http://music.yandex.xx (где хx — любые доменные имена первого
        уровня),через приложение для компьютера или через мобильное приложение
        «Яндекс Музыка», правообладателем которых является ООО «Яндекс Музыка»
        (ОГРН: 1187746644920), право использования которых предоставляется на
        условиях, определенных документом «Лицензионное соглашение на
        использование программ «Яндекс Музыка»
        (https://yandex.ru/legal/music_mobile_agreement) и документом «Условия
        использования сервиса Яндекс Музыка»
        (https://yandex.ru/legal/music_termsofuse), где доступны фонограммы,
        тексты музыкальных произведений, обложки музыкальных альбомов, а также
        иные материалы. Сервис «Кинопоиск» — сервис для просмотра контента,
        подробная информация о котором доступна по
        адресу: https://www.kinopoisk.ru, правообладателем которого является ООО
        «Кинопоиск» (ОГРН: 1077759854919), право использования которого
        предоставляется на условиях, определенных документом «Лицензионное
        соглашение на использование программы Кинопоиск для мобильных устройств»
        (https://yandex.ru/legal/kinopoisk_mobile_agreement), документом
        «Пользовательское соглашение сайта «Кинопоиск»
        (https://yandex.ru/legal/kinopoisk_termsofuse) и документом «Условия
        просмотра платного контента на сервисе Кинопоиск»
        (https://yandex.ru/legal/kinopoisk_vod).
      </p>
    </section>
  );
}
