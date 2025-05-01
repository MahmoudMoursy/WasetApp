'use client'

import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-2 top-1/2 -translate-y-1/2 p-4 z-40"
    >
      <div className="flex flex-col space-y-6">
        <Link href="/https://www.linkedin.com/in/mahmoud-moursy-443484300/" className="text-gray-800 hover:text-gray-600 transition-colors">
          <Linkedin size={20} />
        </Link>
        
        <div className="h-20 w-px bg-gray-800 mx-auto"></div>
        <span className="vertical-text transform -rotate-90 left-5 text-s font-bold tracking-wider">
          Follow Me
        </span>
      </div>
    </motion.div>
  )
}

