'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Heart, ThumbsUp, Award, Star } from 'lucide-react'

interface StatCounterProps {
  end: number
  duration: number
  suffix?: string
}

function StatCounter({ end, duration, suffix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    if (isInView) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime

        const percentage = Math.min(progress / duration, 1)
        setCount(Math.floor(end * percentage))

        if (progress < duration) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isInView])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  {
    icon: <Heart className="w-8 h-8" />,
    number: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Of our clients are happy with our work',
  },
  {
    icon: <ThumbsUp className="w-8 h-8" />,
    number: 95,
    suffix: '%',
    label: 'Positive Feedback',
    description: 'Positive reviews from our clients',
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: 92,
    suffix: '%',
    label: 'Project Success Rate',
    description: 'Projects completed successfully',
  },
  {
    icon: <Star className="w-8 h-8" />,
    number: 4.9,
    suffix: '/5',
    label: 'Average Rating',
    description: 'Average client rating score',
  },
]



export default function SatisfactionStats() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Client Satisfaction
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our commitment to excellence is reflected in our client satisfaction rates
            and positive recommendations.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  <StatCounter
                    end={stat.number}
                    duration={2000}
                    suffix={stat.suffix}
                  />
                </h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </h4>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

