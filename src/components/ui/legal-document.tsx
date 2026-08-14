import React from 'react';

export interface Clause {
  /** Номер пункта, например «1.1». */
  n?: string;
  /** Текст пункта (может предварять список). */
  text?: string;
  /** Маркированный список внутри пункта. */
  bullets?: string[];
}

export interface DocumentSection {
  num: string;
  title: string;
  clauses: Clause[];
}

interface LegalDocumentProps {
  /** Подзаголовок-«шапка» документа над первым разделом. */
  heading: string;
  sections: DocumentSection[];
}

/**
 * Вёрстка правового документа: нумерованные разделы, пункты и списки.
 *
 * Вынесена отдельно, потому что у клиники такие документы множатся
 * (правила распорядка, порядок записи, гарантии), а отличаются они только
 * содержанием. Дублировать разметку на каждый — значит чинить отступы
 * и типографику в нескольких местах сразу.
 */
export function LegalDocument({ heading, sections }: LegalDocumentProps) {
  return (
    <article className="max-w-[1000px] mx-auto px-2 md:px-3 mt-10 lg:mt-14 bg-card dark:bg-zinc-900 rounded-3xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_4px_20px_rgb(58,58,58,0.03)] p-6 md:p-12">
      <p className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-50 leading-snug mb-10">
        {heading}
      </p>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.num}>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-5">
              <span className="text-amber-500">{section.num}.</span> {section.title}
            </h2>

            <div className="space-y-5">
              {section.clauses.map((clause, idx) => (
                <div key={clause.n ?? idx}>
                  {clause.text && (
                    <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {clause.n && (
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-1.5">
                          {clause.n}.
                        </span>
                      )}
                      {clause.text}
                    </p>
                  )}
                  {clause.bullets && (
                    <ul className="mt-3 space-y-2 pl-4">
                      {clause.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="relative pl-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber-500"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
