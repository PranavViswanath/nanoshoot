import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Sparkles, Download, Camera, Palette, Zap, Brain } from 'lucide-react'
import LandingPage from './components/LandingPage'
import UploadStep from './components/UploadStep'
import ProductDetection from './components/ProductDetection'
import EnhancedGeneration from './components/EnhancedGeneration'
import GeneratedImage from './components/GeneratedImage'
import ConversationalEdit from './components/ConversationalEdit'
import ExportFormats from './components/ExportFormats'

type Step = 'landing' | 'upload' | 'detection' | 'generation' | 'generated' | 'edit' | 'export'

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [detectedProduct, setDetectedProduct] = useState<{type: string, name: string} | null>(null)
  const [selectedScene, setSelectedScene] = useState<string>('')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { id: 'upload', title: 'Upload Product', icon: Upload, color: 'from-blue-500 to-cyan-500' },
    { id: 'detection', title: 'AI Analysis', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'generation', title: 'AI Generation', icon: Sparkles, color: 'from-green-500 to-emerald-500' },
    { id: 'generated', title: 'Result', icon: Camera, color: 'from-indigo-500 to-purple-500' }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header - Only show after landing */}
      {currentStep !== 'landing' && (
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
      )}

      {/* Progress Steps - Only show after landing */}
      {currentStep !== 'landing' && (
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
                  <div className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg` 
                      : isCompleted 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage onGetStarted={() => setCurrentStep('upload')} />
            </motion.div>
          )}

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
                  setCurrentStep('detection')
                }}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {currentStep === 'detection' && (
            <motion.div
              key="detection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetection
                uploadedFile={uploadedFile}
                onProductDetected={(type, name) => {
                  setDetectedProduct({ type, name })
                }}
                onGenerateScene={(scene) => {
                  setSelectedScene(scene)
                  setCurrentStep('generation')
                }}
              />
            </motion.div>
          )}

          {currentStep === 'generation' && detectedProduct && (
            <motion.div
              key="generation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EnhancedGeneration
                productType={detectedProduct.type}
                productName={detectedProduct.name}
                sceneType={selectedScene}
                uploadedFile={uploadedFile}
                onGenerate={(imageUrl) => {
                  console.log('🔍 onGenerate called with imageUrl:', imageUrl)
                  setGeneratedImageUrl(imageUrl)
                  setCurrentStep('generated')
                }}
                onSelect={(scene) => setSelectedScene(scene)}
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
                onBack={() => setCurrentStep('generated')}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}

export default App