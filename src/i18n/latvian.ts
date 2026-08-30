import { latvianPageTranslations } from './latvian.pages';
import { latvianRemainingTranslations } from './latvian.remaining';
import { setRuntimeTranslator } from './runtime';

/**
 * Redakcionāli pārbaudītā latviešu valodas vārdnīca.
 *
 * Latviešu versija tiek tulkota pa lapām. Kamēr vārdnīca nav pilnīga,
 * languages.ts saglabā `ready: false` un publiskā sakne turpina vest uz /ru.
 *
 * Atšķirībā no angļu valodas versijas šeit NAV daļējas aizstāšanas pēc
 * apakšvirknēm: latviešu valodā lietvārdi tiek locīti septiņos locījumos,
 * tāpēc no vārdnīcas fragmentiem sašūta frāze gandrīz vienmēr ir gramatiski
 * nepareiza. Ja precīza atbilsme netiek atrasta, teksts paliek neskarts —
 * acīmredzami netulkots teksts ir mazāk kaitīgs nekā kļūdaina latviešu valoda.
 */
export const latvianTranslations: Record<string, string> = {
  // Navigācija un kopīgās darbības
  'Главная': 'Sākums',
  'О клинике': 'Par klīniku',
  'Услуги': 'Pakalpojumi',
  'Наши услуги': 'Mūsu pakalpojumi',
  'Цены': 'Cenas',
  'Цены на услуги': 'Pakalpojumu cenas',
  'Врачи': 'Ārsti',
  'Наши врачи': 'Mūsu ārsti',
  'Другие врачи': 'Citi ārsti',
  'Пациентам': 'Pacientiem',
  'Отзывы': 'Atsauksmes',
  'Контакты': 'Kontakti',
  'Информация': 'Informācija',
  'Клиника': 'Klīnika',
  'Меню': 'Izvēlne',
  'Открыть меню': 'Atvērt izvēlni',
  'Закрыть меню': 'Aizvērt izvēlni',
  'Закрыть': 'Aizvērt',
  'Наверх': 'Uz augšu',
  'Подробнее': 'Uzzināt vairāk',
  'Узнать больше': 'Uzzināt vairāk',
  'Все услуги': 'Visi pakalpojumi',
  'Назад к услугам': 'Atpakaļ uz pakalpojumiem',
  'Перейти к услуге': 'Skatīt pakalpojumu',
  'Хлебные крошки': 'Navigācijas ceļš',
  'Ничего не найдено': 'Nekas nav atrasts',
  'Наш подход': 'Mūsu pieeja',
  'Следующий шаг': 'Nākamais solis',
  'Нет': 'Nē',
  'Да': 'Jā',

  // Pieteikšanās un saziņa
  'Записаться': 'Pieteikties',
  'Записаться на приём': 'Pieteikt vizīti',
  'Запись на приём': 'Pieteikt vizīti',
  'Записаться на консультацию': 'Pieteikt konsultāciju',
  'Проконсультироваться': 'Saņemt konsultāciju',
  'Заказать звонок': 'Pieteikt atzvanīšanu',
  'Задать свой вопрос': 'Uzdot savu jautājumu',
  'Отправить': 'Nosūtīt',
  'Отправить сообщение': 'Nosūtīt ziņu',
  'Отправляем…': 'Nosūtām…',
  'Отправка…': 'Nosūtām…',
  'Загрузка': 'Ielāde',
  'Синхронизация...': 'Sinhronizē…',
  'Пользователь Google Maps': 'Google Maps lietotājs',
  'Отзыв в Google Maps': 'Atsauksme pakalpojumā Google Maps',
  'Отзыв оставлен без текста': 'Atsauksme ir atstāta bez teksta',
  'Не удалось загрузить отзывы Google Maps:': 'Neizdevās ielādēt Google Maps atsauksmes:',
  'Отзывы пациентов': 'Pacientu atsauksmes',
  'Google Maps показывает ограниченную подборку отзывов, отсортированную по релевантности.':
    'Google Maps rāda ierobežotu atsauksmju izlasi, kas sakārtota pēc atbilstības.',
  'Отзывы пациентов, опубликованные в профиле клиники на Google Maps.':
    'Pacientu atsauksmes, kas publicētas klīnikas profilā pakalpojumā Google Maps.',
  'Отзывы пациентов о лечении в нашей клинике.': 'Pacientu atsauksmes par ārstēšanos mūsu klīnikā.',
  'Смотреть профиль в Google Maps': 'Skatīt profilu pakalpojumā Google Maps',
  'Открыть отзыв в Google Maps': 'Atvērt atsauksmi pakalpojumā Google Maps',
  'Читать полностью': 'Lasīt visu atsauksmi',
  'Свернуть': 'Rādīt mazāk',
  'Сохранено.': 'Saglabāts.',
  'Сохранить выбор': 'Saglabāt izvēli',
  'Выбор сделан': 'Izvēle veikta',

  // Kontakti
  'Бесплатная парковка': 'Bezmaksas autostāvvieta',
  'Пн–Пт: 09:00–20:00': 'P.–Pk.: 09.00–20.00',
  'Сб–Вс: выходной': 'S.–Sv.: slēgts',
  'Адрес': 'Adrese',
  'Телефон': 'Tālrunis',
  'Почта': 'E-pasts',
  'Часы работы': 'Darba laiks',
  'Как нас найти': 'Kā mūs atrast',
  'Маршрут': 'Maršruts',
  'Контактная информация': 'Kontaktinformācija',

  // Galvenās lapas pirmais ekrāns
  'Найди свою улыбку в': 'Atrodi savu smaidu',
  'Юрмале': 'Jūrmalā',
  'Установка виниров с минимальной обточкой зуба. Вашу будущую улыбку вы можете увидеть ещё до начала лечения.':
    'Zobu venīru uzstādīšana ar minimālu zobu slīpēšanu. Savu nākotnes smaidu varat ieraudzīt vēl pirms ārstēšanas sākuma.',
  'Индивидуальный подход': 'Individuāla pieeja',
  'Безболезненно': 'Nesāpīgi',
  'Цифровой протокол': 'Digitālais protokols',
  'Комфортное лечение': 'Komfortabla ārstēšana',
  'Кто мы': 'Par mums',
  'Весь путь лечения —': 'Viss ārstēšanas ceļš —',
  'в одной клинике': 'vienā klīnikā',
  'RoyalDent — это современная стоматологическая клиника, призванная дарить здоровые и уверенные улыбки на каждом этапе жизни. Мы сочетаем передовые стоматологические технологии с бережным, индивидуальным подходом, чтобы обеспечить точное, комфортное и эффективное лечение.':
    'RoyalDent ir mūsdienīga zobārstniecības klīnika, kas rūpējas par veselīgu un pārliecinošu smaidu ikvienā dzīves posmā. Mēs apvienojam modernas zobārstniecības tehnoloģijas ar saudzīgu un individuālu pieeju, lai ārstēšana būtu precīza, komfortabla un efektīva.',
  'В клинике RoyalDent вы сможете пройти весь путь лечения — от точной цифровой диагностики с использованием ИИ до сложных хирургических операций. Мы постоянно добавляем новые услуги и совершенствуем подходы, чтобы вы ощущали заботу, комфорт и спокойствие.':
    'RoyalDent klīnikā varat iziet visu ārstēšanas ceļu — no precīzas digitālās diagnostikas ar mākslīgā intelekta atbalstu līdz sarežģītām ķirurģiskām operācijām. Mēs pastāvīgi pilnveidojam pakalpojumus un darba metodes, lai jūs justos aprūpēti, mierīgi un komfortabli.',
  'Полный цифровой протокол': 'Pilns digitālais protokols',
  'В нашем центре мы используем цифровой протокол, который применяется на всех этапах диагностики, профилактики и лечения.':
    'Mūsu klīnikā digitālais protokols tiek izmantots visos diagnostikas, profilakses un ārstēšanas posmos.',
  'Работа проводится под микроскопом': 'Ārstēšana mikroskopā',
  'Все наши специалисты работают строго с увеличением, потому что врач без микроскопа — это слепой врач.':
    'Visi mūsu speciālisti strādā ar optisko palielinājumu, jo precīzā zobārstniecībā ir būtiski saskatīt vissīkākās detaļas.',
  'Перед началом лечения вы можете получить мотивационный дизайн вашей будущей улыбки, чтобы увидеть, как вы будете улыбаться после.':
    'Pirms ārstēšanas varat apskatīt sava nākotnes smaida digitālo dizainu un jau iepriekš redzēt gaidāmo rezultātu.',
  'Технологии в RoyalDent': 'Tehnoloģijas RoyalDent klīnikā',
  'Мы постоянно инвестируем в современные стоматологические технологии и оборудование, для точной диагностики и эффективного лечения.':
    'Mēs pastāvīgi ieguldām modernās zobārstniecības tehnoloģijās un aprīkojumā, lai nodrošinātu precīzu diagnostiku un efektīvu ārstēšanu.',
  'Качество лечения': 'Ārstēšanas kvalitāte',
  'Защищенность': 'Drošība',
  'Мы обеспечиваем максимальный контроль качества в ходе многофакторной стерилизации.':
    'Mēs nodrošinām rūpīgu kvalitātes kontroli visos daudzpakāpju sterilizācijas posmos.',
  'Американские протоколы': 'ASV ārstēšanas protokoli',
  'В процессе всех процедур отбеливания и профессиональной гигиены мы работаем по Американским протоколам и стандартам, обеспечивая бережный подход без дискомфорта.':
    'Zobu balināšanas un profesionālās higiēnas procedūrās ievērojam ASV protokolus un standartus, nodrošinot saudzīgu un komfortablu pieeju.',

  /*
   * Zobārstniecības terminoloģija.
   *
   * Uzmanību diviem terminiem, kur burtisks tulkojums ir nepareizs:
   *   «Ортопедия» zobārstniecības kontekstā ir protezēšana, nevis ortopēdija
   *   (ķirurģiska balsta un kustību aparāta nozare);
   *   «Коронка» kā protēze ir «kronītis», savukārt «kronis» ir zoba anatomiskā
   *   daļa.
   */
  'Стоматология': 'Zobārstniecība',
  'Имплантация': 'Zobu implantācija',
  'Имплантация зубов': 'Zobu implantācija',
  'имплантации зубов': 'zobu implantācijas',
  'Этапы имплантации': 'Implantācijas posmi',
  'Протезирование зубов': 'Zobu protezēšana',
  'протезирование': 'protezēšana',
  'Ортопедия': 'Protezēšana',
  'Ортодонтия': 'Ortodontija',
  'Эндодонтия': 'Endodontija',
  'Хирургия': 'Ķirurģija',
  'Терапия': 'Terapija',
  'Лечение под микроскопом': 'Ārstēšana mikroskopā',
  'Лечение каналов': 'Sakņu kanālu ārstēšana',
  'Лечение пульпита': 'Pulpīta ārstēšana',
  'Профессиональная гигиена': 'Profesionālā mutes higiēna',
  'Отбеливание': 'Zobu balināšana',
  'Отбеливание Flash': 'Zobu balināšana ar Fläsh sistēmu',
  'Элайнеры': 'Elaineri',
  'Элайнеры Ordoline': 'Ordoline elaineri',
  'Брекеты': 'Breketes',
  'Показать брекеты': 'Rādīt breketes',
  'Виниры': 'Venīri',
  'Винир e.max': 'e.max venīrs',
  'Вкладки': 'Ieliktņi',
  'Бюгельный протез': 'Bīgeļprotēze',
  'Ночная капа': 'Nakts kape',
  'Металлокерамика': 'Metālkeramika',
  'Диоксид циркония': 'Cirkonija dioksīds',
  'Детская стоматология': 'Bērnu zobārstniecība',
  'Лечение дёсен Vector': 'Smaganu ārstēšana ar Vector sistēmu',
  'Удаление зуба мудрости': 'Gudrības zoba ekstrakcija',
  'Лечение сустава': 'Žokļa locītavas ārstēšana',
  'Косметология': 'Kosmetoloģija',
  'Профилактика': 'Profilakse',
  'Процедуры': 'Procedūras',
  'Диагностика': 'Diagnostika',
  'Фотопротокол': 'Fotoprotokols',
  'Рентген снимок': 'Rentgenuzņēmums',
  'Анестезия': 'Anestēzija',
  'Показания': 'Indikācijas',
  'Противопоказания': 'Kontrindikācijas',
  'Преимущества': 'Priekšrocības',
  'Уход и гигиена': 'Kopšana un higiēna',
  'Верхняя челюсть': 'Augšžoklis',
  'Нижняя челюсть': 'Apakšžoklis',
  'Полная адентия': 'Pilnīga adentija',
  'Беременность': 'Grūtniecība',
  'Значительная': 'Būtiska',
  'Незначительная': 'Neliela',

  // Speciālisti
  'Хирург-имплантолог': 'Zobārsts, implantologs',
  'Хирург-имплантолог, ортопед': 'Zobārsts, implantologs un protēzists',
  'Стоматолог-ортопед': 'Zobārsts, protēzists',
  'Стоматолог-терапевт': 'Zobārsts',
  'Гигиенист': 'Zobu higiēnists',
  'Косметолог': 'Kosmetologs',
  'Администратор': 'Administrators',
  'Ассистент': 'Zobārsta asistents',
  'Иван Граф': 'Ivans Grafs',
  'Гнатолог': 'Gnatologs',
  'Институт имени Масима Горького - по специальности врач-стоматолог':
    'Maksima Gorkija institūts — zobārsta kvalifikācija',
  'Наши специалисты': 'Mūsu speciālisti',
  'Команда': 'Komanda',
  'Команда экспертов': 'Ekspertu komanda',
  'Стаж': 'Darba pieredze',
  'Стаж работы': 'Darba pieredze',
  'Образование': 'Izglītība',
  'Сертификат': 'Sertifikāts',
  'Сертификаты': 'Sertifikāti',
  'Опыт': 'Pieredze',
  'Лет опыта': 'Gadu pieredze',
  'Довольных пациентов': 'Apmierinātu pacientu',
  'Пациент клиники': 'Klīnikas pacients',
  'Интерьер клиники': 'Klīnikas interjers',
  'Обсудим проблему,': 'Pārrunāsim situāciju,',
  'подберём специалиста,': 'ieteiksim piemērotāko speciālistu,',
  'расскажем, что делать': 'izskaidrosim turpmāko',
  'дальше': 'rīcības plānu',
  'Восстанавливаем улыбку с помощью керамических виниров, накладок и коронок.':
    'Atjaunojam smaidu ar keramikas venīriem, uzlikām un kronīšiem.',
  'Выполняем художественные реставрации и лечим корневые каналы с помощью операционного микроскопа.':
    'Veicam estētiskās restaurācijas un sakņu kanālu ārstēšanu operācijas mikroskopā.',
  'Исправляем прикус и неправильное положение зубов с помощью элайнеров.':
    'Koriģējam sakodienu un zobu novietojumu ar caurspīdīgiem elaineriem.',
  'Комплекс профилактических процедур для предотвращения заболеваний зубов и дёсен, а также для поддержания здоровья полости рта.':
    'Profilaktisku procedūru kopums zobu un smaganu slimību novēršanai un mutes dobuma veselības uzturēšanai.',
  'Отбеливание системой Flash — улыбка становится светлее за один визит.':
    'Zobu balināšana ar Fläsh sistēmu — gaišāks smaids vienas vizītes laikā.',
  'Лечим детей бережно и внимательно — ребёнок чувствует себя в безопасности с первых минут приёма.':
    'Bērnus ārstējam saudzīgi un iejūtīgi, lai viņi jau no pirmajām vizītes minūtēm justos droši.',

  // Izmaksu kalkulators
  'Стоимость': 'Izmaksas',
  'Расчёт стоимости': 'Izmaksu aprēķins',
  'Выберите имплант': 'Izvēlieties implantu',
  'Выберите коронку': 'Izvēlieties kronīti',
  'Стоимость коронки': 'Kronīša izmaksas',
  'Кол-во и цена': 'Daudzums un cena',
  'Всего выбрано': 'Kopā izvēlēti',
  '← Изменить выбор': '← Mainīt izvēli',
  'по запросу': 'pēc pieprasījuma',

  // Formas
  'Оставьте сообщение, и мы свяжемся с вами!': 'Atstājiet ziņu, un mēs ar jums sazināsimies!',
  'Оставьте телефон и мы вам перезвоним': 'Atstājiet tālruņa numuru, un mēs jums atzvanīsim',
  'Заполните форму, чтобы наш администратор мог связаться с вами и записать на консультацию.':
    'Aizpildiet formu, lai mūsu administrators varētu ar jums sazināties un pieteikt konsultāciju.',
  'Имя': 'Vārds',
  'Фамилия': 'Uzvārds',
  'Ваше имя': 'Jūsu vārds',
  'Ваша фамилия': 'Jūsu uzvārds',
  'Возраст': 'Vecums',
  'Уменьшить возраст': 'Samazināt vecumu',
  'Увеличить возраст': 'Palielināt vecumu',
  'Номер телефона': 'Tālruņa numurs',
  'Ваш номер телефона': 'Jūsu tālruņa numurs',
  'Код страны': 'Valsts kods',
  'Выбрать страну': 'Izvēlēties valsti',
  'Поиск страны': 'Meklēt valsti',
  'Сообщение': 'Ziņa',
  'Напишите ваше сообщение..': 'Uzrakstiet savu ziņu…',
  'Не знаю': 'Nezinu',
  'Я согласен на обработку моих персональных данных в соответствии с':
    'Piekrītu savu personas datu apstrādei saskaņā ar',
  'политикой конфиденциальности': 'privātuma politiku',
  'Политика конфиденциальности': 'Privātuma politika',
  'Пожалуйста, укажите имя, фамилию и корректный номер телефона.':
    'Lūdzu, norādiet vārdu, uzvārdu un derīgu tālruņa numuru.',
  'Отметьте согласие на обработку персональных данных.':
    'Lūdzu, apstipriniet piekrišanu personas datu apstrādei.',
  'Не удалось отправить заявку. Попробуйте позже или позвоните нам.':
    'Pieteikumu neizdevās nosūtīt. Lūdzu, mēģiniet vēlāk vai piezvaniet mums.',
  'Заявка принята — мы свяжемся с вами в ближайшее время.':
    'Pieteikums ir saņemts — drīzumā ar jums sazināsimies.',
  'Мы свяжемся с вами в ближайшее время.': 'Drīzumā ar jums sazināsimies.',

  // Valstis tālruņa koda izvēlnē
  'Латвия': 'Latvija',
  'Литва': 'Lietuva',
  'Эстония': 'Igaunija',
  'Россия': 'Krievija',
  'Беларусь': 'Baltkrievija',
  'Украина': 'Ukraina',
  'Польша': 'Polija',
  'Германия': 'Vācija',
  'Швеция': 'Zviedrija',
  'Норвегия': 'Norvēģija',
  'Дания': 'Dānija',
  'Финляндия': 'Somija',
  'Чехия': 'Čehija',
  'Италия': 'Itālija',
  'Испания': 'Spānija',
  'Франция': 'Francija',
  'Австрия': 'Austrija',
  'Швейцария': 'Šveice',
  'Нидерланды': 'Nīderlande',
  'Великобритания': 'Lielbritānija',
  'Израиль': 'Izraēla',
  'Грузия': 'Gruzija',
  'Южная Корея': 'Dienvidkoreja',
  'США / Канада': 'ASV / Kanāda',

  // Sīkdatnes un kājene
  'Мы используем cookies': 'Mēs izmantojam sīkdatnes',
  'Согласие на использование cookie-файлов': 'Piekrišana sīkdatņu izmantošanai',
  'Используя сайт, вы соглашаетесь с': 'Izmantojot vietni, jūs piekrītat',
  'обработкой данных': 'datu apstrādei',
  'с целью сбора аналитики.': 'analītikas datu apkopošanas nolūkā.',
  'Принять': 'Pieņemt',
  'Только необходимые': 'Tikai nepieciešamās',
  'Необходимые': 'Nepieciešamās',
  'Аналитика': 'Analītika',
  'Аналитика данных': 'Datu analītika',
  'Реклама': 'Reklāma',
  'Веб-сайт': 'Vietne',
  'Cookie-файлы': 'Sīkdatnes',
  'Порядок записи': 'Vizītes pieteikšanas kārtība',
  'Правила распорядка': 'Iekšējās kārtības noteikumi',
  'Общие положения': 'Vispārīgie noteikumi',
  'Прочие условия': 'Citi noteikumi',

  // Galvenās lapas SEO
  'RoyalDent — Стоматология в Юрмале | Имплантация и лечение под микроскопом':
    'RoyalDent — zobārstniecība Jūrmalā | Implantācija un ārstēšana mikroskopā',
  'Современная стоматология RoyalDent в Юрмале без боли и страха: имплантация, лечение под микроскопом, эстетика, профессиональная гигиена и отбеливание. Запишитесь на приём.':
    'Mūsdienīga zobārstniecība RoyalDent Jūrmalā: implantācija, ārstēšana mikroskopā, estētiskā zobārstniecība, profesionālā mutes higiēna un zobu balināšana. Piesakiet vizīti.',
  'Современная стоматология в Юрмале без боли и страха. Имплантация, лечение под микроскопом, эстетическая стоматология и профессиональная гигиена.':
    'Mūsdienīga zobārstniecība Jūrmalā: implantācija, ārstēšana mikroskopā, estētiskā zobārstniecība un profesionālā mutes higiēna.',

  // Pieejamība un galerijas
  'До': 'Pirms',
  'После': 'Pēc',
  'Сравнение до и после': 'Salīdzinājums pirms un pēc',
  'Предыдущий': 'Iepriekšējais',
  'Следующий': 'Nākamais',
  'Предыдущая карточка': 'Iepriekšējā kartīte',
  'Следующая карточка': 'Nākamā kartīte',
  'Предыдущее фото': 'Iepriekšējais attēls',
  'Следующее фото': 'Nākamais attēls',
  'Фото': 'Fotoattēls',
  'Фото работы': 'Darbu fotoattēli',
  'Фото интерьера': 'Interjera fotoattēls',
  'Кейсы': 'Gadījumi',
  'Смотреть кейс': 'Skatīt gadījumu',
  'Процесс': 'Process',
  'Этап': 'Posms',
  '— скоро': '— drīzumā',
};

