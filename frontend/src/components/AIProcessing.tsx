import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Camera, Lightbulb, Zap } from 'lucide-react'

interface AIProcessingProps {
  stage: 'analyzing' | 'generating' | 'assessing'
  message?: string
}

const AIProcessing: React.FC<AIProcessingProps> = ({ stage, message }) => {
  const getStageConfig = () => {
    switch (stage) {
      case 'analyzing':
        return {
          icon: Brain,
          title: 'AI Photography Expert Analyzing...',
          description: 'Analyzing your product with Google Gemini AI',
          color: 'from-blue-500 to-cyan-500',
          steps: [
            'Detecting product category',
            'Analyzing visual characteristics',
            'Generating optimal scene recommendations'
          ]
        }
      case 'generating':
        return {
          icon: Sparkles,
          title: 'AI Scene Generation in Progress...',
          description: 'Creating professional lifestyle photography',
          color: 'from-purple-500 to-pink-500',
          steps: [
            'Crafting expert photography prompts',
            'Generating scene with Nano Banana',
            'Applying professional composition'
          ]
        }
      case 'assessing':
        return {
          icon: Camera,
          title: 'AI Quality Assessment...',
          description: 'Validating commercial photography standards',
          color: 'from-green-500 to-emerald-500',
          steps: [
            'Evaluating lighting and composition',
            'Assessing commercial viability',
            'Generating improvement suggestions'
          ]
        }
    }
  }

  const config = getStageConfig()
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="card bg-gradient-to-r from-white to-gray-50 border-2 border-primary-200">
        <div className="text-center py-12">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className={`w-20 h-20 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center mx-auto`}>
              <Icon className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className={`absolute -inset-2 bg-gradient-to-r ${config.color} rounded-2xl blur opacity-30 animate-pulse`}></div>
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-primary-200 rounded-full animate-spin">
                <div className="w-3 h-3 bg-primary-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1.5"></div>
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{config.title}</h3>
          <p className="text-gray-600 mb-8">{message || config.description}</p>

          {/* Processing Steps */}
          <div className="space-y-3 max-w-md mx-auto">
            {config.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex items-center space-x-3 text-left"
              >
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm text-gray-700">{step}</span>
              </motion.div>
            ))}
          </div>

          {/* Animated Progress Bar */}
          <div className="mt-8 max-w-xs mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">AI processing in progress...</p>
          </div>

          {/* Tech Stack Badge */}
          <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Google Gemini AI</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Nano Banana</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lightbulb className="w-3 h-3" />
              <span>Professional Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AIProcessing
