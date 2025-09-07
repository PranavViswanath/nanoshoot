import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowLeft, CheckCircle, Instagram, Monitor, Smartphone, FileImage } from 'lucide-react'

interface ExportFormatsProps {
  imageUrl: string
  onBack: () => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

interface ExportedFile {
  format: string
  filename: string
  url: string
  description: string
  icon: React.ReactNode
}

const ExportFormats: React.FC<ExportFormatsProps> = ({
  imageUrl,
  onBack,
  isLoading,
  setIsLoading
}) => {
  const [exportedFiles, setExportedFiles] = useState<ExportedFile[]>([])
  const [hasExported, setHasExported] = useState(false)

  const formatIcons = {
    instagram_square: <Instagram className="w-6 h-6" />,
    instagram_story: <Smartphone className="w-6 h-6" />,
    hero_banner: <Monitor className="w-6 h-6" />,
    original: <FileImage className="w-6 h-6" />
  }

  const formatDescriptions = {
    instagram_square: "Perfect for Instagram posts and Facebook",
    instagram_story: "Optimized for Instagram and Facebook stories",
    hero_banner: "Website headers and banner advertisements",
    original: "High-resolution original for any use"
  }

  const handleExport = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Extract filename from current image URL
      const currentFilename = imageUrl.split('/').pop()
      
      const response = await fetch('/api/export_formats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          output_filename: currentFilename,
          product_name: 'product'
        })
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error)
      }

      // Convert the exported files to our format
      const files: ExportedFile[] = Object.entries(data.exported_files).map(([format, filename]) => ({
        format: format.replace('_', ' ').toUpperCase(),
        filename: filename as string,
        url: `/api/image/${filename}`,
        description: formatDescriptions[format as keyof typeof formatDescriptions],
        icon: formatIcons[format as keyof typeof formatIcons]
      }))

      setExportedFiles(files)
      setHasExported(true)
    } catch (error) {
      console.error('Error exporting formats:', error)
      alert('Error exporting formats. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">
          Export Marketing Assets
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Download your professional product photography in multiple formats, 
          optimized for different marketing channels and platforms.
        </p>
      </motion.div>

      {!hasExported ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="card text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Ready to Export
                </h3>
                <p className="text-gray-600 mb-6">
                  Generate marketing-ready assets in multiple formats with one click.
                  Perfect for social media, websites, and advertising campaigns.
                </p>
              </div>

              <button
                onClick={handleExport}
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
                    <span>Generating Assets...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    <span>Export All Formats</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Assets Generated Successfully!</span>
            </div>
            <p className="text-gray-600">
              Your marketing assets are ready for download. Each format is optimized for its specific use case.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {exportedFiles.map((file, index) => (
              <motion.div
                key={file.format}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white">
                    {file.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {file.format}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {file.description}
                    </p>
                    
                    <button
                      onClick={() => handleDownload(file.url, file.filename)}
                      className="btn-primary text-sm px-4 py-2 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
      >
        <button
          onClick={onBack}
          className="btn-secondary flex items-center justify-center space-x-3 text-lg px-8 py-4"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back to Editing</span>
        </button>
        
        {hasExported && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Ready for marketing campaigns!</span>
            </div>
          </div>
        )}
      </motion.div>

    </div>
  )
}

export default ExportFormats
