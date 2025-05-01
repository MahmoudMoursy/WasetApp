'use client'

import { motion } from 'framer-motion'
import CircularProgress from './circular-progress'

const skills = [
  { label: 'HTML5', percentage: 95 },
  { label: 'CSS3', percentage: 97 },
  { label: 'PHP', percentage: 80 },
  { label: 'Javascript', percentage: 90 },
  { label: 'SQL', percentage: 90 },
  { label: 'WORDPRESS', percentage: 90 },
  { label: 'DATABASE', percentage: 90 },
  { label: 'BOOSTRAP', percentage: 95 },
  { label: 'C / C++', percentage: 90 },
]

export default function About() {
  return (
    <section className="py-28  bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg mb-16 leading-relaxed"
          >
            I am a fullstack developer from Egypt, with a strong focus in web and mobile development. I love to get new experiences and
            always learn from my surroundings. I&apos;ve done more than 20 projects. You can check it through portfolio section
            on this website. I looking forward to any opportunities and challenges.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {skills.map((skill) => (
              <CircularProgress
                key={skill.label}
                percentage={skill.percentage}
                label={skill.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

