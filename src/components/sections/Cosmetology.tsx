import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/fade-in';
import { useContactModal } from '../../context/ContactModalContext';

// Заливка подложки. Через CSS-переменную, а не классом на каждой половине:
// тот же цвет нужен градиенту, который скругляет внутренний угол ступеньки, а
// в градиент класс не подставишь. Одно место правки — и половины фигуры не
// могут разъехаться по цвету, иначе на стыке проступит шов.
const PANEL_VAR = '[--panel:#E7E7E7] dark:[--panel:#18181B]';

/**
 * Скругление внутреннего (вогнутого) угла ступеньки. border-radius так не
 * умеет — он срезает угол наружу, а здесь нужно наоборот: квадрат стороной в
 * радиус, у которого вырезана четверть круга со стороны выступа.
 *
 * Круг с центром в левом верхнем углу квадрата: внутри радиуса прозрачно
 * (виден фон секции), дальше — заливка. Дуга выходит касательной и к левой
 * кромке верхней половины, и к верхней кромке нижней, поэтому переход между
 * ними получается гладким. Полпикселя растушёвки — чтобы край не лесенкой.
 */
const INNER_CORNER =
  'radial-gradient(circle at top left, transparent calc(2rem - 0.5px), var(--panel) 2rem)';

/**
 * Блок «Косметология» на главной — по макету заказчика: серая фигура со
 * «ступенькой» слева (верх уже, низ шире) и портрет справа.
 *
 * Фигура — сплошная подложка под всем содержимым, а не две карточки со своим
 * текстом внутри каждой: первая версия так и была собрана, и блок читался как
 * два отдельных куска фона. Здесь подложка вынесена отдельным слоем и разбита
 * по строкам сетки, а текст лежит поверх одним потоком. Строки стыкуются
 * встык, цвет один — шва не видно, а высота «ступеньки» сама подстраивается
 * под высоту имени врача.
 */
export function Cosmetology() {
  const { openModal } = useContactModal();

  return (
    <section
      id="cosmetology"
      className="py-16 lg:py-24 bg-[#EDF0FB] dark:bg-zinc-950 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        {/* Одна FadeIn на всё: с раздельными анимациями половины подложки
            выезжали вразнобой и фигура распадалась на глазах.

            minmax(0,…), а не голые fr: у 1fr минимум равен min-content, и
            колонка с портретом растянулась бы под его собственную ширину,
            сминая текст. */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-4 lg:gap-6 items-stretch">
            {/* ───────── Фигура со всей информацией ───────── */}
            {/* auto_1fr: первая строка по высоте имени врача — она и задаёт
                высоту «ступеньки», остаток забирает вторая. */}
            <div className={`grid grid-cols-1 grid-rows-[auto_1fr] ${PANEL_VAR}`}>
              {/* Подложка. Верхняя половина сдвинута вправо — это и есть
                  выступ; нижняя добирает скругление в наружном левом углу. */}
              <div
                aria-hidden="true"
                className="col-start-1 row-start-1 relative bg-[var(--panel)] rounded-t-[2rem] lg:ml-[20%]"
              >
                {/* Квадрат со стороной в радиус, вплотную слева от выступа и
                    вплотную сверху к стыку половин — ровно тот угол, который
                    нужно скруглить. На телефоне ступеньки нет. */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -left-8 bottom-0 h-8 w-8"
                  style={{ background: INNER_CORNER }}
                />
              </div>
              <div
                aria-hidden="true"
                className="col-start-1 row-start-2 bg-[var(--panel)] rounded-b-[2rem] lg:rounded-tl-[2rem]"
              />

              {/* Имя врача — по центру верхней ступени, как на макете */}
              <div className="col-start-1 row-start-1 relative px-7 pt-8 pb-6 md:px-12 md:pt-12 md:pb-8 lg:ml-[20%] text-center">
                <p className="font-serif text-[1.75rem] md:text-4xl lg:text-[2.5rem] leading-tight tracking-[0.06em] text-zinc-900 dark:text-zinc-50">
                  Елена Якунчихина
                </p>
                <p className="font-serif font-semibold text-xs md:text-sm mt-3 text-zinc-800 dark:text-zinc-300">
                  Врач-косметолог с медицинским образованием
                </p>
              </div>

              {/* Оффер и кнопки идут подряд с постоянным отступом. Прежде тут
                  стоял justify-between, и весь запас высоты строки уходил в
                  разрыв между текстом и кнопками — на десктопе он раздувался
                  до 115px. Высоту фигуры теперь задаёт само содержимое. */}
              <div className="col-start-1 row-start-2 relative px-7 pt-4 pb-7 md:px-12 md:pt-6 md:pb-10 flex flex-col gap-8 md:gap-10">
                <div>
                  <p className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Услуги косметолога в клинике RoyalDent
                  </p>

                  <h2 className="mt-2">
                    <span className="block text-2xl md:text-[1.9rem] font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                      Доверьте красоту опытному врачу:
                    </span>
                    {/* Прописные задаём стилем, а не в тексте: так строки
                        остаются читаемыми в разметке и для скринридера. */}
                    <span className="block uppercase text-2xl md:text-[1.8rem] font-light leading-snug text-zinc-700 dark:text-zinc-300">
                      Вернем гладкость
                    </span>
                    <span className="block uppercase text-2xl md:text-[1.8rem] font-light leading-snug text-zinc-700 dark:text-zinc-300 md:pl-12">
                      и сияние кожи
                    </span>
                  </h2>

                  {/* Подпись прижата вправо, как на макете. */}
                  <p className="mt-8 md:ml-auto max-w-[36ch] italic text-[15px] md:text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Почувствуйте себя комфортно и привлекательно с помощью эффективных
                    процедур по лечению кожи и естественному омоложению
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {/* Тёплый бежевый вместо фирменного amber — так на макете:
                      кнопка стоит на светло-сером, и яркая заливка её пережгла бы. */}
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-sweep rounded-full bg-[#E9B47C] hover:bg-[#DFA469] text-zinc-800 px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg font-medium shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    Записаться на консультацию
                  </button>
                  {/* Отдельной страницы у направления пока нет — «Подробнее»
                      ведёт на карточку самого косметолога. */}
                  <Link
                    to="/doctors/yakunchihina"
                    className="rounded-full bg-zinc-100 hover:bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg font-medium text-center shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>

            {/* ───────── Портрет ─────────
                На десктопе своей высоты у него нет: колонка растягивается по
                строке сетки, то есть ровно по серой фигуре слева. Пропорция и
                потолок высоты нужны только на телефоне, где колонки идут
                друг под другом и портрет иначе занял бы целый экран. */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] max-h-[70svh] lg:aspect-auto lg:max-h-none">
              {/* Абсолютом, а не в потоке: при h-full и неопределённой высоте
                  родителя процент откатывается на auto, и картинка вставала в
                  собственный размер (477×715) — это она, а не текст, задавала
                  высоту строки, и под кнопками копилась пустота. */}
              <img
                src="/images/staff/kosmetolog.webp"
                alt="Елена Якунчихина — врач-косметолог клиники RoyalDent"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
