'use client'

import { motion } from 'framer-motion'
import { Smartphone, Globe, Code, Layout } from 'lucide-react'

const services = [
  {
    icon: <Smartphone className="w-12 h-12" />,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications using Flutter and React Native',
  },
  {
    icon: <Globe className="w-12 h-12" />,
    title: 'Web Development',
    description: 'Responsive websites using React.js, HTML, CSS, and JavaScript',
  },
  {
    icon: <Code className="w-12 h-12" />,
    title: 'Backend Development',
    description: 'Server-side solutions using PHP and WordPress',
  },
  {
    icon: <Layout className="w-12 h-12" />,
    title: 'UI/UX Design',
    description: 'Beautiful interfaces with Tailwind CSS and Bootstrap',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Services
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-gray-900 mb-4 inline-block">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

