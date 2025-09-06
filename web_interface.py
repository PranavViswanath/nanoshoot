"""
Simple web interface for ProductScene demonstration.
Mimics the PixShop template approach for easy hackathon presentation.
"""

from flask import Flask, render_template, request, jsonify, send_file
import os
import base64
from product_scene_core import ProductSceneGenerator
from PIL import Image
from io import BytesIO
import uuid

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'outputs'

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# Initialize the generator
API_KEY = "AIzaSyA7X1PH_P3B6nTRu5_bcPG1W6_o34cecLE"
generator = ProductSceneGenerator(API_KEY)

@app.route('/')
def index():
    """Main interface page"""
    return render_template('index.html', scene_presets=generator.scene_presets)

@app.route('/upload', methods=['POST'])
def upload_product():
    """Handle product image upload"""
    try:
        if 'product_image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
        
        file = request.files['product_image']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save uploaded file
        filename = f"product_{uuid.uuid4().hex}.jpg"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Detect product category
        category = generator.detect_product_category(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'category': category,
            'message': f'Product uploaded and detected as: {category}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate_scene', methods=['POST'])
def generate_scene():
    """Generate scene with uploaded product"""
    try:
        data = request.json
        filename = data.get('filename')
        scene_preset = data.get('scene_preset')
        product_description = data.get('product_description', 'product')
        
        if not filename or not scene_preset:
            return jsonify({'error': 'Missing required parameters'}), 400
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Product image not found'}), 404
        
        # Generate scene
        generated_image = generator.generate_scene(
            product_image_path=filepath,
            scene_preset=scene_preset,
            product_description=product_description
        )
        
        # Save generated image
        output_filename = f"scene_{uuid.uuid4().hex}.png"
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        generated_image.save(output_path)
        
        return jsonify({
            'success': True,
            'output_filename': output_filename,
            'message': f'Generated {generator.scene_presets[scene_preset]["name"]} scene'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/conversational_edit', methods=['POST'])
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
            return jsonify({'error': 'Scene image not found'}), 404
        
        # Load current image
        current_image = Image.open(filepath)
        
        # Apply edit
        edited_image = generator.conversational_edit(current_image, edit_request)
        
        # Save edited image
        new_filename = f"edited_{uuid.uuid4().hex}.png"
        new_path = os.path.join(app.config['OUTPUT_FOLDER'], new_filename)
        edited_image.save(new_path)
        
        return jsonify({
            'success': True,
            'output_filename': new_filename,
            'message': f'Applied edit: {edit_request}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/export_formats', methods=['POST'])
def export_formats():
    """Export marketing formats"""
    try:
        data = request.json
        output_filename = data.get('output_filename')
        product_name = data.get('product_name', 'product')
        
        if not output_filename:
            return jsonify({'error': 'Missing output filename'}), 400
        
        filepath = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'Image not found'}), 404
        
        # Load image
        image = Image.open(filepath)
        
        # Export formats to the outputs folder
        exported_files = {}
        
        # Instagram Square (1080x1080)
        instagram_square = image.copy()
        instagram_square.thumbnail((1080, 1080), Image.Resampling.LANCZOS)
        instagram_square_path = os.path.join(app.config['OUTPUT_FOLDER'], f"{product_name}_instagram_square.png")
        instagram_square.save(instagram_square_path)
        exported_files["instagram_square"] = f"{product_name}_instagram_square.png"
        
        # Instagram Story (1080x1920)
        story = image.copy()
        story = story.resize((1080, 1920), Image.Resampling.LANCZOS)
        story_path = os.path.join(app.config['OUTPUT_FOLDER'], f"{product_name}_instagram_story.png")
        story.save(story_path)
        exported_files["instagram_story"] = f"{product_name}_instagram_story.png"
        
        # Hero Banner (1920x1080)
        hero = image.copy()
        hero = hero.resize((1920, 1080), Image.Resampling.LANCZOS)
        hero_path = os.path.join(app.config['OUTPUT_FOLDER'], f"{product_name}_hero_banner.png")
        hero.save(hero_path)
        exported_files["hero_banner"] = f"{product_name}_hero_banner.png"
        
        # Original high-res
        original_path = os.path.join(app.config['OUTPUT_FOLDER'], f"{product_name}_original.png")
        image.save(original_path)
        exported_files["original"] = f"{product_name}_original.png"
        
        return jsonify({
            'success': True,
            'exported_files': exported_files,
            'message': 'Marketing formats exported successfully'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/image/<filename>')
def serve_image(filename):
    """Serve generated images"""
    filepath = os.path.join(app.config['OUTPUT_FOLDER'], filename)
    if os.path.exists(filepath):
        return send_file(filepath)
    else:
        return "Image not found", 404

if __name__ == '__main__':
    print("🍌 ProductScene Web Interface")
    print("=" * 40)
    print("Starting web server...")
    print("Open http://localhost:5000 in your browser")
    print("=" * 40)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
