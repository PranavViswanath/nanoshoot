import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Sparkles, ArrowRight, Brain, Lightbulb } from 'lucide-react'
import AIProcessing from './AIProcessing'

interface ScenePreset {
  name: string
  description: string
}

interface ScenePresets {
  [key: string]: ScenePreset
}

interface SceneSelectionProps {
  scenePresets: ScenePresets
  onSelect: (scene: string) => void
  onGenerate: (imageUrl: string) => void
  uploadedFile: File | null
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const SceneSelection: React.FC<SceneSelectionProps> = ({
  scenePresets,
  onSelect,
  onGenerate,
  uploadedFile,
  isLoading,
  setIsLoading
}) => {
  const [selectedScene, setSelectedScene] = useState<string>('')
  const [aiRecommendations, setAiRecommendations] = useState<any>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [isAnalyzingProduct, setIsAnalyzingProduct] = useState(false)
  const [generationStage, setGenerationStage] = useState<'idle' | 'generating' | 'assessing' | 'complete'>('idle')

  // Get AI recommendations when component mounts
  useEffect(() => {
    if (uploadedFile) {
      getAiRecommendations()
    }
  }, [uploadedFile])

  const getAiRecommendations = async () => {
    if (!uploadedFile) return

    setIsAnalyzingProduct(true)
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

      // Get AI photography recommendations
      const recommendationsResponse = await fetch('/api/get_photography_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: uploadData.filename,
          product_description: 'product'
        })
      })
      const recommendationsData = await recommendationsResponse.json()

      if (recommendationsData.success) {
        setAiRecommendations(recommendationsData.recommendations)
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
    } finally {
      setIsAnalyzingProduct(false)
    }
  }

  const handleGenerate = async () => {
    if (!selectedScene || !uploadedFile) return

    setIsLoading(true)
    setGenerationStage('generating')
    
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

      // Simulate generation stage
      setTimeout(() => setGenerationStage('assessing'), 2000)

      // Generate the scene with AI consultant
      const generateResponse = await fetch('/api/generate_scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: uploadData.filename,
          scene_preset: selectedScene,
          product_description: 'product',
          use_ai_consultant: true
        })
      })
      const generateData = await generateResponse.json()

      if (!generateData.success) {
        throw new Error(generateData.error)
      }

      // Set the generated image URL and insights
      setGenerationStage('complete')
      setTimeout(() => {
        onGenerate(`/api/image/${generateData.output_filename}`)
        onSelect(selectedScene)
      }, 1000)
    } catch (error) {
      console.error('Error generating scene:', error)
      alert('Error generating scene. Please try again.')
      setGenerationStage('idle')
    } finally {
      setIsLoading(false)
    }
  }

  const sceneIcons = {
    urban_rooftop: '🏙️',
    coffee_shop: '☕',
    gym: '💪',
    beach: '🏖️',
    office: '🏢'
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">
          Choose Your Scene
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Select the perfect environment for your product. Each scene is professionally designed to showcase your product in the best light.
        </p>
        
        {/* AI Analysis Loading State */}
        {isAnalyzingProduct && (
          <div className="mb-8">
            <AIProcessing 
              stage="analyzing" 
              message="Analyzing your product to generate optimal photography recommendations"
            />
          </div>
        )}

        {/* AI Recommendations Banner */}
        {aiRecommendations && !isAnalyzingProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">✨ AI Photography Expert Analysis</h3>
                    <p className="text-sm text-gray-600">Professional recommendations powered by Google Gemini</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRecommendations(!showRecommendations)}
                  className="btn-secondary text-sm px-4 py-2 flex items-center space-x-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{showRecommendations ? 'Hide' : 'View'} Insights</span>
                </button>
              </div>
              
              {showRecommendations && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-primary-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiRecommendations.optimal_scenes?.slice(0, 3).map((scene: any, index: number) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-white rounded-lg border border-primary-200 hover:shadow-md transition-shadow"
                      >
                        <div className="font-medium text-primary-800 text-sm">{scene.scene}</div>
                        <div className="text-xs text-primary-600 mt-1">{scene.reason}</div>
                        <div className="text-xs text-primary-500 mt-1 flex items-center">
                          <span className="w-1 h-1 bg-primary-400 rounded-full mr-1"></span>
                          {scene.lighting}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {aiRecommendations.composition_rules && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 p-3 bg-white rounded-lg border border-primary-200"
                    >
                      <div className="text-sm font-medium text-gray-800 mb-1 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-primary-500" />
                        Composition Advice
                      </div>
                      <div className="text-xs text-gray-600">{aiRecommendations.composition_rules}</div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {Object.entries(scenePresets).map(([key, preset], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              card cursor-pointer transition-all duration-300 group
              ${selectedScene === key 
                ? 'ring-2 ring-primary-500 bg-primary-50 scale-105' 
                : 'hover:scale-105 hover:shadow-2xl'
              }
            `}
            onClick={() => setSelectedScene(key)}
          >
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {sceneIcons[key as keyof typeof sceneIcons]}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {preset.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {preset.description}
              </p>
              {selectedScene === key && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center space-x-2 text-primary-600"
                >
                  <Camera className="w-5 h-5" />
                  <span className="font-medium">Selected</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Processing States */}
      {generationStage === 'generating' && (
        <div className="mb-8">
          <AIProcessing 
            stage="generating" 
            message="Creating your professional lifestyle photography with AI"
          />
        </div>
      )}

      {generationStage === 'assessing' && (
        <div className="mb-8">
          <AIProcessing 
            stage="assessing" 
            message="Validating commercial photography quality standards"
          />
        </div>
      )}

      {selectedScene && generationStage === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`
              btn-primary text-lg px-8 py-4 flex items-center space-x-3 mx-auto
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
                <span>AI Processing...</span>
              </>
            ) : (
              <>
                <Brain className="w-6 h-6" />
                <span>Generate with AI Intelligence</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {isLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 mt-4"
            >
              AI Photography Expert creating your professional lifestyle shot...
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SceneSelection
