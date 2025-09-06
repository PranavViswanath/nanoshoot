import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, CheckCircle, Brain } from 'lucide-react'

interface UploadStepProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

const UploadStep: React.FC<UploadStepProps> = ({ onUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        setUploadedFile(file)
        onUpload(file)
      }
    }
  }, [onUpload])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFile(file)
      onUpload(file)
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold gradient-text">
            Upload Your Product
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          Drag and drop your product image or click to browse. Our AI Photography Expert will automatically analyze your product and prepare intelligent scene recommendations.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Google Gemini AI Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Professional Recommendations</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div
          className={`
            relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
            ${dragActive 
              ? 'border-primary-500 bg-primary-50 scale-105' 
              : uploadedFile 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          {uploadedFile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Product Uploaded Successfully!
                </h3>
                <p className="text-green-600">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Category: Auto-detected • Ready for scene generation
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <motion.div
                animate={{ 
                  y: dragActive ? -5 : 0,
                  scale: dragActive ? 1.1 : 1 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Upload className="w-20 h-20 text-gray-400 mx-auto" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {dragActive ? 'Drop your image here' : 'Upload Product Image'}
                </h3>
                <p className="text-gray-500 mb-4">
                  Drag and drop your product photo, or click to browse
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <ImageIcon className="w-4 h-4" />
                  <span>Supports JPG, PNG, WebP up to 10MB</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Ready to generate professional scenes!</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default UploadStep