/**
 * Šabloni izpildlaikā saliktām virknēm (numuri, vārdi, skaits). Tās nekad
 * nesakrīt ar vārdnīcas atslēgu, tāpēc tiek apstrādātas atsevišķi.
 */
function translateDynamicString(value: string): string | undefined {
  let match: RegExpMatchArray | null;

  /*
   * Iekļautais nosaukums pats var būt vārdnīcā — tulkojam to rekursīvi.
   * Ja tas vārdnīcā nav, noteikums atsakās no visas virknes: latviska
   * apdare ap netulkotu krievu nosaukumu ir tieši tā valodu sajaukšana,
   * no kuras izvairāmies.
   */
  let failed = false;
  const inner = (part: string) => {
    const translated = translateCore(part.trim());
    if (CYRILLIC.test(translated)) failed = true;
    return translated;
  };
  const done = (result: string) => (failed ? undefined : result);

  // Juridisko lapu virknes ar klīnikas datiem tiek saliktas izpildlaikā.
  if ((match = value.match(/^Правила размещаются на информационном стенде в холле Клиники и на официальном сайте (.+)\.$/u))) {
    return `Noteikumi ir izvietoti Klīnikas vestibila informācijas stendā un oficiālajā tīmekļa vietnē ${match[1]}.`;
  }
  if ((match = value.match(/^по телефону Клиники: (.+);$/u))) {
    return `pa Klīnikas tālruni: ${match[1]};`;
  }
  if ((match = value.match(/^по электронной почте: (.+);$/u))) {
    return `pa e-pastu: ${match[1]};`;
  }
  if ((match = value.match(/^через форму записи на официальном сайте Клиники: (.+)\.$/u))) {
    return `izmantojot pieteikšanās formu Klīnikas oficiālajā tīmekļa vietnē: ${match[1]}.`;
  }
  if ((match = value.match(/^Клиника работает по адресу: (.+)\. График работы: (.+); (.+)\.$/u))) {
    return done(`Klīnika atrodas adresē: ${match[1]}. Darba laiks: ${inner(match[2])}; ${inner(match[3])}.`);
  }
  if ((match = value.match(/^График работы Клиники: (.+); (.+)\.$/u))) {
    return done(`Klīnikas darba laiks: ${inner(match[1])}; ${inner(match[2])}.`);
  }
  if ((match = value.match(/^Веб-сайт (.+) \(далее — «Сайт»\) принадлежит на праве собственности SIA «Royal Dent» \(регистрационный номер 40203129158, юридический адрес: (.+)\), владелица — Tamāra Kušnere \(далее — «Компания»\)\. Все объекты интеллектуальной собственности, размещённые на Сайте, кроме случаев, когда указано иное, являются собственностью Компании\.$/u))) {
    return `Tīmekļa vietne ${match[1]} (turpmāk — Vietne) pieder SIA “Royal Dent” (reģistrācijas numurs 40203129158, juridiskā adrese: ${match[2]}), īpašniece — Tamāra Kušnere (turpmāk — Sabiedrība). Visi Vietnē izvietotie intelektuālā īpašuma objekti, ja vien nav norādīts citādi, ir Sabiedrības īpašums.`;
  }
  if ((match = value.match(/^Фактический адрес Клиники: (.+)\.$/u))) {
    return `Klīnikas faktiskā adrese: ${match[1]}.`;
  }
  if ((match = value.match(/^Для реализации своих прав пользователь может направить запрос на адрес электронной почты: (.+) или обратиться по телефону (.+)\. Компания отвечает на запрос в срок, установленный GDPR\.$/u))) {
    return `Lai īstenotu savas tiesības, lietotājs var nosūtīt pieprasījumu uz e-pasta adresi ${match[1]} vai zvanīt pa tālruni ${match[2]}. Sabiedrība atbild uz pieprasījumu VDAR noteiktajā termiņā.`;
  }

  if ((match = value.match(/^Слайд (\d+)$/u))) return `${match[1]}. slaids`;
  if ((match = value.match(/^Этап (\d+)$/u))) return `${match[1]}. posms`;
  if ((match = value.match(/^Фото (\d+) из (\d+)$/u))) return `${match[1]}. attēls no ${match[2]}`;
  if ((match = value.match(/^Фото (\d+)$/u))) return `${match[1]}. attēls`;
  if ((match = value.match(/^Спасибо, (.+)!$/u))) return `Paldies, ${match[1]}!`;
  if ((match = value.match(/^Язык сайта: (.+)$/u))) return `Vietnes valoda: ${match[1]}`;
  if ((match = value.match(/^Подробнее о враче: (.+)$/u))) return `Vairāk par ārstu: ${match[1]}`;
  if ((match = value.match(/^Открыть сертификат (\d+) из (\d+)$/u))) {
    return `Atvērt ${match[1]}. sertifikātu no ${match[2]}`;
  }
  if ((match = value.match(/^Открыть сертификат: (.+)$/u))) {
    return done(`Atvērt sertifikātu: ${inner(match[1])}`);
  }
  if ((match = value.match(/^Сертификат (\d+) из (\d+) — (.+)$/u))) {
    return done(`${match[1]}. sertifikāts no ${match[2]} — ${inner(match[3])}`);
  }
  if ((match = value.match(/^Сертификат — (.+)$/u))) return done(`Sertifikāts — ${inner(match[1])}`);
  if ((match = value.match(/^Интерьер клиники RoyalDent (\d+)$/u))) {
    return `RoyalDent klīnikas interjers ${match[1]}`;
  }
  if ((match = value.match(/^Фото · (.+)$/u))) return done(`Foto · ${inner(match[1])}`);
  if ((match = value.match(/^Фото — (.+)$/u))) return done(`Foto — ${inner(match[1])}`);
  if ((match = value.match(/^\[Фото — (.+)\]$/u))) return done(`[Foto — ${inner(match[1])}]`);
  if ((match = value.match(/^\[Фото: (.+)\]$/u))) return done(`[Foto: ${inner(match[1])}]`);
  if ((match = value.match(/^\[Фото процесса: (.+)\]$/u))) {
    return done(`[Procesa foto: ${inner(match[1])}]`);
  }
  // Nosaukums šeit jau ir iztulkots (tas nāk no props), tāpēc sagaidām
  // latvisku sākumu — inner() to atstāj neskartu un atsakās, ja tas tomēr
  // vēl ir krieviski.
  if ((match = value.match(/^(.+), работа (\d+)$/u))) {
    return done(`${inner(match[1])}, darbs ${match[2]}`);
  }
  if ((match = value.match(/^от (.+)$/u))) return `no ${match[1]}`;
  if ((match = value.match(/^Итого: (.+)$/u))) return `Kopā: ${match[1]}`;
  return undefined;
}

