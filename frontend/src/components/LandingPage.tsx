import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Camera, Sparkles, ArrowRight, CheckCircle, X, Zap, Star, Users, Clock, Shield } from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative"
      >
        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-16 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-7xl font-bold gradient-text">
              ProductScene
            </h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl font-semibold text-white mb-6 text-shadow"
          >
            AI-Powered Product Photography
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl text-purple-200/80 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Transform boring product photos into stunning professional lifestyle shots with Google Gemini AI. 
            No photographer needed, no studio required. Just upload and watch the magic happen.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              onClick={onGetStarted}
              className="btn-primary text-xl px-12 py-6 flex items-center space-x-4 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              <span>Start Creating Magic</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <div className="flex items-center space-x-6 text-sm text-purple-200/70">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Google Gemini AI</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Zap className="w-4 h-4" />
                <span>Nano Banana</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: Brain,
            title: "AI Intelligence",
            description: "Advanced Google Gemini AI analyzes your product and creates optimal scenes",
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: Camera,
            title: "Professional Quality",
            description: "Studio-quality lifestyle photography without the studio or photographer",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: Zap,
            title: "Lightning Fast",
            description: "Generate professional shots in seconds, not hours or days",
            color: "from-green-500 to-emerald-500"
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
            className="glass-card text-center group hover:scale-105 transition-all duration-300"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-purple-200/70 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="glass-card"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10x", label: "Faster than traditional photography", icon: Clock },
            { number: "99%", label: "Cost reduction vs studio shoots", icon: Shield },
            { number: "24/7", label: "Available anytime, anywhere", icon: Users },
            { number: "∞", label: "Unlimited variations and styles", icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-purple-300" />
              </div>
              <div className="text-4xl font-bold gradient-text-purple mb-2">{stat.number}</div>
              <div className="text-purple-200/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comparison Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Traditional vs ProductScene</h3>
          <p className="text-purple-200/70 max-w-2xl mx-auto">See the difference AI makes in product photography</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="glass-card border-red-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <X className="w-6 h-6 text-red-400" />
              <h4 className="text-xl font-bold text-red-300">Traditional Photography</h4>
            </div>
            <ul className="space-y-3 text-purple-200/70">
              <li className="flex items-center space-x-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Expensive studio rental</span>
              </li>
              <li className="flex items-center space-x-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Professional photographer fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Days or weeks of planning</span>
              </li>
              <li className="flex items-center space-x-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Limited to one location</span>
              </li>
              <li className="flex items-center space-x-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>High costs for variations</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="glass-card border-green-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h4 className="text-xl font-bold text-green-300">ProductScene AI</h4>
            </div>
            <ul className="space-y-3 text-purple-200/70">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>No studio needed</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>AI photographer included</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Ready in seconds</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Unlimited locations</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Free variations & styles</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="text-center glass-card"
      >
        <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Products?</h3>
        <p className="text-purple-200/70 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses already using AI to create stunning product photography. 
          Start your first generation in seconds.
        </p>
        <motion.button
          onClick={onGetStarted}
          className="btn-primary text-xl px-12 py-6 flex items-center space-x-4 mx-auto group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span>Start Creating Now</span>
          <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default LandingPage