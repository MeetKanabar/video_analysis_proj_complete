"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  BarChart,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
  ArrowRight,
  Send,
} from "lucide-react";

const HomePage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={ref}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900" />
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute w-[500px] h-[500px] -top-20 -left-20 bg-blue-400 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute w-[600px] h-[600px] top-1/4 right-0 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute w-[400px] h-[400px] bottom-0 left-1/3 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Where AI meets Confident Communication.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Enhance your public speaking skills with AI-powered analysis and
              feedback. Master pronunciation, language, and gain confidence in
              your communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/practice"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  Start Practicing
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/games"
                  className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Games
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          style={{ opacity }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-gray-500 dark:border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Companies Carousel */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              Trusted by organizations worldwide
            </h2>
          </motion.div>

          <motion.div
            className="flex gap-8 md:gap-16 justify-between items-center overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-8 md:gap-16 animate-marquee">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={`/images/company-${i + 1}.png`}
                    alt={`Company ${i + 1}`}
                    className="max-h-full"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-8 md:gap-16 animate-marquee2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={`../assests/company/company-${i + 6}.png`}
                    alt={`Company ${i + 6}`}
                    className="max-h-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Powerful Tools For Your Growth
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides comprehensive features to help you master
              public speaking and communication skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart className="w-8 h-8 text-blue-500" />,
                title: "Progress Tracking",
                description:
                  "Track your improvement over time with detailed analytics and personalized insights.",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-purple-500" />,
                title: "AI Analysis",
                description:
                  "Get detailed analysis of your speaking patterns, tone, and emotions through advanced AI.",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-green-500" />,
                title: "Personalized Feedback",
                description:
                  "Receive actionable feedback tailored to your specific areas for improvement.",
              },
              {
                icon: <Users className="w-8 h-8 text-pink-500" />,
                title: "Interactive Chatbot",
                description:
                  "Practice conversations with our AI chatbot to build confidence in real-world scenarios.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-20 transform scale-150 blur-xl" />
                  <div className="relative">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl transform -rotate-2" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-2 transform rotate-1">
                <img
                  src="/placeholder.svg?height=600&width=400&text=App Screenshot"
                  alt="ConfidentSpeak App"
                  className="w-full rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Why Choose ConfidentSpeak?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Our platform combines cutting-edge AI technology with proven
                  speaking techniques to help you become a confident
                  communicator.
                </p>
              </motion.div>

              {[
                {
                  icon: <Sparkles className="w-6 h-6 text-blue-500" />,
                  title: "AI Speech Analysis",
                  description:
                    "Our advanced algorithms analyze your speech patterns, tone, and emotions to provide detailed insights.",
                },
                {
                  icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
                  title: "Real-time Coaching",
                  description:
                    "Get instant feedback and suggestions to improve your speaking as you practice.",
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-green-500" />,
                  title: "Precision Feedback",
                  description:
                    "Receive specific, actionable feedback on pronunciation, clarity, and fluency.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Global Network
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our community of speakers from around the world who are
              improving their skills every day.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=World Map')] bg-center bg-no-repeat opacity-10 dark:opacity-5"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                {
                  country: "United States",
                  users: "120K+",
                  x: "30%",
                  y: "40%",
                },
                { country: "Australia", users: "45K+", x: "80%", y: "70%" },
                { country: "China", users: "95K+", x: "75%", y: "45%" },
                { country: "Bangladesh", users: "30K+", x: "68%", y: "55%" },
              ].map((location, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {location.country}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {location.users} Users
                  </p>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from people who have transformed their speaking skills using
              our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Marketing Manager",
                image: "/placeholder.svg?height=100&width=100&text=AJ",
                quote:
                  "ConfidentSpeak has completely transformed how I present to clients. My delivery is now more confident and I receive consistent positive feedback.",
              },
              {
                name: "Sarah Williams",
                role: "University Student",
                image: "/placeholder.svg?height=100&width=100&text=SW",
                quote:
                  "As a non-native English speaker, I struggled with pronunciation. The detailed feedback from ConfidentSpeak has improved my speaking clarity significantly.",
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                image: "/placeholder.svg?height=100&width=100&text=MC",
                quote:
                  "The AI analysis pinpointed exactly what I needed to work on. I'm now more comfortable in team meetings and presentations.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="glassmorphism rounded-xl p-6 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-gray-600 dark:text-gray-300 mb-6 relative">
                  <div className="absolute -top-2 -left-2 text-4xl text-blue-400 opacity-30">
                    "
                  </div>
                  <p className="relative z-10">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 transform scale-90 blur-3xl"></div>
              <img
                src="/placeholder.svg?height=400&width=400&text=Newsletter"
                alt="Newsletter"
                className="relative z-10 mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Get Speaking Tips in Your Inbox
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Subscribe to our newsletter and receive weekly tips, exercises,
                and resources to improve your speaking skills.
              </p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  type="submit"
                >
                  Subscribe
                  <Send size={16} />
                </motion.button>
              </form>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
