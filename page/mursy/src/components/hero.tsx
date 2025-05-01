'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import avatar from '../../public/20240818_115713.jpg'

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      <Image
        src={avatar}
        alt="Background"
        width={1920}
        height={920}
        className="object-cover w-full h-full grayscale mt-"
        priority
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-20"
      >
        <span className="text-red-800 font-bold md:text-3xl  mb-4">Mahmoud Mohamed Morsi</span>
        <h1 className="text-5xl md:text-4xl font-bold tracking-wider mb-12">
          FULLSTACK <br /> DEVELOPER
        </h1>

        <div className=" gap-8 max-w-3xl bg-white items-center content-center flex justify-between p-4 rounded-3xl">
          <div>
            <h2 className="font-medium mb-2">Egypt</h2>
            <p className="text-sm text-gray-600">Aswan, Cairo</p>
          </div>
          <div >
            <h2 className="font-medium mb-2">Remote</h2>
            <p className="text-sm text-gray-600">Worldwide</p>
          </div>
          <div>
            <h2 className="font-medium mb-2">Available</h2>
            <p className="text-sm text-gray-600">For Freelance and Hire</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

