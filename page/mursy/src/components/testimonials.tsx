'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'
import ava from '../../public/3135715.png'
import { Card, CardContent } from '../components/ui/card'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechCorp",
    image: ava,
    rating: 5,
    text: "العمل مع محمود كان تجربة ممتازة. خبرته في تطوير الويب والجوال ساعدتنا في إطلاق منتجنا قبل الجدول الزمني المحدد. الاهتمام بالتفاصيل والالتزام بالجودة كانا رائعين.",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    image: ava,
    rating: 5,
    text: "قدم محمود بالضبط ما كنا نحتاجه. فهمه للتقنيات الحديثة وقدرته على حل المشكلات المعقدة جعلت مشروعنا ناجحًا. التطبيق الجوال الذي طوره تجاوز توقعاتنا.",
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    image: ava,
    rating: 5,
    text: "الموقع الذي أنشأه محمود لنا ليس جميلًا فقط ولكنه أيضًا يعمل بشكل ممتاز. معرفته بـ React وNext.js ظهرت بوضوح في المنتج النهائي. سأعمل معه بالتأكيد مرة أخرى.",
  },
  {
    name: "Ahmed Hassan",
    role: "E-commerce Director",
    image: ava,
    rating: 5,
    text: "عمل ممتاز على منصتنا للتجارة الإلكترونية. خبرة محمود في تطوير الواجهة الأمامية والخلفية ضمنت تجربة تسوق سلسة لعملائنا. أوصي به بشدة!",
  },
  {
    name: "Aisha Ali",
    role: "CTO at InnovateTech",
    image: ava,
    rating: 5,
    text: "خبرة محمود التقنية ومهاراته القيادية كانت محورية في تحسين بنيتنا التحتية لتكنولوجيا المعلومات. حلولها المبتكرة وقدراتها على حل المشكلات جعلتها تبرز.",
  },
  {
    name: "John Smith",
    role: "Digital Marketing Manager",
    image: ava,
    rating: 5,
    text: "العمل مع محمود كان تغييرًا كبيرًا لحملاتنا الرقمية. فهمه العميق لتقنيات الويب وتجربة المستخدم عزز وجودنا على الإنترنت بشكل كبير.",
  },
  {
    name: "Lina El-Sayed",
    role: "Chief Operations Officer",
    image: ava,
    rating: 5,
    text: "عمل محمود على أنظمتنا الخلفية كان استثنائيًا. التزامه بالجودة والكفاءة حسن بشكل كبير تدفقات العمل التشغيلية لدينا.",
  },
  {
    name: "Carlos Martinez",
    role: "UI/UX Designer",
    image: ava,
    rating: 5,
    text: "التعاون مع محمود كان ممتعًا. عينه الفاحصة للتصميم وخبرته التقنية جلبت رؤانا الإبداعية إلى الحياة، مما أسفر عن واجهة مستخدم رائعة.",
  }


]

export default function Testimonials() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Here's what some of my clients have to say about their experiences working with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 italic">
                    "{testimonial.text}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

