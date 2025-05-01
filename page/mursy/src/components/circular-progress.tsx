'use client'

import { motion } from 'framer-motion'

interface CircularProgressProps {
  percentage: number
  label: string
}

export default function CircularProgress({ percentage, label }: CircularProgressProps) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        initial={{ rotate: -90 }}
        whileInView={{ rotate: -90 }}
        viewport={{ once: true }}
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#EF4444"
          strokeWidth="4"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.svg>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-4"
      >
        <div className="text-xl font-medium mb-1">{percentage}%</div>
        <div className="text-gray-600 uppercase text-sm tracking-wider">{label}</div>
      </motion.div>
    </div>
  )
}

