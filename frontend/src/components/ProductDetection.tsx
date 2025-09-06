import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Footprints, Utensils, Smartphone, Sparkles } from 'lucide-react'

interface ProductDetectionProps {
  uploadedFile: File | null
  onProductDetected: (productType: string, productName: string) => void
  onGenerateScene: (sceneType: string) => void
}

const ProductDetection: React.FC<ProductDetectionProps> = ({ 
  uploadedFile, 
  onProductDetected, 
  onGenerateScene 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedProduct, setDetectedProduct] = useState<{type: string, name: string} | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const productTypes = {
    footwear: {
      icon: Footprints,
      name: 'Footwear',
      color: 'from-orange-500 to-red-500',
      suggestions: [
        { scene: 'urban_rooftop', label: 'Urban Lifestyle', description: 'City streets, modern vibes' },
        { scene: 'gym', label: 'Athletic', description: 'Gym, sports, active lifestyle' },
        { scene: 'coffee_shop', label: 'Casual', description: 'Coffee shop, relaxed setting' }
      ]
    },
    food: {
      icon: Utensils,
      name: 'Food & Beverage',
      color: 'from-green-500 to-emerald-500',
      suggestions: [
        { scene: 'coffee_shop', label: 'Café Style', description: 'Coffee shop, cozy atmosphere' },
        { scene: 'office', label: 'Professional', description: 'Office, business setting' },
        { scene: 'beach', label: 'Lifestyle', description: 'Beach, outdoor dining' }
      ]
    },
    devices: {
      icon: Smartphone,
      name: 'Electronics & Devices',
      color: 'from-blue-500 to-cyan-500',
      suggestions: [
        { scene: 'office', label: 'Professional', description: 'Modern office, tech workspace' },
        { scene: 'urban_rooftop', label: 'Modern', description: 'Urban setting, sleek design' },
        { scene: 'coffee_shop', label: 'Lifestyle', description: 'Casual use, everyday scenes' }
      ]
    }
  }

  useEffect(() => {
    if (uploadedFile) {
      analyzeProduct()
    }
  }, [uploadedFile])

  const analyzeProduct = async () => {
    setIsAnalyzing(true)
    
    try {
      const formData = new FormData()
      formData.append('product_image', uploadedFile!)

      // Upload the file first
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadResponse.json()

      if (!uploadData.success) {
        throw new Error(uploadData.error)
      }

      // Get AI product detection
      const detectionResponse = await fetch('/api/detect_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: uploadData.filename
        })
      })
      const detectionData = await detectionResponse.json()

      if (detectionData.success) {
        const productType = detectionData.product_type || 'devices'
        const productName = detectionData.product_name || 'Your Product'
        
        setDetectedProduct({ type: productType, name: productName })
        onProductDetected(productType, productName)
        
        // Show suggestions after a brief delay
        setTimeout(() => setShowSuggestions(true), 1000)
      }
    } catch (error) {
      console.error('Error analyzing product:', error)
      // Fallback to devices
      setDetectedProduct({ type: 'devices', name: 'Your Product' })
      onProductDetected('devices', 'Your Product')
      setTimeout(() => setShowSuggestions(true), 1000)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="text-center py-12">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto">
                <Brain className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Analyzing Your Product...</h3>
            <p className="text-gray-600">Google Gemini AI is detecting your product type and characteristics</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (detectedProduct && showSuggestions) {
    const productInfo = productTypes[detectedProduct.type as keyof typeof productTypes]
    const Icon = productInfo.icon

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Product Detection Result */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-4 shadow-lg border border-gray-200"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${productInfo.color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">Detected: {productInfo.name}</h3>
              <p className="text-gray-600">{detectedProduct.name}</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </motion.div>
        </div>

        {/* Scene Suggestions */}
        <div>
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Choose Your Scene
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productInfo.suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.scene}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => onGenerateScene(suggestion.scene)}
                className="card hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {suggestion.scene === 'urban_rooftop' && '🏙️'}
                    {suggestion.scene === 'gym' && '💪'}
                    {suggestion.scene === 'coffee_shop' && '☕'}
                    {suggestion.scene === 'office' && '🏢'}
                    {suggestion.scene === 'beach' && '🏖️'}
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-1">
                      {suggestion.label}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {suggestion.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-primary-600 group-hover:text-primary-700">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Generate Scene</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}

export default ProductDetection
