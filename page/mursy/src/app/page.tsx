import dynamic from 'next/dynamic'
import Nav from '@/components/nav'
import Hero from '@/components/hero'
import SocialSidebar from '@/components/social-sidebar'

// Dynamically import components that use client-side features
const About = dynamic(() => import('@/components/about'))
const Services = dynamic(() => import('@/components/services'))
const Portfolio = dynamic(() => import('@/components/portfolio'))
const Resume = dynamic(() => import('@/components/resume'))
// const Blog = dynamic(() => import('@/components/blog'))
const Contact = dynamic(() => import('@/components/contact'))
const Testimonials = dynamic(() => import('@/components/testimonials'))
const Achievements = dynamic(() => import('@/components/achievements'))
const SatisfactionStats = dynamic(() => import('@/components/satisfaction-stats'))

export default function Home() {
  return (
    <main>
      <Nav />
      <SocialSidebar />
      <Hero />
      <About />
      <Achievements />
      <SatisfactionStats />
      <Services />
      <Testimonials />
      <Portfolio />
      <Resume />
      {/* <Blog /> */}
      <Contact />
    </main>
  )
}

