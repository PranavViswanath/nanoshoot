# 🍌 ProductScene - Nano Banana Hackathon Submission

**Professional Product Photography with AI** - Transform any product photo into stunning lifestyle shots in minutes, not weeks.

## 🎯 The Challenge Solution

ProductScene leverages Nano Banana's unique capabilities to solve the expensive product photography problem:

- **Multi-image scene fusion**: Places products naturally in professional environments
- **Conversational editing**: Iterative refinements without losing context  
- **Professional composition**: Commercial photography quality automatically
- **Marketing-ready exports**: Instagram, stories, banners, hero images

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Demo
```bash
# Test the core system
python demo_workflow.py test

# Run the full 90-second demo
python demo_workflow.py

# Launch the web interface
python web_interface.py
```

### 3. Web Interface
Open http://localhost:5000 for the interactive demo interface.

## 🎬 Demo Flow (90 Seconds)

1. **Product Upload** (15s): Upload any product → Auto-detect category
2. **Scene Generation** (15s): Select environment → Generate professional lifestyle shot  
3. **Conversational Edit** (20s): "Add a skateboard" → Seamless prop addition
4. **Style Refinement** (20s): "Make it vintage" → Color grading with product accuracy
5. **Asset Export** (10s): Download Instagram, story, banner formats
6. **Impact Statement** (10s): "$2,000 photoshoot → 2 minutes"

## 🏗️ System Architecture

### Core Components
- **`product_scene_core.py`** - Main ProductScene generator with scene presets and conversational editing
- **`demo_workflow.py`** - Complete 90-second demonstration script
- **`web_interface.py`** - Flask web app for interactive demonstration
- **`templates/index.html`** - Modern UI mimicking PixShop template approach

### Scene Presets
- **Urban Rooftop**: Modern city skyline with golden hour lighting
- **Coffee Shop**: Warm, inviting café atmosphere  
- **Gym**: Clean, athletic environment
- **Beach**: Relaxed coastal vibes
- **Office**: Professional workspace setting

### Key Features
- **Product Category Detection**: Auto-analyzes uploaded products
- **Professional Prompting**: Commercial photography templates
- **Multi-format Export**: Instagram square, story, hero banner, original
- **Conversational Editing**: Natural language refinements
- **Visual Consistency**: Maintains product accuracy across edits

## 🏆 Hackathon Advantages

### Nano Banana Unique Capabilities
1. **Multi-image Fusion**: Creates photorealistic composites that look like studio shoots
2. **Conversational Editing**: Iterative changes without starting over
3. **Professional Quality**: Commercial photography standards automatically
4. **Brand Safety**: Consistent, marketing-ready outputs

### Market Impact
- **Universal Need**: Every e-commerce business needs lifestyle photography
- **Cost Savings**: Eliminates $2,000+ photoshoot costs
- **Speed Advantage**: Minutes instead of weeks for campaign assets
- **Quality Parity**: Results competing with traditional photography

## 📁 Project Files

```
nanoshoot/
├── product_scene_core.py      # Core ProductScene generator
├── demo_workflow.py           # 90-second demo script  
├── web_interface.py           # Flask web application
├── example_cat_generation.py  # Basic Nano Banana example
├── templates/
│   └── index.html            # Web interface template
├── requirements.txt           # Python dependencies
└── README.md                 # This file
```

## 🔧 Technical Implementation

### API Integration
- Uses Gemini 2.5 Flash Image Preview model
- Implements image understanding for product detection
- Leverages multi-image fusion for scene generation
- Applies conversational editing for refinements

### Web Interface
- Flask-based responsive design
- Drag-and-drop product upload
- Real-time scene generation
- Interactive conversational editing
- Multi-format export system

## 🎯 Judging Criteria Alignment

- **Innovation (40%)**: Novel application of multi-image fusion for product photography
- **Technical Execution (30%)**: Robust API integration with professional prompting
- **Impact (20%)**: Solves real e-commerce photography problem
- **Presentation (10%)**: Clear demo flow with visual proof of concept

## 🚀 Deployment Ready

The system is designed for easy deployment to Cloud Run following the hackathon kit's PixShop template approach. All components are containerized and ready for live demonstration.

---

**Built for the Nano Banana 48-Hour Challenge** - Showcasing the future of AI-powered product photography.
