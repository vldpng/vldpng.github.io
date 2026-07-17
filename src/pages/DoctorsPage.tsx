import React, { useEffect } from 'react';
import { doctorsData } from '../data/doctors';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { BlackPlaceholder } from '../components/ui/Placeholder';
import { Seo } from '../components/Seo';
import { PageBanner } from '../components/ui/page-banner';

export function DoctorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 font-sans text-zinc-900 dark:text-zinc-100 selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-100 flex flex-col">
      <Seo
        title="Наши врачи"
        description="Команда стоматологов клиники RoyalDent в Юрмале: хирурги-имплантологи, ортопеды, ортодонты и эндодонтисты с многолетним опытом."
        path="/doctors"
      />
      <main className="flex-grow">
        <section className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-2 md:px-3">
            <div className="mb-16">
              <PageBanner breadcrumb="Наши врачи" title="Наша команда" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lead text-zinc-600 dark:text-zinc-400 max-w-2xl mt-8"
              >
                Команда профессионалов со стажем и перфекционистским подходом к каждой детали вашего лечения.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctorsData.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all flex flex-col"
                >
                  <Link to={`/doctors/${doctor.id}`} className="block relative aspect-[4/5] overflow-hidden">
                    {doctor.photoUrl ? (
                      <img src={doctor.photoUrl} alt={doctor.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-6 text-center text-sm text-zinc-400 group-hover:scale-105 transition-transform duration-700">
                        <BlackPlaceholder label={doctor.photoLabel} className="w-full h-full rounded-2xl" />
                      </div>
                    )}
                  </Link>

                  <div className="p-8 flex-grow flex flex-col">
                    <div className="mb-4">
                      <h3 className="h-card mb-1 group-hover:text-amber-500 transition-colors">
                        <Link to={`/doctors/${doctor.id}`}>{doctor.name}</Link>
                      </h3>
                      <p className="eyebrow text-zinc-500 mt-1">{doctor.specialty}</p>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 flex-grow line-clamp-3">
                      {doctor.bio}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      {doctor.experience ? (
                        <span className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                          <Calendar size={12} />
                          Опыт {doctor.experience}
                        </span>
                      ) : (
                        <span />
                      )}
                      <Link
                        to={`/doctors/${doctor.id}`}
                        className="text-amber-500 hover:text-amber-600 transition-colors bg-amber-50 dark:bg-amber-500/10 p-2.5 rounded-full"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
