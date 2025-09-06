import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, ArrowLeft, Download, Sparkles, MessageSquare } from 'lucide-react'

interface ConversationalEditProps {
  imageUrl: string
  onImageUpdate: (newImageUrl: string) => void
  onBack: () => void
  onExport: () => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const ConversationalEdit: React.FC<ConversationalEditProps> = ({
  imageUrl,
  onImageUpdate,
  onBack,
  onExport,
  isLoading,
  setIsLoading
}) => {
  const [editRequest, setEditRequest] = useState('')
  const [editHistory, setEditHistory] = useState<string[]>([])

  const handleEdit = async () => {
    if (!editRequest.trim() || isLoading) return

    setIsLoading(true)
    try {
      // Extract filename from current image URL
      const currentFilename = imageUrl.split('/').pop()
      
      const response = await fetch('/api/conversational_edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          output_filename: currentFilename,
          edit_request: editRequest
        })
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error)
      }

      // Update the image URL with the new edited image
      onImageUpdate(`/api/image/${data.output_filename}`)
      setEditHistory(prev => [...prev, editRequest])
      setEditRequest('')
    } catch (error) {
      console.error('Error applying edit:', error)
      alert('Error applying edit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const exampleEdits = [
    "Add a coffee cup next to the product",
    "Make it more vintage with warm colors",
    "Add some plants in the background",
    "Change the lighting to golden hour",
    "Remove any text or labels",
    "Make it feel more luxurious"
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">
          Conversational Editing
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Describe the changes you want to make in natural language. Our AI will understand your intent and apply the edits while maintaining professional quality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Image Display */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="relative">
            <img
              src={imageUrl}
              alt="Current scene"
              className="w-full h-auto rounded-xl shadow-lg"
            />
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"
                  />
                  <p>Applying your edit...</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Edit Interface */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Edit Input */}
          <div className="card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                <h3 className="text-lg font-semibold">Describe Your Edit</h3>
              </div>
              
              <textarea
                value={editRequest}
                onChange={(e) => setEditRequest(e.target.value)}
                placeholder="e.g., 'Add a coffee cup next to it' or 'make it more vintage'"
                className="input-field h-24 resize-none"
                disabled={isLoading}
              />
              
              <button
                onClick={handleEdit}
                disabled={!editRequest.trim() || isLoading}
                className={`
                  btn-primary w-full flex items-center justify-center space-x-2
                  ${(!editRequest.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Applying...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Apply Edit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Example Edits */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Example Edits</h3>
            <div className="space-y-2">
              {exampleEdits.map((example, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  onClick={() => setEditRequest(example)}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200 text-sm"
                  disabled={isLoading}
                >
                  "{example}"
                </motion.button>
              ))}
            </div>
          </div>

          {/* Edit History */}
          {editHistory.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Edit History</h3>
              <div className="space-y-2">
                {editHistory.map((edit, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg text-sm text-green-700">
                    <span className="font-medium">Edit {index + 1}:</span> "{edit}"
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
      >
        <button
          onClick={onBack}
          className="btn-secondary flex items-center justify-center space-x-3 text-lg px-8 py-4"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back to Image</span>
        </button>
        
        <button
          onClick={onExport}
          className="btn-primary flex items-center justify-center space-x-3 text-lg px-8 py-4"
        >
          <Download className="w-6 h-6" />
          <span>Export Assets</span>
        </button>
      </motion.div>
    </div>
  )
}

export default ConversationalEdit
