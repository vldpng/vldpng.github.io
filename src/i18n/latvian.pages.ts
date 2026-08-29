/**
 * Lapu teksti latviski.
 *
 * Pamata glosārijs (navigācija, terminoloģija, formas) atrodas latvian.ts —
 * šeit ir apjomīgie lapu teksti, sagrupēti pēc avota faila. Sadalījums ir
 * tikai lasāmības dēļ: izpildlaikā abas vārdnīcas tiek apvienotas.
 *
 * UZMANĪBU: juridisko lapu tekstus (PatientRulesPage, PrivacyPage,
 * CookiesPage) pirms publicēšanas jāapstiprina klīnikai — tie atsaucas uz
 * Latvijas Republikas normatīvajiem aktiem, un tulkojums no krievu valodas
 * nevar aizstāt oriģinālo juridisko formulējumu.
 */
export const latvianPageTranslations: Record<string, string> = {
  // ─── components/sections/TreatmentProcess.tsx ───
  'Как проходит лечение': 'Kā notiek ārstēšana',
  'Шесть этапов — от первого осмотра до контрольного визита. Вы всегда знаете, что происходит сейчас и что будет дальше.':
    'Seši posmi — no pirmās apskates līdz kontroles vizītei. Jūs vienmēr zināt, kas notiek tagad un kas sekos tālāk.',
  'Первичная консультация': 'Pirmreizējā konsultācija',
  'Лечение начинается с консультации: врач выслушивает жалобы и пожелания, собирает медицинский анамнез и проводит осмотр полости рта.':
    'Ārstēšana sākas ar konsultāciju: ārsts uzklausa sūdzības un vēlmes, ievāc medicīnisko anamnēzi un veic mutes dobuma apskati.',
  'Компьютерная томография, внутриротовое сканирование и фотопротокол. Полная картина вместо догадок — только так план лечения получается точным.':
    'Datortomogrāfija, intraorālā skenēšana un fotoprotokols. Pilnīga aina minējumu vietā — tikai tā ārstēšanas plāns ir precīzs.',
  'Составление плана лечения': 'Ārstēšanas plāna sagatavošana',
  'На основе данных диагностики врач готовит индивидуальный план: последовательность этапов, сроки и стоимость каждого из них.':
    'Pamatojoties uz diagnostikas datiem, ārsts sagatavo individuālu plānu: posmu secību, termiņus un katra posma izmaksas.',
  'Обсуждение плана с пациентом': 'Plāna pārrunāšana ar pacientu',
  'Разбираем план вместе: объясняем каждый этап, показываем альтернативы и отвечаем на вопросы. К лечению приступаем только после вашего согласия.':
    'Plānu pārrunājam kopā: izskaidrojam katru posmu, parādām alternatīvas un atbildam uz jautājumiem. Ārstēšanu sākam tikai pēc jūsu piekrišanas.',
  'Лечение': 'Ārstēšana',
  'Работаем поэтапно, в согласованном графике и с контролем результата на каждом шаге. Все манипуляции проводятся под увеличением.':
    'Strādājam pa posmiem, saskaņotā grafikā un kontrolējot rezultātu katrā solī. Visas manipulācijas veicam ar optisko palielinājumu.',
  'Завершение и рекомендации': 'Noslēgums un ieteikumi',
  'Оцениваем результат, даём персональные рекомендации по уходу и составляем график профилактических визитов, чтобы результат сохранился надолго.':
    'Izvērtējam rezultātu, sniedzam personiskus kopšanas ieteikumus un sastādām profilaktisko vizīšu grafiku, lai rezultāts saglabātos ilgi.',
  'Ваш результат —': 'Jūsu rezultāts —',
  'наш общий успех.': 'mūsu kopīgie panākumi.',

  // ─── components/sections/ServiceCards.tsx ───
  'Исправляем прикус и положение зубов прозрачными элайнерами Ordoline — незаметно для окружающих и без брекетов.':
    'Koriģējam sakodienu un zobu novietojumu ar caurspīdīgiem Ordoline elaineriem — apkārtējiem nemanāmi un bez breketēm.',
  'Имплантация All-on-4': 'All-on-4 implantācija',
  'Полный зубной ряд на четырёх имплантах: несъёмный протез для пациентов, утративших все зубы на челюсти.':
    'Pilna zobu rinda uz četriem implantiem: neizņemama protēze pacientiem, kuri zaudējuši visus žokļa zobus.',
  'Имплантация All-on-6': 'All-on-6 implantācija',
  'Полный зубной ряд на шести имплантах — максимально стабильная опора протеза при полном отсутствии зубов.':
    'Pilna zobu rinda uz sešiem implantiem — maksimāli stabils protēzes balsts pilnīgas zobu neesamības gadījumā.',
  'Удаляем зубы мудрости любой сложности — бережно, по КТ-снимку и с сопровождением после операции.':
    'Izņemam jebkuras sarežģītības gudrības zobus — saudzīgi, pēc datortomogrāfijas un ar atbalstu pēc operācijas.',
  'Лечим детей бережно и внимательно: ребёнок чувствует себя в безопасности с первых минут приёма.':
    'Bērnus ārstējam saudzīgi un iejūtīgi: bērns jūtas droši jau no pirmajām vizītes minūtēm.',
  'Аппаратное лечение пародонтальных карманов системой Vector: снимаем воспаление и кровоточивость дёсен.':
    'Periodonta kabatu ārstēšana ar Vector sistēmu: mazinām smaganu iekaisumu un asiņošanu.',
  'Лечим пульпит и периодонтит под операционным микроскопом и восстанавливаем зуб после лечения.':
    'Ārstējam pulpītu un periodontītu operācijas mikroskopā un pēc ārstēšanas atjaunojam zobu.',
  'Комплекс профилактических мероприятий для предотвращения заболеваний зубов и десен, а также поддержания здоровья полости рта после завершения плана лечения.':
    'Profilaktisku pasākumu kopums zobu un smaganu slimību novēršanai un mutes dobuma veselības uzturēšanai pēc ārstēšanas plāna pabeigšanas.',
  'Клиническое отбеливание Flash — улыбка светлее на несколько тонов за один визит, безопасно для эмали.':
    'Klīniskā balināšana ar Fläsh sistēmu — smaids par vairākiem toņiem gaišāks vienā vizītē, saudzējot emalju.',
  'Эстетические процедуры для лица и зоны вокруг губ: лечение кожи и естественное омоложение у врача-косметолога с медицинским образованием.':
    'Estētiskās procedūras sejai un lūpu apvidum: ādas ārstēšana un dabiska atjaunošana pie kosmetologa ar medicīnisko izglītību.',

  // ─── components/sections/AboutApproach.tsx ───
  'Почему пациенты выбирают нас': 'Kāpēc pacienti izvēlas mūs',
  'Индивидуальный подход и забота о пациенте —': 'Individuāla pieeja un rūpes par pacientu —',
  'основа каждого приёма.': 'katras vizītes pamatā.',
  'Инновационные технологии': 'Inovatīvas tehnoloģijas',
  'Клиника RoyalDent оснащена передовым оборудованием с использованием современных технологий, обеспечивая точность, эффективность и комфорт во всех видах стоматологических процедур.':
    'RoyalDent klīnika ir aprīkota ar modernu tehniku un tehnoloģijām, kas nodrošina precizitāti, efektivitāti un komfortu visu veidu zobārstniecības procedūrās.',
  'Наши специалисты не только обладают многолетним опытом, но и постоянно совершенствуют свои навыки через обучение и участие в международных конференциях.':
    'Mūsu speciālistiem ir ne tikai ilggadēja pieredze — viņi pastāvīgi pilnveido prasmes mācībās un starptautiskās konferencēs.',
  'Значимый медицинский опыт': 'Nozīmīga medicīniskā pieredze',
  'Наша клиника предоставляет эксклюзивный уровень заботы о здоровье, опираясь на 15-летний опыт и профессиональную компетентность в области стоматологии.':
    'Mūsu klīnika nodrošina augsta līmeņa veselības aprūpi, balstoties uz 15 gadu pieredzi un profesionālu kompetenci zobārstniecībā.',
  'Современные методики': 'Mūsdienīgas metodes',
  'Мы всегда следим за последними тенденциями и инновациями в стоматологии, чтобы предоставлять вам доступ к самым современным и эффективным методикам лечения.':
    'Mēs sekojam līdzi jaunākajām tendencēm un inovācijām zobārstniecībā, lai piedāvātu jums modernākās un efektīvākās ārstēšanas metodes.',

  // ─── components/sections/Cosmetology.tsx ───
  'Услуги косметолога в клинике RoyalDent': 'Kosmetologa pakalpojumi RoyalDent klīnikā',
  'Доверьте красоту опытному врачу:': 'Uzticiet skaistumu pieredzējušam ārstam:',
  'Вернем гладкость': 'Atgriezīsim ādai gludumu',
  'и сияние кожи': 'un mirdzumu',
  'Почувствуйте себя комфортно и привлекательно с помощью эффективных процедур по лечению кожи и естественному омоложению':
    'Jūtieties komfortabli un pievilcīgi, pateicoties efektīvām ādas ārstēšanas un dabiskas atjaunošanas procedūrām',
  'Врач-косметолог с медицинским образованием': 'Kosmetologs ar medicīnisko izglītību',
  'Елена Якунчихина': 'Jeļena Jakunčihina',
  'Елена Якунчихина — врач-косметолог клиники RoyalDent':
    'Jeļena Jakunčihina — RoyalDent klīnikas kosmetologs',

  // ─── data/services.ts ───
  'Надежное восстановление утраченных зубов с использованием лучших мировых имплант-систем и пожизненной гарантией.':
    'Droša zaudēto zobu atjaunošana, izmantojot pasaules vadošās implantu sistēmas, ar mūža garantiju.',
  'Полный зубной ряд на четырёх имплантах: несъёмный протез при полном отсутствии зубов на челюсти.':
    'Pilna zobu rinda uz četriem implantiem: neizņemama protēze pilnīgas žokļa zobu neesamības gadījumā.',
  'Полный зубной ряд на шести имплантах — максимально стабильная опора при полном отсутствии зубов.':
    'Pilna zobu rinda uz sešiem implantiem — maksimāli stabils balsts pilnīgas zobu neesamības gadījumā.',
  'Лечим пульпит и периодонтит под микроскопом: снимаем боль, сохраняем зуб и восстанавливаем его после лечения.':
    'Ārstējam pulpītu un periodontītu mikroskopā: mazinām sāpes, saglabājam zobu un pēc ārstēšanas to atjaunojam.',
  'Бережное удаление налета и камня по современным протоколам для абсолютного здоровья ваших десен.':
    'Saudzīga aplikuma un zobakmens noņemšana pēc mūsdienīgiem protokoliem jūsu smaganu veselībai.',
  'Ослепительная белоснежная улыбка без вреда для эмали. Быстрый и комфортный результат с системой Flash.':
    'Starojoši balts smaids, nekaitējot emaljai. Ātrs un komfortabls rezultāts ar Fläsh sistēmu.',
  'Исправление прикуса без брекетов. Максимально комфортный и эстетичный процесс преображения.':
    'Sakodiena korekcija bez breketēm. Maksimāli komfortabls un estētisks pārvērtību process.',

  // ─── components/sections/MainServices.tsx ───
  'Тотальная реабилитация всего зубного ряда с помощью имплантов для пациентов, которые утратили большинство или все зубы.':
    'Pilnīga zobu rindas rehabilitācija ar implantiem pacientiem, kuri zaudējuši lielāko daļu zobu vai visus zobus.',
  'Несъёмный протез на четырёх имплантах при полном отсутствии зубов на челюсти.':
    'Neizņemama protēze uz četriem implantiem pilnīgas žokļa zobu neesamības gadījumā.',
  'Несъёмный протез на шести имплантах — самая стабильная фиксация при полном отсутствии зубов.':
    'Neizņemama protēze uz sešiem implantiem — visstabilākā fiksācija pilnīgas zobu neesamības gadījumā.',
  'Удаляем зубы мудрости любой сложности: планируем операцию по КТ и сопровождаем восстановление.':
    'Izņemam jebkuras sarežģītības gudrības zobus: operāciju plānojam pēc datortomogrāfijas un pavadām atveseļošanos.',
  'Аппаратное лечение дёсен системой Vector: снимаем воспаление, кровоточивость и дискомфорт.':
    'Smaganu ārstēšana ar Vector sistēmu: mazinām iekaisumu, asiņošanu un diskomfortu.',
  'Диагностика и лечение дисфункции височно-нижнечелюстного сустава (ВНЧС): подбор терапии, капы при бруксизме и спортивные капы.':
    'Temporomandibulārās locītavas (TML) disfunkcijas diagnostika un ārstēšana: terapijas izvēle, kapes bruksisma gadījumā un sporta kapes.',

  // ─── components/sections/Sample.tsx ───
  'Истории преображения': 'Pārvērtību stāsti',
  'Результаты плодотворной работы врача и техника. Улыбки, которые прошли долгий путь для достижения результата.':
    'Ārsta un zobu tehniķa kopdarba rezultāti. Smaidi, kas līdz rezultātam gājuši garu ceļu.',
  'Тотальная реабилитация': 'Pilnīga rehabilitācija',
  '#элайнеры': '#elaineri',
  '#виниры': '#venīri',
  '#функциональная реабилитация': '#funkcionālā rehabilitācija',

  // ─── components/ui/google-reviews.tsx ───
  'Что говорят пациенты': 'Ko saka pacienti',
  'Действительные и честные оценки на основе реального опыта лечения в нашей клинике.':
    'Īstas un godīgas atsauksmes, kas balstītas reālā ārstēšanās pieredzē mūsu klīnikā.',
  'Отзывы Google Maps': 'Google Maps atsauksmes',
  'Пользователь Google': 'Google lietotājs',
  'Оценил(а) на отлично': 'Novērtēja teicami',
  'Не удалось загрузить отзывы:': 'Neizdevās ielādēt atsauksmes:',

  // ─── components/layout/Footer.tsx ───
  'Панель администратора': 'Administratora panelis',
  'Панель администратора (пока недоступна)': 'Administratora panelis (pagaidām nav pieejams)',
  'Панель администратора — скоро': 'Administratora panelis — drīzumā',

  // ─── components/ui/before-after-slider.tsx ───
  'до': 'pirms',
  'после': 'pēc',

  // ─── pages/DoctorPage.tsx un modals/CertificateLightbox.tsx ───
  'Сертификаты врача': 'Ārsta sertifikāti',
  'Назад к списку врачей': 'Atpakaļ uz ārstu sarakstu',
  'Работы врача до и после': 'Ārsta darbi pirms un pēc',
  'Предыдущий сертификат': 'Iepriekšējais sertifikāts',
  'Следующий сертификат': 'Nākamais sertifikāts',
  'Подробнее о враче': 'Vairāk par ārstu',

  // ─── Sadaļu virsraksti un SEO apraksti ───
  'Стоматология RoyalDent': 'RoyalDent zobārstniecība',
  'карусель': 'karuselis',
  'Карта проезда к клинике RoyalDent': 'Karte, kā nokļūt RoyalDent klīnikā',
  'Комплексный подход к здоровью и эстетике вашей улыбки. Передовые протоколы лечения и бескомпромиссное качество.':
    'Kompleksa pieeja jūsu smaida veselībai un estētikai. Mūsdienīgi ārstēšanas protokoli un nemainīgi augsta kvalitāte.',
  'Больше о клинике RoyalDent': 'Vairāk par RoyalDent klīniku',
  'О стоматологической клинике RoyalDent в Юрмале: индивидуальный подход, инновационные технологии, команда экспертов и 15 лет опыта.':
    'Par RoyalDent zobārstniecības klīniku Jūrmalā: individuāla pieeja, inovatīvas tehnoloģijas, ekspertu komanda un 15 gadu pieredze.',
  'Врачи в клинике RoyalDent': 'RoyalDent klīnikas ārsti',
  'Команда стоматологов клиники RoyalDent в Юрмале: хирурги-имплантологи, ортопеды, ортодонты и эндодонтисты с многолетним опытом.':
    'RoyalDent klīnikas zobārstu komanda Jūrmalā: implantologi, protēzisti, ortodonti un endodontisti ar ilggadēju pieredzi.',
  'Цены в клинике RoyalDent': 'Cenas RoyalDent klīnikā',
  'Цены на стоматологические услуги в клинике RoyalDent в Юрмале: лечение, имплантация, гигиена, отбеливание, ортодонтия. Прозрачное ценообразование.':
    'Zobārstniecības pakalpojumu cenas RoyalDent klīnikā Jūrmalā: ārstēšana, implantācija, higiēna, balināšana, ortodontija. Caurskatāma cenu politika.',
  'Услуги в клинике RoyalDent': 'Pakalpojumi RoyalDent klīnikā',
  'Стоматологические услуги клиники RoyalDent в Юрмале: эстетическая стоматология, имплантация, лечение под микроскопом, профессиональная гигиена, отбеливание и элайнеры.':
    'RoyalDent klīnikas zobārstniecības pakalpojumi Jūrmalā: estētiskā zobārstniecība, implantācija, ārstēšana mikroskopā, profesionālā mutes higiēna, balināšana un elaineri.',
  'Страница не найдена': 'Lapa nav atrasta',
  'Такой страницы на сайте RoyalDent нет. Вернитесь на главную или свяжитесь с клиникой.':
    'Šādas lapas RoyalDent vietnē nav. Atgriezieties sākumlapā vai sazinieties ar klīniku.',

  // ─── pages/PatientsPage.tsx ───
  'Информация для посетителей клиники RoyalDent': 'Informācija RoyalDent klīnikas apmeklētājiem',
  'Правила приёма и правовая информация для пациентов клиники RoyalDent в Юрмале: порядок записи, подготовка к исследованиям и нормативные акты.':
    'Pieņemšanas noteikumi un tiesiskā informācija RoyalDent klīnikas pacientiem Jūrmalā: pieteikšanās kārtība, sagatavošanās izmeklējumiem un normatīvie akti.',
  'Правила приёма и распорядка': 'Pieņemšanas un iekšējās kārtības noteikumi',
  'Правовая информация и нормативные акты': 'Tiesiskā informācija un normatīvie akti',
  'Закон ЛР «О правах пациентов» (Pacientu tiesību likums)': 'LR Pacientu tiesību likums',
  'Права и обязанности пациента в сфере охраны здоровья':
    'Pacienta tiesības un pienākumi veselības aprūpē',
  'Контакты контролирующих организаций (Veselības inspekcija)':
    'Uzraudzības iestāžu kontakti (Veselības inspekcija)',

  // ─── components/sections/Faq.tsx ───
  'Ответы на часто задаваемые вопросы': 'Atbildes uz biežāk uzdotajiem jautājumiem',
  'Собрали то, о чём пациенты спрашивают чаще всего. Не нашли ответ?':
    'Apkopojām to, ko pacienti jautā visbiežāk. Neatradāt atbildi?',
  'Больно ли лечить зубы в клинике RoyalDent?':
    'Vai zobu ārstēšana RoyalDent klīnikā ir sāpīga?',
  'Больно ли лечить зубы?': 'Vai zobu ārstēšana ir sāpīga?',
  'Нет. Лечение проходит под местной анестезией: сначала наносим аппликационный гель, чтобы укол не чувствовался, затем вводим анестетик медленно и в минимальном объёме. Большинство процедур проходят абсолютно комфортно — без боли и страха.':
    'Nē. Ārstēšana notiek vietējā anestēzijā: vispirms uzklājam aplikācijas gēlu, lai injekcija nebūtu jūtama, pēc tam anestēzijas līdzekli ievadām lēni un minimālā daudzumā. Lielākā daļa procedūru norit pilnīgi komfortabli — bez sāpēm un bailēm.',
  'Нужно ли записываться заранее?': 'Vai vizīte jāpiesaka iepriekš?',
  'Да, мы работаем по предварительной записи, чтобы вам не пришлось ждать в очереди. Записаться можно по телефону или через форму на сайте — администратор подберёт удобное для вас время.':
    'Jā, mēs strādājam pēc iepriekšēja pieraksta, lai jums nebūtu jāgaida rindā. Pieteikties var pa tālruni vai aizpildot formu vietnē — administrators piemeklēs jums ērtu laiku.',
  'Даёте ли вы гарантию на лечение?': 'Vai sniedzat garantiju ārstēšanai?',
  'Да. На все виды лечения и установленные конструкции предоставляется гарантия. Конкретный срок зависит от вида работ — врач подробно расскажет об этом на консультации.':
    'Jā. Visiem ārstēšanas veidiem un uzstādītajām konstrukcijām tiek sniegta garantija. Konkrētais termiņš atkarīgs no darbu veida — ārsts par to sīkāk pastāstīs konsultācijā.',
  'Можно ли вылечить зуб за одно посещение?': 'Vai zobu var izārstēt vienā vizītē?',
  'Во многих случаях — да. Благодаря полному цифровому протоколу ряд процедур, таких как лечение кариеса и эстетические реставрации, мы выполняем за один визит.':
    'Daudzos gadījumos — jā. Pateicoties pilnam digitālajam protokolam, virkni procedūru, piemēram, kariesa ārstēšanu un estētiskās restaurācijas, veicam vienā vizītē.',
  'Принимаете ли вы детей?': 'Vai pieņemat bērnus?',
  'Да, у нас работает детский стоматолог. Мы находим подход к каждому ребёнку, чтобы первый визит к врачу прошёл спокойно, без страха и стресса.':
    'Jā, pie mums strādā bērnu zobārsts. Mēs atrodam pieeju katram bērnam, lai pirmā vizīte pie ārsta paietu mierīgi, bez bailēm un stresa.',
  'На каких языках говорят ваши специалисты?': 'Kādās valodās runā jūsu speciālisti?',
  'Наши врачи и администраторы свободно общаются на русском, латышском и английском языках.':
    'Mūsu ārsti un administratori brīvi sazinās latviešu, krievu un angļu valodā.',
  'Какие услуги предоставляет клиника?': 'Kādus pakalpojumus sniedz klīnika?',
  'RoyalDent — клиника полного цикла: диагностика, терапия и лечение каналов под микроскопом, протезирование, хирургия и имплантация, ортодонтия, детская стоматология и профессиональная гигиена. Весь путь лечения можно пройти в одном месте, не обращаясь в сторонние клиники.':
    'RoyalDent ir pilna cikla klīnika: diagnostika, terapija un sakņu kanālu ārstēšana mikroskopā, protezēšana, ķirurģija un implantācija, ortodontija, bērnu zobārstniecība un profesionālā mutes higiēna. Visu ārstēšanas ceļu var iziet vienuviet, nevēršoties citās klīnikās.',
  'Как записаться на приём?': 'Kā pieteikt vizīti?',
  'Тремя способами: позвонить по телефону +371 27 057 783, заполнить форму на сайте — администратор перезвонит и подберёт время, либо написать нам в мессенджер.':
    'Trīs veidos: zvanot pa tālruni +371 27 057 783, aizpildot formu vietnē — administrators atzvanīs un piemeklēs laiku —, vai rakstot mums ziņapmaiņas lietotnē.',
  'Нужно ли записываться заранее или вы принимаете пациентов в день обращения?':
    'Vai vizīte jāpiesaka iepriekš, vai pieņemat pacientus arī pieteikšanās dienā?',
  'Мы работаем по предварительной записи, чтобы вам не пришлось ждать в очереди и врач мог выделить на приём достаточно времени. При острой боли постараемся принять в день обращения — позвоните, и администратор найдёт для вас окно.':
    'Mēs strādājam pēc iepriekšēja pieraksta, lai jums nebūtu jāgaida rindā un ārsts vizītei varētu atvēlēt pietiekami daudz laika. Akūtu sāpju gadījumā centīsimies pieņemt tajā pašā dienā — piezvaniet, un administrators atradīs jums brīvu laiku.',
  'Можно ли вылечить все зубы за один визит?': 'Vai visus zobus var izārstēt vienā vizītē?',
  'Это зависит от объёма лечения. По возможности мы планируем визиты к разным врачам в один день, чтобы сократить число посещений. В сложных случаях лечение разбивается на этапы — так результат получается качественнее и долговечнее, а само лечение переносится легче.':
    'Tas atkarīgs no ārstēšanas apjoma. Ja iespējams, vizītes pie dažādiem ārstiem plānojam vienā dienā, lai samazinātu apmeklējumu skaitu. Sarežģītos gadījumos ārstēšanu sadalām posmos — tā rezultāts ir kvalitatīvāks un ilgnoturīgāks, un pati ārstēšana ir vieglāk panesama.',
  'Можно ли получить консультацию онлайн?': 'Vai iespējams saņemt konsultāciju attālināti?',
  'Да. Для предварительной консультации пришлите нам компьютерную томографию, фотографии зубов или цифровые модели, если они есть. Врач оценит ситуацию и обозначит примерный план. Окончательный план лечения составляется только после очного осмотра и диагностики.':
    'Jā. Iepriekšējai konsultācijai atsūtiet mums datortomogrāfiju, zobu fotogrāfijas vai digitālos modeļus, ja tādi ir. Ārsts izvērtēs situāciju un iezīmēs aptuvenu plānu. Galīgais ārstēšanas plāns tiek sastādīts tikai pēc klātienes apskates un diagnostikas.',
  'Сколько стоит лечение зубов в вашей клинике?': 'Cik maksā zobu ārstēšana jūsu klīnikā?',
  'Цены по каждому направлению опубликованы в разделе «Цены». Точная стоимость лечения известна после консультации и диагностики: врач составляет письменный план с перечнем работ и итоговой суммой, и она не меняется по ходу лечения.':
    'Cenas katrā jomā publicētas sadaļā «Cenas». Precīzas ārstēšanas izmaksas ir zināmas pēc konsultācijas un diagnostikas: ārsts sastāda rakstisku plānu ar darbu sarakstu un gala summu, kas ārstēšanas gaitā nemainās.',

  // ─── pages/PatientDiagnosticsPage.tsx ───
  'Подготовка к диагностическим исследованиям': 'Sagatavošanās diagnostiskajiem izmeklējumiem',
  'Правила подготовки к диагностическим исследованиям':
    'Sagatavošanās noteikumi diagnostiskajiem izmeklējumiem',
  'Как подготовиться к диагностике в клинике RoyalDent в Юрмале: прицельные снимки, ОПТГ, КЛКТ, фотопротокол и внутриротовое сканирование.':
    'Kā sagatavoties diagnostikai RoyalDent klīnikā Jūrmalā: periapikālie uzņēmumi, ortopantomogramma, konusa stara datortomogrāfija, fotoprotokols un intraorālā skenēšana.',
  'Диагностические исследования помогают врачу точно оценить состояние зубов, костной ткани и окружающих структур, поставить диагноз и составить оптимальный план лечения. Чтобы результаты исследования были максимально информативными, рекомендуем ознакомиться с правилами подготовки.':
    'Diagnostiskie izmeklējumi palīdz ārstam precīzi novērtēt zobu, kaulaudu un apkārtējo struktūru stāvokli, noteikt diagnozi un sastādīt optimālu ārstēšanas plānu. Lai izmeklējuma rezultāti būtu pēc iespējas informatīvāki, iesakām iepazīties ar sagatavošanās noteikumiem.',
  'Рентгенологические исследования зубов': 'Zobu rentgenoloģiskie izmeklējumi',
  'К ним относятся прицельные снимки отдельных зубов и другие виды внутриротовой рентгенографии. Специальная подготовка не требуется.':
    'Pie tiem pieder atsevišķu zobu periapikālie uzņēmumi un citi intraorālās rentgenogrāfijas veidi. Īpaša sagatavošanās nav nepieciešama.',
  'Перед исследованием необходимо:': 'Pirms izmeklējuma nepieciešams:',
  'сообщить врачу или рентгенолаборанту о беременности или предполагаемой беременности;':
    'informēt ārstu vai rentgenlaborantu par grūtniecību vai iespējamu grūtniecību;',
  'снять съёмные металлические предметы в области головы и шеи, если они могут помешать проведению исследования;':
    'noņemt izņemamos metāla priekšmetus galvas un kakla apvidū, ja tie var traucēt izmeklējuma veikšanu;',
  'выполнять инструкции специалиста во время позиционирования и выполнения снимка.':
    'izpildīt speciālista norādījumus pozicionēšanas un uzņēmuma veikšanas laikā.',
  'Исследование занимает несколько минут и проводится непосредственно в клинике при наличии соответствующего оборудования.':
    'Izmeklējums aizņem dažas minūtes un tiek veikts klīnikā, ja pieejams atbilstošs aprīkojums.',
  'Ортопантомограмма (ОПТГ)': 'Ortopantomogramma (OPG)',
  'Ортопантомограмма — панорамный рентгеновский снимок зубов и челюстей. Он позволяет получить общее представление о состоянии зубочелюстной системы, костной ткани, корней зубов и других анатомических структур.':
    'Ortopantomogramma ir zobu un žokļu panorāmas rentgenuzņēmums. Tas ļauj iegūt kopēju priekšstatu par zobu un žokļu sistēmas, kaulaudu, zobu sakņu un citu anatomisko struktūru stāvokli.',
  'Специальной подготовки к ОПТГ не требуется. Перед исследованием можно принимать пищу, пить воду и принимать назначенные врачом лекарственные препараты в обычном режиме.':
    'Īpaša sagatavošanās ortopantomogrammai nav nepieciešama. Pirms izmeklējuma var ēst, dzert ūdeni un lietot ārsta nozīmētos medikamentus ierastajā režīmā.',
  'Непосредственно перед исследованием специалист может попросить снять очки, серьги, цепочки, съёмные протезы и другие металлические предметы в области головы и шеи, которые могут создавать помехи на изображении.':
    'Tieši pirms izmeklējuma speciālists var lūgt noņemt brilles, auskarus, ķēdītes, izņemamās protēzes un citus metāla priekšmetus galvas un kakla apvidū, kas var radīt traucējumus attēlā.',
  'Компьютерная томография (КЛКТ)': 'Datortomogrāfija (KSDT)',
  'Конусно-лучевая компьютерная томография позволяет получить трёхмерное изображение зубов, челюстей и окружающих анатомических структур. КЛКТ может назначаться при планировании имплантации, эндодонтического, хирургического или ортодонтического лечения, а также в других случаях по показаниям врача.':
    'Konusa stara datortomogrāfija ļauj iegūt trīsdimensiju attēlu par zobiem, žokļiem un apkārtējām anatomiskajām struktūrām. To var nozīmēt, plānojot implantāciju, endodontisko, ķirurģisko vai ortodontisko ārstēšanu, kā arī citos gadījumos pēc ārsta indikācijām.',
  'Специальная подготовка к исследованию, как правило, не требуется.':
    'Īpaša sagatavošanās izmeklējumam parasti nav nepieciešama.',
  'Перед проведением КЛКТ необходимо снять металлические предметы в области головы и шеи: украшения, очки, съёмные протезы и другие предметы, если об этом попросит специалист.':
    'Pirms izmeklējuma jānoņem metāla priekšmeti galvas un kakla apvidū: rotaslietas, brilles, izņemamās protēzes un citi priekšmeti, ja to lūdz speciālists.',
  'Во время исследования важно сохранять неподвижность и точно выполнять инструкции медицинского персонала. Это помогает избежать искажений и получить качественное диагностическое изображение.':
    'Izmeklējuma laikā svarīgi saglabāt nekustīgumu un precīzi izpildīt medicīnas personāla norādījumus. Tas palīdz izvairīties no kropļojumiem un iegūt kvalitatīvu diagnostisko attēlu.',
  'Фотопротокол включает серию фотографий зубов, улыбки и лица пациента. Фотографии помогают врачу зафиксировать исходное состояние, провести анализ, спланировать лечение и оценивать его результаты в динамике.':
    'Fotoprotokols ietver zobu, smaida un pacienta sejas fotogrāfiju sēriju. Fotogrāfijas palīdz ārstam fiksēt sākotnējo stāvokli, veikt analīzi, plānot ārstēšanu un izvērtēt tās rezultātus dinamikā.',
  'Сложной подготовки не требуется. Перед фотопротоколом рекомендуется провести обычную гигиену полости рта. Непосредственно перед съёмкой врач или ассистент при необходимости подготовит полость рта и установит специальные приспособления для получения информативных фотографий.':
    'Sarežģīta sagatavošanās nav nepieciešama. Pirms fotoprotokola ieteicams veikt ierasto mutes higiēnu. Tieši pirms uzņemšanas ārsts vai asistents nepieciešamības gadījumā sagatavos mutes dobumu un ievietos īpašus palīglīdzekļus informatīvu fotogrāfiju iegūšanai.',
  'Внутриротовое сканирование': 'Intraorālā skenēšana',
  'Внутриротовое сканирование позволяет получить цифровую трёхмерную модель зубов и зубных рядов без использования традиционных слепочных материалов.':
    'Intraorālā skenēšana ļauj iegūt zobu un zobu rindu digitālu trīsdimensiju modeli, neizmantojot tradicionālos nospiedumu materiālus.',
  'Специальная подготовка обычно не требуется. Перед посещением клиники рекомендуется провести привычную гигиену полости рта.':
    'Īpaša sagatavošanās parasti nav nepieciešama. Pirms klīnikas apmeklējuma ieteicams veikt ierasto mutes higiēnu.',
  'Во время сканирования необходимо следовать инструкциям врача и по возможности сохранять неподвижность. Процедура не требует лучевой нагрузки.':
    'Skenēšanas laikā jāseko ārsta norādījumiem un pēc iespējas jāsaglabā nekustīgums. Procedūra nerada starojuma slodzi.',
  'Важно сообщить врачу заранее': 'Svarīgi savlaicīgi informēt ārstu',
  'Перед проведением диагностического исследования обязательно сообщите специалисту:':
    'Pirms diagnostiskā izmeklējuma noteikti informējiet speciālistu:',
  'о беременности или предполагаемой беременности — особенно перед исследованиями с использованием рентгеновского излучения;':
    'par grūtniecību vai iespējamu grūtniecību — īpaši pirms izmeklējumiem, kuros izmanto rentgena starojumu;',
  'о наличии особенностей здоровья, которые могут затруднить проведение исследования;':
    'par veselības īpatnībām, kas var apgrūtināt izmeklējuma veikšanu;',
  'о невозможности длительно сохранять неподвижное положение;':
    'par nespēju ilgstoši saglabāt nekustīgu stāvokli;',
  'о ранее проведённых исследованиях, если их результаты могут иметь значение для диагностики.':
    'par iepriekš veiktiem izmeklējumiem, ja to rezultāti var būt nozīmīgi diagnostikai.',
  'Если у вас сохранились результаты предыдущих исследований — снимки, КЛКТ или другие диагностические материалы, — возьмите их с собой или заранее передайте врачу в электронном виде. Сравнение исследований в динамике может предоставить дополнительную информацию.':
    'Ja jums ir saglabājušies iepriekšējo izmeklējumu rezultāti — uzņēmumi, datortomogrāfija vai citi diagnostiskie materiāli —, paņemiet tos līdzi vai savlaicīgi nosūtiet ārstam elektroniski. Izmeklējumu salīdzinājums dinamikā var sniegt papildu informāciju.',
  'Нужна ли специальная подготовка?': 'Vai nepieciešama īpaša sagatavošanās?',
  'Для большинства диагностических исследований в стоматологии специальная подготовка не требуется. Обычно пациент может есть, пить и принимать назначенные лекарственные препараты в привычном режиме.':
    'Lielākajai daļai zobārstniecības diagnostisko izmeklējumu īpaša sagatavošanās nav nepieciešama. Parasti pacients var ēst, dzert un lietot nozīmētos medikamentus ierastajā režīmā.',
  'Если для конкретного исследования необходима особая подготовка, врач или администратор клиники сообщит об этом заранее.':
    'Ja konkrētam izmeklējumam nepieciešama īpaša sagatavošanās, ārsts vai klīnikas administrators par to informēs savlaicīgi.',
  'Обратите внимание: объём исследования и необходимость его проведения определяет врач с учётом клинической ситуации и показаний. При возникновении вопросов о подготовке обратитесь в клинику до визита — наши специалисты подскажут, что необходимо сделать перед исследованием.':
    'Ņemiet vērā: izmeklējuma apjomu un nepieciešamību nosaka ārsts, ņemot vērā klīnisko situāciju un indikācijas. Ja rodas jautājumi par sagatavošanos, sazinieties ar klīniku pirms vizītes — mūsu speciālisti paskaidros, kas jāizdara pirms izmeklējuma.',

  // ─── pages/ServicePage.tsx ───
  'Имплантация — это самый современный и надежный способ восстановления утраченных зубов. Мы предлагаем решения, которые полностью возвращают функциональность и эстетику.':
    'Implantācija ir mūsdienīgākais un drošākais veids, kā atjaunot zaudētus zobus. Piedāvājam risinājumus, kas pilnībā atjauno funkcionalitāti un estētiku.',
  'Пожизненная гарантия на имплантаты': 'Mūža garantija implantiem',
  'Безболезненная процедура под местной анестезией': 'Nesāpīga procedūra vietējā anestēzijā',
  'Сохранение объема костной ткани': 'Kaulaudu apjoma saglabāšana',
  'КТ диагностика и 3D-планирование операции':
    'Datortomogrāfijas diagnostika un operācijas 3D plānošana',
  'Установка имплантата': 'Implanta ievietošana',
  'Установка коронки после приживления': 'Kronīša uzstādīšana pēc implanta integrācijas',
  'Гнатология занимается работой височно-нижнечелюстного сустава (ВНЧС) и жевательных мышц. Лечим щелчки и боли в суставе, последствия бруксизма и нарушения смыкания зубов.':
    'Gnatoloģija nodarbojas ar temporomandibulārās locītavas (TML) un košļājamo muskuļu darbību. Ārstējam klikšķus un sāpes locītavā, bruksisma sekas un sakodiena traucējumus.',
  'Устранение болей, щелчков и напряжения в суставе':
    'Sāpju, klikšķu un sasprindzinājuma novēršana locītavā',
  'Индивидуальные капы при бруксизме': 'Individuālas kapes bruksisma gadījumā',
  'Защита зубов и реставраций от стирания': 'Zobu un restaurāciju aizsardzība pret nodilumu',
  'Консультация гнатолога и функциональная диагностика':
    'Gnatologa konsultācija un funkcionālā diagnostika',
  'Изготовление индивидуальной капы или подбор терапии':
    'Individuālas kapes izgatavošana vai terapijas izvēle',
  'Контрольные визиты и коррекция лечения': 'Kontroles vizītes un ārstēšanas korekcija',
  'Регулярная профессиональная гигиена - залог здоровья зубов и десен. Мы используем щадящие аппаратные методы для глубокого очищения.':
    'Regulāra profesionālā mutes higiēna ir zobu un smaganu veselības pamats. Dziļai tīrīšanai izmantojam saudzīgas aparatūras metodes.',
  'Профилактика кариеса и пародонтита': 'Kariesa un periodontīta profilakse',
  'Осветление эмали на 1-2 тона': 'Emaljas gaišināšana par 1–2 toņiem',
  'Ощущение свежести и гладкости зубов': 'Svaiguma un zobu gluduma sajūta',
  'Ультразвуковое удаление твердого налета (камня)':
    'Cietā aplikuma (zobakmens) noņemšana ar ultraskaņu',
  'Очистка системой AirFlow': 'Tīrīšana ar AirFlow sistēmu',
  'Полировка эмали и фторирование': 'Emaljas pulēšana un fluorēšana',
  'Услуга не найдена': 'Pakalpojums nav atrasts',
  'Вернуться на главную': 'Atgriezties sākumlapā',
  'Подробнее об услуге': 'Vairāk par pakalpojumu',

  // ─── components/sections/Reviews.tsx (demonstrācijas atsauksmes) ───
  'Мария Иванова': 'Marija Ivanova',
  'Очень благодарна доктору Громову за прекрасную работу и внимательное отношение. Имплантация прошла безболезненно и с отличным результатом.':
    'Esmu ļoti pateicīga doktoram Gromovam par lielisko darbu un uzmanīgo attieksmi. Implantācija noritēja nesāpīgi un ar teicamu rezultātu.',
  'Алексей Смирнов': 'Aleksejs Smirnovs',
  'Профессионализм на высшем уровне. Делал отбеливание и чистку, результат превзошел все ожидания. Отличный сервис и современное оборудование.':
    'Profesionalitāte visaugstākajā līmenī. Veicu balināšanu un tīrīšanu, rezultāts pārspēja visas gaidas. Lielisks serviss un moderns aprīkojums.',
  'Елена Кузнецова': 'Jeļena Kuzņecova',
  'Долго искала хорошего ортодонта, и наконец нашла. Доктор Анна Лиепа составила четкий план лечения на элайнерах. Очень довольна!':
    'Ilgi meklēju labu ortodontu un beidzot atradu. Doktore Anna Liepa sastādīja skaidru ārstēšanas plānu ar elaineriem. Esmu ļoti apmierināta!',
  'Отличная клиника, вежливый персонал и врачи от Бога. Ставил коронки, все подошло идеально с первого раза.':
    'Lieliska klīnika, laipns personāls un izcili ārsti. Liku kronīšus — viss ideāli sakrita jau no pirmās reizes.',
  'Дмитрий Волков': 'Dmitrijs Volkovs',
  'Лечение под микроскопом спасло мой зуб! Огромное спасибо доктору Берзиньшу за ювелирную работу.':
    'Ārstēšana mikroskopā izglāba manu zobu! Milzīgs paldies doktoram Bērziņam par juvelierdarbu.',
  'Анна Соколова': 'Anna Sokolova',
  'Удалили зуб мудрости быстро и без боли. Даже не заметил, как прошла операция. Доктор Озолс настоящий профессионал.':
    'Gudrības zobu izņēma ātri un nesāpīgi. Pat nepamanīju, kā operācija pagāja. Doktors Ozols ir īsts profesionālis.',
  'Виктор Морозов': 'Viktors Morozovs',
  'Водила ребенка на прием, врач нашел подход за пару минут! Никакого страха, только положительные впечатления.':
    'Vedu bērnu uz vizīti — ārsts atrada pieeju dažu minūšu laikā! Nekādu baiļu, tikai pozitīvi iespaidi.',
  'Светлана Петрова': 'Svetlana Petrova',
  'Лучшая клиника в городе! Цены полностью оправдывают качество услуг. Теперь всей семьей лечимся только здесь.':
    'Labākā klīnika pilsētā! Cenas pilnībā atbilst pakalpojumu kvalitātei. Tagad visa ģimene ārstējas tikai šeit.',
  'Сергей Васильев': 'Sergejs Vasiļjevs',
  'Сделали потрясающие виниры! Теперь улыбаюсь без стеснения. Огромное спасибо доктору Волковой за красоту.':
    'Uztaisīja satriecošus venīrus! Tagad smaidu bez kautrēšanās. Milzīgs paldies doktorei Volkovai par skaistumu.',
  'Ольга Новикова': 'Olga Novikova',

  // ─── pages/CookiesPage.tsx (jāapstiprina klīnikai) ───
  'Использование cookie-файлов': 'Sīkdatņu izmantošana',
  'Какие cookie-файлы использует сайт стоматологической клиники RoyalDent, для чего они нужны и как управлять их сбором.':
    'Kādas sīkdatnes izmanto RoyalDent zobārstniecības klīnikas vietne, kāpēc tās nepieciešamas un kā pārvaldīt to vākšanu.',
  'Что такое cookie-файлы?': 'Kas ir sīkdatnes?',
  'Cookie — это небольшие файлы, которые отправляются веб-сайтом браузеру и сохраняются на компьютере пользователя, когда он посещает веб-страницу. Мы также сохраняем куки-файлы. Эти файлы служат для обеспечения корректной работы сайта и помогают осуществлять более комфортное взаимодействие пользователя с сайтом.':
    'Sīkdatnes ir nelieli faili, ko vietne nosūta pārlūkprogrammai un kas tiek saglabāti lietotāja datorā, apmeklējot tīmekļa lapu. Arī mēs saglabājam sīkdatnes. Tās nodrošina vietnes korektu darbību un palīdz padarīt lietotāja mijiedarbību ar vietni ērtāku.',
  'Для каких целей используются cookie-файлы?': 'Kādiem mērķiem tiek izmantotas sīkdatnes?',
  'Обеспечение работоспособности сайта': 'Vietnes darbības nodrošināšana',
  'Некоторые cookie-файлы необходимы для стабильной и корректной работы сайта и его модулей. Эти файлы не предназначены для сбора какой-либо персональной информации. Если вы заблокируете такие cookie-файлы, то мы не сможем гарантировать работоспособность сайта.':
    'Dažas sīkdatnes ir nepieciešamas vietnes un tās moduļu stabilai un korektai darbībai. Šīs sīkdatnes nav paredzētas personas informācijas vākšanai. Ja tās bloķēsiet, mēs nevarēsim garantēt vietnes darbību.',
  'Учёт ваших предпочтений': 'Jūsu izvēļu saglabāšana',
  'Для комфортного взаимодействия с сайтом мы сохраняем информацию в процессе его использования с целью обеспечения индивидуального подхода. Например, мы записываем данные о том, что вы уже ответили на уведомление о cookie-файлах, чтобы не показывать его при каждом заходе.':
    'Ērtākai vietnes lietošanai mēs saglabājam informāciju par tās izmantošanu, lai nodrošinātu individuālu pieeju. Piemēram, saglabājam ziņu par to, ka esat jau atbildējuši uz paziņojumu par sīkdatnēm, lai to nerādītu katrā apmeklējuma reizē.',
  'Cookie-файлы в рамках данной цели позволяют выполнять статистический анализ, благодаря чему мы можем улучшать сайт. Такие файлы хранят обезличенные данные и собираются анонимно с помощью систем аналитики. Они помогают нам понять, какие разделы пользуются популярностью, какие возможности сайта являются полезными и удобными, и каких не хватает.':
    'Šim mērķim izmantotās sīkdatnes ļauj veikt statistisko analīzi, pateicoties kurai varam uzlabot vietni. Tās glabā anonimizētus datus un tiek vāktas anonīmi ar analītikas sistēmu palīdzību. Tās palīdz saprast, kuras sadaļas ir populāras, kuras vietnes iespējas ir noderīgas un ērtas un kādu trūkst.',
  'Управление настройками файлов cookie': 'Sīkdatņu iestatījumu pārvaldība',
  'Изменить своё решение можно в любой момент прямо здесь: снимите отметку с ненужной категории и нажмите «Сохранить выбор». Изменение применяется сразу и действует до следующего.':
    'Savu izvēli varat mainīt jebkurā brīdī tepat: noņemiet atzīmi nevajadzīgajai kategorijai un nospiediet «Saglabāt izvēli». Izmaiņas stājas spēkā uzreiz un paliek spēkā līdz nākamajai reizei.',
  'Дополнительно cookie-файлы можно заблокировать в настройках браузера. Важно понимать, что при отключении cookie-файлов возможны сбои в работе сайта и/или недоступность части страниц и возможностей. Ниже — краткие инструкции для распространённых браузеров:':
    'Papildus sīkdatnes var bloķēt pārlūkprogrammas iestatījumos. Jāņem vērā, ka, atslēdzot sīkdatnes, iespējami vietnes darbības traucējumi un/vai daļa lapu un iespēju var kļūt nepieejamas. Zemāk — īsas instrukcijas izplatītākajām pārlūkprogrammām:',
  'Обеспечивают работу сайта и форм записи. Отключить нельзя.':
    'Nodrošina vietnes un pieteikuma formu darbību. Atslēgt nav iespējams.',
  'Обезличенная статистика посещений: какие разделы популярны.':
    'Anonimizēta apmeklējumu statistika: kuras sadaļas ir populāras.',
  'Оценка эффективности рекламы и показ релевантных объявлений.':
    'Reklāmas efektivitātes novērtēšana un atbilstošu sludinājumu rādīšana.',

  // ─── data/prices.ts ───
  'Первичная консультация врача-стоматолога': 'Zobārsta pirmreizējā konsultācija',
  'Онлайн консультация врача-стоматолога': 'Zobārsta konsultācija attālināti',
  'Обследование в экстренных случаях': 'Izmeklēšana neatliekamos gadījumos',
  'Интраоральное 3D сканирование': 'Intraorālā 3D skenēšana',
  'Интраоральное 3D сканирование / слепки': 'Intraorālā 3D skenēšana / nospiedumi',
  'Диагностическое моделирование (моделирование улыбки)':
    'Diagnostiskā modelēšana (smaida modelēšana)',
  'Бесплатно в рамках консультации': 'Bez maksas konsultācijas ietvaros',
  'Поверхностная анестезия': 'Virsmas anestēzija',
  'Восстановление зуба пломбой на 1 поверхности': 'Zoba atjaunošana ar plombu 1 virsmā',
  'Восстановление зуба пломбой на 2 поверхности': 'Zoba atjaunošana ar plombu 2 virsmās',
  'Восстановление зуба пломбой на 3 поверхности': 'Zoba atjaunošana ar plombu 3 virsmās',
  'Восстановление зуба пломбой на 4 поверхности': 'Zoba atjaunošana ar plombu 4 virsmās',
  'Лечение 1 корневого канала': '1 saknes kanāla ārstēšana',
  'Лечение 2-х корневого канала': '2 sakņu kanālu ārstēšana',
  'Лечение 3-х корневого канала': '3 sakņu kanālu ārstēšana',
  'Лечение 4-х корневого канала': '4 sakņu kanālu ārstēšana',
  'Использование микроскопа (30 минут)': 'Mikroskopa izmantošana (30 minūtes)',
  'Использование микроскопа (60 минут)': 'Mikroskopa izmantošana (60 minūtes)',
  'Пластмассовая коронка': 'Plastmasas kronītis',
  'Вкладка, накладка из прессованной керамики': 'Ieliktnis, uzlika no presētās keramikas',
  'Коронка из диоксида циркония': 'Cirkonija dioksīda kronītis',
  'Коронка из диоксида циркония с нанесением керамики':
    'Cirkonija dioksīda kronītis ar keramikas klājumu',
  'Винир с повышенной эстетикой': 'Venīrs ar paaugstinātu estētiku',
  'Акриловый съёмный протез': 'Akrila izņemamā protēze',
  'Удаление зуба, поражённого пародонтитом': 'Periodontīta skarta zoba ekstrakcija',
  'Удаление однокорневого зуба': 'Viensaknes zoba ekstrakcija',
  'Удаление многокорневого зуба': 'Daudzsakņu zoba ekstrakcija',
  'Удаление зуба с нестандартным строением корней':
    'Zoba ar netipisku sakņu uzbūvi ekstrakcija',
  'Удаление ретинированного зуба мудрости': 'Retinēta gudrības zoba ekstrakcija',
  'Закрытый синус-лифтинг (в области 1 зуба)': 'Slēgtais sinusa lifts (1 zoba rajonā)',
  'Открытый синус-лифтинг (в области 1 зуба)': 'Atvērtais sinusa lifts (1 zoba rajonā)',
  'Направленная регенерация костной ткани (в области 1 зуба) с учётом материала и мембраны':
    'Vadītā kaulaudu reģenerācija (1 zoba rajonā), ieskaitot materiālu un membrānu',
  'Импланты фирмы Root + металлокерамическая коронка':
    'Root implanti + metālkeramikas kronītis',
  'Импланты фирмы Root + циркониевая коронка': 'Root implanti + cirkonija kronītis',
  'Импланты фирмы Megagen (Корея) + металлокерамическая коронка':
    'Megagen (Koreja) implanti + metālkeramikas kronītis',
  'Импланты фирмы Megagen (Корея) + циркониевая коронка':
    'Megagen (Koreja) implanti + cirkonija kronītis',
  'Импланты фирмы Straumann (Швейцария) + металлокерамическая коронка':
    'Straumann (Šveice) implanti + metālkeramikas kronītis',
  'Импланты фирмы Straumann (Швейцария) + циркониевая коронка':
    'Straumann (Šveice) implanti + cirkonija kronītis',
  'Циркониевая коронка на импланте с индивидуальным абатментом':
    'Cirkonija kronītis uz implanta ar individuālu abatmentu',
  'Формирователь десны': 'Smaganu veidotājs',
  'Имплантация на 4 имплантах системы Root': 'Implantācija uz 4 Root sistēmas implantiem',
  'Имплантация на 4 имплантах системы Megagen': 'Implantācija uz 4 Megagen sistēmas implantiem',
  'Имплантация на 4 имплантах системы Straumann':
    'Implantācija uz 4 Straumann sistēmas implantiem',
  'Металлокерамический протез на 4 имплантах': 'Metālkeramikas protēze uz 4 implantiem',
  'Протез из диоксида циркония на 4 имплантах': 'Cirkonija dioksīda protēze uz 4 implantiem',
  'Имплантация на 6 имплантах системы Root': 'Implantācija uz 6 Root sistēmas implantiem',
  'Имплантация на 6 имплантах системы Megagen': 'Implantācija uz 6 Megagen sistēmas implantiem',
  'Имплантация на 6 имплантах системы Straumann':
    'Implantācija uz 6 Straumann sistēmas implantiem',
  'Металлокерамический протез на 6 имплантах': 'Metālkeramikas protēze uz 6 implantiem',
  'Протез из диоксида циркония на 6 имплантах': 'Cirkonija dioksīda protēze uz 6 implantiem',
  'Составление плана лечения на элайнерах': 'Ārstēšanas plāna sastādīšana ar elaineriem',
  'Ordoline Basic — одна челюсть': 'Ordoline Basic — viens žoklis',
  'Ordoline Basic — две челюсти': 'Ordoline Basic — abi žokļi',
  'Ordoline Standart — одна челюсть': 'Ordoline Standart — viens žoklis',
  'Ordoline Standart — две челюсти': 'Ordoline Standart — abi žokļi',
  'Ordoline Advanced — одна челюсть': 'Ordoline Advanced — viens žoklis',
  'Ordoline Advanced — две челюсти': 'Ordoline Advanced — abi žokļi',
  'Удерживающая капа после лечения на элайнерах': 'Noturošā kape pēc ārstēšanas ar elaineriem',
  'Профессиональная гигиена молочных зубов': 'Piena zobu profesionālā higiēna',
  'Лечение кариеса молочного зуба композитными материалами':
    'Piena zoba kariesa ārstēšana ar kompozītmateriāliem',
  'Лечение пульпита молочного зуба': 'Piena zoba pulpīta ārstēšana',
  'Удаление молочного зуба': 'Piena zoba ekstrakcija',
  'Фторирование зубов': 'Zobu fluorēšana',
  'Герметизация фиссур': 'Fisūru hermetizācija',
  'Профессиональная гигиена с использованием Air-Flow': 'Profesionālā higiēna ar Air-Flow',
  'Кабинетное отбеливание Fläsh': 'Kabineta balināšana ar Fläsh',
  'Домашнее отбеливание': 'Mājas balināšana',
  'Лечение 1-го пародонтального кармана системой Vector':
    '1 periodonta kabatas ārstēšana ar Vector sistēmu',
  'Лечение 1 челюсти системой Vector': '1 žokļa ārstēšana ar Vector sistēmu',
  'Лечение 2-х челюстей системой Vector': '2 žokļu ārstēšana ar Vector sistēmu',

  /*
   * ─── data/doctors.ts ───
   *
   * Vārdu atveide latviski jāapstiprina klīnikai: personvārda oficiālais
   * raksts ir tāds, kāds norādīts personu apliecinošā dokumentā, un to
   * nevar izsecināt no krievu valodas formas.
   */
  'Новый сотрудник': 'Jauns darbinieks',
  'Виталий Двуреченский': 'Vitālijs Dvurečenskis',
  'Эдгар Берзе': 'Edgars Bērze',
  'Элина Хейфец': 'Elīna Heifeca',
  'Ирина Иванова': 'Irina Ivanova',
  'Валерия Кравчук': 'Valērija Kravčuka',
  'Алина Пурвиня': 'Alīna Purviņa',
  'Даниэла Рожинска': 'Daniela Rožinska',
  'Владислав Двуреченский': 'Vladislavs Dvurečenskis',
  'Эдита Чеме': 'Edita Čeme',
  'Татьяна Черногорцева': 'Tatjana Černogorceva',
  '30 лет': '30 gadi',
  '35 лет': '35 gadi',
  '15 лет': '15 gadi',
  '10 лет': '10 gadi',
  '6 лет': '6 gadi',
  'Донецкий государственный медицинский университет имени Максима Горького':
    'Doņeckas Maksima Gorkija Valsts medicīnas universitāte',
  'Рижский университет имени Паула Страдыня': 'Rīgas Stradiņa universitāte',
  'Высшее медицинское образование': 'Augstākā medicīniskā izglītība',
  'Интернатура по профилю «Общая стоматология»': 'Internatūra vispārējā zobārstniecībā',
  'Специализация по ортопедической стоматологии': 'Specializācija zobu protezēšanā',
  'Специализация по хирургической стоматологии': 'Specializācija mutes ķirurģijā',
  'Проводит дентальную имплантацию и хирургическое восстановление зубов, а также ортопедическое протезирование — от планирования до фиксации постоянных конструкций.':
    'Veic zobu implantāciju un ķirurģisku zobu atjaunošanu, kā arī protezēšanu — no plānošanas līdz pastāvīgo konstrukciju fiksācijai.',
  'Проводит установку имплантов и хирургическое лечение: удаление зубов любой сложности, костную пластику и подготовку челюсти к протезированию.':
    'Veic implantu ievietošanu un ķirurģisko ārstēšanu: jebkuras sarežģītības zobu ekstrakciju, kaula plastiku un žokļa sagatavošanu protezēšanai.',
  'Занимается протезированием и восстановлением зубов: коронки, виниры, мостовидные и съёмные конструкции с акцентом на эстетику и долговечность результата.':
    'Nodarbojas ar zobu protezēšanu un atjaunošanu: kronīši, venīri, tiltiņi un izņemamās konstrukcijas ar uzsvaru uz estētiku un rezultāta ilgnoturību.',
  'Лечит кариес и его осложнения, проводит реставрацию зубов и эндодонтическое лечение каналов под микроскопом с сохранением естественного вида зуба.':
    'Ārstē kariesu un tā sarežģījumus, veic zobu restaurācijas un sakņu kanālu endodontisko ārstēšanu mikroskopā, saglabājot zoba dabisko izskatu.',
  'Проводит профессиональную чистку зубов, снятие налёта и зубного камня, профилактику кариеса и заболеваний дёсен.':
    'Veic profesionālo zobu tīrīšanu, aplikuma un zobakmens noņemšanu, kariesa un smaganu slimību profilaksi.',
  'Выполняет профессиональную гигиену полости рта, снятие зубных отложений и полировку, подбирает средства для домашнего ухода.':
    'Veic profesionālo mutes higiēnu, zobu nosēdumu noņemšanu un pulēšanu, kā arī iesaka mājas kopšanas līdzekļus.',
  'Проводит эстетические процедуры для лица и зоны вокруг губ, дополняя работу стоматологов и помогая добиться гармоничного результата.':
    'Veic estētiskās procedūras sejai un lūpu apvidum, papildinot zobārstu darbu un palīdzot sasniegt harmonisku rezultātu.',
  'Ассистирует врачам во время приёма, готовит кабинет и материалы, помогает пациентам чувствовать себя комфортно на каждом этапе лечения.':
    'Asistē ārstiem vizītes laikā, sagatavo kabinetu un materiālus, palīdz pacientiem justies komfortabli katrā ārstēšanas posmā.',
  'Ассистирует врачам на приёме, готовит кабинет и материалы, отвечает за стерильность инструментов и сопровождает пациента во время процедур.':
    'Asistē ārstiem vizītes laikā, sagatavo kabinetu un materiālus, atbild par instrumentu sterilitāti un pavada pacientu procedūru laikā.',
  'Встречает пациентов, ведёт запись на приём и помогает подобрать удобное время визита, отвечает на вопросы по лечению и документам.':
    'Sagaida pacientus, veic pierakstu un palīdz izvēlēties ērtu vizītes laiku, atbild uz jautājumiem par ārstēšanu un dokumentiem.',
  'Координирует расписание клиники и сопровождает пациентов от первого звонка до завершения лечения.':
    'Koordinē klīnikas grafiku un pavada pacientus no pirmā zvana līdz ārstēšanas noslēgumam.',
  '[Фото — Виталий Двуреченский, хирург-имплантолог]':
    '[Foto — Vitālijs Dvurečenskis, zobārsts implantologs]',
  '[Фото — Эдгар Берзе, хирург-имплантолог]': '[Foto — Edgars Bērze, zobārsts implantologs]',
  '[Фото — Элина Хейфец, стоматолог-ортопед]': '[Foto — Elīna Heifeca, zobārste protēziste]',
  '[Фото — Ирина Иванова, стоматолог-терапевт]': '[Foto — Irina Ivanova, zobārste]',
  '[Фото — Валерия Кравчук, гигиенист]': '[Foto — Valērija Kravčuka, zobu higiēniste]',
  '[Фото — Алина Пурвиня, гигиенист]': '[Foto — Alīna Purviņa, zobu higiēniste]',
  '[Фото — Елена Якунчихина, косметолог]': '[Foto — Jeļena Jakunčihina, kosmetoloģe]',
  '[Фото — Даниэла Рожинска, ассистент]': '[Foto — Daniela Rožinska, zobārsta asistente]',
  '[Фото — Владислав Двуреченский, ассистент]':
    '[Foto — Vladislavs Dvurečenskis, zobārsta asistents]',
  '[Фото — Эдита Чеме, администратор]': '[Foto — Edita Čeme, administratore]',
  '[Фото — Татьяна Черногорцева, администратор]': '[Foto — Tatjana Černogorceva, administratore]',

  // ─── pages/VectorPage.tsx ───
  'Аппаратное лечение дёсен Vector': 'Smaganu ārstēšana ar Vector sistēmu',
  'Аппаратное лечение дёсен системой Vector в Юрмале от 30 €: щадящая обработка пародонтальных карманов ультразвуком. Показания, противопоказания и цены клиники RoyalDent.':
    'Smaganu ārstēšana ar Vector sistēmu Jūrmalā no 30 €: saudzīga periodonta kabatu apstrāde ar ultraskaņu. RoyalDent klīnikas indikācijas, kontrindikācijas un cenas.',
  'Vector — это щадящий метод обработки тканей пародонта и пародонтальных карманов с помощью ультразвука и специальной суспензии. Его задача — аккуратно убрать бактериальный налёт и зубные отложения в зоне воспаления и создать условия, чтобы дёсны могли спокойно восстановиться.':
    'Vector ir saudzīga periodonta audu un periodonta kabatu apstrādes metode, izmantojot ultraskaņu un īpašu suspensiju. Tās uzdevums — rūpīgi noņemt bakteriālo aplikumu un zobu nosēdumus iekaisuma zonā un radīt apstākļus, lai smaganas varētu mierīgi atjaunoties.',
  'Что делает Vector и чем он отличается от обычной чистки':
    'Ko dara Vector un ar ko tas atšķiras no parastās tīrīšanas',
  'Во время обычной профессиональной гигиены стоматолог-гигиенист обрабатывает поверхности зубов ультразвуком и AirFlow.':
    'Parastās profesionālās higiēnas laikā zobu higiēnists apstrādā zobu virsmas ar ultraskaņu un AirFlow.',
  'Vector же позволяет более деликатно обработать поддесневую зону и пародонтальные карманы, где часто сохраняется воспаление.':
    'Vector savukārt ļauj saudzīgāk apstrādāt zemsmaganu zonu un periodonta kabatas, kurās bieži saglabājas iekaisums.',
  'Стоматолог-гигиенист клиники RoyalDent с макетом челюсти и зубной щёткой':
    'RoyalDent klīnikas zobu higiēniste ar žokļa maketu un zobu birsti',
  'Когда применяется лечение аппаратом Vector': 'Kad tiek izmantota ārstēšana ar Vector',
  'Vector используется при заболеваниях пародонта, когда формируются пародонтальные карманы и воспаление затрагивает ткани глубже края десны.':
    'Vector tiek izmantots periodonta slimību gadījumā, kad veidojas periodonta kabatas un iekaisums skar audus dziļāk par smaganas malu.',
  'Основное показание — пародонтит различной степени выраженности с наличием пародонтальных карманов.':
    'Galvenā indikācija ir dažādas pakāpes periodontīts ar periodonta kabatām.',
  'Метод применяется:': 'Metode tiek izmantota:',
  'при наличии пародонтальных карманов по результатам осмотра и измерения;':
    'ja apskates un mērījumu rezultātā konstatētas periodonta kabatas;',
  'как этап комплексного лечения заболеваний пародонта;':
    'kā periodonta slimību kompleksās ārstēšanas posms;',
  'как поддерживающая терапия после основного лечения пародонтита.':
    'kā uzturošā terapija pēc periodontīta pamatārstēšanas.',
  'Если пародонтальных карманов нет и воспаление ограничено краем десны, обычно достаточно профессиональной гигиены без применения Vector.':
    'Ja periodonta kabatu nav un iekaisums aprobežojas ar smaganas malu, parasti pietiek ar profesionālo higiēnu bez Vector izmantošanas.',
  'Противопоказания и ограничения': 'Kontrindikācijas un ierobežojumi',
  'Лечение аппаратом Vector относится к малоинвазивным процедурам, однако перед его проведением врач обязательно оценивает общее состояние здоровья и ситуацию в полости рта.':
    'Ārstēšana ar Vector pieder pie minimāli invazīvām procedūrām, taču pirms tās ārsts noteikti izvērtē vispārējo veselības stāvokli un situāciju mutes dobumā.',
  'Процедура может быть отложена или проведена после подготовки, если:':
    'Procedūru var atlikt vai veikt pēc sagatavošanas, ja:',
  'есть острое воспаление с выраженной болезненностью и отёком;':
    'ir akūts iekaisums ar izteiktām sāpēm un tūsku;',
  'наблюдается тяжёлое общее состояние пациента;': 'pacienta vispārējais stāvoklis ir smags;',
  'отмечаются нарушения свёртываемости крови.': 'konstatēti asins recēšanas traucējumi.',
  'Также лечение требует аккуратного планирования при беременности, а также у пациентов с кардиостимулятором.':
    'Rūpīga plānošana nepieciešama arī grūtniecības laikā un pacientiem ar elektrokardiostimulatoru.',
  'После предварительной подготовки процедура проводится безопасно и без осложнений. Решение принимается индивидуально на консультации.':
    'Pēc iepriekšējas sagatavošanas procedūra norit droši un bez sarežģījumiem. Lēmumu pieņem individuāli konsultācijā.',
  'Цены на лечение дёсен аппаратом Vector в Юрмале':
    'Smaganu ārstēšanas ar Vector cenas Jūrmalā',
  'Точечная обработка, когда воспаление затрагивает отдельные карманы':
    'Mērķtiecīga apstrāde, kad iekaisums skar atsevišķas kabatas',
  'Полная обработка пародонтальных карманов верхней или нижней челюсти':
    'Pilnīga augšžokļa vai apakšžokļa periodonta kabatu apstrāde',
  'Обе челюсти за курс лечения — при генерализованном пародонтите':
    'Abi žokļi vienā ārstēšanas kursā — ģeneralizēta periodontīta gadījumā',
  'Что такое лечение дёсен аппаратом Vector?': 'Kas ir smaganu ārstēšana ar Vector?',
  'Это щадящая обработка тканей пародонта и пародонтальных карманов ультразвуком и специальной суспензией. Метод аккуратно убирает бактериальный налёт и зубные отложения в зоне воспаления и создаёт условия, чтобы дёсны могли спокойно восстановиться.':
    'Tā ir saudzīga periodonta audu un periodonta kabatu apstrāde ar ultraskaņu un īpašu suspensiju. Metode rūpīgi noņem bakteriālo aplikumu un zobu nosēdumus iekaisuma zonā un rada apstākļus, lai smaganas varētu mierīgi atjaunoties.',
  'Чем Vector отличается от обычной профессиональной гигиены?':
    'Ar ko Vector atšķiras no parastās profesionālās higiēnas?',
  'Во время обычной гигиены стоматолог-гигиенист обрабатывает поверхности зубов ультразвуком и AirFlow. Vector позволяет более деликатно обработать поддесневую зону и пародонтальные карманы, где часто сохраняется воспаление.':
    'Parastās higiēnas laikā zobu higiēnists apstrādā zobu virsmas ar ultraskaņu un AirFlow. Vector ļauj saudzīgāk apstrādāt zemsmaganu zonu un periodonta kabatas, kurās bieži saglabājas iekaisums.',
  'Сколько стоит лечение дёсен системой Vector?':
    'Cik maksā smaganu ārstēšana ar Vector sistēmu?',
  'Лечение одного пародонтального кармана — 30 €, одной челюсти — 250 €, обеих челюстей — 350 €. Точный объём врач определяет после осмотра и измерения карманов.':
    'Vienas periodonta kabatas ārstēšana — 30 €, viena žokļa — 250 €, abu žokļu — 350 €. Precīzu apjomu ārsts nosaka pēc apskates un kabatu izmērīšanas.',
  'Кому показано лечение аппаратом Vector?': 'Kam ir indicēta ārstēšana ar Vector?',
  'Основное показание — пародонтит различной степени выраженности с наличием пародонтальных карманов. Метод применяют как этап комплексного лечения заболеваний пародонта и как поддерживающую терапию после основного лечения.':
    'Galvenā indikācija ir dažādas pakāpes periodontīts ar periodonta kabatām. Metodi izmanto kā periodonta slimību kompleksās ārstēšanas posmu un kā uzturošo terapiju pēc pamatārstēšanas.',
  'Всегда ли нужен Vector при воспалении дёсен?':
    'Vai smaganu iekaisuma gadījumā vienmēr nepieciešams Vector?',
  'Нет. Если пародонтальных карманов нет и воспаление ограничено краем десны, обычно достаточно профессиональной гигиены без применения Vector.':
    'Nē. Ja periodonta kabatu nav un iekaisums aprobežojas ar smaganas malu, parasti pietiek ar profesionālo higiēnu bez Vector izmantošanas.',
  'В каких случаях процедуру приходится отложить?': 'Kādos gadījumos procedūra jāatliek?',
  'Процедуру переносят или проводят после подготовки при остром воспалении с выраженной болезненностью и отёком, при тяжёлом общем состоянии пациента и при нарушениях свёртываемости крови. После предварительной подготовки лечение проходит безопасно и без осложнений.':
    'Procedūru pārceļ vai veic pēc sagatavošanas akūta iekaisuma gadījumā ar izteiktām sāpēm un tūsku, smaga vispārējā stāvokļa gadījumā un asins recēšanas traucējumu gadījumā. Pēc iepriekšējas sagatavošanas ārstēšana norit droši un bez sarežģījumiem.',
  'Можно ли проводить Vector при беременности или с кардиостимулятором?':
    'Vai Vector drīkst veikt grūtniecības laikā vai ar elektrokardiostimulatoru?',
  'Такие ситуации требуют аккуратного планирования: врач оценивает общее состояние здоровья и ситуацию в полости рта, и решение принимается индивидуально на консультации.':
    'Šādas situācijas prasa rūpīgu plānošanu: ārsts izvērtē vispārējo veselības stāvokli un situāciju mutes dobumā, un lēmumu pieņem individuāli konsultācijā.',
  'Доверьте нам вашу': 'Uzticiet mums savu',
  'улыбку!': 'smaidu!',

  // ─── data/serviceHeroes.ts ───
  'Имплантация All-on-6 в Юрмале': 'All-on-6 implantācija Jūrmalā',
  'Надёжное решение при полном отсутствии зубов':
    'Drošs risinājums pilnīgas zobu neesamības gadījumā',
  'От 8000 € за имплантацию и временный протез на 1 челюсть':
    'No 8000 € par implantāciju un pagaidu protēzi 1 žoklim',
  'Более 15 лет восстанавливаем зубы при их полном отсутствии':
    'Vairāk nekā 15 gadus atjaunojam zobus to pilnīgas neesamības gadījumā',
  'Помогаем не только улыбаться, но и полноценно жевать':
    'Palīdzam ne tikai smaidīt, bet arī pilnvērtīgi košļāt',
  'Максимально стабильная фиксация протеза': 'Maksimāli stabila protēzes fiksācija',
  'Даём расширенную гарантию до 5 лет': 'Sniedzam paplašinātu garantiju līdz 5 gadiem',
  'Несъёмный протез на шести имплантах на нижней челюсти':
    'Neizņemama protēze uz sešiem implantiem apakšžoklī',
  'Имплантация All-on-4 в Юрмале': 'All-on-4 implantācija Jūrmalā',
  'Несъёмный протез на четырёх имплантах': 'Neizņemama protēze uz četriem implantiem',
  'От 4000 € за имплантацию и временный протез на 1 челюсть':
    'No 4000 € par implantāciju un pagaidu protēzi 1 žoklim',
  'Помогаем снова нормально жевать и улыбаться':
    'Palīdzam atkal pilnvērtīgi košļāt un smaidīt',
  'Протез не снимается и ощущается как свои зубы':
    'Protēze netiek izņemta un jūtas kā savi zobi',
  'Несъёмный протез на четырёх имплантах на нижней челюсти':
    'Neizņemama protēze uz četriem implantiem apakšžoklī',
  'Детская стоматология в Юрмале': 'Bērnu zobārstniecība Jūrmalā',
  'Приём ведут опытные специалисты': 'Vizītes vada pieredzējuši speciālisti',
  'Дети приходят с удовольствием!': 'Bērni nāk ar prieku!',
  'Уже более 15 лет заботимся о детских улыбках':
    'Jau vairāk nekā 15 gadus rūpējamies par bērnu smaidiem',
  'Ребёнок чувствует себя в безопасности с первых минут':
    'Bērns jūtas droši jau no pirmajām minūtēm',
  'Мы лечим бережно и внимательно': 'Ārstējam saudzīgi un iejūtīgi',
  'Каждый этап лечения понятен и ребёнку, и родителям':
    'Katrs ārstēšanas posms ir saprotams gan bērnam, gan vecākiem',
  'Улыбающийся мальчик с макетом челюсти в руках':
    'Smaidošs zēns ar žokļa maketu rokās',
  'Лечение дёсен аппаратом Vector в Юрмале': 'Smaganu ārstēšana ar Vector Jūrmalā',
  'Устраним воспаление и вернём дёснам здоровый вид':
    'Novērsīsim iekaisumu un atgriezīsim smaganām veselīgu izskatu',
  '250 € за лечение 1 челюсти системой Vector':
    '250 € par 1 žokļa ārstēšanu ar Vector sistēmu',
  'Помогаем избавиться от воспаления дёсен': 'Palīdzam atbrīvoties no smaganu iekaisuma',
  'Уменьшаем кровоточивость и дискомфорт': 'Mazinām asiņošanu un diskomfortu',
  'Сохраняем здоровье зубов и дёсен': 'Saglabājam zobu un smaganu veselību',
  'Подбираем рекомендации по уходу': 'Sniedzam individuālus kopšanas ieteikumus',
  'Обработка пародонтального кармана аппаратом Vector':
    'Periodonta kabatas apstrāde ar Vector',
  'Гнатологическое лечение в Юрмале': 'Gnatoloģiskā ārstēšana Jūrmalā',
  'Поможем избавиться от боли в суставе': 'Palīdzēsim atbrīvoties no sāpēm locītavā',
  'Занимаемся лечением ВНЧС с помощью цифровых технологий':
    'Ārstējam temporomandibulāro locītavu, izmantojot digitālās tehnoloģijas',
  'Помогаем бороться с бруксизмом': 'Palīdzam cīnīties ar bruksismu',
  'Подготавливаем к полному протезированию': 'Sagatavojam pilnai protezēšanai',
  'Височно-нижнечелюстной сустав на анатомической модели черепа':
    'Temporomandibulārā locītava uz galvaskausa anatomiskā modeļa',
  'Профессиональная чистка зубов в Юрмале': 'Profesionālā zobu tīrīšana Jūrmalā',
  'Цена от 95 € за гигиену с использованием Air-Flow':
    'Cena no 95 € par higiēnu ar Air-Flow',
  'Зубы становятся заметно чище и светлее': 'Zobi kļūst manāmi tīrāki un gaišāki',
  'Возвращаем свежесть дыхания': 'Atjaunojam elpas svaigumu',
  'Помогаем сохранить здоровье зубов и дёсен':
    'Palīdzam saglabāt zobu un smaganu veselību',
  'Подбираем рекомендации по уходу за зубами': 'Sniedzam ieteikumus zobu kopšanai',
  'Профессиональная чистка зубов аппаратом Air-Flow':
    'Profesionālā zobu tīrīšana ar Air-Flow',
  'Удаление зуба мудрости в Юрмале': 'Gudrības zoba ekstrakcija Jūrmalā',
  'От 300 € за удаление зуба мудрости': 'No 300 € par gudrības zoba ekstrakciju',
  'Удаляем зубы мудрости любой сложности':
    'Izņemam jebkuras sarežģītības gudrības zobus',
  'Проводим операцию бережно и без боли': 'Operāciju veicam saudzīgi un nesāpīgi',
  'Даём подробные рекомендации для быстрого восстановления':
    'Sniedzam detalizētus ieteikumus ātrai atveseļošanai',
  'Если после удаления возникнут вопросы, врач будет на связи':
    'Ja pēc ekstrakcijas rodas jautājumi, ārsts būs sasniedzams',
  'Расположение зуба мудрости в нижней челюсти':
    'Gudrības zoba novietojums apakšžoklī',
  'Лечение на элайнерах в Юрмале': 'Ārstēšana ar elaineriem Jūrmalā',
  'Исправление прикуса элайнерами от 1200 €':
    'Sakodiena korekcija ar elaineriem no 1200 €',
  'Выравниваем зубы без брекетов': 'Iztaisnojam zobus bez breketēm',
  'Элайнеры почти незаметны для окружающих': 'Elaineri apkārtējiem gandrīz nav pamanāmi',
  'Можно есть, улыбаться и жить без ограничений':
    'Var ēst, smaidīt un dzīvot bez ierobežojumiem',
  'Показываем будущую улыбку ещё на этапе диагностики':
    'Nākotnes smaidu parādām jau diagnostikas posmā',
  'Рука держит прозрачный элайнер': 'Roka tur caurspīdīgu elaineri',
  'Протезирование зубов в Юрмале': 'Zobu protezēšana Jūrmalā',
  'Цена от 600 € за 1 коронку': 'Cena no 600 € par 1 kronīti',
  'Восстанавливаем разрушенные зубы и красивую улыбку':
    'Atjaunojam sabojātus zobus un skaistu smaidu',
  'Работаем с собственной зуботехнической лабораторией':
    'Strādājam ar savu zobu tehnisko laboratoriju',
  'Результат выглядит естественно и гармонично':
    'Rezultāts izskatās dabisks un harmonisks',
  'Даём гарантию на ортопедическое лечение на 3 года':
    'Sniedzam 3 gadu garantiju protezēšanas darbiem',
  'Керамический винир в стоматологическом пинцете':
    'Keramikas venīrs zobārstniecības pincetē',
  'Лечение каналов зуба в Юрмале': 'Zoba sakņu kanālu ārstēšana Jūrmalā',
  'Надёжное восстановление зубов на долгие годы':
    'Droša zobu atjaunošana ilgiem gadiem',
  'Избавляем от зубной боли': 'Atbrīvojam no zobu sāpēm',
  'Помогаем сохранить зуб даже при сильном воспалении':
    'Palīdzam saglabāt zobu pat spēcīga iekaisuma gadījumā',
  'Лечим каналы так, чтобы воспаление не вернулось':
    'Sakņu kanālus ārstējam tā, lai iekaisums neatgrieztos',
  'Восстанавливаем зуб после лечения, чтобы он служил долгие годы':
    'Pēc ārstēšanas zobu atjaunojam, lai tas kalpotu ilgus gadus',
  'Операционный микроскоп Carl Zeiss OPMI pico для лечения корневых каналов':
    'Operācijas mikroskops Carl Zeiss OPMI pico sakņu kanālu ārstēšanai',
  'Безопасное отбеливание зубов в Юрмале': 'Droša zobu balināšana Jūrmalā',
  'Цена 135 € за кабинетное отбеливание системой Fläsh':
    'Cena 135 € par kabineta balināšanu ar Fläsh sistēmu',
  'Зубы становятся на 6–8 тонов светлее': 'Zobi kļūst par 6–8 toņiem gaišāki',
  'Улыбка выглядит свежее и ярче': 'Smaids izskatās svaigāks un spilgtāks',
  'Проводим отбеливание аккуратно и безопасно': 'Balināšanu veicam rūpīgi un droši',
  'Помогаем сохранить результат благодаря наборам домашнего отбеливания':
    'Palīdzam saglabāt rezultātu ar mājas balināšanas komplektiem',
  'Лампа для кабинетного отбеливания Fläsh': 'Fläsh kabineta balināšanas lampa',

  // ─── pages/ProstheticsPage.tsx ───
  'Протезирование зубов в Юрмале: коронки из металлокерамики и диоксида циркония, виниры e.max, вкладки и съёмные протезы. Собственная зуботехническая лаборатория, гарантия 3 года.':
    'Zobu protezēšana Jūrmalā: metālkeramikas un cirkonija dioksīda kronīši, e.max venīri, ieliktņi un izņemamās protēzes. Sava zobu tehniskā laboratorija, 3 gadu garantija.',
  'Надёжное решение по доступной цене. Прочный каркас с керамическим покрытием':
    'Drošs risinājums par pieejamu cenu. Izturīgs karkass ar keramikas klājumu',
  'Позволяет восстановить зуб максимально естественно и надёжно. Прочная керамика повторяет цвет и форму зуба':
    'Ļauj atjaunot zobu maksimāli dabiski un droši. Izturīgā keramika atkārto zoba krāsu un formu',
  'Современная эстетика и прочность: цирконий полностью имитирует натуральный зуб':
    'Mūsdienīga estētika un izturība: cirkonijs pilnībā atdarina dabisku zobu',
  'Ещё более естественный внешний вид за счёт многослойной керамики. Максимально близко к природным зубам':
    'Vēl dabiskāks izskats, pateicoties daudzslāņu keramikai. Maksimāli tuvu dabiskiem zobiem',
  'Тонкая керамическая накладка на зуб для идеальной улыбки. Высокая эстетика':
    'Plāna keramikas uzlika zobam ideālam smaidam. Augsta estētika',
  'Премиальное решение для самых высоких эстетических требований. Индивидуальная художественная проработка цвета и формы':
    'Premium risinājums visaugstākajām estētiskajām prasībām. Individuāla mākslinieciska krāsas un formas izstrāde',
  'Базовое решение для восстановления зубов. Лёгкий и доступный по цене, позволяет жевать и улыбаться':
    'Pamata risinājums zobu atjaunošanai. Viegla un cenas ziņā pieejama, ļauj košļāt un smaidīt',
  'Съёмная конструкция на металлической дуге. Держится надёжнее акрилового и меньше ощущается во рту':
    'Izņemama konstrukcija uz metāla loka. Turas drošāk nekā akrila protēze un mutē jūtama mazāk',
  'Протезировать зубы важно не только для красивой улыбки, но и для здоровья всей зубочелюстной системы. Основные показания к процедуре:':
    'Zobu protezēšana ir svarīga ne tikai skaistam smaidam, bet arī visas zobu un žokļu sistēmas veselībai. Galvenās indikācijas:',
  'Отсутствие одного или нескольких зубов': 'Viena vai vairāku zobu trūkums',
  'Своевременная установка протезов предотвращает смещение соседних зубов и нарушение прикуса.':
    'Savlaicīga protēžu uzstādīšana novērš blakus esošo zobu nobīdi un sakodiena traucējumus.',
  'Эстетические дефекты': 'Estētiski defekti',
  'При сколах, изменении цвета или изначально неэстетичной форме зуба протез помогает восстановить естественный вид улыбки.':
    'Atlūzumu, krāsas izmaiņu vai sākotnēji neestētiskas zoba formas gadījumā protēze palīdz atjaunot dabisku smaida izskatu.',
  'Современные технологии и методы имплантации позволяют полностью восстановить зубной ряд и отказаться от неудобных съёмных протезов.':
    'Mūsdienīgas tehnoloģijas un implantācijas metodes ļauj pilnībā atjaunot zobu rindu un atteikties no neērtām izņemamām protēzēm.',
  'Разрушение коронковой части более чем на 50%': 'Zoba kroņa daļas sabrukums vairāk nekā 50 %',
  'Протез защищает оставшиеся ткани зуба от дальнейшего разрушения и позволяет вновь полноценно им пользоваться.':
    'Protēze pasargā atlikušos zoba audus no turpmākas sabrukšanas un ļauj zobu atkal pilnvērtīgi lietot.',
  'Повышенная стираемость зубов': 'Paaugstināta zobu nodilšana',
  'Ортопедические конструкции создают «защитный барьер» и останавливают патологическую стираемость зубов.':
    'Protezēšanas konstrukcijas veido aizsargbarjeru un aptur patoloģisku zobu nodilšanu.',
  'Противопоказания к протезированию корректнее называть временными ограничениями. В этот список входят:':
    'Protezēšanas kontrindikācijas pareizāk saukt par pagaidu ierobežojumiem. Sarakstā ietilpst:',
  'Острые воспалительные процессы в полости рта': 'Akūti iekaisuma procesi mutes dobumā',
  'Сначала нужно провести лечение и устранить воспаление, чтобы установка протезов не вызвала осложнений.':
    'Vispirms jāveic ārstēšana un jānovērš iekaisums, lai protēžu uzstādīšana neizraisītu sarežģījumus.',
  'Рекомендуется отложить плановое лечение до послеродового периода, чтобы обеспечить пациентке максимальную безопасность и комфорт.':
    'Ieteicams atlikt plānveida ārstēšanu līdz pēcdzemdību periodam, lai nodrošinātu pacientei maksimālu drošību un komfortu.',
  'Устранив временные противопоказания, мы можем провести протезирование и восстановить целостность зубных рядов.':
    'Novēršot pagaidu kontrindikācijas, varam veikt protezēšanu un atjaunot zobu rindu viengabalainību.',
  'Виды протезирования зубов в стоматологии': 'Zobu protezēšanas veidi',
  'Керамические виниры': 'Keramikas venīri',
  'Реставрации для великолепной улыбки': 'Restaurācijas lieliskam smaidam',
  'Надёжное и доступное восстановление зубов': 'Droša un pieejama zobu atjaunošana',
  'Коронки из циркония': 'Cirkonija kronīši',
  'Прочный и эстетичный вариант': 'Izturīgs un estētisks risinājums',
  'Съёмные зубные протезы': 'Izņemamās zobu protēzes',
  'Полное или частичное восстановление зубов': 'Pilnīga vai daļēja zobu atjaunošana',
  'Проверенный временем, надёжный метод протезирования зубов после депульпирования и лечения каналов зуба.':
    'Laika pārbaudīta, droša zobu protezēšanas metode pēc pulpas ekstirpācijas un sakņu kanālu ārstēšanas.',
  'доступность': 'pieejamība',
  'прочность': 'izturība',
  'долговечность': 'ilgnoturība',
  'Решение для повышения эстетики.': 'Risinājums estētikas uzlabošanai.',
  'красота': 'skaistums',
  'точность': 'precizitāte',
  'гипоаллергенность': 'hipoalerģiskums',
  'Протезирование передних шести зубов верхней челюсти коронками E.max':
    'Augšžokļa sešu priekšzobu protezēšana ar E.max kronīšiem',
  'Восстановление зубов с помощью имплантатов и циркониевых коронок':
    'Zobu atjaunošana ar implantiem un cirkonija kronīšiem',
  'Протезирование 4-х жевательных зубов циркониевыми коронками':
    'Četru košļājamo zobu protezēšana ar cirkonija kronīšiem',
  'Не откладывайте установку протезов — чем раньше начать лечение, тем проще и надёжнее будет результат. Записаться на консультацию можно по телефону или через форму на сайте. На приёме врач проведёт осмотр, объяснит возможные варианты протезирования, составит индивидуальный план и озвучит точную стоимость лечения.':
    'Neatlieciet protēžu uzstādīšanu — jo agrāk sāksiet ārstēšanu, jo vienkāršāks un drošāks būs rezultāts. Pieteikties konsultācijai var pa tālruni vai aizpildot formu vietnē. Vizītē ārsts veiks apskati, izskaidros iespējamos protezēšanas variantus, sastādīs individuālu plānu un nosauks precīzas ārstēšanas izmaksas.',
  'Что выбрать — цирконий или металлокерамику?': 'Ko izvēlēties — cirkoniju vai metālkeramiku?',
  'Стоит ли выбрать протез с металлическим основанием или лучше доплатить и выбрать цирконий? Первое, на что вам надо ориентироваться, выбирая материал, — это ваши финансовые возможности. Если вы знаете, что можете позволить оплатить более дорогие и эстетичные ортопедические изделия, делайте их сразу и не сомневайтесь: это оправдано со всех точек зрения.':
    'Vai izvēlēties protēzi ar metāla pamatni, vai labāk piemaksāt un izvēlēties cirkoniju? Pirmais, pēc kā vadīties, izvēloties materiālu, ir jūsu finansiālās iespējas. Ja zināt, ka varat atļauties dārgākas un estētiskākas konstrukcijas, izvēlieties tās uzreiz un nešaubieties: tas ir attaisnojami no visiem viedokļiem.',
  'Практика показывает, что после установки металлокерамики спустя годы, когда появляется возможность, пациенты возвращаются за эстетикой — и мы меняем их на цельнокерамические коронки или мосты с основанием из циркония.':
    'Prakse rāda, ka gadus pēc metālkeramikas uzstādīšanas, kad rodas iespēja, pacienti atgriežas estētikas dēļ — un mēs tās nomainām pret pilnkeramikas kronīšiem vai tiltiņiem ar cirkonija pamatni.',
  'Несмотря на очевидные достоинства металлокерамики (доступность, прочность и долговечность), есть у неё и один недостаток — использование металла. У некоторых пациентов это вызывает сухость полости рта, вкусовые раздражения. Есть и другие причины, делающие нежелательным присутствие обычных стоматологических металлических сплавов в полости рта.':
    'Neraugoties uz metālkeramikas acīmredzamajām priekšrocībām (pieejamība, izturība un ilgnoturība), tai ir arī viens trūkums — metāla izmantošana. Dažiem pacientiem tas izraisa mutes sausumu un garšas traucējumus. Ir arī citi iemesli, kāpēc parastu zobārstniecības metāla sakausējumu klātbūtne mutes dobumā nav vēlama.',
  'Если вам интересно знать, в чём разница, чем вызвана стоимость и как меняется восприятие материала организмом, чем отличаются протезы, которые устанавливают в нашей стоматологии, увидеть примеры до и после — пожалуйста, перейдите на внутренние страницы про металлокерамику и цирконий.':
    'Ja vēlaties uzzināt, kāda ir atšķirība, kas nosaka cenu un kā mainās materiāla uztvere organismā, ar ko atšķiras mūsu klīnikā uzstādāmās protēzes, kā arī apskatīt piemērus pirms un pēc — lūdzam atvērt lapas par metālkeramiku un cirkoniju.',
  'Микропротезирование зубов': 'Zobu mikroprotezēšana',
  'Если требуется коррекция эстетических или функциональных нарушений, а сам зуб при этом живой, используются виниры и керамические накладки. Индивидуально изготовленные в зуботехнической лаборатории, они совершенно не отличаются от настоящих зубов.':
    'Ja nepieciešama estētisku vai funkcionālu traucējumu korekcija un pats zobs ir dzīvs, izmanto venīrus un keramikas uzlikas. Individuāli izgatavotas zobu tehniskajā laboratorijā, tās nemaz neatšķiras no īstiem zobiem.',
  'Вкладки выполняют функции пломб': 'Ieliktņi pilda plombu funkciju',
  'Керамические вкладки на модели челюсти': 'Keramikas ieliktņi uz žokļa modeļa',
  'Обычно под протезированием зубов подразумевается установка коронок на зубы. Но очень часто пациенту необходимо воссоздать только часть эмали зуба, при этом не обтачивая его со всех сторон.':
    'Parasti ar zobu protezēšanu saprot kronīšu uzstādīšanu. Taču ļoti bieži pacientam nepieciešams atjaunot tikai daļu zoba emaljas, neslīpējot zobu no visām pusēm.',
  'Самое распространённое применение микропротезы (керамические вкладки) получили естественно при лечении кариеса. В случае обнаружения глубокого кариеса для восстановления формы в процессе лечения, для получения более длительного результата, лучше применять не обычный композитный материал, а прочные керамические вкладки.':
    'Visplašāko pielietojumu mikroprotēzes (keramikas ieliktņi) guvušas kariesa ārstēšanā. Konstatējot dziļu kariesu, formas atjaunošanai ārstēšanas laikā un ilgnoturīgākam rezultātam labāk izmantot nevis parastu kompozītmateriālu, bet izturīgus keramikas ieliktņus.',
  'Подробное описание, чем лечение кариеса с применением керамических вкладок лучше обычного лечения с применением светоотверждаемого композита, читайте в материале про керамические вкладки.':
    'Detalizētu skaidrojumu, ar ko kariesa ārstēšana ar keramikas ieliktņiem ir labāka par parasto ārstēšanu ar gaismā cietējošu kompozītu, lasiet materiālā par keramikas ieliktņiem.',
  'Накладки, устанавливаемые на внешнюю поверхность зубов':
    'Uzlikas, ko uzstāda uz zobu ārējās virsmas',
  'Виниры — микропротезы из керамики в виде накладок на лицевую поверхность зубов. Появление этой технологии кардинально изменило эстетическую стоматологию.':
    'Venīri ir keramikas mikroprotēzes uzliku veidā uz zobu priekšējās virsmas. Šīs tehnoloģijas parādīšanās būtiski mainīja estētisko zobārstniecību.',
  'Клиника «RoyalDent» — одна из ведущих стоматологий в Латвии в области установки виниров.':
    'Klīnika «RoyalDent» ir viena no vadošajām Latvijas zobārstniecībām venīru uzstādīšanas jomā.',
  'В действительности прочность винира, его оптимальная толщина, точность цвета и прозрачность — вместе эти нюансы доводятся до идеала только при тесной работе доктора и специалиста, который непосредственно изготавливает виниры.':
    'Patiesībā venīra izturība, optimālais biezums, krāsas precizitāte un caurspīdīgums kopā tiek noslīpēti līdz ideālam tikai ciešā ārsta un venīru izgatavotāja sadarbībā.',
  'В клинике «RoyalDent» мы изготавливаем и устанавливаем возможно самые прочные и эстетичные виниры в Латвии.':
    'Klīnikā «RoyalDent» mēs izgatavojam un uzstādām, iespējams, izturīgākos un estētiskākos venīrus Latvijā.',
  'Врачи, которые занимаются протезированием': 'Ārsti, kas veic protezēšanu',
  'Цены на протезирование в Юрмале': 'Protezēšanas cenas Jūrmalā',
  'Где пройти протезирование в Юрмале?': 'Kur veikt protezēšanu Jūrmalā?',
  'Вы можете обратиться в клинику «RoyalDent». Наши услуги включают установку зубных протезов с учётом эстетики и функциональности. Опытные врачи, качественные материалы и комфортные условия. Запишитесь на консультацию для выбора оптимального варианта лечения.':
    'Varat vērsties klīnikā «RoyalDent». Mūsu pakalpojumi ietver zobu protēžu uzstādīšanu, ņemot vērā estētiku un funkcionalitāti. Pieredzējuši ārsti, kvalitatīvi materiāli un komfortabli apstākļi. Piesakieties konsultācijai, lai izvēlētos optimālo ārstēšanas variantu.',
  'Наши врачи регулярно проходят обучение и осваивают новые методики, поэтому мы можем успешно решать даже самые сложные клинические ситуации. Такой подход позволяет нам добиваться предсказуемых и долговечных результатов — это подтверждают отзывы пациентов, которые прошли протезирование у нас в клинике.':
    'Mūsu ārsti regulāri mācās un apgūst jaunas metodes, tāpēc varam veiksmīgi risināt pat vissarežģītākās klīniskās situācijas. Šāda pieeja ļauj sasniegt paredzamus un ilgnoturīgus rezultātus — to apstiprina pacientu atsauksmes, kuri protezēšanu veikuši mūsu klīnikā.',
  'Какие коронки лучше сделать на передние зубы?':
    'Kādus kronīšus labāk izvēlēties priekšzobiem?',
  'Для зоны улыбки в первую очередь важна эстетика, поэтому чаще выбирают безметалловые изделия. Если зуб хорошо сохранён и имеется достаточный объём эмали, оптимальным вариантом будет керамика E-max. При более выраженном разрушении используют диоксид циркония — он не уступает E-max по эстетике и долговечности.':
    'Smaida zonā vissvarīgākā ir estētika, tāpēc biežāk izvēlas bezmetāla konstrukcijas. Ja zobs ir labi saglabājies un emaljas apjoms ir pietiekams, optimālais variants ir E-max keramika. Izteiktākas sabrukšanas gadījumā izmanto cirkonija dioksīdu — tas estētikas un ilgnoturības ziņā neatpaliek no E-max.',
  'Какой материал лучше подходит для восстановления жевательных зубов?':
    'Kurš materiāls labāk piemērots košļājamo zobu atjaunošanai?',
  'Здесь в приоритете прочность и способность выдерживать высокую нагрузку. Идеальный вариант — диоксид циркония.':
    'Šeit prioritāte ir izturība un spēja izturēt lielu slodzi. Ideālais variants ir cirkonija dioksīds.',
  'Когда нужно менять коронку?': 'Kad kronītis jāmaina?',
  'При износе, нарушении фиксации или изменении состояния тканей под ней. При регулярных осмотрах врач подскажет оптимальный момент для замены.':
    'Nodiluma, fiksācijas traucējumu vai zem tā esošo audu stāvokļa izmaiņu gadījumā. Regulārās apskatēs ārsts norādīs optimālo nomaiņas brīdi.',
  'Сколько времени занимает восстановление коронками?':
    'Cik ilgs laiks nepieciešams atjaunošanai ar kronīšiem?',
  'После консультации обычно нужно два визита с интервалом в 7–14 дней. В первое посещение проводится подготовка и обточка, снимаются слепки, устанавливается временная конструкция. На втором приёме мы фиксируем постоянный протез.':
    'Pēc konsultācijas parasti nepieciešamas divas vizītes ar 7–14 dienu intervālu. Pirmajā vizītē veic sagatavošanu un slīpēšanu, noņem nospiedumus un uzstāda pagaidu konstrukciju. Otrajā vizītē fiksējam pastāvīgo protēzi.',
  'Больно ли ставить коронку?': 'Vai kronīša uzstādīšana ir sāpīga?',
  'Нет. Процедуры проводятся под местной анестезией.':
    'Nē. Procedūras veic vietējā anestēzijā.',
  'Что делать, если коронка начала шататься?': 'Ko darīt, ja kronītis sācis kustēties?',
  'Не выбрасывайте протез и обратитесь к ортопеду. Он оценит состояние конструкции и тканей под ней и определит, можно ли снова её поставить или требуется другое решение.':
    'Neizmetiet protēzi un vērsieties pie protēzista. Viņš izvērtēs konstrukcijas un zem tās esošo audu stāvokli un noteiks, vai to var uzstādīt atkārtoti vai nepieciešams cits risinājums.',

  // ─── pages/WisdomToothPage.tsx ───
  'Удаление зубов мудрости в Юрмале: показания и противопоказания, этапы операции, восстановление и цены клиники RoyalDent. Удаляем восьмёрки любой сложности по КТ-снимку, бережно и без боли.':
    'Gudrības zobu ekstrakcija Jūrmalā: indikācijas un kontrindikācijas, operācijas posmi, atveseļošanās un RoyalDent klīnikas cenas. Izņemam jebkuras sarežģītības gudrības zobus pēc datortomogrāfijas, saudzīgi un nesāpīgi.',
  'Удалённый зуб мудрости в щипцах в руке хирурга':
    'Izņemts gudrības zobs ķirurga knaiblēs',
  'Восьмёрки, они же зубы мудрости, прорезываются намного позже остальных, не имеют ни функционального, ни эстетического значения.':
    'Trešie molāri jeb gudrības zobi izšķiļas daudz vēlāk par pārējiem, un tiem nav ne funkcionālas, ne estētiskas nozīmes.',
  'В сравнении с остальными жевательными зубами корневая система восьмёрок склонна к наиболее специфическому и аномальному развитию — наличие от 2 до 5 корней, которые зачастую настолько искривлены, что переплетаются или срастаются между собой. Они проблемно прорезываются, подвержены кариозным поражениям из-за своей труднодоступности для проведения гигиенических процедур и могут занимать неправильное положение в челюсти, что приводит к травмированию мягких тканей и соседних зубов, мешает их нормальному развитию или способствует разрушению.':
    'Salīdzinājumā ar pārējiem košļājamiem zobiem trešo molāru sakņu sistēma attīstās visneparedzamāk — tiem ir no 2 līdz 5 saknēm, kas nereti ir tik izliektas, ka savijas vai saaug kopā. Tie grūti izšķiļas, ir pakļauti kariesam, jo higiēnas procedūrām ir grūti pieejami, un var ieņemt nepareizu stāvokli žoklī, kas traumē mīkstos audus un blakus esošos zobus, traucē to normālu attīstību vai veicina sabrukšanu.',
  'Показания к удалению зубов мудрости': 'Indikācijas gudrības zobu ekstrakcijai',
  'Ретинированный (непрорезавшийся) моляр, занимающий неправильное положение в челюсти.':
    'Retinēts (neizšķīlies) molārs, kas ieņem nepareizu stāvokli žoklī.',
  'Обширное поражение кариесом, значительное разрушение коронковой части зуба.':
    'Plašs kariesa bojājums, būtiska zoba kroņa daļas sabrukšana.',
  'Воспаление капюшона (перикоронарит).': 'Smaganu kapuces iekaisums (perikoronarīts).',
  'Пульпит, периодонтит.': 'Pulpīts, periodontīts.',
  'Необходимость установки брекет-системы.': 'Nepieciešamība uzstādīt breketu sistēmu.',
  'Зуб мудрости под воспалённым десневым капюшоном':
    'Gudrības zobs zem iekaisušas smaganu kapuces',
  'Горизонтально расположенный ретинированный зуб мудрости в кости челюсти':
    'Horizontāli novietots retinēts gudrības zobs žokļa kaulā',
  'Зуб мудрости, наклонённый в сторону соседнего моляра':
    'Gudrības zobs, kas noliecies pret blakus esošo molāru',
  'Прорезавшийся зуб мудрости с обнажёнными корнями':
    'Izšķīlies gudrības zobs ar atkailinātām saknēm',
  'Сильный наклон моляра может провоцировать травмы слизистой оболочки ротовой полости.':
    'Spēcīgs molāra slīpums var izraisīt mutes gļotādas traumas.',
  'Прорезывающаяся восьмёрка будет оказывать чрезмерное давление на соседние зубы, если ей не будет хватать пространства в ряду. Это может привести к скученности, смещению или деформации зубов.':
    'Izšķiļoties trešais molārs radīs pārmērīgu spiedienu uz blakus esošajiem zobiem, ja tam pietrūks vietas zobu rindā. Tas var novest pie zobu saspiestības, nobīdes vai deformācijas.',
  'Прорезавшийся под наклоном моляр часто упирается в близлежащую семёрку, провоцируя её преждевременное разрушение.':
    'Slīpi izšķīlies molārs bieži atduras pret blakus esošo otro molāru, izraisot tā priekšlaicīgu sabrukšanu.',
  'Панорамный снимок: ретинированный зуб мудрости нижней челюсти выделен красным кругом':
    'Panorāmas uzņēmums: apakšžokļa retinētais gudrības zobs iezīmēts ar sarkanu apli',
  'Из перечисленных выше причин наиболее часто восьмёрки удаляются по причине кариеса. При прорезывании над ним образуется так называемый капюшон — участок десны, накрывающий непрорезавшуюся часть зуба и создающий карман, где скапливаются частички пищи, что провоцирует развитие кариеса и перикоронарита — воспалительного процесса, который охватывает десневые ткани вокруг находящегося в процессе прорезывания или уже прорезавшегося зуба.':
    'No iepriekš minētajiem iemesliem visbiežāk trešos molārus izņem kariesa dēļ. Izšķiļoties virs zoba veidojas tā sauktā kapuce — smaganas daļa, kas nosedz neizšķīlušos zoba daļu un veido kabatu, kurā uzkrājas ēdiena daļiņas. Tas veicina kariesa un perikoronarīta attīstību — iekaisuma procesa, kas skar smaganu audus ap izšķiļošos vai jau izšķīlušos zobu.',
  'Панорамный снимок: все четыре полуретинированных зуба мудрости выделены красными кругами':
    'Panorāmas uzņēmums: visi četri daļēji retinētie gudrības zobi iezīmēti ar sarkaniem apļiem',
  'Другой причиной возникновения воспалительного процесса в области капюшона является полуретенция — когда через костную ткань челюсти или десну пробивается лишь часть полностью сформированного восьмого зуба.':
    'Cits iekaisuma procesa cēlonis kapuces rajonā ir daļēja retence — kad caur žokļa kaulaudiem vai smaganu izlaužas tikai daļa pilnībā izveidojušos trešā molāra.',
  'Зубы мудрости желательно держать на контроле с момента прорезывания. Достаточно рентгеновского снимка, чтобы оценить его состояние, расположение относительно других зубов и понять, чего ждать в дальнейшем. При выявлении аномального положения или очага воспаления врач может принять решение о необходимости безотлагательного удаления.':
    'Gudrības zobus vēlams kontrolēt no izšķilšanās brīža. Pietiek ar rentgenuzņēmumu, lai novērtētu to stāvokli, novietojumu attiecībā pret citiem zobiem un saprastu, ko gaidīt turpmāk. Konstatējot anomālu novietojumu vai iekaisuma perēkli, ārsts var lemt par nekavējošu ekstrakciju.',
  'Противопоказания к удалению зубов мудрости':
    'Kontrindikācijas gudrības zobu ekstrakcijai',
  'Удаление зубов мудрости всегда планируется индивидуально. Важно не просто «убрать зуб», а сделать это безопасно, без риска для нерва, пазух и окружающих тканей. Поэтому в некоторых ситуациях врач может предложить альтернативную тактику или отложить вмешательство.':
    'Gudrības zobu ekstrakciju vienmēr plāno individuāli. Svarīgi ne tikai izņemt zobu, bet izdarīt to droši, neapdraudot nervu, deguna blakusdobumus un apkārtējos audus. Tāpēc dažās situācijās ārsts var piedāvāt alternatīvu taktiku vai atlikt iejaukšanos.',
  'Зубы мудрости на нижней челюсти': 'Apakšžokļa gudrības zobi',
  'Если ретинированный зуб расположен близко к нижнечелюстному каналу, прямое удаление может быть небезопасным. В таких случаях мы сначала оцениваем возможность ортодонтической экструзии — постепенного вывода зуба из опасной зоны.':
    'Ja retinētais zobs atrodas tuvu apakšžokļa kanālam, tieša ekstrakcija var būt bīstama. Šādos gadījumos vispirms izvērtējam ortodontiskās ekstrūzijas iespēju — pakāpenisku zoba izvirzīšanu no bīstamās zonas.',
  'Если экструзия невозможна, альтернативой может стать декоронация — щадящий метод, позволяющий избежать повреждения нерва.':
    'Ja ekstrūzija nav iespējama, alternatīva var būt dekoronācija — saudzīga metode, kas ļauj izvairīties no nerva bojājuma.',
  'Зубы мудрости на верхней челюсти': 'Augšžokļa gudrības zobi',
  'Здесь ключевым фактором является расстояние между корнями зуба и верхнечелюстной пазухой. При отсутствии или минимальной костной перегородке удаление без подготовки может привести к осложнениям, поэтому сначала проводится экструзия, и только затем — удаление зуба.':
    'Šeit noteicošais faktors ir attālums starp zoba saknēm un augšžokļa dobumu. Ja kaula starpsiena nav vai tā ir minimāla, ekstrakcija bez sagatavošanas var radīt sarežģījumus, tāpēc vispirms veic ekstrūziju un tikai pēc tam — zoba izņemšanu.',
  'Общие ограничения': 'Vispārīgi ierobežojumi',
  'Плановое удаление зубов мудрости также может быть временно отложено при:':
    'Plānveida gudrības zobu ekstrakciju var uz laiku atlikt arī šādos gadījumos:',
  'острых инфекционных заболеваниях;': 'akūtas infekcijas slimības;',
  'беременности;': 'grūtniecība;',
  'приёме препаратов, влияющих на свёртываемость крови или костный обмен.':
    'medikamentu lietošana, kas ietekmē asins recēšanu vai kaulu vielmaiņu.',
  'В каждом случае врач подробно объясняет возможные риски и предлагает наиболее безопасный вариант лечения.':
    'Katrā gadījumā ārsts sīki izskaidro iespējamos riskus un piedāvā drošāko ārstēšanas variantu.',
  'Последствия, если не удалить зуб мудрости': 'Sekas, ja gudrības zobs netiek izņemts',
  'Среди осложнений, которые может спровоцировать воспаление капюшона — язвенный стоматит, гнойный лимфаденит, остеомиелит, абсцессы, флегмоны и т. д.':
    'Starp sarežģījumiem, ko var izraisīt kapuces iekaisums, ir čūlainais stomatīts, strutains limfadenīts, osteomielīts, abscesi, flegmonas u. c.',
  'Особенности удаления зубов мудрости': 'Gudrības zobu ekstrakcijas īpatnības',
  'Продолжительность и сложность процесса удаления зависит не только от индивидуальных особенностей пациента, но и от квалификации специалиста, который должен произвести детальное обследование и выбрать оптимальный метод экстракции. На первом этапе необходимо пройти рентгенологическое обследование. На снимке будет представлена точная информация о положении и конфигурации зуба мудрости, количестве корней.':
    'Ekstrakcijas ilgums un sarežģītība atkarīga ne tikai no pacienta individuālajām īpatnībām, bet arī no speciālista kvalifikācijas: viņam jāveic detalizēta izmeklēšana un jāizvēlas optimālā ekstrakcijas metode. Pirmajā posmā jāveic rentgenoloģiskā izmeklēšana. Uzņēmumā būs redzama precīza informācija par gudrības zoba novietojumu, konfigurāciju un sakņu skaitu.',
  'Зуб мудрости, или третий моляр, имеет непредсказуемое количество корней. Рядом с верхушками корней может находиться канал с нижнечелюстным нервом. Работа по удалению сложных, расположенных горизонтально, глубоко в кости нижней челюсти зубов мудрости считается сложной и проводится только опытными хирургами.':
    'Gudrības zobam jeb trešajam molāram ir neparedzams sakņu skaits. Sakņu galotņu tuvumā var atrasties kanāls ar apakšžokļa nervu. Sarežģītu, horizontāli un dziļi apakšžokļa kaulā novietotu gudrības zobu izņemšana tiek uzskatīta par sarežģītu un to veic tikai pieredzējuši ķirurgi.',
  'Удаление верхних зубов мудрости проходит легче и быстрее, чем нижних':
    'Augšžokļa gudrības zobu ekstrakcija norit vieglāk un ātrāk nekā apakšžokļa',
  'Дело в том, что кость на верхней челюсти менее плотная и более «податливая», чем на нижней, и не создаёт никаких анатомических препятствий для удаления. Это обусловлено высокой жевательной нагрузкой, которую испытывают нижние зубы — именно поэтому их корни более массивные и крепкие.':
    'Augšžokļa kauls ir mazāk blīvs un padevīgāks nekā apakšžokļa un nerada anatomiskus šķēršļus ekstrakcijai. To nosaka lielā košļāšanas slodze, kādu izjūt apakšžokļa zobi — tieši tāpēc to saknes ir masīvākas un stiprākas.',
  'Удаление зуба мудрости в 3 этапа': 'Gudrības zoba ekstrakcija 3 posmos',
  'Рентген-диагностика, осмотр полости рта и выявление показаний к удалению':
    'Rentgena diagnostika, mutes dobuma apskate un ekstrakcijas indikāciju noteikšana',
  'Анестезия: местное двухэтапное обезболивание': 'Anestēzija: vietēja divpakāpju sāpju remdēšana',
  'Извлечение зуба из лунки после того, как операционная зона потеряла чувствительность':
    'Zoba izņemšana no alveolas pēc tam, kad operācijas zona zaudējusi jutīgumu',
  'Если во время обследования будет выявлено, что зуб имеет массивную и разветвлённую корневую систему, значительный наклон или полностью разрушенную коронку, врачу потребуется разработать тактику удаления, которая позволит максимально оперативно и с наименьшим дискомфортом осуществить лечение.':
    'Ja izmeklēšanā atklājas, ka zobam ir masīva un sazarota sakņu sistēma, būtisks slīpums vai pilnībā sabrukusi kroņa daļa, ārstam būs jāizstrādā ekstrakcijas taktika, kas ļaus ārstēšanu veikt maksimāli ātri un ar vismazāko diskomfortu.',
  'После операции могут возникнуть болевые ощущения, интенсивность которых связана со сложностью хирургического вмешательства. Соблюдение рекомендаций врача и приём обезболивающих препаратов позволяют решить эту проблему и быстро вернуться к привычному ритму жизни. Также через 7–10 дней после удаления необходимо прийти на осмотр в клинику для контроля состояния ротовой полости.':
    'Pēc operācijas var rasties sāpes, kuru intensitāte saistīta ar ķirurģiskās iejaukšanās sarežģītību. Ārsta ieteikumu ievērošana un pretsāpju līdzekļu lietošana ļauj šo problēmu atrisināt un ātri atgriezties ierastajā dzīves ritmā. Tāpat 7–10 dienas pēc ekstrakcijas jāierodas klīnikā uz apskati mutes dobuma stāvokļa kontrolei.',
  'Это довольно популярный вопрос, но ответить на него однозначно нельзя. Также как и обычно, множественное удаление предусматривает ряд показаний и противопоказаний, которые будут озвучены лечащим врачом после проведения рентгенологического исследования и осмотра.':
    'Tas ir diezgan biežs jautājums, taču viennozīmīgi atbildēt uz to nevar. Kā parasti, vairāku zobu vienlaicīgai ekstrakcijai ir virkne indikāciju un kontrindikāciju, kuras ārstējošais ārsts nosauks pēc rentgenoloģiskās izmeklēšanas un apskates.',
  'Когда зуб мудрости можно оставить': 'Kad gudrības zobu var saglabāt',
  'Иногда мы видим визуально и на рентгене, что зуб мудрости, третий моляр, встал в зубной ряд ровно. Он здоров, участвует в пережёвывании пищи и не мешает другим зубам. Естественно, такой зуб сохраняется.':
    'Reizēm gan vizuāli, gan rentgenā redzam, ka gudrības zobs jeb trešais molārs ir izšķīlies zobu rindā taisni. Tas ir vesels, piedalās ēdiena košļāšanā un netraucē citiem zobiem. Protams, šādu zobu saglabājam.',
  'Панорамный снимок: зубы мудрости ровно встали в зубной ряд верхней и нижней челюсти':
    'Panorāmas uzņēmums: gudrības zobi taisni iekļāvušies augšžokļa un apakšžokļa zobu rindā',
  'Панорамный снимок: здоровые третьи моляры, не мешающие соседним зубам':
    'Panorāmas uzņēmums: veseli trešie molāri, kas netraucē blakus esošajiem zobiem',
  'Прорезавшаяся восьмёрка в нормальном положении — удаление за один визит':
    'Izšķīlies trešais molārs normālā stāvoklī — ekstrakcija vienā vizītē',
  'Непрорезавшийся или горизонтально расположенный зуб: операция по КТ-снимку':
    'Neizšķīlies vai horizontāli novietots zobs: operācija pēc datortomogrāfijas',
  'От 2 до 5 искривлённых или сросшихся корней — удаление проводит опытный хирург':
    'No 2 līdz 5 izliektām vai saaugušām saknēm — ekstrakciju veic pieredzējis ķirurgs',
  'Жевательный зуб, который уже не удаётся сохранить':
    'Košļājamais zobs, kuru vairs nav iespējams saglabāt',
  'Передние зубы и премоляры с одним корнем': 'Priekšzobi un premolāri ar vienu sakni',
  'Подвижный зуб с разрушенным связочным аппаратом':
    'Kustīgs zobs ar sabrukušu saistaudu aparātu',
  'Местное двухэтапное обезболивание операционной зоны':
    'Operācijas zonas vietēja divpakāpju sāpju remdēšana',
  'Аппликационный гель перед уколом — сам укол не чувствуется':
    'Aplikācijas gēls pirms injekcijas — pati injekcija nav jūtama',
  'Цены на удаление зубов в Юрмале': 'Zobu ekstrakcijas cenas Jūrmalā',
  'Точную стоимость врач называет после осмотра и снимка — она зависит от положения зуба и строения его корней. Полный перечень работ смотрите в':
    'Precīzas izmaksas ārsts nosauc pēc apskates un uzņēmuma — tās atkarīgas no zoba novietojuma un sakņu uzbūves. Pilnu darbu sarakstu skatiet',
  'прайс-листе клиники': 'klīnikas cenrādī',
  'Больно ли удалять зуб мудрости?': 'Vai gudrības zoba izņemšana ir sāpīga?',
  'Сама операция проходит без боли: обезболивание двухэтапное — сначала аппликационный гель, чтобы не чувствовался укол, затем местная анестезия. Зуб извлекают только после того, как операционная зона полностью потеряла чувствительность.':
    'Pati operācija norit nesāpīgi: sāpju remdēšana ir divpakāpju — vispirms aplikācijas gēls, lai nebūtu jūtama injekcija, pēc tam vietējā anestēzija. Zobu izņem tikai pēc tam, kad operācijas zona pilnībā zaudējusi jutīgumu.',
  'Нужен ли снимок перед удалением?': 'Vai pirms ekstrakcijas nepieciešams uzņēmums?',
  'Да, это первый этап. На рентгенологическом снимке видно положение и конфигурацию зуба, количество корней и расстояние до нижнечелюстного канала или верхнечелюстной пазухи. Без этой информации нельзя выбрать безопасную тактику удаления.':
    'Jā, tas ir pirmais posms. Rentgenuzņēmumā redzams zoba novietojums un konfigurācija, sakņu skaits un attālums līdz apakšžokļa kanālam vai augšžokļa dobumam. Bez šīs informācijas nevar izvēlēties drošu ekstrakcijas taktiku.',
  'Сколько длится операция?': 'Cik ilgi turpinās operācija?',
  'Продолжительность зависит от положения зуба и строения его корней. Прорезавшуюся восьмёрку в нормальном положении удаляют быстро, а на сложный ретинированный зуб, расположенный горизонтально и глубоко в кости нижней челюсти, времени требуется заметно больше — такие операции проводят только опытные хирурги.':
    'Ilgums atkarīgs no zoba novietojuma un sakņu uzbūves. Izšķīlušos trešo molāru normālā stāvoklī izņem ātri, savukārt sarežģītam retinētam zobam, kas novietots horizontāli un dziļi apakšžokļa kaulā, nepieciešams manāmi vairāk laika — šādas operācijas veic tikai pieredzējuši ķirurgi.',
  'Можно ли удалить несколько восьмёрок за один раз?':
    'Vai vienā reizē var izņemt vairākus gudrības zobus?',
  'Однозначного ответа нет. Множественное удаление предусматривает ряд показаний и противопоказаний, которые врач озвучит после рентгенологического исследования и осмотра.':
    'Viennozīmīgas atbildes nav. Vairāku zobu vienlaicīgai ekstrakcijai ir virkne indikāciju un kontrindikāciju, kuras ārsts nosauks pēc rentgenoloģiskās izmeklēšanas un apskates.',
  'Что делать после удаления?': 'Kas jādara pēc ekstrakcijas?',
  'После операции могут возникнуть болевые ощущения — их интенсивность связана со сложностью вмешательства. Соблюдение рекомендаций врача и приём обезболивающих обычно решают эту проблему за несколько дней. Через 7–10 дней нужно прийти на осмотр, чтобы врач проконтролировал состояние лунки и окружающих тканей.':
    'Pēc operācijas var rasties sāpes — to intensitāte saistīta ar iejaukšanās sarežģītību. Ārsta ieteikumu ievērošana un pretsāpju līdzekļu lietošana šo problēmu parasti atrisina dažu dienu laikā. Pēc 7–10 dienām jāierodas uz apskati, lai ārsts pārbaudītu alveolas un apkārtējo audu stāvokli.',
  'Всегда ли зуб мудрости нужно удалять?': 'Vai gudrības zobs vienmēr ir jāizņem?',
  'Нет. Если третий моляр встал в зубной ряд ровно, здоров, участвует в пережёвывании пищи и не мешает соседним зубам, он сохраняется. Достаточно держать его на контроле и делать снимок при плановых осмотрах.':
    'Nē. Ja trešais molārs zobu rindā izšķīlies taisni, ir vesels, piedalās ēdiena košļāšanā un netraucē blakus esošajiem zobiem, to saglabā. Pietiek to kontrolēt un plānveida apskatēs veikt uzņēmumu.',
  'Что делать, если зуб расположен близко к нерву?':
    'Ko darīt, ja zobs atrodas tuvu nervam?',
  'Прямое удаление в такой ситуации может быть небезопасным. Сначала мы оцениваем возможность ортодонтической экструзии — постепенного вывода зуба из опасной зоны. Если экструзия невозможна, альтернативой становится декоронация: щадящий метод, позволяющий избежать повреждения нерва.':
    'Tieša ekstrakcija šādā situācijā var būt bīstama. Vispirms izvērtējam ortodontiskās ekstrūzijas iespēju — pakāpenisku zoba izvirzīšanu no bīstamās zonas. Ja ekstrūzija nav iespējama, alternatīva ir dekoronācija: saudzīga metode, kas ļauj izvairīties no nerva bojājuma.',

  // ─── pages/AllOn4Page.tsx ───
  'Имплантация All-on-4 в Юрмале: несъёмный протез на четырёх имплантатах при полном отсутствии зубов. Временный протез в день операции, показания и противопоказания, этапы лечения, уход и цены клиники RoyalDent.':
    'All-on-4 implantācija Jūrmalā: neizņemama protēze uz četriem implantiem pilnīgas zobu neesamības gadījumā. Pagaidu protēze operācijas dienā, indikācijas un kontrindikācijas, ārstēšanas posmi, kopšana un RoyalDent klīnikas cenas.',
  'Что такое методика Все-на-4 (All-on-4)': 'Kas ir All-on-4 metode',
  'Имплантация All-on-4 помогает отказаться от съёмных протезов и вернуть уверенность в улыбке.':
    'All-on-4 implantācija palīdz atteikties no izņemamām protēzēm un atgūt pārliecību par savu smaidu.',
  'Новаторство методики восстановления зубов All-on-4 заключается в том, что для фиксации зубного ряда требуется только 4 имплантата. Их положение, размер и наклон позволяют равномерно распределить нагрузку, используя их в качестве опоры для зубного ряда из 10 зубов.':
    'All-on-4 metodes novitāte ir tā, ka zobu rindas fiksācijai nepieciešami tikai 4 implanti. To novietojums, izmērs un slīpums ļauj vienmērīgi sadalīt slodzi, izmantojot tos kā balstu 10 zobu rindai.',
  'Второй важный нюанс, позволивший широко применять методику «имплантации Все на 4», — это то, что она подразумевает установку имплантатов в имеющуюся кость. Протокол предусматривает размещение имплантатов в кости передних отделов челюстей, которая в большинстве случаев сохраняется. Это позволяет избежать операции по увеличению объёма костной ткани.':
    'Otrs būtiskais aspekts, kas ļāvis All-on-4 metodi plaši izmantot, ir tas, ka implantus ievieto esošajā kaulā. Protokols paredz implantu izvietošanu žokļu priekšējo daļu kaulā, kas vairumā gadījumu ir saglabājies. Tas ļauj izvairīties no kaulaudu apjoma palielināšanas operācijas.',
  'Важно понимать, что в случае недостаточного количества костной ткани во фронтальном отделе перед установкой имплантов всё же может понадобиться её наращивание. Если вы хотите узнать подробности о возможности':
    'Jāsaprot, ka nepietiekama kaulaudu apjoma gadījumā priekšējā daļā pirms implantu ievietošanas tomēr var būt nepieciešama kaula uzbūvēšana. Ja vēlaties uzzināt sīkāk par iespēju veikt',
  'по системе «все на 4 / all on 4», записывайтесь на консультацию к хирургу-ортопеду в клинику RoyalDent.':
    'pēc All-on-4 sistēmas, piesakieties konsultācijai pie implantologa un protēzista RoyalDent klīnikā.',
  'Показания к имплантации по протоколу All-on-4':
    'Indikācijas implantācijai pēc All-on-4 protokola',
  'Протокол All-on-4 применяется как альтернатива классической тотальной имплантации для восстановления зубных рядов. Метод позволяет в короткие сроки перейти от отсутствующих или проблемных зубов к стабильной несъёмной конструкции и восстановить жевательную функцию и возможность улыбаться.':
    'All-on-4 protokolu izmanto kā alternatīvu klasiskajai totālajai implantācijai zobu rindu atjaunošanai. Metode ļauj īsā laikā no trūkstošiem vai problemātiskiem zobiem pāriet uz stabilu neizņemamu konstrukciju un atjaunot košļāšanas funkciju un spēju smaidīt.',
  'Полная или почти полная утрата зубов': 'Pilnīgs vai gandrīz pilnīgs zobu zudums',
  'Основное показание для All-on-4 — отсутствие всех зубов или ситуация, когда оставшиеся зубы не подлежат сохранению. На четыре имплантата в день их установки (или на следующий день) фиксируется временная несъёмная конструкция, которая позволяет сразу вернуться к привычной социальной активности.':
    'Galvenā All-on-4 indikācija ir visu zobu trūkums vai situācija, kad atlikušos zobus nav iespējams saglabāt. Uz četriem implantiem to ievietošanas dienā (vai nākamajā dienā) fiksē pagaidu neizņemamu konstrukciju, kas ļauj uzreiz atgriezties ierastajā sociālajā dzīvē.',
  'Лёгкая или умеренная атрофия костной ткани': 'Viegla vai mērena kaulaudu atrofija',
  'При длительном отсутствии зубов костная ткань постепенно уменьшается в объёме. Особенность протокола All-on-4 заключается в наклонной установке задних имплантатов, что позволяет эффективно использовать имеющийся объём кости и в ряде случаев обойтись без костной пластики.':
    'Ilgstoši trūkstot zobiem, kaulaudu apjoms pakāpeniski samazinās. All-on-4 protokola īpatnība ir aizmugurējo implantu slīpā ievietošana, kas ļauj efektīvi izmantot esošo kaula apjomu un virknē gadījumu iztikt bez kaula plastikas.',
  'Непереносимость или неудобство съёмных протезов':
    'Izņemamo protēžu nepanesamība vai neērtība',
  'Если съёмный протез плохо фиксируется, натирает или мешает речи, протокол All-on-4 может стать альтернативой. Несъёмная конструкция фиксируется на имплантатах и не требует ежедневного снятия, что значительно повышает комфорт в повседневной жизни.':
    'Ja izņemamā protēze slikti turas, berž vai traucē runāt, All-on-4 protokols var kļūt par alternatīvu. Neizņemamā konstrukcija tiek fiksēta uz implantiem, un to nav nepieciešams izņemt katru dienu, kas būtiski paaugstina ikdienas komfortu.',
  'Фото работы All-on-4': 'All-on-4 darba fotoattēls',
  'Противопоказания к имплантации по протоколу All-on-4':
    'Kontrindikācijas implantācijai pēc All-on-4 protokola',
  'Противопоказания к лечению по протоколу All-on-4 в целом совпадают с общими противопоказаниями к дентальной имплантации. Перед началом лечения врач обязательно оценивает общее состояние здоровья пациента и условия в полости рта, чтобы выбранный метод был безопасным и прогнозируемым.':
    'Kontrindikācijas ārstēšanai pēc All-on-4 protokola kopumā sakrīt ar vispārīgajām zobu implantācijas kontrindikācijām. Pirms ārstēšanas sākuma ārsts noteikti izvērtē pacienta vispārējo veselības stāvokli un apstākļus mutes dobumā, lai izvēlētā metode būtu droša un prognozējama.',
  'Относительные противопоказания': 'Relatīvās kontrindikācijas',
  'острые воспалительные процессы в полости рта — лечение проводится после санации;':
    'akūti iekaisuma procesi mutes dobumā — ārstēšanu veic pēc sanācijas;',
  'беременность — плановое хирургическое вмешательство откладывается;':
    'grūtniecība — plānveida ķirurģiskā iejaukšanās tiek atlikta;',
  'курение — снижает прогноз приживления имплантатов;':
    'smēķēšana — pasliktina implantu integrācijas prognozi;',
  'хронические заболевания — при стабильном состоянии лечение возможно после согласования с лечащим врачом.':
    'hroniskas slimības — stabila stāvokļa gadījumā ārstēšana iespējama pēc saskaņošanas ar ārstējošo ārstu.',
  'Абсолютные противопоказания встречаются редко': 'Absolūtās kontrindikācijas sastopamas reti',
  'и связаны с состояниями, при которых нарушены процессы заживления тканей: декомпенсированный сахарный диабет, приём бифосфонатов, химио- и лучевая терапия, тяжёлые нарушения свёртываемости крови и другие серьёзные системные заболевания.':
    'un saistītas ar stāvokļiem, kuros traucēti audu dzīšanas procesi: dekompensēts cukura diabēts, bifosfonātu lietošana, ķīmijterapija un staru terapija, smagi asins recēšanas traucējumi un citas nopietnas sistēmiskas slimības.',
  'Этапы имплантации и протезирования All-on-4':
    'All-on-4 implantācijas un protezēšanas posmi',
  'Всё начинается с консультации и диагностики.': 'Viss sākas ar konsultāciju un diagnostiku.',
  'КТ-снимок челюстей на мониторе в кабинете диагностики':
    'Žokļu datortomogrāfijas attēls monitorā diagnostikas kabinetā',
  'Мы оцениваем состояние костной ткани, прикус, нагрузку и общее состояние полости рта. На этом этапе становится понятно, подходит ли вам протокол All-on-4 или есть другое рациональное решение.':
    'Izvērtējam kaulaudu stāvokli, sakodienu, slodzi un mutes dobuma vispārējo stāvokli. Šajā posmā kļūst skaidrs, vai All-on-4 protokols jums ir piemērots, vai ir cits racionālāks risinājums.',
  'Далее мы планируем лечение.': 'Pēc tam plānojam ārstēšanu.',
  '3D-модель челюсти с имплантатами и будущим протезом':
    'Žokļa 3D modelis ar implantiem un topošo protēzi',
  'Создаётся 3D-модель челюстей, продумывается положение имплантатов и будущая конструкция. Задние опоры устанавливаются под наклоном — так удаётся использовать имеющийся объём кости и обойтись без её наращивания.':
    'Tiek izveidots žokļu 3D modelis, pārdomāts implantu novietojums un topošā konstrukcija. Aizmugurējos balstus ievieto slīpi — tā izdodas izmantot esošo kaula apjomu un iztikt bez tā uzbūvēšanas.',
  'Хирургический этап проходит под анестезией.': 'Ķirurģiskais posms notiek anestēzijā.',
  'Установка имплантатов в челюсть по хирургическому шаблону':
    'Implantu ievietošana žoklī pēc ķirurģiskā šablona',
  'Устанавливаются четыре имплантата, и, в большинстве случаев, в этот же день фиксируется временный протез. Вы уходите уже с зубами — можно аккуратно есть, говорить и не выпадать из привычной жизни.':
    'Tiek ievietoti četri implanti, un vairumā gadījumu tajā pašā dienā fiksē pagaidu protēzi. Jūs dodaties mājās jau ar zobiem — var uzmanīgi ēst, runāt un neizkrist no ierastās dzīves.',
  'После этого идёт период адаптации и приживления имплантатов.':
    'Pēc tam seko adaptācijas un implantu integrācijas periods.',
  'Готовый постоянный протез на имплантах в руках техника':
    'Gatava pastāvīgā protēze uz implantiem zobu tehniķa rokās',
  'Обычно он занимает 4–6 месяцев. В это время важно соблюдать рекомендации по нагрузке и гигиене. Мы контролируем процесс и при необходимости корректируем временную конструкцию.':
    'Parasti tas ilgst 4–6 mēnešus. Šajā laikā svarīgi ievērot ieteikumus par slodzi un higiēnu. Mēs kontrolējam procesu un nepieciešamības gadījumā koriģējam pagaidu konstrukciju.',
  'Когда имплантаты полностью интегрируются, изготавливается постоянный протез.':
    'Kad implanti pilnībā integrējušies, tiek izgatavota pastāvīgā protēze.',
  'Он точнее по посадке, прочнее и рассчитан на полноценную жевательную нагрузку на годы.':
    'Tā precīzāk pieguļ, ir izturīgāka un paredzēta pilnvērtīgai košļāšanas slodzei uz gadiem.',
  'После протезирования верхней или нижней челюсти на 4 имплантах не требуется особый уход. Главное — соблюдать несколько правил:':
    'Pēc augšžokļa vai apakšžokļa protezēšanas uz 4 implantiem īpaša kopšana nav nepieciešama. Galvenais — ievērot dažus noteikumus:',
  'Чистить два раза в день.': 'Tīrīt zobus divas reizes dienā.',
  'Особое внимание нужно уделять линии соединения протеза с десной — там может скапливаться налёт.':
    'Īpaša uzmanība jāpievērš protēzes un smaganas savienojuma līnijai — tur var uzkrāties aplikums.',
  'Использовать ирригатор.': 'Lietot irigatoru.',
  'Вода под давлением вымывает остатки пищи из труднодоступных мест, куда не достаёт щётка. Ирригатор обеспечивает здоровье дёсен вокруг имплантатов.':
    'Ūdens zem spiediena izskalo ēdiena atliekas no grūti pieejamām vietām, kur birste nesniedzas. Irigators nodrošina smaganu veselību ap implantiem.',
  'Раз в полгода посещать гигиениста.': 'Reizi pusgadā apmeklēt higiēnistu.',
  'Профессиональная чистка': 'Profesionālā tīrīšana',
  'помогает удалить отложения, которые не получается убрать самостоятельно.':
    'palīdz noņemt nosēdumus, kurus nav iespējams notīrīt pašam.',
  'Избегать экстремальных нагрузок.': 'Izvairīties no ekstremālas slodzes.',
  'Не нужно открывать упаковки, грызть особо твёрдые продукты. Конструкция прочная, но бережное отношение продлевает её срок службы.':
    'Nevajag ar zobiem atvērt iepakojumus vai grauzt īpaši cietus produktus. Konstrukcija ir izturīga, taču saudzīga attieksme pagarina tās kalpošanas laiku.',
  'Регулярно проходить профилактические осмотры.':
    'Regulāri veikt profilaktiskās apskates.',
  'Рекомендуется каждые полгода записываться в клинику — врач сможет вовремя заметить изменения и скорректировать уход.':
    'Ieteicams reizi pusgadā pieteikties klīnikā — ārsts laikus pamanīs izmaiņas un koriģēs kopšanu.',
  'Пациентка рассматривает в зеркале протез на имплантах после осмотра':
    'Paciente spogulī aplūko protēzi uz implantiem pēc apskates',
  'Стоимость имплантации и временного протезирования All-on-4':
    'All-on-4 implantācijas un pagaidu protezēšanas izmaksas',
  'Стоимость постоянного протезирования All-on-4':
    'All-on-4 pastāvīgās protezēšanas izmaksas',
  'Более равномерная нагрузка, восстановление и передних, и большинства жевательных зубов':
    'Vienmērīgāka slodze, gan priekšzobu, gan lielākās daļas košļājamo zobu atjaunošana',
  'Система AnyRidge даёт максимально предсказуемый результат при установке временного протеза сразу после операции':
    'AnyRidge sistēma nodrošina maksimāli prognozējamu rezultātu, uzstādot pagaidu protēzi uzreiz pēc operācijas',
  'Швейцарская система Straumann гарантирует премиальное качество и долговечность. Расширенная гарантия 8 лет':
    'Šveices sistēma Straumann garantē premium kvalitāti un ilgnoturību. Paplašinātā garantija 8 gadi',
  'Более равномерное распределение нагрузки. Повышенный комфорт при жевании и долговечность конструкции':
    'Vienmērīgāks slodzes sadalījums. Paaugstināts komforts košļājot un konstrukcijas ilgnoturība',
  'Максимальный комфорт, эстетика и надёжность. Полный зубной ряд с премиальной эстетикой и долгим сроком службы':
    'Maksimāls komforts, estētika un drošums. Pilna zobu rinda ar premium estētiku un ilgu kalpošanas laiku',
  'Почему всего четыре имплантата держат весь зубной ряд?':
    'Kāpēc tikai četri implanti notur visu zobu rindu?',
  'Дело в их положении: передние опоры ставятся вертикально, задние — под наклоном. Такое расположение позволяет равномерно распределить жевательную нагрузку и использовать четыре имплантата как опору для зубного ряда из десяти зубов.':
    'Noteicošais ir to novietojums: priekšējos balstus ievieto vertikāli, aizmugurējos — slīpi. Šāds izvietojums ļauj vienmērīgi sadalīt košļāšanas slodzi un izmantot četrus implantus kā balstu desmit zobu rindai.',
  'Нужно ли наращивать кость перед имплантацией?':
    'Vai pirms implantācijas jāuzbūvē kauls?',
  'В большинстве случаев нет. Наклонная установка задних имплантатов позволяет разместить их в кости передних отделов челюсти, которая обычно сохраняется. Но при выраженном дефиците кости во фронтальном отделе наращивание всё же может понадобиться — это решается на консультации по КТ.':
    'Vairumā gadījumu nē. Aizmugurējo implantu slīpā ievietošana ļauj tos izvietot žokļa priekšējo daļu kaulā, kas parasti ir saglabājies. Taču izteikta kaula deficīta gadījumā priekšējā daļā uzbūvēšana tomēr var būt nepieciešama — to izlemj konsultācijā pēc datortomogrāfijas.',
  'Можно ли есть сразу после операции?': 'Vai uzreiz pēc operācijas drīkst ēst?',
  'В большинстве случаев временный протез фиксируется в день установки имплантатов или на следующий день — вы уходите из клиники уже с зубами. Первое время есть нужно аккуратно и соблюдать рекомендации врача по нагрузке.':
    'Vairumā gadījumu pagaidu protēzi fiksē implantu ievietošanas dienā vai nākamajā dienā — no klīnikas dodaties jau ar zobiem. Sākumā jāēd uzmanīgi un jāievēro ārsta ieteikumi par slodzi.',
  'Сколько времени занимает всё лечение?': 'Cik ilgi turpinās visa ārstēšana?',
  'Хирургический этап с временным протезом проходит за один визит. Затем идёт период приживления имплантатов — обычно 4–6 месяцев. После полной интеграции изготавливается постоянный протез: он точнее по посадке и рассчитан на полноценную жевательную нагрузку.':
    'Ķirurģiskais posms ar pagaidu protēzi notiek vienā vizītē. Pēc tam seko implantu integrācijas periods — parasti 4–6 mēneši. Pēc pilnīgas integrācijas izgatavo pastāvīgo protēzi: tā precīzāk pieguļ un ir paredzēta pilnvērtīgai košļāšanas slodzei.',
  'Кому метод не подойдёт?': 'Kam metode nav piemērota?',
  'Часть противопоказаний временные: острое воспаление в полости рта, беременность, нестабильное течение хронических заболеваний — лечение проводится после санации или согласования с лечащим врачом. Абсолютные противопоказания встречаются редко и связаны с нарушением заживления тканей: декомпенсированный сахарный диабет, приём бифосфонатов, химио- и лучевая терапия, тяжёлые нарушения свёртываемости крови.':
    'Daļa kontrindikāciju ir pagaidu: akūts iekaisums mutes dobumā, grūtniecība, nestabila hronisku slimību gaita — ārstēšanu veic pēc sanācijas vai saskaņošanas ar ārstējošo ārstu. Absolūtās kontrindikācijas sastopamas reti un saistītas ar traucētu audu dzīšanu: dekompensēts cukura diabēts, bifosfonātu lietošana, ķīmijterapija un staru terapija, smagi asins recēšanas traucējumi.',
  'Чем All-on-4 отличается от All-on-6?': 'Ar ko All-on-4 atšķiras no All-on-6?',
  'Количеством опор. На четырёх имплантатах протез обычно восстанавливает зону улыбки и часть жевательных зубов, на шести — зубной ряд шире, а нагрузка распределяется равномернее, с большим запасом прочности. Какой протокол рациональнее в вашем случае, определяется по КТ и жевательной нагрузке.':
    'Ar balstu skaitu. Uz četriem implantiem protēze parasti atjauno smaida zonu un daļu košļājamo zobu, uz sešiem — zobu rinda ir plašāka, slodze sadalās vienmērīgāk un ir lielāka izturības rezerve. Kurš protokols jūsu gadījumā ir racionālāks, nosaka pēc datortomogrāfijas un košļāšanas slodzes.',

  // ─── pages/RootCanalPage.tsx ───
  'Лечение корневых каналов под микроскопом в Юрмале: лечение пульпита и периодонтита, восстановление зуба после лечения. Цены клиники RoyalDent.':
    'Sakņu kanālu ārstēšana mikroskopā Jūrmalā: pulpīta un periodontīta ārstēšana, zoba atjaunošana pēc ārstēšanas. RoyalDent klīnikas cenas.',
  'Пульпит — это воспаление ткани внутри зубных каналов.':
    'Pulpīts ir audu iekaisums zoba sakņu kanālos.',
  'Пульпит — одно из самых распространённых стоматологических заболеваний. Чаще всего к нему приводит не вылеченный своевременно кариес, из-за которого инфекция доходит до пульпы и вызывает её воспаление.':
    'Pulpīts ir viena no izplatītākajām zobu slimībām. Visbiežāk to izraisa laikus neizārstēts kariess, kura dēļ infekcija nonāk pulpā un izraisa tās iekaisumu.',
  'Главный симптом пульпита — самопроизвольная острая боль':
    'Galvenais pulpīta simptoms ir spontānas asas sāpes',
  'Болевые ощущения обычно резкие, острые и режущие, а могут затухать и возвращаться приступами.':
    'Sāpes parasti ir asas un griezīgas, tās var norimt un atgriezties lēkmjveidā.',
  'Лечение пульпита — это последовательное решение двух задач:':
    'Pulpīta ārstēšana ir divu uzdevumu secīga risināšana:',
  'устранить воспаление и не допустить его повторного появления':
    'novērst iekaisumu un nepieļaut tā atkārtošanos',
  'укрепить зуб и восстановить его точную форму и эстетику':
    'nostiprināt zobu un atjaunot tā precīzu formu un estētiku',
  'Строение зуба в разрезе: пульпа и корневые каналы':
    'Zoba uzbūve šķērsgriezumā: pulpa un sakņu kanāli',
  'Как проходит лечение пульпита в клинике RoyalDent':
    'Kā notiek pulpīta ārstēšana RoyalDent klīnikā',
  'Мы предлагаем комплексное лечение под ключ: не просто удаляем нерв и пломбируем каналы, а полностью восстанавливаем функциональность зуба.':
    'Piedāvājam kompleksu ārstēšanu no sākuma līdz beigām: ne tikai izņemam nervu un aizpildām kanālus, bet pilnībā atjaunojam zoba funkcionalitāti.',
  'Точная диагностика и осмотр': 'Precīza diagnostika un apskate',
  'Лечение начинается с осмотра и диагностики. Для точной оценки анатомии корней и количества каналов мы используем прицельный рентген и, при необходимости, компьютерную томографию. Это особенно важно для многоканальных зубов, где анатомия может быть сложной.':
    'Ārstēšana sākas ar apskati un diagnostiku. Lai precīzi novērtētu sakņu anatomiju un kanālu skaitu, izmantojam periapikālo rentgenu un nepieciešamības gadījumā datortomogrāfiju. Tas īpaši svarīgi daudzkanālu zobiem, kuru anatomija var būt sarežģīta.',
  'Мы индивидуально подбираем безопасный анестетик, чтобы обеспечить вам спокойствие и комфорт. Поэтому лечение пульпита под анестезией проходит абсолютно безболезненно.':
    'Individuāli izvēlamies drošu anestēzijas līdzekli, lai nodrošinātu jums mieru un komfortu. Tāpēc pulpīta ārstēšana anestēzijā norit pilnīgi nesāpīgi.',
  'Обработка и очистка каналов': 'Kanālu apstrāde un tīrīšana',
  'После удаления поражённых кариесом тканей и создания доступа врач удаляет воспалённую пульпу и приступает к обработке каналов.':
    'Pēc kariesa skarto audu noņemšanas un piekļuves izveides ārsts izņem iekaisušo pulpu un sāk kanālu apstrādi.',
  'Мы используем:': 'Mēs izmantojam:',
  'эндодонтические инструменты с апекслокатором — для точного определения длины каналов;':
    'endodontiskos instrumentus ar apeksa lokatoru — precīzai kanālu garuma noteikšanai;',
  'ультразвук — для очистки труднодоступных участков;':
    'ultraskaņu — grūti pieejamu vietu tīrīšanai;',
  'антисептическую обработку каждого канала.': 'katra kanāla antiseptisko apstrādi.',
  'Каждый этап контролируется рентгенологически, чтобы исключить ошибки и повторное воспаление.':
    'Katrs posms tiek kontrolēts rentgenoloģiski, lai izslēgtu kļūdas un atkārtotu iekaisumu.',
  'Пломбирование каналов': 'Kanālu pildīšana',
  'После очистки каналы герметично пломбируются. Это предотвращает повторное проникновение инфекции и создаёт надёжную основу для дальнейшего восстановления зуба.':
    'Pēc tīrīšanas kanālus hermētiski aizpilda. Tas novērš atkārtotu infekcijas iekļūšanu un rada drošu pamatu zoba turpmākai atjaunošanai.',
  'На этом этапе эндодонтическое лечение завершается, но работа с зубом — нет.':
    'Šajā posmā endodontiskā ārstēšana noslēdzas, taču darbs ar zobu — vēl nē.',
  'Восстановление зуба после лечения каналов': 'Zoba atjaunošana pēc sakņu kanālu ārstēšanas',
  'Восстановление зуба пломбой': 'Zoba atjaunošana ar plombu',
  'Лечение периодонтита': 'Periodontīta ārstēšana',
  'Периодонтит — это воспаление мягких тканей, окружающих зуб и удерживающих его в челюсти.':
    'Periodontīts ir zobu apņemošo un žoklī noturošo mīksto audu iekaisums.',
  'В настоящее время периодонтит — одно из часто встречающихся воспалительных заболеваний корня и окружающих его тканей. Он возникает из-за развития инфекции в корневом канале. Если поражение эмали или дентина человек может увидеть самостоятельно и невооружённым глазом, то периодонтит бывает трудно определить, не обращаясь к врачу-стоматологу: протекать он может даже без глубокой кариозной или пульпитной полости, находясь в хронической стадии.':
    'Mūsdienās periodontīts ir viena no biežāk sastopamajām saknes un apkārtējo audu iekaisuma slimībām. Tas rodas infekcijas attīstības dēļ saknes kanālā. Ja emaljas vai dentīna bojājumu cilvēks var ieraudzīt pats ar neapbruņotu aci, tad periodontītu bez zobārsta palīdzības noteikt ir grūti: hroniskā stadijā tas var noritēt pat bez dziļa kariesa vai pulpīta dobuma.',
  'Микроорганизмы могут попасть в корневой канал в результате вовремя не вылеченного кариеса, трещины с нарушением целостности или скола, проведённого ранее некачественного удаления нерва и пломбировки каналов, травмы. Если вы начали чувствовать боли при приёме пищи, накусывании на зуб или ноющие боли, стоит незамедлительно обратиться к специалисту: очень важно заметить заболевание на ранних стадиях, ведь не начатое своевременно лечение может привести к потере зуба.':
    'Mikroorganismi saknes kanālā var nokļūt laikus neizārstēta kariesa, plaisas vai atlūzuma, iepriekš nekvalitatīvi veiktas nerva izņemšanas un kanālu pildīšanas vai traumas rezultātā. Ja jūtat sāpes ēdot, uzkožot uz zoba vai smeldzošas sāpes, nekavējoties jāvēršas pie speciālista: ļoti svarīgi slimību pamanīt agrīnā stadijā, jo laikus neuzsākta ārstēšana var novest pie zoba zaudēšanas.',
  'По месту возникновения очага инфекции периодонтит разделяют на апикальный, который затрагивает область вокруг корня и встречается чаще, и маргинальный, который изначально возникает в области десны и встречается реже. Апикальный периодонтит обычно развивается из-за продуктов жизнедеятельности микроорганизмов, находящихся в корневых каналах; маргинальный чаще провоцируется травмой.':
    'Pēc infekcijas perēkļa atrašanās vietas periodontītu iedala apikālajā, kas skar saknes galotnes apvidu un sastopams biežāk, un marginālajā, kas sākotnēji rodas smaganas rajonā un sastopams retāk. Apikālais periodontīts parasti attīstās sakņu kanālos esošo mikroorganismu vielmaiņas produktu dēļ; marginālo biežāk izraisa trauma.',
  'Микроскоп Zumax в кабинете клиники RoyalDent': 'Zumax mikroskops RoyalDent klīnikas kabinetā',
  'Показания к лечению периодонтита': 'Indikācijas periodontīta ārstēšanai',
  'Лечение периодонтита проводится в тех случаях, когда воспалительный процесс развивается за пределами корня зуба и затрагивает окружающие ткани. Задача врача — устранить очаг инфекции, снять боль и предотвратить осложнения.':
    'Periodontīta ārstēšanu veic gadījumos, kad iekaisuma process attīstās ārpus zoba saknes un skar apkārtējos audus. Ārsta uzdevums ir likvidēt infekcijas perēkli, mazināt sāpes un novērst sarežģījumus.',
  'Острый периодонтит': 'Akūts periodontīts',
  'Сопровождается выраженной болью при накусывании, ощущением «выросшего» зуба, отёком десны. В такой ситуации лечение направлено на снятие воспаления, устранение инфекции и предотвращение её распространения.':
    'To pavada izteiktas sāpes uzkožot, sajūta, ka zobs ir «izaudzis», un smaganas tūska. Šādā situācijā ārstēšana vērsta uz iekaisuma mazināšanu, infekcijas likvidēšanu un tās izplatīšanās novēršanu.',
  'Хронический периодонтит': 'Hronisks periodontīts',
  'Фиброзный, гранулирующий или гранулематозный процесс, который часто протекает без ярких симптомов и выявляется на рентгеновских снимках. Несмотря на отсутствие боли, воспалительный очаг у верхушки корня постепенно разрушает костную ткань и может привести к образованию кисты. Лечение позволяет устранить источник инфекции и сохранить зуб.':
    'Fibrozs, granulējošs vai granulomatozs process, kas bieži norit bez izteiktiem simptomiem un tiek atklāts rentgenuzņēmumos. Lai gan sāpju nav, iekaisuma perēklis saknes galotnē pakāpeniski noārda kaulaudus un var novest pie cistas veidošanās. Ārstēšana ļauj likvidēt infekcijas avotu un saglabāt zobu.',
  'Обострение хронического процесса': 'Hroniska procesa saasinājums',
  'При снижении иммунитета или нагрузке на зуб хронический периодонтит может обостряться, вызывая боль, припухлость и дискомфорт. В этом случае проводится лечение, направленное на купирование обострения и последующую санацию очага воспаления.':
    'Pazeminoties imunitātei vai palielinoties slodzei uz zobu, hronisks periodontīts var saasināties, izraisot sāpes, pietūkumu un diskomfortu. Šādā gadījumā veic ārstēšanu, kas vērsta uz saasinājuma novēršanu un iekaisuma perēkļa sanāciju.',
  'Противопоказания к лечению периодонтита': 'Kontrindikācijas periodontīta ārstēšanai',
  'В ряде ситуаций проведение эндодонтического лечения периодонтита оказывается нецелесообразным или требует предварительной подготовки.':
    'Virknē situāciju periodontīta endodontiskā ārstēšana nav lietderīga vai prasa iepriekšēju sagatavošanu.',
  'Нецелесообразность сохранения зуба': 'Zoba saglabāšana nav lietderīga',
  'Если зуб разрушен ниже уровня десны, имеет подвижность III степени из-за потери костной ткани или значительное поражение тканей, что делает невозможным его восстановление, прогноз лечения неблагоприятный. В таких случаях врач рекомендует удаление с последующим протезированием или имплантацией.':
    'Ja zobs sabrucis zem smaganas līmeņa, tam ir III pakāpes kustīgums kaulaudu zuduma dēļ vai audi bojāti tik būtiski, ka atjaunošana nav iespējama, ārstēšanas prognoze ir nelabvēlīga. Šādos gadījumos ārsts iesaka ekstrakciju ar sekojošu protezēšanu vai implantāciju.',
  'Непроходимость корневых каналов': 'Sakņu kanālu necaurejamība',
  'При сложной анатомии, искривлении или сильной кальцификации каналов, когда их невозможно качественно обработать и герметично запломбировать, эффективность лечения периодонтита резко снижается. Тактика лечения определяется индивидуально.':
    'Sarežģītas anatomijas, izliekuma vai spēcīgas kanālu kalcifikācijas gadījumā, kad tos nav iespējams kvalitatīvi apstrādāt un hermētiski aizpildīt, periodontīta ārstēšanas efektivitāte strauji samazinās. Ārstēšanas taktiku nosaka individuāli.',
  'Необходимо немедленное обращение к врачу, иначе резко возрастает риск потери зуба.':
    'Nepieciešama nekavējoša vēršanās pie ārsta, citādi strauji pieaug zoba zaudēšanas risks.',
  'Когда зуб всё же приходится удалять': 'Kad zobu tomēr nākas izņemt',
  'Иногда, несмотря на все современные методы лечения, сохранить зуб оказывается невозможно или нецелесообразно. Это не означает «поражение» лечения — в ряде ситуаций удаление становится самым разумным и прогнозируемым решением.':
    'Reizēm, neraugoties uz visām mūsdienīgajām ārstēšanas metodēm, zobu saglabāt nav iespējams vai lietderīgi. Tas nenozīmē ārstēšanas neveiksmi — virknē situāciju ekstrakcija ir saprātīgākais un prognozējamākais risinājums.',
  'К удалению зуба врач может рекомендовать перейти, если:':
    'Ārsts var ieteikt zoba ekstrakciju, ja:',
  'зуб разрушен настолько, что его невозможно надёжно восстановить реставрацией;':
    'zobs sabrucis tik ļoti, ka to nav iespējams droši atjaunot ar restaurāciju;',
  'выявлена трещина или перелом корня, при котором воспаление будет постоянно возвращаться;':
    'konstatēta plaisa vai saknes lūzums, kura dēļ iekaisums pastāvīgi atgriezīsies;',
  'воспалительный очаг продолжает разрушать костную ткань, несмотря на проведённое лечение;':
    'iekaisuma perēklis turpina noārdīt kaulaudus, neraugoties uz veikto ārstēšanu;',
  'сохранение зуба создаёт риск осложнений для соседних зубов и костной ткани.':
    'zoba saglabāšana rada sarežģījumu risku blakus esošajiem zobiem un kaulaudiem.',
  'В таких случаях мы заранее обсуждаем альтернативы — имплантацию или протезирование, чтобы восстановление зубного ряда прошло без потери функции и эстетики.':
    'Šādos gadījumos savlaicīgi pārrunājam alternatīvas — implantāciju vai protezēšanu, lai zobu rindas atjaunošana notiktu, nezaudējot funkciju un estētiku.',
  'Цены на лечение каналов в Юрмале': 'Sakņu kanālu ārstēšanas cenas Jūrmalā',
  'Проводим чистку и пломбирование 1-го канала. Восстановление зуба не входит в стоимость':
    'Veicam 1 kanāla tīrīšanu un pildīšanu. Zoba atjaunošana cenā nav iekļauta',
  'Проводим чистку и пломбирование 2-х каналов. Восстановление зуба не входит в стоимость':
    'Veicam 2 kanālu tīrīšanu un pildīšanu. Zoba atjaunošana cenā nav iekļauta',
  'Проводим чистку и пломбирование 3-х каналов. Восстановление зуба не входит в стоимость':
    'Veicam 3 kanālu tīrīšanu un pildīšanu. Zoba atjaunošana cenā nav iekļauta',
  'Проводим чистку и пломбирование 4-х каналов. Восстановление зуба не входит в стоимость':
    'Veicam 4 kanālu tīrīšanu un pildīšanu. Zoba atjaunošana cenā nav iekļauta',
  'Лечение каналов под микроскопом в сложных случаях':
    'Sakņu kanālu ārstēšana mikroskopā sarežģītos gadījumos',
  'Больно ли лечить пульпит?': 'Vai pulpīta ārstēšana ir sāpīga?',
  'Нет. Лечение проводится под современной анестезией и проходит без боли.':
    'Nē. Ārstēšana notiek mūsdienīgā anestēzijā un norit nesāpīgi.',
  'Можно ли вылечить пульпит за один визит к стоматологу?':
    'Vai pulpītu var izārstēt vienā vizītē pie zobārsta?',
  'В большинстве случаев — да. Современные методы лечения пульпита позволяют выполнить все манипуляции за один приём. Сложные случаи могут потребовать двух визитов и использования лекарства в каналах.':
    'Vairumā gadījumu — jā. Mūsdienīgas pulpīta ārstēšanas metodes ļauj visas manipulācijas veikt vienā vizītē. Sarežģītos gadījumos var būt nepieciešamas divas vizītes un medikamenta ievietošana kanālos.',
  'Сколько времени занимает лечение пульпита?': 'Cik ilgi turpinās pulpīta ārstēšana?',
  'Зависит от сложности (количества каналов). В среднем лечение пульпита в одно посещение занимает около полутора часов.':
    'Atkarīgs no sarežģītības (kanālu skaita). Vidēji pulpīta ārstēšana vienā vizītē aizņem apmēram pusotru stundu.',
  'Почему зуб может болеть после лечения?': 'Kāpēc zobs pēc ārstēšanas var sāpēt?',
  'Незначительная боль при накусывании в течение 2–3 дней — это вариант нормы. Так ткани зуба реагируют на вмешательство. При сильной, пульсирующей или нарастающей боли необходимо обратиться к стоматологу.':
    'Nelielas sāpes uzkožot 2–3 dienu laikā ir normas variants — tā zoba audi reaģē uz iejaukšanos. Stipru, pulsējošu vai pieaugošu sāpju gadījumā jāvēršas pie zobārsta.',
  'Сколько нельзя есть после лечения пульпита?':
    'Cik ilgi pēc pulpīta ārstēšanas nedrīkst ēst?',
  'Около 2–3 часов — пока не закончится действие анестезии, иначе можно прикусить щёку.':
    'Aptuveni 2–3 stundas — kamēr nebeidzas anestēzijas darbība, citādi var iekost vaigā.',

  // ─── pages/WhiteningPage.tsx ───
  'Отбеливание зубов в Юрмале': 'Zobu balināšana Jūrmalā',
  'Безопасное отбеливание зубов в Юрмале системой Fläsh за 135 €: зубы светлее на 6–8 тонов за один визит. Кабинетный и домашний протоколы, показания, этапы и цены клиники RoyalDent.':
    'Droša zobu balināšana Jūrmalā ar Fläsh sistēmu par 135 €: zobi par 6–8 toņiem gaišāki vienā vizītē. Kabineta un mājas protokoli, indikācijas, posmi un RoyalDent klīnikas cenas.',
  'Что делать, если зубы от природы недостаточно белые?':
    'Ko darīt, ja zobi no dabas nav pietiekami balti?',
  'Наша клиника предлагает Вам передовую немецкую технологию бережного отбеливания Fläsh от компании WHITEsmile.':
    'Mūsu klīnika piedāvā modernu Vācijas saudzīgās balināšanas tehnoloģiju Fläsh no uzņēmuma WHITEsmile.',
  'Её основным действующим веществом является пероксид водорода. В состав геля для отбеливания входят зеленые пигменты активного хлорофилла, которые позволяют контролировать индикацию цвета геля под действием лампы.':
    'Tās galvenā darbīgā viela ir ūdeņraža peroksīds. Balināšanas gēla sastāvā ir aktīvā hlorofila zaļie pigmenti, kas ļauj kontrolēt gēla krāsas indikāciju lampas iedarbībā.',
  'Улыбка пациента до и после отбеливания зубов':
    'Pacienta smaids pirms un pēc zobu balināšanas',
  'Отбеливание рекомендуется пациентам с здоровыми зубами и дёснами, которые хотят улучшить цвет эмали и сделать улыбку более светлой и свежей.':
    'Balināšana ieteicama pacientiem ar veseliem zobiem un smaganām, kuri vēlas uzlabot emaljas krāsu un padarīt smaidu gaišāku un svaigāku.',
  'Желтоватый или сероватый оттенок эмали': 'Dzeltenīgs vai pelēcīgs emaljas tonis',
  'Процедура позволяет осветлить естественный цвет зубов, если он кажется недостаточно белым, но при этом структура эмали сохранена.':
    'Procedūra ļauj gaišināt dabisko zobu krāsu, ja tā šķiet nepietiekami balta, taču emaljas struktūra ir saglabāta.',
  'Возрастное потемнение зубов': 'Ar vecumu saistīta zobu tumšāka krāsa',
  'Со временем эмаль теряет яркость, а дентин становится темнее. Отбеливание помогает вернуть зубам более светлый и ухоженный вид.':
    'Laika gaitā emalja zaudē spilgtumu, bet dentīns kļūst tumšāks. Balināšana palīdz atgriezt zobiem gaišāku un koptāku izskatu.',
  'Пигментация от пищевых красителей и табака':
    'Pigmentācija no pārtikas krāsvielām un tabakas',
  'Пятна от кофе, чая, вина, ягод и курения часто не удаётся полностью удалить обычной профессиональной гигиеной. Отбеливание эффективно устраняет такие изменения цвета.':
    'Kafijas, tējas, vīna, ogu un smēķēšanas radītos traipus ar parasto profesionālo higiēnu bieži pilnībā noņemt neizdodas. Balināšana šādas krāsas izmaiņas novērš efektīvi.',
  'Лёгкие формы флюороза или медикаментозной пигментации':
    'Vieglas fluorozes vai medikamentozas pigmentācijas formas',
  'В рамках комплексного эстетического лечения отбеливание может улучшить общий цвет зубов и сделать оттенок более равномерным. Возможность процедуры оценивается индивидуально на консультации.':
    'Kompleksas estētiskās ārstēšanas ietvaros balināšana var uzlabot kopējo zobu krāsu un padarīt toni vienmērīgāku. Procedūras iespējamību izvērtē individuāli konsultācijā.',
  'В ряде ситуаций отбеливание рекомендуется временно отложить или провести после предварительной подготовки. Такой подход позволяет получить прогнозируемый результат и избежать нежелательных ощущений.':
    'Virknē situāciju balināšanu ieteicams uz laiku atlikt vai veikt pēc iepriekšējas sagatavošanas. Šāda pieeja ļauj iegūt prognozējamu rezultātu un izvairīties no nepatīkamām sajūtām.',
  'Воспалительные процессы в полости рта': 'Iekaisuma procesi mutes dobumā',
  'При гингивите, стоматите или других активных воспалениях процедуру переносят. Сначала проводится лечение и стабилизация состояния дёсен и слизистой.':
    'Gingivīta, stomatīta vai citu aktīvu iekaisumu gadījumā procedūru pārceļ. Vispirms veic ārstēšanu un stabilizē smaganu un gļotādas stāvokli.',
  'Выраженная чувствительность зубов': 'Izteikta zobu jutība',
  'При повышенной реакции на холодное, горячее или сладкое отбеливание может усилить дискомфорт. В таких случаях сначала проводится курс реминерализующей терапии, после чего вопрос процедуры пересматривается.':
    'Paaugstinātas reakcijas uz aukstu, karstu vai saldu gadījumā balināšana var pastiprināt diskomfortu. Šādos gadījumos vispirms veic remineralizējošās terapijas kursu, pēc kura procedūras jautājumu izskata atkārtoti.',
  'Этапы кабинетного отбеливания Fläsh': 'Fläsh kabineta balināšanas posmi',
  'Кабинетное отбеливание проводится по чёткому и безопасному протоколу, который позволяет добиться выраженного результата и сохранить здоровье эмали и дёсен.':
    'Kabineta balināšanu veic pēc skaidra un droša protokola, kas ļauj sasniegt izteiktu rezultātu un saglabāt emaljas un smaganu veselību.',
  'Диагностика и подготовка': 'Diagnostika un sagatavošana',
  'Перед процедурой врач осматривает зубы, определяет исходный оттенок по шкале VITA и выполняет фотофиксацию. Обязательный этап — профессиональная гигиена: она удаляет налёт и зубной камень, чтобы отбеливающий гель воздействовал равномерно по всей площади коронки.':
    'Pirms procedūras ārsts apskata zobus, nosaka sākotnējo toni pēc VITA skalas un veic fotofiksāciju. Obligāts posms ir profesionālā higiēna: tā noņem aplikumu un zobakmeni, lai balināšanas gēls iedarbotos vienmērīgi pa visu kroņa laukumu.',
  'Защита дёсен и нанесение геля': 'Smaganu aizsardzība un gēla uzklāšana',
  'Дёсны и мягкие ткани изолируются защитным составом. На поверхность зубов наносится отбеливающий гель (на основе 32% пероксида водорода), который активируется специальной LED-лампой.':
    'Smaganas un mīkstos audus izolē ar aizsargsastāvu. Uz zobu virsmas uzklāj balināšanas gēlu (uz 32 % ūdeņraža peroksīda bāzes), ko aktivizē īpaša LED lampa.',
  'Основной этап отбеливания': 'Galvenais balināšanas posms',
  'Процедура проходит в несколько циклов по 20 минут. После каждого цикла врач оценивает результат и при необходимости обновляет гель, постепенно осветляя эмаль до желаемого оттенка.':
    'Procedūra norit vairākos 20 minūšu ciklos. Pēc katra cikla ārsts izvērtē rezultātu un nepieciešamības gadījumā atjauno gēlu, pakāpeniski gaišinot emalju līdz vēlamajam tonim.',
  'Завершение процедуры и укрепление эмали': 'Procedūras noslēgums un emaljas nostiprināšana',
  'После отбеливания гель удаляется, а на зубы наносится реминерализующий состав с фтором и компонентами, снижающими чувствительность. Врач фиксирует итоговый результат и подробно рассказывает, как сохранить эффект отбеливания.':
    'Pēc balināšanas gēlu noņem, bet uz zobiem uzklāj remineralizējošu sastāvu ar fluoru un jutību mazinošām sastāvdaļām. Ārsts fiksē gala rezultātu un sīki izstāsta, kā saglabāt balināšanas efektu.',
  'Кабинетное отбеливание проводится в клинике лечащим врачом с помощью геля (на основе 32% пероксида водорода с зелеными пигментами активного хлорофилла) и специальной светодиодной лампы, активирующей отбеливающий гель.':
    'Kabineta balināšanu klīnikā veic ārstējošais ārsts ar gēlu (uz 32 % ūdeņraža peroksīda bāzes ar aktīvā hlorofila zaļajiem pigmentiem) un īpašu gaismas diožu lampu, kas aktivizē balināšanas gēlu.',
  'Отбеливание зубов светодиодной лампой в кресле стоматолога':
    'Zobu balināšana ar gaismas diožu lampu zobārsta krēslā',
  'После отбеливания используется укрепляющий гель, который делает процедуру более комфортной.':
    'Pēc balināšanas izmanto nostiprinošu gēlu, kas padara procedūru komfortablāku.',
  'Специальная формула с нитратом калия и фторидом натрия делает зубы крепче, помогает избежать повышенной чувствительности.':
    'Īpaša formula ar kālija nitrātu un nātrija fluorīdu padara zobus izturīgākus un palīdz izvairīties no paaugstinātas jutības.',
  'В клинике для Вас изготовят индивидуальные каппы и дадут рекомендации по проведению отбеливающих процедур':
    'Klīnikā jums izgatavos individuālas kapes un sniegs ieteikumus balināšanas procedūru veikšanai',
  'Система для домашнего отбеливания действует более мягко, чем для кабинетного, за счёт меньшей концентрации пероксида карбамида.':
    'Mājas balināšanas sistēma darbojas maigāk nekā kabineta sistēma, jo karbamīda peroksīda koncentrācija ir zemāka.',
  'Таким методом возможно повысить белизну зубов от 1 до 4 тонов. Кроме того, мы рекомендуем данной системой поддерживать новый тон улыбки после кабинетного отбеливания с целью более длительного поддержания полученного результата.':
    'Ar šo metodi zobu baltumu iespējams uzlabot par 1 līdz 4 toņiem. Turklāt iesakām ar šo sistēmu uzturēt jauno smaida toni pēc kabineta balināšanas, lai iegūtais rezultāts saglabātos ilgāk.',
  'Пациентка надевает каппу для домашнего отбеливания зубов':
    'Paciente uzliek kapi mājas zobu balināšanai',
  'Отбеливание в клинике под LED-лампой за один визит':
    'Balināšana klīnikā ar LED lampu vienā vizītē',
  'Индивидуальные каппы и гель для самостоятельного применения':
    'Individuālas kapes un gēls patstāvīgai lietošanai',
  'Обязательный этап перед отбеливанием: снимает налёт и зубной камень, чтобы гель действовал равномерно':
    'Obligāts posms pirms balināšanas: noņem aplikumu un zobakmeni, lai gēls iedarbotos vienmērīgi',
  'Рекомендации после процедуры отбеливания': 'Ieteikumi pēc balināšanas procedūras',
  'После процедуры необходимо стараться поддерживать «белую диету».':
    'Pēc procedūras jācenšas ievērot «baltā diēta».',
  'Под ограничением:': 'Ierobežojami produkti:',
  'ягоды (строго);': 'ogas (stingri);',
  'кофе;': 'kafija;',
  'вино;': 'vīns;',
  'соки;': 'sulas;',
  'чай;': 'tēja;',
  'лимонады;': 'limonādes;',
  'некоторые овощи (свекла, морковь);': 'daži dārzeņi (bietes, burkāni);',
  'соусы.': 'mērces.',
  'После осветления эмали также рекомендовано поддерживать результат качественной зубной гигиеной. Для этого следует сменить зубную пасту на средства с малым количеством агрессивных абразивов. В состав такой пасты должен входить фтор, чтобы поддерживать состояние зубов и предотвращать развитие гиперчувствительности.':
    'Pēc emaljas gaišināšanas rezultātu ieteicams uzturēt arī ar kvalitatīvu zobu higiēnu. Tāpēc zobu pasta jānomaina pret līdzekli ar mazu agresīvu abrazīvu daudzumu. Šādas pastas sastāvā jābūt fluoram, lai uzturētu zobu stāvokli un novērstu paaugstinātas jutības attīstību.',
  'Цены на отбеливание зубов в Юрмале': 'Zobu balināšanas cenas Jūrmalā',
  'На сколько тонов светлеют зубы после отбеливания Fläsh?':
    'Par cik toņiem zobi kļūst gaišāki pēc Fläsh balināšanas?',
  'Кабинетное отбеливание Fläsh осветляет зубы на 6–8 тонов за один визит. Домашняя система работает мягче — от 1 до 4 тонов, поэтому её чаще используют для поддержания результата.':
    'Fläsh kabineta balināšana zobus gaišina par 6–8 toņiem vienā vizītē. Mājas sistēma darbojas maigāk — par 1 līdz 4 toņiem, tāpēc to biežāk izmanto rezultāta uzturēšanai.',
  'Сколько стоит отбеливание зубов?': 'Cik maksā zobu balināšana?',
  'Кабинетное отбеливание системой Fläsh — 135 €, набор для домашнего отбеливания — 85 €. Дополнительно потребуется профессиональная гигиена: это обязательный подготовительный этап, без него гель подействует неравномерно.':
    'Kabineta balināšana ar Fläsh sistēmu — 135 €, mājas balināšanas komplekts — 85 €. Papildus būs nepieciešama profesionālā higiēna: tas ir obligāts sagatavošanās posms, bez kura gēls iedarbosies nevienmērīgi.',
  'Сколько времени занимает процедура?': 'Cik ilgi turpinās procedūra?',
  'Отбеливание проходит в несколько циклов по 20 минут. К этому добавляется подготовка: осмотр, определение исходного оттенка по шкале VITA, фотофиксация и изоляция дёсен.':
    'Balināšana norit vairākos 20 minūšu ciklos. Tam pievienojas sagatavošana: apskate, sākotnējā toņa noteikšana pēc VITA skalas, fotofiksācija un smaganu izolācija.',
  'Повышается ли чувствительность зубов после отбеливания?':
    'Vai pēc balināšanas paaugstinās zobu jutība?',
  'Чтобы этого избежать, сразу после процедуры на зубы наносится укрепляющий состав с нитратом калия и фторидом натрия. Он делает эмаль крепче и снижает риск повышенной чувствительности.':
    'Lai no tā izvairītos, uzreiz pēc procedūras uz zobiem uzklāj nostiprinošu sastāvu ar kālija nitrātu un nātrija fluorīdu. Tas padara emalju izturīgāku un mazina paaugstinātas jutības risku.',
  'Что нельзя есть и пить после отбеливания?':
    'Ko pēc balināšanas nedrīkst ēst un dzert?',
  'Некоторое время стоит держаться «белой диеты»: под ограничением ягоды, кофе, чай, вино, соки, лимонады, соусы и окрашивающие овощи вроде свёклы и моркови.':
    'Kādu laiku jāievēro «baltā diēta»: ierobežojamas ogas, kafija, tēja, vīns, sulas, limonādes, mērces un krāsojoši dārzeņi, piemēram, bietes un burkāni.',
  'Кому отбеливание не подходит?': 'Kam balināšana nav piemērota?',
  'При активных воспалениях в полости рта — гингивите, стоматите — процедуру переносят до окончания лечения. При выраженной чувствительности зубов сначала проводится курс реминерализующей терапии, и только потом врач возвращается к вопросу отбеливания.':
    'Aktīvu iekaisumu gadījumā mutes dobumā — gingivīts, stomatīts — procedūru pārceļ līdz ārstēšanas beigām. Izteiktas zobu jutības gadījumā vispirms veic remineralizējošās terapijas kursu un tikai pēc tam ārsts atgriežas pie balināšanas jautājuma.',

  // ─── pages/AlignersPage.tsx ───
  'Исправление прикуса прозрачными элайнерами Ordoline в Юрмале от 1200 €. Показания и противопоказания, сравнение с брекетами, цены клиники RoyalDent.':
    'Sakodiena korekcija ar caurspīdīgiem Ordoline elaineriem Jūrmalā no 1200 €. Indikācijas un kontrindikācijas, salīdzinājums ar breketēm, RoyalDent klīnikas cenas.',
  'Показать элайнеры Ordoline': 'Rādīt Ordoline elainerus',
  'Многослойный материал элайнеров Ordoline': 'Ordoline elaineru daudzslāņu materiāls',
  'Улыбка пациента с прозрачными элайнерами': 'Pacienta smaids ar caurspīdīgiem elaineriem',
  'Улыбка пациента с брекет-системой': 'Pacienta smaids ar breketu sistēmu',
  'Прозрачные съёмные элайнеры, разработанные для комфорта и гибкости в повседневной жизни. Они обеспечивают более удобную гигиену полости рта и минимально влияют на привычный образ жизни, однако для достижения эффективности требуют дисциплинированного ношения. В некоторых клинических случаях для обеспечения точных перемещений зубов могут дополнительно использоваться другие ортодонтические методики.':
    'Caurspīdīgi izņemami elaineri, kas radīti ērtībai un elastībai ikdienā. Tie nodrošina ērtāku mutes higiēnu un minimāli ietekmē ierasto dzīvesveidu, taču efektivitātei nepieciešama disciplinēta nēsāšana. Dažos klīniskos gadījumos precīzai zobu pārvietošanai papildus var izmantot citas ortodontiskās metodes.',
  'Несъёмная ортодонтическая система, обеспечивающая постоянный контроль перемещения зубов. Особенно эффективна в сложных клинических случаях, однако может в большей степени влиять на комфорт, эстетику и повседневный образ жизни пациента.':
    'Neizņemama ortodontiskā sistēma, kas nodrošina pastāvīgu zobu pārvietošanas kontroli. Īpaši efektīva sarežģītos klīniskos gadījumos, taču var vairāk ietekmēt pacienta komfortu, estētiku un ikdienas dzīvesveidu.',
  'Почти незаметны во время лечения': 'Ārstēšanas laikā gandrīz nemanāmi',
  'Заметны во время лечения и часто воспринимаются как менее эстетичное решение':
    'Ārstēšanas laikā redzamas un bieži tiek uztvertas kā mazāk estētisks risinājums',
  'Обычно сопровождаются меньшей болью и дискомфортом':
    'Parasti rada mazāk sāpju un diskomforta',
  'Более высокий уровень дискомфорта (до 4 раз выше), особенно после активаций':
    'Augstāks diskomforta līmenis (līdz 4 reizēm lielāks), īpaši pēc aktivācijām',
  'Более удобная гигиена полости рта и до 4 раз меньшее накопление зубного налёта':
    'Ērtāka mutes higiēna un līdz 4 reizēm mazāka aplikuma uzkrāšanās',
  'Более высокий уровень зубного налёта и повышенный риск воспаления дёсен':
    'Augstāks aplikuma līmenis un paaugstināts smaganu iekaisuma risks',
  'Более низкий риск деминерализации эмали': 'Zemāks emaljas demineralizācijas risks',
  'Более высокая частота возникновения очагов деминерализации эмали («белых пятен»)':
    'Biežāka emaljas demineralizācijas perēkļu («balto plankumu») rašanās',
  'Требуется меньше визитов в клинику, меньше внеплановых посещений и меньше времени в кресле':
    'Nepieciešams mazāk vizīšu klīnikā, mazāk neplānotu apmeklējumu un mazāk laika krēslā',
  'Более частые визиты для активаций, более высокая вероятность внеплановых посещений и большее общее время пребывания пациента в кресле':
    'Biežākas vizītes aktivācijām, lielāka neplānotu apmeklējumu iespējamība un vairāk kopējā laika krēslā',
  'Продолжительность лечения сопоставима или короче при лёгких и умеренных случаях':
    'Ārstēšanas ilgums salīdzināms vai īsāks vieglos un mērenos gadījumos',
  'Продолжительность лечения может быть больше в зависимости от сложности клинического случая':
    'Ārstēšanas ilgums var būt lielāks atkarībā no klīniskā gadījuma sarežģītības',
  'Использованная информация взята с сайта ordoline.com':
    'Izmantotā informācija ņemta no vietnes ordoline.com',
  'Элайнеры подходят не каждому клиническому случаю, но при правильном подборе они позволяют аккуратно и предсказуемо изменить положение зубов. Мы рекомендуем носить капы при таких нарушениях, как:':
    'Elaineri ir piemēroti ne katram klīniskajam gadījumam, taču, pareizi izvēloties, tie ļauj precīzi un prognozējami mainīt zobu novietojumu. Iesakām elainerus šādos gadījumos:',
  'Скученность зубов лёгкой и средней степени': 'Viegla un vidēja zobu saspiestība',
  'Когда зубам не хватает места, они «наплывают» друг на друга. Элайнеры мягко и последовательно создают для них необходимое пространство, возвращая каждому зубу правильное положение и выравнивая зубные ряды.':
    'Kad zobiem pietrūkst vietas, tie sablīvējas cits uz cita. Elaineri maigi un pakāpeniski rada tiem nepieciešamo vietu, atgriežot katram zobam pareizo novietojumu un iztaisnojot zobu rindas.',
  'Промежутки между зубами': 'Atstarpes starp zobiem',
  'Элайнеры хорошо справляются с закрытием щелей между зубами, если промежутки не слишком большие и не связаны с патологией уздечки или серьёзными аномалиями прикуса.':
    'Elaineri labi noslēdz atstarpes starp zobiem, ja tās nav pārāk lielas un nav saistītas ar saitītes patoloģiju vai nopietnām sakodiena anomālijām.',
  'Неправильное положение отдельных зубов': 'Atsevišķu zobu nepareizs novietojums',
  'Развороты, небольшие наклоны, смещения вперёд/назад — всё это входит в зону возможностей элайнеров.':
    'Pagriezieni, nelieli slīpumi, nobīdes uz priekšu vai atpakaļ — tas viss ietilpst elaineru iespēju robežās.',
  'Рецидив после ортодонтического лечения': 'Recidīvs pēc ortodontiskās ārstēšanas',
  'Иногда зубы после ношения брекетов со временем снова начинают смещаться. Элайнеры — это комфортный способ вернуть зубам идеальное положение без возврата к несъёмным конструкциям.':
    'Reizēm zobi pēc breketu nēsāšanas laika gaitā atkal sāk nobīdīties. Elaineri ir komfortabls veids, kā atgriezt zobiem ideālu novietojumu, neatgriežoties pie neizņemamām konstrukcijām.',
  'Нарушения прикуса лёгкой степени': 'Viegli sakodiena traucējumi',
  'В отдельных случаях элайнеры могут корректировать неглубокие дистальные и мезиальные смещения, поверхностный открытый прикус, незначительные перекрёстные контакты, но коррекция прикуса капами всегда требует точной диагностики. Средние и тяжёлые формы аномалий прикуса исправляются с помощью брекет-систем и других методик.':
    'Atsevišķos gadījumos elaineri var koriģēt nelielas distālas un meziālas nobīdes, virspusēju atvērtu sakodienu un nelielus krusteniskus kontaktus, taču sakodiena korekcija ar kapēm vienmēr prasa precīzu diagnostiku. Vidējas un smagas sakodiena anomāliju formas koriģē ar breketu sistēmām un citām metodēm.',
  'Как и у любой методики, у элайнеров есть свои ограничения. Большинство противопоказаний — не абсолютные, а относительные. Мы предлагаем другой вариант коррекции прикуса, если есть следующие противопоказания:':
    'Tāpat kā jebkurai metodei, arī elaineriem ir savi ierobežojumi. Lielākā daļa kontrindikāciju nav absolūtas, bet relatīvas. Ja pastāv šādas kontrindikācijas, piedāvājam citu sakodiena korekcijas variantu:',
  'Выраженная патология прикуса': 'Izteikta sakodiena patoloģija',
  'Когда требуются сложные перемещения корней, значительное расширение дуги или коррекция положения челюстей, элайнеры не могут дать предсказуемый результат.':
    'Kad nepieciešama sarežģīta sakņu pārvietošana, būtiska loka paplašināšana vai žokļu novietojuma korekcija, elaineri nevar nodrošināt prognozējamu rezultātu.',
  'Сильные ротации (повороты) зубов и большие вертикальные перемещения':
    'Spēcīgas zobu rotācijas (pagriezieni) un lielas vertikālas pārvietošanas',
  'Элайнеры плохо справляются с вращением зуба вокруг оси и с перемещением вверх/вниз — эти задачи корректнее выполнять брекетами.':
    'Elaineri slikti tiek galā ar zoba griešanu ap asi un pārvietošanu uz augšu vai leju — šos uzdevumus pareizāk risināt ar breketēm.',
  'Отсутствие многих зубов': 'Daudzu zobu trūkums',
  'Для работы кап нужны точки фиксации. Если зубов мало, элайнерам просто не за что удерживаться для перемещения зубов.':
    'Kapju darbībai nepieciešami fiksācijas punkti. Ja zobu ir maz, elaineriem vienkārši nav aiz kā turēties, lai zobus pārvietotu.',
  'Невозможность соблюдать режим ношения': 'Nespēja ievērot nēsāšanas režīmu',
  'Элайнеры работают только при условии, что они находятся во рту 21–22 часа в сутки. Если по образу жизни или привычкам вы понимаете, что носить капы так долго не получится, эффективность лечения будет низкой. В таких случаях ортодонт предложит альтернативу, которая лучше вам подойдёт и даст более надёжный и предсказуемый результат.':
    'Elaineri darbojas tikai tad, ja tie mutē atrodas 21–22 stundas diennaktī. Ja dzīvesveida vai paradumu dēļ saprotat, ka tik ilgi tos nēsāt neizdosies, ārstēšanas efektivitāte būs zema. Šādos gadījumos ortodonts piedāvās alternatīvu, kas jums būs piemērotāka un dos drošāku un prognozējamāku rezultātu.',
  'Цены лечения на элайнерах в Юрмале': 'Ārstēšanas ar elaineriem cenas Jūrmalā',
  'Насколько заметны элайнеры?': 'Cik pamanāmi ir elaineri?',
  'Почти незаметны: капы прозрачные и повторяют форму зубов. Это главное отличие от брекетов, которые видны во время всего лечения и часто воспринимаются как менее эстетичное решение.':
    'Gandrīz nemanāmi: kapes ir caurspīdīgas un atkārto zobu formu. Tā ir galvenā atšķirība no breketēm, kas ir redzamas visas ārstēšanas laikā un bieži tiek uztvertas kā mazāk estētisks risinājums.',
  'Сколько часов в сутки нужно носить элайнеры?':
    'Cik stundas diennaktī jānēsā elaineri?',
  'От 21 до 22 часов. Снимать капы нужно только на время еды и чистки зубов. Если носить их меньше, лечение затягивается, а результат становится непредсказуемым.':
    'No 21 līdz 22 stundām. Kapes jāizņem tikai ēšanas un zobu tīrīšanas laikā. Ja tās nēsā mazāk, ārstēšana ieilgst, bet rezultāts kļūst neprognozējams.',
  'Сколько стоит лечение на элайнерах?': 'Cik maksā ārstēšana ar elaineriem?',
  'От 1200 € за одну челюсть по программе Ordoline Basic. Итоговая сумма зависит от сложности случая и числа челюстей — врач называет её после диагностики и составления плана лечения.':
    'No 1200 € par vienu žokli pēc Ordoline Basic programmas. Gala summa atkarīga no gadījuma sarežģītības un žokļu skaita — ārsts to nosauc pēc diagnostikas un ārstēšanas plāna sastādīšanas.',
  'Можно ли есть и пить с элайнерами?': 'Vai ar elaineriem drīkst ēst un dzert?',
  'Ограничений в питании нет: капы снимают на время еды. В этом одно из преимуществ перед брекетами, с которыми часть продуктов приходится исключать.':
    'Uztura ierobežojumu nav: kapes ēšanas laikā izņem. Tā ir viena no priekšrocībām salīdzinājumā ar breketēm, ar kurām daļa produktu jāizslēdz.',
  'Что происходит после окончания лечения?': 'Kas notiek pēc ārstēšanas beigām?',
  'Чтобы зубы не вернулись в прежнее положение, изготавливается удерживающая капа — она указана в прайсе отдельной позицией.':
    'Lai zobi neatgrieztos iepriekšējā stāvoklī, izgatavo noturošo kapi — tā cenrādī norādīta kā atsevišķa pozīcija.',
  'Элайнеры подходят всем?': 'Vai elaineri ir piemēroti visiem?',
  'Нет. При выраженной патологии прикуса, сильных поворотах зубов, больших вертикальных перемещениях или отсутствии многих зубов ортодонт предложит брекеты или другую методику — так результат будет надёжнее.':
    'Nē. Izteiktas sakodiena patoloģijas, spēcīgu zobu pagriezienu, lielu vertikālu pārvietošanu vai daudzu zobu trūkuma gadījumā ortodonts piedāvās breketes vai citu metodi — tā rezultāts būs drošāks.',

  // ─── pages/AllOn6Page.tsx ───
  'Имплантация All-on-6 в Юрмале: несъёмный протез на шести имплантатах при полном отсутствии зубов. Временный протез в день операции, этапы лечения, уход и цены клиники RoyalDent.':
    'All-on-6 implantācija Jūrmalā: neizņemama protēze uz sešiem implantiem pilnīgas zobu neesamības gadījumā. Pagaidu protēze operācijas dienā, ārstēšanas posmi, kopšana un RoyalDent klīnikas cenas.',
  'Что такое протокол «All-on-6»': 'Kas ir All-on-6 protokols',
  'Когда пациент приходит с полной потерей зубов или ситуацией, когда их уже невозможно сохранить, основной вопрос звучит просто: сделать так, чтобы можно было снова нормально жевать, улыбаться, разговаривать и просто радоваться жизни.':
    'Kad pacients ierodas ar pilnīgu zobu zudumu vai situāciju, kad tos vairs nav iespējams saglabāt, galvenais jautājums ir vienkāršs: panākt, lai atkal varētu normāli košļāt, smaidīt, runāt un vienkārši baudīt dzīvi.',
  'При тотальном протезировании на имплантах самой распространённой методикой является «Все на 4» /':
    'Totālajā protezēšanā uz implantiem visizplatītākā metode ir',
  '. Это рабочее решение, но подходит оно не всегда. Протез на четырёх имплантах обычно восстанавливает зону улыбки и часть жевательных зубов.':
    '. Tas ir darbojošs risinājums, taču ne vienmēr piemērots. Protēze uz četriem implantiem parasti atjauno smaida zonu un daļu košļājamo zobu.',
  'Протокол «Все на 6» / All-on-6 позволяет расширить зубной ряд и лучше распределить нагрузку. Несъёмный протез фиксируется на шести имплантатах, которые становятся опорой для всей конструкции. Дополнительные точки опоры позволяют лучше задействовать боковые зубы, на которые приходится основная нагрузка.':
    'All-on-6 protokols ļauj paplašināt zobu rindu un labāk sadalīt slodzi. Neizņemamo protēzi fiksē uz sešiem implantiem, kas kļūst par balstu visai konstrukcijai. Papildu balsta punkti ļauj labāk iesaistīt sānu zobus, uz kuriem gulstas galvenā slodze.',
  'Этот вариант мы рассматриваем в тех случаях, когда есть возможность сделать протез более стабильным и комфортным в повседневной жизни.':
    'Šo variantu izskatām gadījumos, kad ir iespēja padarīt protēzi stabilāku un ikdienā komfortablāku.',
  'Кому подходит All-on-6': 'Kam piemērots All-on-6',
  'All-on-6 подходит тем, кто хочет без компромиссов вернуть возможность нормально жевать и улыбаться.':
    'All-on-6 ir piemērots tiem, kuri bez kompromisiem vēlas atgūt spēju normāli košļāt un smaidīt.',
  'Мы рассматриваем этот метод, когда четырёх имплантатов может быть недостаточно по нагрузке, а костная ткань позволяет установить большее количество опор.':
    'Šo metodi izskatām, kad četri implanti slodzes ziņā var būt nepietiekami, bet kaulaudi ļauj ievietot lielāku balstu skaitu.',
  'Зубы, которые уже не подлежат сохранению': 'Zobi, kurus vairs nav iespējams saglabāt',
  'Часто к нам приходят пациенты, у которых ещё остаётся часть своих зубов, но они подвижны и разрушены — как правило, на фоне обширного пародонтита. Жевать становится неудобно, появляется неприятный запах и постоянный дискомфорт от воспаления дёсен.':
    'Bieži pie mums ierodas pacienti, kuriem vēl saglabājusies daļa savu zobu, taču tie ir kustīgi un sabrukuši — parasti plaša periodontīta dēļ. Košļāt kļūst neērti, parādās nepatīkama smaka un pastāvīgs diskomforts no smaganu iekaisuma.',
  'Если заболевание длится уже несколько лет, такие зубы чаще всего не получается сохранить. Решиться на удаление последних зубов непросто, но в ряде случаев это единственный рациональный способ решить проблему на долгие годы.':
    'Ja slimība ilgst jau vairākus gadus, šādus zobus visbiežāk saglabāt neizdodas. Izlemt par pēdējo zobu izņemšanu nav viegli, taču virknē gadījumu tas ir vienīgais racionālais veids, kā atrisināt problēmu uz ilgiem gadiem.',
  'и': 'un',
  'позволяют вернуться к нормальной жизни и любимой еде.':
    'ļauj atgriezties normālā dzīvē un pie iemīļotā ēdiena.',
  'Неудобство съёмного протеза': 'Izņemamās protēzes neērtības',
  'Многие пациенты уже пробовали': 'Daudzi pacienti jau ir izmēģinājuši',
  'съёмные конструкции': 'izņemamās konstrukcijas',
  ', но не смогли к ним привыкнуть. Протез может смещаться, натирать или мешать при разговоре. В такой ситуации переход на несъёмный вариант принципиально меняет ощущения в повседневной жизни.':
    ', taču nespēja pie tām pierast. Protēze var nobīdīties, berzt vai traucēt runāt. Šādā situācijā pāreja uz neizņemamu variantu būtiski maina sajūtas ikdienā.',
  'Повышенная жевательная нагрузка': 'Paaugstināta košļāšanas slodze',
  'Сила жевательных мышц у пациентов различается — это зависит от анатомии, привычек и рациона. Если мы понимаем, что четырёх имплантатов в вашем случае может быть недостаточно для надёжной службы протеза, то рассматриваем протокол «Все на 6».':
    'Košļājamo muskuļu spēks pacientiem atšķiras — tas atkarīgs no anatomijas, paradumiem un uztura. Ja saprotam, ka jūsu gadījumā četri implanti protēzes drošai kalpošanai var būt nepietiekami, izskatām All-on-6 protokolu.',
  'Фото работы All-on-6': 'All-on-6 darba fotoattēls',
  'Хирург устанавливает импланты в ходе операции':
    'Ķirurgs ievieto implantus operācijas laikā',
  'Преимущества имплантации «Все на 6»': 'All-on-6 implantācijas priekšrocības',
  'Повседневный комфорт': 'Ikdienas komforts',
  'За счёт большего количества опор нагрузка распределяется более равномерно, и жевать становится проще и привычнее.':
    'Lielāka balstu skaita dēļ slodze sadalās vienmērīgāk, un košļāšana kļūst vienkāršāka un ierastāka.',
  'Нет необходимости «подстраиваться» под протез или избегать определённых продуктов — можно спокойно есть то, к чему вы привыкли.':
    'Nav nepieciešams pielāgoties protēzei vai izvairīties no noteiktiem produktiem — varat mierīgi ēst to, pie kā esat pieradis.',
  'Долговечность и запас прочности': 'Ilgnoturība un izturības rezerve',
  'Протез на шести имплантатах лучше переносит жевательную нагрузку по сравнению с креплением на четырёх опорах, т. к. имеет больший запас прочности. Это снижает риск перегрузки и делает работу конструкции более спокойной в повседневной жизни.':
    'Protēze uz sešiem implantiem košļāšanas slodzi iztur labāk nekā stiprinājums uz četriem balstiem, jo tai ir lielāka izturības rezerve. Tas mazina pārslodzes risku un padara konstrukcijas darbību ikdienā mierīgāku.',
  'При грамотной установке и правильном уходе такой протез служит десятилетия.':
    'Pareizi uzstādīta un kopta šāda protēze kalpo gadu desmitiem.',
  'Сохранение костной ткани': 'Kaulaudu saglabāšana',
  'Жевательная нагрузка распределяется на большее количество опор, за счёт чего в работу включается больший объём костной ткани.':
    'Košļāšanas slodze sadalās uz lielāku balstu skaitu, tādēļ darbā tiek iesaistīts lielāks kaulaudu apjoms.',
  'Это замедляет её дальнейшую атрофию и помогает сохранить стабильность конструкции со временем.':
    'Tas palēnina to turpmāko atrofiju un palīdz laika gaitā saglabāt konstrukcijas stabilitāti.',
  'Больше возможностей при планировании': 'Vairāk iespēju plānošanā',
  'Дополнительные имплантаты дают больше свободы при их расположении. В ряде случаев это позволяет обойти зоны с недостатком кости и избежать дополнительных операций по её наращиванию.':
    'Papildu implanti dod lielāku brīvību to izvietošanā. Virknē gadījumu tas ļauj apiet zonas ar kaula trūkumu un izvairīties no papildu kaula uzbūvēšanas operācijām.',
  'Этапы изготовления протеза на шести имплантах: цифровой макет, фрезерованная конструкция и готовая работа во рту':
    'Protēzes uz sešiem implantiem izgatavošanas posmi: digitālais makets, frēzētā konstrukcija un gatavs darbs mutē',
  'Этапы имплантации и протезирования All-on-6':
    'All-on-6 implantācijas un protezēšanas posmi',
  'Мы оцениваем состояние костной ткани, прикус, нагрузку и общее состояние полости рта. На этом этапе становится понятно, подходит ли вам протокол All-on-6 или есть другое рациональное решение.':
    'Izvērtējam kaulaudu stāvokli, sakodienu, slodzi un mutes dobuma vispārējo stāvokli. Šajā posmā kļūst skaidrs, vai All-on-6 protokols jums ir piemērots, vai ir cits racionālāks risinājums.',
  '3D-модель челюсти с шестью имплантатами и будущим протезом':
    'Žokļa 3D modelis ar sešiem implantiem un topošo protēzi',
  'Создаётся 3D-модель челюстей, продумывается положение имплантатов и будущая конструкция. Мы заранее учитываем, как протез будет работать под жевательной нагрузкой, чтобы избежать перегрузки имплантатов после установки.':
    'Tiek izveidots žokļu 3D modelis, pārdomāts implantu novietojums un topošā konstrukcija. Jau iepriekš ņemam vērā, kā protēze darbosies zem košļāšanas slodzes, lai pēc uzstādīšanas izvairītos no implantu pārslodzes.',
  'Устанавливаются имплантаты, и, в большинстве случаев, в этот же день фиксируется временный протез. Вы уходите уже с зубами — можно аккуратно есть, говорить и не выпадать из привычной жизни.':
    'Tiek ievietoti implanti, un vairumā gadījumu tajā pašā dienā fiksē pagaidu protēzi. Jūs dodaties mājās jau ar zobiem — var uzmanīgi ēst, runāt un neizkrist no ierastās dzīves.',
  'Готовый постоянный протез на шести имплантах в руках техника':
    'Gatava pastāvīgā protēze uz sešiem implantiem zobu tehniķa rokās',
  'После протезирования верхней или нижней челюсти на 6 имплантах не требуется особый уход. Главное — соблюдать несколько правил:':
    'Pēc augšžokļa vai apakšžokļa protezēšanas uz 6 implantiem īpaša kopšana nav nepieciešama. Galvenais — ievērot dažus noteikumus:',
  'Стоимость имплантации и временного протезирования All-on-6':
    'All-on-6 implantācijas un pagaidu protezēšanas izmaksas',
  'Стоимость постоянного протезирования All-on-6':
    'All-on-6 pastāvīgās protezēšanas izmaksas',
  'Чем All-on-6 отличается от All-on-4?': 'Ar ko All-on-6 atšķiras no All-on-4?',
  'Протез опирается не на четыре, а на шесть имплантатов. Дополнительные точки опоры позволяют расширить зубной ряд, лучше задействовать боковые зубы и равномернее распределить жевательную нагрузку — у такой конструкции больший запас прочности.':
    'Protēze balstās nevis uz četriem, bet uz sešiem implantiem. Papildu balsta punkti ļauj paplašināt zobu rindu, labāk iesaistīt sānu zobus un vienmērīgāk sadalīt košļāšanas slodzi — šādai konstrukcijai ir lielāka izturības rezerve.',
  'В большинстве случаев временный протез фиксируется в день установки имплантатов — вы уходите из клиники уже с зубами. Первое время есть нужно аккуратно и соблюдать рекомендации врача по нагрузке.':
    'Vairumā gadījumu pagaidu protēzi fiksē implantu ievietošanas dienā — no klīnikas dodaties jau ar zobiem. Sākumā jāēd uzmanīgi un jāievēro ārsta ieteikumi par slodzi.',
  'Подойдёт ли метод, если свои зубы ещё остались, но они подвижны?':
    'Vai metode ir piemērota, ja savi zobi vēl ir, taču tie ir kustīgi?',
  'Да, это одна из типичных ситуаций. При обширном пародонтите разрушенные и подвижные зубы чаще всего не удаётся сохранить, и их удаление становится частью плана лечения. Решение принимается на консультации после осмотра и КТ.':
    'Jā, tā ir viena no tipiskajām situācijām. Plaša periodontīta gadījumā sabrukušus un kustīgus zobus visbiežāk saglabāt neizdodas, un to izņemšana kļūst par ārstēšanas plāna daļu. Lēmumu pieņem konsultācijā pēc apskates un datortomogrāfijas.',
  'Не всегда. Шесть имплантатов дают больше свободы в их расположении, и в ряде случаев это позволяет обойти зоны с недостатком кости и избежать дополнительной операции по её наращиванию.':
    'Ne vienmēr. Seši implanti dod lielāku brīvību to izvietošanā, un virknē gadījumu tas ļauj apiet zonas ar kaula trūkumu un izvairīties no papildu kaula uzbūvēšanas operācijas.',
  'Как ухаживать за протезом на шести имплантах?':
    'Kā kopt protēzi uz sešiem implantiem?',
  'Особый уход не требуется. Чистить зубы два раза в день, уделяя внимание линии соединения протеза с десной, пользоваться ирригатором, раз в полгода приходить на профессиональную гигиену и профилактический осмотр. Не стоит открывать протезом упаковки и грызть очень твёрдые продукты.':
    'Īpaša kopšana nav nepieciešama. Tīriet zobus divas reizes dienā, pievēršot uzmanību protēzes un smaganas savienojuma līnijai, lietojiet irigatoru, reizi pusgadā apmeklējiet profesionālo higiēnu un profilaktisko apskati. Ar protēzi nevajag atvērt iepakojumus vai grauzt ļoti cietus produktus.',

  // ─── pages/PatientBookingPage.tsx (jāapstiprina klīnikai) ───
  'Правила записи на первичный приём': 'Pieteikšanās noteikumi pirmreizējai vizītei',
  'Порядок записи в стоматологическую клинику RoyalDent в Юрмале: способы записи, документы для первого визита, приём несовершеннолетних, отмена и перенос приёма.':
    'Pieteikšanās kārtība RoyalDent zobārstniecības klīnikā Jūrmalā: pieteikšanās veidi, dokumenti pirmajai vizītei, nepilngadīgo pieņemšana, vizītes atcelšana un pārcelšana.',
  'Порядок обращения и записи в клинику RoyalDent':
    'Vēršanās un pieteikšanās kārtība RoyalDent klīnikā',
  'Порядок обращения и записи на приём в стоматологическую клинику «RoyalDent»':
    'Vēršanās un pieteikšanās kārtība zobārstniecības klīnikā «RoyalDent»',
  'Запись на первичный и повторный приём к специалистам Клиники осуществляется предварительно одним из следующих способов:':
    'Pieteikšanās pirmreizējai un atkārtotai vizītei pie Klīnikas speciālistiem notiek iepriekš kādā no šiem veidiem:',
  'при личном обращении в регистратуру;': 'personīgi vēršoties reģistratūrā;',
  'Медицинские услуги в Клинике оказываются на платной основе. Договоров с Национальной службой здоровья (Nacionālais veselības dienests) и договоров с компаниями частного страхования здоровья Клиника не заключала: оплата производится пациентом напрямую.':
    'Medicīniskie pakalpojumi Klīnikā tiek sniegti par maksu. Klīnika nav noslēgusi līgumus ar Nacionālo veselības dienestu, kā arī līgumus ar privātās veselības apdrošināšanas sabiedrībām: samaksu veic pacients tieši.',
  'Обязанности пациента при записи': 'Pacienta pienākumi, piesakoties vizītei',
  'При записи на приём пациент или его законный представитель обязан сообщить достоверные сведения: имя и фамилию, дату рождения и контактный телефон.':
    'Piesakoties vizītei, pacientam vai viņa likumiskajam pārstāvim ir pienākums sniegt patiesas ziņas: vārdu un uzvārdu, dzimšanas datumu un kontakttālruni.',
  'Сообщённые при записи данные обрабатываются исключительно для организации приёма в соответствии с Регламентом (ЕС) 2016/679 (GDPR) и законом «Об обработке данных физических лиц» (Fizisko personu datu apstrādes likums).':
    'Piesakoties sniegtie dati tiek apstrādāti vienīgi vizītes organizēšanai saskaņā ar Regulu (ES) 2016/679 (VDAR) un Fizisko personu datu apstrādes likumu.',
  'Первичный визит в Клинику': 'Pirmreizējā vizīte Klīnikā',
  'При первом обращении необходимо подойти в регистратуру за 15 минут до начала назначенного приёма.':
    'Pirmajā reizē reģistratūrā jāierodas 15 minūtes pirms noteiktās vizītes sākuma.',
  'При себе необходимо иметь:': 'Līdzi jāņem:',
  'пациентам старше 18 лет — документ, удостоверяющий личность: паспорт, eID-карту или иной действительный документ;':
    'pacientiem, kas vecāki par 18 gadiem, — personu apliecinošs dokuments: pase, eID karte vai cits derīgs dokuments;',
  'результаты предыдущих обследований при их наличии — заключения, снимки, компьютерную томографию.':
    'iepriekšējo izmeklējumu rezultāti, ja tādi ir, — atzinumi, uzņēmumi, datortomogrāfija.',
  'Перед оказанием медицинских услуг пациент или его законный представитель знакомится и подписывает следующие документы:':
    'Pirms medicīnisko pakalpojumu sniegšanas pacients vai viņa likumiskais pārstāvis iepazīstas ar šādiem dokumentiem un tos paraksta:',
  'договор на оказание платных медицинских услуг;':
    'līgums par maksas medicīnisko pakalpojumu sniegšanu;',
  'информированное добровольное согласие на медицинское вмешательство (informētā piekrišana);':
    'informētā brīvprātīgā piekrišana medicīniskajai iejaukšanās (informētā piekrišana);',
  'согласие на обработку персональных данных в соответствии с GDPR;':
    'piekrišana personas datu apstrādei saskaņā ar VDAR;',
  'анкету о состоянии здоровья;': 'veselības stāvokļa anketa;',
  'иные документы, предусмотренные нормативными актами Латвийской Республики.':
    'citi Latvijas Republikas normatīvajos aktos paredzētie dokumenti.',
  'Данные о медицинском обслуживании вносятся в государственную информационную систему здравоохранения «e-veselība» в установленном нормативными актами порядке.':
    'Ziņas par medicīnisko aprūpi tiek ievadītas valsts veselības aprūpes informācijas sistēmā «e-veselība» normatīvajos aktos noteiktajā kārtībā.',
  'Особенности приёма пациентов младше 18 лет':
    'Pacientu, kas jaunāki par 18 gadiem, pieņemšanas īpatnības',
  'Порядок определяется статьёй 13 закона «О правах пациентов» (Pacientu tiesību likums). Несовершеннолетним считается лицо в возрасте до 18 лет.':
    'Kārtību nosaka Pacientu tiesību likuma 13. pants. Par nepilngadīgu uzskatāma persona, kas jaunāka par 18 gadiem.',
  'Первичный приём несовершеннолетнего пациента проводится в сопровождении законного представителя — родителя, усыновителя или опекуна. Для первого приёма необходимы:':
    'Nepilngadīga pacienta pirmreizējā vizīte notiek likumiskā pārstāvja — vecāka, adoptētāja vai aizbildņa — pavadībā. Pirmajai vizītei nepieciešams:',
  'свидетельство о рождении или документ, удостоверяющий личность ребёнка;':
    'bērna dzimšanas apliecība vai personu apliecinošs dokuments;',
  'документ, удостоверяющий личность законного представителя.':
    'likumiskā pārstāvja personu apliecinošs dokuments.',
  'Пациенты младше 14 лет:': 'Pacienti, kas jaunāki par 14 gadiem:',
  'все визиты в Клинику возможны только в сопровождении законного представителя;':
    'visas vizītes Klīnikā iespējamas tikai likumiskā pārstāvja pavadībā;',
  'информированное согласие на лечение даёт законный представитель, он же согласовывает план лечения.':
    'informēto piekrišanu ārstēšanai sniedz likumiskais pārstāvis, viņš arī saskaņo ārstēšanas plānu.',
  'Пациенты в возрасте от 14 лет:': 'Pacienti no 14 gadu vecuma:',
  'лечение допускается при наличии согласия самого несовершеннолетнего пациента;':
    'ārstēšana pieļaujama, ja ir paša nepilngadīgā pacienta piekrišana;',
  'врач оценивает зрелость пациента и его способность дать информированное согласие; при недостаточной зрелости согласие даёт законный представитель;':
    'ārsts izvērtē pacienta briedumu un spēju sniegt informēto piekrišanu; nepietiekama brieduma gadījumā piekrišanu sniedz likumiskais pārstāvis;',
  'первичный приём проводится в присутствии законного представителя, последующие визиты в рамках согласованного плана лечения допускаются без него;':
    'pirmreizējā vizīte notiek likumiskā pārstāvja klātbūtnē, turpmākās vizītes saskaņotā ārstēšanas plāna ietvaros pieļaujamas bez viņa;',
  'несовершеннолетний пациент имеет право быть выслушанным и участвовать в принятии решения о лечении соответственно своему возрасту и зрелости.':
    'nepilngadīgajam pacientam ir tiesības tikt uzklausītam un piedalīties lēmuma pieņemšanā par ārstēšanu atbilstoši savam vecumam un briedumam.',
  'С 16 лет информация о пациенте предоставляется законному представителю только с согласия самого пациента, за исключением случаев, когда врач обоснованно считает, что это может способствовать процессу лечения.':
    'No 16 gadu vecuma informāciju par pacientu likumiskajam pārstāvim sniedz tikai ar paša pacienta piekrišanu, izņemot gadījumus, kad ārsts pamatoti uzskata, ka tas var veicināt ārstēšanas procesu.',
  'Договор и платёжные документы подписывает законный представитель. Пациент младше 18 лет не вправе подписывать их самостоятельно.':
    'Līgumu un maksājuma dokumentus paraksta likumiskais pārstāvis. Pacients, kas jaunāks par 18 gadiem, nav tiesīgs tos parakstīt patstāvīgi.',
  'Отмена, перенос и опоздание': 'Atcelšana, pārcelšana un kavēšanās',
  'При невозможности явиться на приём пациент уведомляет Клинику об отмене или переносе записи не менее чем за 24 часа до назначенного времени.':
    'Ja nav iespējams ierasties uz vizīti, pacients paziņo Klīnikai par atcelšanu vai pārcelšanu ne vēlāk kā 24 stundas pirms noteiktā laika.',
  'Для длительных приёмов и операций, требующих предварительного резервирования времени врача и операционной, при несвоевременной отмене внесённая предоплата может быть удержана в соответствии с условиями договора. Об этом условии пациент информируется заранее, при согласовании плана лечения.':
    'Ilgstošām vizītēm un operācijām, kurām nepieciešama iepriekšēja ārsta laika un operāciju zāles rezervēšana, savlaicīgi neatceļot vizīti, iemaksātā priekšapmaksa var tikt ieturēta saskaņā ar līguma noteikumiem. Par šo nosacījumu pacients tiek informēts iepriekš, saskaņojot ārstēšanas plānu.',
  'При опоздании более чем на 20 минут приём может не состояться либо быть перенесён при наличии свободного времени. Время приёма также может быть сокращено, если это не влияет на качество и безопасность лечения.':
    'Kavējot vairāk nekā 20 minūtes, vizīte var nenotikt vai tikt pārcelta, ja ir brīvs laiks. Vizītes laiks var tikt arī saīsināts, ja tas neietekmē ārstēšanas kvalitāti un drošību.',
  'Прочие важные условия': 'Citi svarīgi noteikumi',
  'Плановая медицинская помощь оказывается согласно времени записи. На приём отводится от 15 до 60 минут, однако фактическая продолжительность консультации или лечения определяется индивидуальными потребностями пациента.':
    'Plānveida medicīniskā palīdzība tiek sniegta atbilstoši pieraksta laikam. Vizītei paredzētas no 15 līdz 60 minūtēm, taču faktisko konsultācijas vai ārstēšanas ilgumu nosaka pacienta individuālās vajadzības.',
  'Объём диагностических и лечебных мероприятий определяет лечащий врач.':
    'Diagnostisko un ārstniecisko pasākumu apjomu nosaka ārstējošais ārsts.',
  'Медицинская документация является собственностью Клиники и хранится в установленном законом порядке. Копии и выписки выдаются на основании письменного заявления пациента в срок, установленный нормативными актами Латвийской Республики.':
    'Medicīniskā dokumentācija ir Klīnikas īpašums un tiek glabāta likumā noteiktajā kārtībā. Kopijas un izraksti tiek izsniegti, pamatojoties uz pacienta rakstisku iesniegumu, Latvijas Republikas normatīvajos aktos noteiktajā termiņā.',
  'В случаях, угрожающих жизни и здоровью, необходимо незамедлительно вызвать неотложную медицинскую помощь по телефону 113 или обратиться по единому номеру экстренных служб 112.':
    'Dzīvībai un veselībai bīstamos gadījumos nekavējoties jāizsauc neatliekamā medicīniskā palīdzība pa tālruni 113 vai jāzvana uz vienoto ārkārtas palīdzības numuru 112.',
};