/**
 * Meklēšanas vārdnīca. Glosārijs stāv pēdējais: ja viens un tas pats teksts
 * ir abās vārdnīcās, noteicošais ir redakcionāli pārbaudītais glosārija
 * variants, nevis lapas teksts.
 */
export const allLatvianTranslations: Record<string, string> = {
  ...latvianRemainingTranslations,
  ...latvianPageTranslations,
  ...latvianTranslations,
};

const CYRILLIC = /[А-Яа-яЁё]/u;
/**
 * Nulles platuma rakstzīmes mēdz iekļūt tekstā, kopējot to no maketiem.
 * Testēšanai un aizstāšanai vajadzīgi divi atsevišķi izteiksmju objekti:
 * karogs `g` padara `.test()` stāvokļatkarīgu caur `lastIndex`.
 */
const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/u;
const ZERO_WIDTH_ALL = /[\u200B-\u200D\uFEFF]/gu;

/** Vite aizpilda import.meta.env; zem tsx (Node) tā nav definēta. */
const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;

/**
 * Netulkotās virknes, kas sastaptas šajā sesijā. Tulkojot pa lapām, pārlūka
 * konsolē uzreiz redzams, kas konkrētajā lapā vēl trūkst.
 */
const missingStrings = new Set<string>();

function reportMissing(value: string): void {
  if (!isDev || missingStrings.has(value)) return;
  missingStrings.add(value);
  console.warn(`[i18n:lv] missing translation: ${JSON.stringify(value)}`);
}

