import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, Target, Palette, Camera, Star, TrendingUp, CheckCircle } from 'lucide-react'

interface PhotographyInsightsProps {
  insights: any
  onClose: () => void
}

const PhotographyInsights: React.FC<PhotographyInsightsProps> = ({ insights, onClose }) => {
  if (!insights || Object.keys(insights).length === 0) {
    return null
  }

  const getQualityColor = (quality: string) => {
    switch (quality?.toUpperCase()) {
      case 'EXCELLENT': return 'text-green-600 bg-green-100'
      case 'GOOD': return 'text-blue-600 bg-blue-100'
      case 'NEEDS_IMPROVEMENT': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getQualityScore = (score: number) => {
    if (score >= 90) return { color: 'text-green-600', label: 'Excellent' }
    if (score >= 80) return { color: 'text-blue-600', label: 'Good' }
    if (score >= 70) return { color: 'text-orange-600', label: 'Fair' }
    return { color: 'text-red-600', label: 'Needs Work' }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI Photography Insights</h2>
                <p className="text-gray-600">Professional analysis and recommendations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Recommendations */}
            <div className="space-y-6">
              {/* Optimal Scenes */}
              {insights.optimal_scenes && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Camera className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Optimal Scenes</h3>
                  </div>
                  <div className="space-y-3">
                    {insights.optimal_scenes.map((scene: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-primary-50 rounded-lg border border-primary-200"
                      >
                        <div className="font-medium text-primary-800">{scene.scene}</div>
                        <div className="text-sm text-primary-600 mt-1">{scene.reason}</div>
                        <div className="text-xs text-primary-500 mt-1">💡 {scene.lighting}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Composition Rules */}
              {insights.composition_rules && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Composition Rules</h3>
                  </div>
                  <p className="text-gray-700">{insights.composition_rules}</p>
                </div>
              )}

              {/* Props & Context */}
              {insights.props_context && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Props & Context</h3>
                  </div>
                  <p className="text-gray-700">{insights.props_context}</p>
                </div>
              )}
            </div>

            {/* Right Column - Quality & Brand */}
            <div className="space-y-6">
              {/* Quality Assessment */}
              {insights.quality_assessment && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Quality Assessment</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Overall Quality */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Overall Quality</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(insights.quality_assessment.overall_quality)}`}>
                        {insights.quality_assessment.overall_quality}
                      </span>
                    </div>

                    {/* Quality Score */}
                    {insights.quality_assessment.quality_score && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Quality Score</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getQualityScore(insights.quality_assessment.quality_score).color}`}>
                            {insights.quality_assessment.quality_score}/100
                          </span>
                          <span className={`text-sm ${getQualityScore(insights.quality_assessment.quality_score).color}`}>
                            {getQualityScore(insights.quality_assessment.quality_score).label}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Technical Assessment */}
                    {insights.quality_assessment.technical_assessment && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">Technical Details</h4>
                        {Object.entries(insights.quality_assessment.technical_assessment).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="capitalize text-gray-600">{key.replace('_', ' ')}</span>
                            <span className="text-gray-800">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Commercial Viability */}
                    {insights.quality_assessment.commercial_viability && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">Commercial Viability</h4>
                        {Object.entries(insights.quality_assessment.commercial_viability).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="capitalize text-gray-600">{key.replace('_', ' ')}</span>
                            <div className="flex items-center space-x-1">
                              {value ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Strengths */}
                    {insights.quality_assessment.strengths && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-2">
                          {insights.quality_assessment.strengths.map((strength: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Improvement Suggestions */}
                    {insights.quality_assessment.improvement_suggestions && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Improvement Suggestions</h4>
                        <div className="space-y-1">
                          {insights.quality_assessment.improvement_suggestions.map((suggestion: string, index: number) => (
                            <div key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Brand Positioning */}
              {insights.brand_positioning && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Brand Positioning</h3>
                  </div>
                  <p className="text-gray-700">{insights.brand_positioning}</p>
                </div>
              )}

              {/* Target Audience */}
              {insights.target_audience && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Palette className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Target Audience</h3>
                  </div>
                  <p className="text-gray-700">{insights.target_audience}</p>
                </div>
              )}

              {/* Technical Specs */}
              {insights.technical_specs && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <Camera className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-semibold">Technical Specs</h3>
                  </div>
                  <p className="text-gray-700">{insights.technical_specs}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhotographyInsights
