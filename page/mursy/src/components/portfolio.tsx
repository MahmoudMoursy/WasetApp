'use client'
import { ExternalLink } from 'lucide-react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import img1 from '../../public//pro.jpg'
import img4 from '../../public/creenshot 2024-12-23 042722.png'
import img5 from '../../public/WhatsApp Image 2024-12-21 at 19.36.29_a6a135a4.jpg'
import img6 from '../../public/WhatsApp Image 2024-12-23 at 03.50.24_2e1c5af2.jpg'
import img7 from '../../public/2024-12-23 at 00.44.12_05adc785.jpg'
import img8 from '../../public/Image 2024-12-23 at 00.58.56_3f3a7fd2.jpg'
import img9 from '../../public/1112024-12-23 at 04.27.23_99a4f3dc.jpg'
import img10 from '../../public/front.png'
const projects = [
  // {
  //   title: 'Mobile App 1',
  //   category: 'Mobile',
  //   image: '/placeholder.svg?height=300&width=400',
  // },
  {
    title: 'Website 1',
    category: 'Web',
    image: img1,
    live: "https://html5-iota-virid.vercel.app/",
  },
  // {
  //   title: 'Mobile App 2',
  //   category: 'Mobile',
  //   image: '/placeholder.svg?height=300&width=400',
  // },
  {
    title: 'Website 2',
    category: 'Web',
    image: img4,
    live: "https://www.youtube.com/watch?v=ocj-7RHx6Tc",
  },
  {
    title: 'Website 3',
    category: 'Web',
    image: img5,
    live: "https://remarkable-cat-f89ece.netlify.app/",
  },
  {
    title: 'Website 4',
    category: 'Web',
    image: img7,
    live: "https://hayatfund.org/",
  },
  {
    title: 'Website 5',
    category: 'Web',
    image: img8,
    live: "https://www.amin.com.sa/",
  },
  {
    title: 'Website 6',
    category: 'Web',
    image: img9,
    live: "https://landing-page-iota-six-97.vercel.app/",
  },
  {
    title: 'Website 7',
    category: 'Web',
    image: img10,
    live: 'https://taskonefront-7qpi.vercel.app/',
  },

  {
    title: 'WordPress Site',
    category: 'WordPress',
    image: img6,
    live: 'https://dev-hatchlings.pantheonsite.io/',
  },
  // {
  //   title: 'Mobile App 3',
  //   category: 'Mobile',
  //   image: '/placeholder.svg?height=300&width=400',
  // },
]
// 'Mobile',
const categories = ['All', 'Web', 'WordPress'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = projects?.filter(
    project => activeCategory === 'All' || project.category === activeCategory
  ) || []

  return (
    <section id="portfolio" className="py-28 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Portfolio
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-8"></div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors ${activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group shadow-2xl p-5 shadow-slate-700  overflow-hidden rounded-2xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110 mb-5"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href={project.live}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-6 h-6 text-black" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

