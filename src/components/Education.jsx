import { motion } from 'framer-motion';
import { education } from '../constants/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function Education() {
    return (
        <section id="education" className="py-24 px-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-4">
                        Education
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        My academic background and qualifications
                    </p>
                </motion.div>

                {/* Education Cards */}
                <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Institution Logo */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 p-3 overflow-hidden group-hover:bg-white/15 transition-colors duration-300">
                                            <img
                                                src={edu.img}
                                                alt={edu.school}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="text-xl font-medium text-white/90">{edu.school}</h3>
                                                <p className="text-sm text-indigo-400">{edu.degree}</p>
                                            </div>
                                            <div className="flex flex-col md:items-end gap-1">
                                                <span className="text-xs text-white/40 tracking-wider uppercase">{edu.date}</span>
                                                <span className="inline-flex px-3 py-1 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                                    {edu.grade}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-white/60 leading-relaxed">
                                            {edu.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
