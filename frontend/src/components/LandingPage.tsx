import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Camera, Sparkles, ArrowRight, CheckCircle, X, Zap } from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
            <Brain className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-6xl font-bold gradient-text">
            ProductScene
          </h1>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          AI-Powered Product Photography in Seconds
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Transform boring product photos into professional lifestyle shots with Google Gemini AI. 
          No photographer needed, no studio required.
        </p>
        
        <motion.button
          onClick={onGetStarted}
          className="btn-primary text-xl px-12 py-4 flex items-center space-x-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-6 h-6" />
          <span>Start Creating</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>

        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Google Gemini AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Nano Banana</span>
          </div>
          <div className="flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Professional Quality</span>
          </div>
        </div>
      </motion.div>

      {/* Creative Director Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200"
      >
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Your In-House Creative Director
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
            ProductScene applies world-class photography principles and creative direction expertise. 
            Every image is crafted using the same best practices and feedback loops that trained 
            award-winning creative directors and commercial photographers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Professional Composition</h4>
                <p className="text-sm text-gray-600">Rule of thirds, leading lines, and visual hierarchy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Brand Consistency</h4>
                <p className="text-sm text-gray-600">Cohesive visual language across all assets</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Creative Intelligence</h4>
                <p className="text-sm text-gray-600">AI trained on millions of successful campaigns</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Traditional vs ProductScene
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional */}
          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center space-x-3 mb-6">
              <X className="w-8 h-8 text-red-500" />
              <h4 className="text-2xl font-bold text-red-800">Traditional Product Shots</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">Expensive photographer & studio rental</span>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">Days or weeks of planning and scheduling</span>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">Limited to one background per session</span>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">No AI insights or optimization</span>
              </div>
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">Static, boring product photos</span>
              </div>
            </div>
          </div>

          {/* ProductScene */}
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h4 className="text-2xl font-bold text-green-800">ProductScene AI</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">Instant AI-powered generation</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">Professional results in under 2 minutes</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">Unlimited scenes and environments</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">AI photography expert insights</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">Dynamic, lifestyle-focused imagery</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-12">
          How It Works
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">📸</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800">1. Upload Product</h4>
            <p className="text-gray-600">Upload any product photo. Our AI instantly analyzes it.</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800">2. AI Analysis</h4>
            <p className="text-gray-600">Google Gemini AI detects your product and suggests optimal scenes.</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800">3. Generate Magic</h4>
            <p className="text-gray-600">Get professional lifestyle shots in seconds with AI quality validation.</p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Product Photos?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of businesses creating professional product imagery with AI.
          </p>
          <motion.button
            onClick={onGetStarted}
            className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Get Started Free</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default LandingPage
