from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import uuid
from PIL import Image
from product_scene_core import ProductSceneGenerator

app = Flask(__name__)
CORS(app)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'outputs'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create directories if they don't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# Initialize the ProductScene generator
API_KEY = "AIzaSyA7X1PH_P3B6nTRu5_bcPG1W6_o34cecLE"  # Your Google AI API key
generator = ProductSceneGenerator(API_KEY)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload"""
    try:
        if 'product_image' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['product_image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Generate unique filename
        filename = f"{uuid.uuid4().hex}_{file.filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'message': 'File uploaded successfully'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/detect_product', methods=['POST'])
def detect_product():
    """Detect product type and name using AI"""
    try:
        data = request.json
        filename = data.get('filename')
        
        if not filename:
            return jsonify({'error': 'Missing filename'}), 400
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Product image not found'}), 404
        
        # Detect product category
        category = generator.detect_product_category(filepath)
        
        # Get product name from AI
        product_name = generator.get_product_name(filepath)
        
        return jsonify({
            'success': True,
            'product_type': category,
            'product_name': product_name,
            'message': 'Product detected successfully'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate_scene', methods=['POST'])
def generate_scene():
    """Generate scene with uploaded product using AI photography consultant"""
    try:
        data = request.json
        filename = data.get('filename')
        scene_preset = data.get('scene_preset')
        product_description = data.get('product_description', 'product')
        use_ai_consultant = data.get('use_ai_consultant', True)
        
        if not filename or not scene_preset:
            return jsonify({'error': 'Missing required parameters'}), 400
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Product image not found'}), 404
        
        # Generate scene with AI consultant
        generated_image, photography_insights = generator.generate_scene(
            product_image_path=filepath,
            scene_preset=scene_preset,
            product_description=product_description,
            use_ai_consultant=use_ai_consultant
        )
        
        # Save generated image
        output_filename = f"scene_{uuid.uuid4().hex}.png"
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        generated_image.save(output_path)
        
        return jsonify({
            'success': True,
            'output_filename': output_filename,
            'photography_insights': photography_insights,
            'message': f'Generated {generator.scene_presets[scene_preset]["name"]} scene with AI intelligence'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/image/<filename>')
def serve_image(filename):
    """Serve generated images"""
    try:
        return send_from_directory(app.config['OUTPUT_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify({'error': 'Image not found'}), 404

@app.route('/api/get_photography_recommendations', methods=['POST'])
def get_photography_recommendations():
    """Get AI photography recommendations for uploaded product"""
    try:
        data = request.json
        filename = data.get('filename')
        product_description = data.get('product_description', 'product')
        
        if not filename:
            return jsonify({'error': 'Missing filename'}), 400
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Product image not found'}), 404
        
        # Get AI photography recommendations
        recommendations = generator.get_photography_recommendations(
            filepath, product_description
        )
        
        return jsonify({
            'success': True,
            'recommendations': recommendations,
            'message': 'AI photography recommendations generated'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assess_quality', methods=['POST'])
def assess_quality():
    """Assess quality of generated image using AI"""
    try:
        data = request.json
        output_filename = data.get('output_filename')
        
        if not output_filename:
            return jsonify({'error': 'Missing output filename'}), 400
        
        filepath = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Image not found'}), 404
        
        # Load image and assess quality
        image = Image.open(filepath)
        quality_assessment = generator.ai_quality_assessment(image)
        
        return jsonify({
            'success': True,
            'quality_assessment': quality_assessment,
            'message': 'AI quality assessment completed'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/create_style_guide', methods=['POST'])
def create_style_guide():
    """Create AI-powered style guide from reference image"""
    try:
        data = request.json
        output_filename = data.get('output_filename')
        
        if not output_filename:
            return jsonify({'error': 'Missing output filename'}), 400
        
        filepath = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Image not found'}), 404
        
        # Load image and create style guide
        image = Image.open(filepath)
        style_guide = generator.establish_campaign_style_with_ai(image)
        
        return jsonify({
            'success': True,
            'style_guide': style_guide,
            'message': 'AI style guide created'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/conversational_edit', methods=['POST'])
def conversational_edit():
    """Apply conversational edits"""
    try:
        data = request.json
        output_filename = data.get('output_filename')
        edit_request = data.get('edit_request')
        
        if not output_filename or not edit_request:
            return jsonify({'error': 'Missing required parameters'}), 400
        
        filepath = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Image not found'}), 404
        
        # Load image and apply conversational edit
        image = Image.open(filepath)
        edited_image = generator.conversational_edit(image, edit_request)
        
        # Save edited image
        edited_filename = f"edited_{uuid.uuid4().hex}.png"
        edited_path = os.path.join(app.config['OUTPUT_FOLDER'], edited_filename)
        edited_image.save(edited_path)
        
        return jsonify({
            'success': True,
            'output_filename': edited_filename,
            'message': 'Conversational edit applied successfully'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
