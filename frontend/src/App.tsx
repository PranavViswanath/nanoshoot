import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Sparkles, Download, Camera, Palette, Zap, Brain, ArrowLeft } from 'lucide-react'
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

  const handleBack = () => {
    const stepOrder = ['landing', 'upload', 'detection', 'generation', 'generated', 'edit', 'export']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1] as any)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
      </div>

      {/* Header - Only show after landing */}
      {currentStep !== 'landing' && (
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-0"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    ProductScene
                  </h1>
                  <p className="text-purple-200/70">AI Photography Studio with Intelligent Analysis</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 text-sm text-purple-200/80">
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Google Gemini AI</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Zap className="w-4 h-4" />
                    <span>Nano Banana</span>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleBack}
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-200 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>
      )}

      {/* Progress Steps - Only show after landing */}
      {currentStep !== 'landing' && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
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
                  <div className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                    isActive 
                      ? `bg-gradient-to-r ${step.color} text-white shadow-2xl` 
                      : isCompleted 
                        ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                        : 'bg-white/10 text-white/60 border border-white/20'
                  }`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 rounded-full ${
                      isCompleted ? 'bg-green-400' : 'bg-white/20'
                    }`} />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <Upload className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-5xl font-bold text-white mb-6">Upload Your Product</h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">Upload a clear photo of your product to get started with AI-powered scene generation</p>
              </div>
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
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <Brain className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-5xl font-bold text-white mb-6">AI Product Analysis</h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">Our AI is analyzing your product and suggesting optimal scenes for professional photography</p>
              </div>
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
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <Camera className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-5xl font-bold text-white mb-6">AI Scene Generation</h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">Creating professional lifestyle photography with advanced AI intelligence</p>
              </div>
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
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.5 }}
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