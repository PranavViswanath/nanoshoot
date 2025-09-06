# 🚀 ProductScene Deployment Guide

## Quick Demo Setup

### 1. Local Testing
```bash
# Install dependencies
pip install -r requirements.txt

# Test core functionality
python demo_workflow.py test

# Run full demo
python demo_workflow.py

# Launch web interface
python web_interface.py
```

### 2. Web Interface Demo
- Open http://localhost:5000
- Upload any product image
- Select scene preset
- Generate professional lifestyle shot
- Apply conversational edits
- Export marketing formats

## Cloud Run Deployment (Hackathon Ready)

### 1. Create Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["python", "web_interface.py"]
```

### 2. Deploy to Cloud Run
```bash
# Build and deploy
gcloud run deploy productscene \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

### 3. Environment Variables
Set your API key as an environment variable:
```bash
gcloud run services update productscene \
  --set-env-vars GEMINI_API_KEY=your_key_here
```

## Demo Script for Judges

### 90-Second Presentation Flow
1. **Problem Statement** (10s): "Product photography costs $2,000+ and takes weeks"
2. **Solution Demo** (60s): Upload → Generate → Edit → Export
3. **Impact Statement** (20s): "This replaces expensive photoshoots in minutes"

### Key Talking Points
- **Multi-image Fusion**: Nano Banana's unique capability for photorealistic composites
- **Conversational Editing**: Iterative refinements without losing context
- **Professional Quality**: Commercial photography standards automatically
- **Market Impact**: Universal need for e-commerce businesses

### Technical Highlights
- Uses Gemini 2.5 Flash Image Preview model
- Implements image understanding for product detection
- Professional prompting templates for commercial photography
- Multi-format export for marketing campaigns

## Backup Demo Options

### Option 1: Command Line Demo
```bash
python demo_workflow.py
```
Shows complete workflow with timing and impact statements.

### Option 2: Web Interface
```bash
python web_interface.py
```
Interactive demo with drag-and-drop interface.

### Option 3: Core System Test
```bash
python demo_workflow.py test
```
Quick verification that API integration works.

## Troubleshooting

### API Key Issues
- Ensure API key is valid and has quota remaining
- Check that model "gemini-2.5-flash-image-preview" is available
- Verify network connectivity

### Image Generation Issues
- Check that uploaded images are valid formats (JPEG, PNG)
- Ensure images are not too large (>10MB)
- Verify prompt templates are working

### Web Interface Issues
- Check that Flask is installed: `pip install flask`
- Ensure port 5000 is available
- Verify template files are in correct location

## Performance Optimization

### For Live Demo
- Pre-generate example scenes for backup
- Have multiple product images ready
- Test all scene presets beforehand
- Prepare export formats in advance

### For Production
- Implement image caching
- Add error handling and retries
- Optimize image processing pipeline
- Add user authentication and rate limiting
