'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

const posts = [
  {
    title: 'The Future of Mobile Development',
    excerpt: 'Exploring the latest trends in mobile app development and what to expect in the coming years.',
    date: 'Dec 20, 2023',
    author: 'Mahmoud Morsi',
    image: '/placeholder.svg?height=300&width=400',
    slug: 'future-of-mobile-development',
  },
  {
    title: 'Building Modern Web Applications',
    excerpt: 'A comprehensive guide to building web applications using React and Next.js.',
    date: 'Dec 15, 2023',
    author: 'Mahmoud Morsi',
    image: '/placeholder.svg?height=300&width=400',
    slug: 'building-modern-web-applications',
  },
  {
    title: 'Cross-Platform Development Tips',
    excerpt: 'Best practices and tips for developing cross-platform applications using Flutter.',
    date: 'Dec 10, 2023',
    author: 'Mahmoud Morsi',
    image: '/placeholder.svg?height=300&width=400',
    slug: 'cross-platform-development-tips',
  },
]

export default function Blog() {
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
            Latest Blog Posts
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-gray-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

