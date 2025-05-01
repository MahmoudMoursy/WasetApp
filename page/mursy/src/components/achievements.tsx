'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Trophy, Users, Briefcase } from 'lucide-react'

interface CounterProps {
  end: number
  duration: number
  suffix?: string
}

function Counter({ end, duration, suffix = '' }: CounterProps) {
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

const achievements = [
  {
    icon: <Trophy className="w-12 h-12" />,
    number: 20,
    label: 'Projects Completed',
    suffix: '+',
    duration: 1500,
  },
  {
    icon: <Users className="w-12 h-12" />,
    number: 19,
    label: 'Happy Clients',
    suffix: '+',
    duration: 1000,
  },
  {
    icon: <Briefcase className="w-12 h-12" />,
    number: 2,
    label: 'Years Experience',
    suffix: '+',
    duration: 1000,
  },
]

export default function Achievements() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
              scale: 0,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
              ],
              y: [
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
              ],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Achievements
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block mb-4 p-4 rounded-full bg-white/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300"
              >
                {achievement.icon}
              </motion.div>
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <Counter
                  end={achievement.number}
                  duration={achievement.duration}
                  suffix={achievement.suffix}
                />
              </h3>
              <p className="text-gray-400">{achievement.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

