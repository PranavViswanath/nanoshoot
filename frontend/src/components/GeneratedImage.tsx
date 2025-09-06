import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Download, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'

interface GeneratedImageProps {
  imageUrl: string
  onEdit: () => void
  onExport: () => void
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({
  imageUrl,
  onEdit,
  onExport
}) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h2 className="text-4xl font-bold gradient-text">
            Scene Generated!
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your product has been professionally placed in the selected environment. 
          Ready for conversational editing or direct export to marketing formats.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card overflow-hidden">
          <div className="relative">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              src={imageUrl}
              alt="Generated scene"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">AI Generated</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
      >
        <button
          onClick={onEdit}
          className="btn-secondary flex items-center justify-center space-x-3 text-lg px-8 py-4"
        >
          <Palette className="w-6 h-6" />
          <span>Edit & Refine</span>
        </button>
        
        <button
          onClick={onExport}
          className="btn-primary flex items-center justify-center space-x-3 text-lg px-8 py-4"
        >
          <Download className="w-6 h-6" />
          <span>Export Assets</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Professional quality • Marketing ready</span>
        </div>
      </motion.div>
    </div>
  )
}

export default GeneratedImage