/** Visas šajā sesijā nesatulkotās virknes — ērti izsaukt no konsoles. */
export function getMissingLatvianStrings(): string[] {
  return [...missingStrings].sort((a, b) => a.localeCompare(b, 'ru'));
}

// Tulkojot pa lapām, sarakstu ērti nokopēt no pārlūka konsoles.
if (isDev && typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).lvMissing = getMissingLatvianStrings;
}

function translateCore(value: string): string {
  const sanitized = value.replace(ZERO_WIDTH_ALL, '');
  if (!CYRILLIC.test(sanitized)) return sanitized;

  const normalized = sanitized.replace(/\s+/gu, ' ').trim();
  const exact = allLatvianTranslations[normalized];
  if (exact) return exact;

  const dynamic = translateDynamicString(normalized);
  if (dynamic) return dynamic;

  // Apzināti bez daļējas aizstāšanas — skat. faila sākuma komentāru.
  reportMissing(normalized);
  return sanitized;
}

/**
 * JSX teksta mezglos nozīme ir apkārtējām atstarpēm: tās atdala blakus
 * esošus elementus. Vārdnīca glabā apgrieztas atslēgas, tāpēc atstarpes
 * saglabājam atsevišķi.
 */
function translateTextValue(value: string): string {
  if (!CYRILLIC.test(value) && !ZERO_WIDTH.test(value)) return value;
  const leading = value.match(/^\s*/u)?.[0] ?? '';
  const trailing = value.match(/\s*$/u)?.[0] ?? '';
  return `${leading}${translateCore(value)}${trailing}`;
}

export function installLatvianTranslation(): void {
  setRuntimeTranslator(
    translateTextValue,
    () => !/^\/admin(?:\/|$)/u.test(window.location.pathname),
  );
}

export function translateLatvian(value: string): string {
  return translateCore(value);
}
