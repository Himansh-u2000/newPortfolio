import { motion } from 'framer-motion';
import { skills } from '../constants/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Technologies I've been working with to build amazing products
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {skills.map((category, index) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariants}
                            className="group"
                        >
                            <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500">
                                {/* Category Title */}
                                <h3 className="text-xl font-medium text-white/90 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                    {category.title}
                                </h3>

                                {/* Skills List */}
                                <motion.div
                                    className="flex flex-wrap gap-3"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {category.skills.map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            variants={skillItemVariants}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 cursor-default"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            <img
                                                src={skill.image}
                                                alt={skill.name}
                                                className="w-5 h-5 object-contain"
                                                loading="lazy"
                                            />
                                            <span className="text-sm text-white/70">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
