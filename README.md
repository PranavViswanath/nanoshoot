# ProductScene - AI-Powered Product Photography

Transform your product photos into professional lifestyle shots using Google Gemini AI and Nano Banana's multi-image scene fusion capabilities.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Backend dependencies
pip install -r requirements.txt

# Frontend dependencies
cd frontend
npm install
```

### 2. Set Up API Key
Update your Google AI API key in `example_cat_generation.py`:
```python
API_KEY = "YOUR_GOOGLE_AI_API_KEY"
```

### 3. Launch the Application
```bash
# Terminal 1: Start Flask backend
python web_interface.py

# Terminal 2: Start React frontend
cd frontend
npm run dev
```
Then open http://localhost:3000 in your browser.

## 🎯 What ProductScene Does

**"One Product, Infinite Scenes"** - Upload any product photo and generate professional lifestyle shots in multiple environments:

- 🏙️ **Urban Rooftop** - Modern city skyline with golden hour lighting
- ☕ **Coffee Shop** - Warm, inviting café atmosphere  
- 💪 **Modern Gym** - Clean, athletic environment
- 🏖️ **Beach Lifestyle** - Relaxed coastal vibes
- 🏢 **Professional Office** - Clean workspace setting

## 🧠 AI Intelligence Features

### Smart Product Detection
- **AI Analysis**: Automatically detects product type (footwear, food, devices)
- **Intelligent Suggestions**: Product-specific scene recommendations
- **Professional Insights**: AI photography expert analysis

### Enhanced Generation Process
- **Product-Specific Updates**: Real-time AI processing feedback
- **Quality Validation**: Commercial photography standards assessment
- **Professional Results**: AI-optimized lighting, composition, and positioning

### Marketing-Focused Landing Page
- **Clear Value Proposition**: Traditional vs ProductScene comparison
- **Professional Branding**: AI-powered photography studio positioning
- **Intuitive Workflow**: Step-by-step guided experience

## 🏗️ Architecture

### Frontend Components
- **LandingPage**: Marketing-focused introduction with value proposition
- **ProductDetection**: AI-powered product analysis and scene suggestions
- **EnhancedGeneration**: Product-specific generation with real-time updates
- **PhotographyInsights**: Comprehensive AI analysis display

### Technology Stack
- **React + TypeScript**: Modern, type-safe frontend
- **Tailwind CSS**: Beautiful, responsive design
- **Framer Motion**: Smooth animations and transitions
- **Google Gemini AI**: Product analysis and scene generation
- **Nano Banana**: Multi-image scene fusion capabilities

## 🎬 User Experience Flow

1. **Landing Page** - Clear value proposition and product comparison
2. **Upload Product** - Drag & drop with AI analysis indicators
3. **AI Detection** - Product type detection with smart scene suggestions
4. **Enhanced Generation** - Product-specific AI processing with real-time updates
5. **Results & Insights** - Professional results with AI quality assessment

## 🏆 Hackathon Advantages

### Technical Innovation
- **AI-to-AI Workflow**: Gemini consulting Gemini for optimal results
- **Product-Specific Intelligence**: Tailored processing for different product types
- **Real-time Feedback**: Live AI processing updates and insights
- **Professional Quality**: Commercial photography standards validation

### User Experience
- **Marketing-Focused**: Clear value proposition and comparison
- **Intuitive Workflow**: Simplified, guided experience
- **Visual Feedback**: Beautiful loading states and progress indicators
- **Educational Value**: Users learn about AI photography expertise

### Business Value
- **Cost Reduction**: No photographer or studio needed
- **Speed**: Instant professional results with AI intelligence
- **Scalability**: Unlimited scenes and variations
- **Professional Quality**: AI-validated commercial standards

## 📁 Project Structure

```
nanoshoot/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── ProductDetection.tsx
│   │   │   ├── EnhancedGeneration.tsx
│   │   │   └── PhotographyInsights.tsx
│   │   └── App.tsx          # Main application
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Build configuration
├── product_scene_core.py    # Core AI orchestration
├── example_cat_generation.py # API setup example
└── requirements.txt         # Python dependencies
```

## 🔧 Configuration

### Environment Variables
```bash
export GOOGLE_AI_API_KEY="your_api_key_here"
```

### Frontend Development
```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
```

## 🚀 Deployment

The application is designed for easy deployment:
- **Frontend**: Deploy to Vercel, Netlify, or any static hosting
- **Backend**: Deploy to Google Cloud Run or similar platform

## 📝 License

MIT License - See LICENSE file for details.

---

**Built for the Nano Banana Hackathon** - Showcasing the power of Google Gemini AI for professional product photography with an intuitive, marketing-focused user experience.