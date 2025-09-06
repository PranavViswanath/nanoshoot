import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Camera, Lightbulb, Zap, CheckCircle } from 'lucide-react'

interface EnhancedGenerationProps {
  productType: string
  productName: string
  sceneType: string
  uploadedFile: File | null
  onGenerate: (imageUrl: string, insights: any) => void
  onSelect: (scene: string) => void
}

const EnhancedGeneration: React.FC<EnhancedGenerationProps> = ({
  productType,
  productName,
  sceneType,
  uploadedFile,
  onGenerate,
  onSelect
}) => {
  const [generationStage, setGenerationStage] = useState<'idle' | 'analyzing' | 'generating' | 'assessing' | 'complete'>('idle')
  const [currentUpdate, setCurrentUpdate] = useState('')
  const [photographyInsights, setPhotographyInsights] = useState<any>(null)

  const productSpecificUpdates = {
    footwear: [
      'Analyzing shoe design and materials',
      'Optimizing angle for laces and sole visibility',
      'Ensuring proper color contrast and texture',
      'Positioning for dynamic lifestyle appeal',
      'Applying professional lighting for footwear'
    ],
    food: [
      'Analyzing food presentation and freshness',
      'Optimizing lighting for appetizing appeal',
      'Ensuring proper color saturation',
      'Positioning for mouth-watering composition',
      'Applying professional food photography techniques'
    ],
    devices: [
      'Analyzing device design and features',
      'Optimizing angle for screen and buttons',
      'Ensuring proper reflection and shine',
      'Positioning for modern tech appeal',
      'Applying professional product lighting'
    ]
  }

  const sceneNames = {
    urban_rooftop: 'Urban Rooftop',
    coffee_shop: 'Coffee Shop',
    gym: 'Modern Gym',
    office: 'Professional Office',
    beach: 'Beach Lifestyle'
  }

  const handleGenerate = async () => {
    if (!uploadedFile) return

    setGenerationStage('analyzing')
    const updates = productSpecificUpdates[productType as keyof typeof productSpecificUpdates] || productSpecificUpdates.devices

    try {
      const formData = new FormData()
      formData.append('product_image', uploadedFile)

      // Upload the file first
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadResponse.json()

      if (!uploadData.success) {
        throw new Error(uploadData.error)
      }

      // Show updates during generation
      for (let i = 0; i < updates.length; i++) {
        setCurrentUpdate(updates[i])
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      setGenerationStage('generating')
      setCurrentUpdate('Creating professional lifestyle photography...')

      // Generate the scene with AI consultant
      const generateResponse = await fetch('/api/generate_scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: uploadData.filename,
          scene_preset: sceneType,
          product_description: productName,
          use_ai_consultant: true
        })
      })
      const generateData = await generateResponse.json()

      if (!generateData.success) {
        throw new Error(generateData.error)
      }

      setGenerationStage('assessing')
      setCurrentUpdate('Validating commercial photography quality...')
      await new Promise(resolve => setTimeout(resolve, 1500))

      setGenerationStage('complete')
      setPhotographyInsights(generateData.photography_insights)
      
      setTimeout(() => {
        onGenerate(`/api/image/${generateData.output_filename}`, generateData.photography_insights)
        onSelect(sceneType)
      }, 1000)

    } catch (error) {
      console.error('Error generating scene:', error)
      alert('Error generating scene. Please try again.')
      setGenerationStage('idle')
    }
  }

  if (generationStage === 'idle') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Ready to Generate
            </h3>
            <p className="text-gray-600 mb-6">
              Your {productName} will be placed in a {sceneNames[sceneType as keyof typeof sceneNames]} scene with AI-optimized photography.
            </p>
            <motion.button
              onClick={handleGenerate}
              className="btn-primary text-lg px-8 py-3 flex items-center space-x-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-6 h-6" />
              <span>Generate with AI</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (generationStage === 'complete') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Generation Complete!
            </h3>
            <p className="text-gray-600">
              Your professional {productName} lifestyle shot is ready.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

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
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-primary-200 rounded-full animate-spin">
                <div className="w-3 h-3 bg-primary-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1.5"></div>
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            AI Photography Expert Working...
          </h3>
          <p className="text-gray-600 mb-8">
            Creating professional {productName} lifestyle photography
          </p>

          {/* Current Update */}
          {currentUpdate && (
            <motion.div
              key={currentUpdate}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-sm border border-primary-200">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">{currentUpdate}</span>
              </div>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="max-w-xs mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
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

export default EnhancedGeneration
