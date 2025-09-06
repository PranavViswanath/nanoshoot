import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Sparkles, ArrowRight } from 'lucide-react'

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

  const handleGenerate = async () => {
    if (!selectedScene || !uploadedFile) return

    setIsLoading(true)
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

      // Generate the scene
      const generateResponse = await fetch('/api/generate_scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: uploadData.filename,
          scene_preset: selectedScene,
          product_description: 'product'
        })
      })
      const generateData = await generateResponse.json()

      if (!generateData.success) {
        throw new Error(generateData.error)
      }

      // Set the generated image URL
      onGenerate(`/api/image/${generateData.output_filename}`)
      onSelect(selectedScene)
    } catch (error) {
      console.error('Error generating scene:', error)
      alert('Error generating scene. Please try again.')
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
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect environment for your product. Each scene is professionally designed to showcase your product in the best light.
        </p>
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

      {selectedScene && (
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
                <span>Generating Scene...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>Generate Professional Scene</span>
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
              Creating your professional lifestyle shot with AI...
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SceneSelection
