import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Sparkles, Download, Camera, Palette, Zap, Brain } from 'lucide-react'
import UploadStep from './components/UploadStep'
import SceneSelection from './components/SceneSelection'
import GeneratedImage from './components/GeneratedImage'
import ConversationalEdit from './components/ConversationalEdit'
import ExportFormats from './components/ExportFormats'
import PhotographyInsights from './components/PhotographyInsights'

interface ScenePreset {
  name: string
  description: string
}

interface ScenePresets {
  [key: string]: ScenePreset
}

const scenePresets: ScenePresets = {
  urban_rooftop: {
    name: "Urban Rooftop Sunset",
    description: "Modern city skyline with golden hour lighting"
  },
  coffee_shop: {
    name: "Cozy Coffee Shop", 
    description: "Warm, inviting café atmosphere"
  },
  gym: {
    name: "Modern Gym",
    description: "Clean, athletic environment"
  },
  beach: {
    name: "Beach Lifestyle",
    description: "Relaxed coastal vibes"
  },
  office: {
    name: "Modern Office",
    description: "Professional workspace setting"
  }
}

type Step = 'upload' | 'scene' | 'generated' | 'edit' | 'export'

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedScene, setSelectedScene] = useState<string>('')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('')
  const [photographyInsights, setPhotographyInsights] = useState<any>(null)
  const [showInsights, setShowInsights] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { id: 'upload', title: 'Upload Product', icon: Upload, color: 'from-blue-500 to-cyan-500' },
    { id: 'scene', title: 'AI Scene Analysis', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'generated', title: 'AI Generated Image', icon: Sparkles, color: 'from-green-500 to-emerald-500' },
    { id: 'edit', title: 'AI Edit & Refine', icon: Palette, color: 'from-orange-500 to-red-500' },
    { id: 'export', title: 'Export Assets', icon: Download, color: 'from-indigo-500 to-purple-500' }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">ProductScene</h1>
                <p className="text-gray-600">AI Photography Studio with Intelligent Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Google Gemini AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Nano Banana</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110` : 
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UploadStep 
                  onUpload={(file) => {
                    setUploadedFile(file)
                    setCurrentStep('scene')
                  }}
                  isLoading={isLoading}
                />
              </motion.div>
            )}

            {currentStep === 'scene' && (
              <motion.div
                key="scene"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SceneSelection
                  scenePresets={scenePresets}
                  onSelect={(scene) => {
                    setSelectedScene(scene)
                    setCurrentStep('generated')
                  }}
                  onGenerate={(imageUrl, insights) => {
                    setGeneratedImageUrl(imageUrl)
                    setPhotographyInsights(insights)
                    setCurrentStep('generated')
                  }}
                  uploadedFile={uploadedFile}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </motion.div>
            )}

            {currentStep === 'generated' && (
              <motion.div
                key="generated"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GeneratedImage
                  imageUrl={generatedImageUrl}
                  onEdit={() => setCurrentStep('edit')}
                  onExport={() => setCurrentStep('export')}
                  onShowInsights={() => setShowInsights(true)}
                  photographyInsights={photographyInsights}
                />
              </motion.div>
            )}

            {currentStep === 'edit' && (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ConversationalEdit
                  imageUrl={generatedImageUrl}
                  onImageUpdate={setGeneratedImageUrl}
                  onBack={() => setCurrentStep('generated')}
                  onExport={() => setCurrentStep('export')}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </motion.div>
            )}

            {currentStep === 'export' && (
              <motion.div
                key="export"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExportFormats
                  imageUrl={generatedImageUrl}
                  onBack={() => setCurrentStep('edit')}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Photography Insights Modal */}
      {showInsights && (
        <PhotographyInsights
          insights={photographyInsights}
          onClose={() => setShowInsights(false)}
        />
      )}
    </div>
  )
}

export default App

