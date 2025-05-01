'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export default function Resume() {
  const experience = [
    {
      year: '2024 - Present',
      title: 'Freelance Developer',
      company: 'Self-employed',
      description: 'Working on various web and mobile projects for clients worldwide.',
    },
  ]

  const education = [
    {
      year: '2024',
      title: 'Software Development Engineering',
      institution: 'ITI',
      description: 'Specialized in Fullstack development and cross-platform mobile applications.',
    },
    {
      year: '2018 - 2022',
      title: 'Bachelor of Arts ',
      institution: 'Aswan University',
      description: 'Studied Geographic Informations System',
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Resume
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-8"></div>
          <button className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Download CV
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Experience</h3>
            <div className="space-y-8">
              {experience?.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">{item.year}</span>
                  <h4 className="text-xl font-bold mt-2">{item.title}</h4>
                  <p className="text-gray-600 font-medium">{item.company}</p>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Education</h3>
            <div className="space-y-8">
              {education?.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">{item.year}</span>
                  <h4 className="text-xl font-bold mt-2">{item.title}</h4>
                  <p className="text-gray-600 font-medium">{item.institution}</p>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

