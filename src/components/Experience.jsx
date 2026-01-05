import { motion } from 'framer-motion';
import { experiences } from '../constants/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: (isEven) => ({
        opacity: 0,
        x: isEven ? 50 : -50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#050505] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-4">
                        Experience
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        My professional journey and contributions
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-12"
                    >
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    custom={isEven}
                                    variants={cardVariants}
                                    className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0a0a0a] z-10 hidden md:block" />

                                    {/* Card */}
                                    <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                                        <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                                            {/* Header */}
                                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={exp.img}
                                                        alt={exp.company}
                                                        className="w-full h-full object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className={isEven ? 'md:text-right' : ''}>
                                                    <h3 className="text-lg font-medium text-white/90">{exp.role}</h3>
                                                    <p className="text-sm text-indigo-400">{exp.company}</p>
                                                </div>
                                            </div>

                                            {/* Date */}
                                            <p className="text-xs text-white/40 mb-3 tracking-wider uppercase">{exp.date}</p>

                                            {/* Description */}
                                            <p className={`text-sm text-white/60 leading-relaxed mb-4 ${isEven ? 'md:text-right' : ''}`}>
                                                {exp.desc}
                                            </p>

                                            {/* Skills */}
                                            <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                                                {exp.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-2 py-1 text-xs rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Link */}
                                            {exp.doc && (
                                                <a
                                                    href={exp.doc}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-1 mt-4 text-sm text-white/40 hover:text-indigo-400 transition-colors ${isEven ? 'md:justify-end' : ''}`}
                                                >
                                                    <span>View →</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
