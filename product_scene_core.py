import os
import base64
from google import genai
from PIL import Image
from io import BytesIO
from typing import List, Dict, Optional
import json

class ProductSceneGenerator:
    """
    Core system for generating professional product lifestyle shots using Nano Banana.
    Leverages multi-image fusion and conversational editing capabilities.
    """
    
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)
        self.model = "gemini-2.5-flash-image-preview"
        
        # Scene preset templates for different environments
        self.scene_presets = {
            "urban_rooftop": {
                "name": "Urban Rooftop Sunset",
                "description": "Modern city skyline with golden hour lighting",
                "prompt_template": "Professional lifestyle photography of {product_description} on a modern urban rooftop with city skyline in background, golden hour lighting, commercial photography style, high-end product placement, natural shadows and reflections"
            },
            "coffee_shop": {
                "name": "Cozy Coffee Shop",
                "description": "Warm, inviting café atmosphere",
                "prompt_template": "Professional lifestyle photography of {product_description} in a cozy coffee shop setting with warm lighting, wooden textures, coffee cup nearby, commercial photography style, natural composition"
            },
            "gym": {
                "name": "Modern Gym",
                "description": "Clean, athletic environment",
                "prompt_template": "Professional lifestyle photography of {product_description} in a modern gym setting with clean lines, bright lighting, athletic atmosphere, commercial photography style, motivational energy"
            },
            "beach": {
                "name": "Beach Lifestyle",
                "description": "Relaxed coastal vibes",
                "prompt_template": "Professional lifestyle photography of {product_description} on a beautiful beach with natural lighting, ocean background, relaxed lifestyle, commercial photography style, natural shadows"
            },
            "office": {
                "name": "Modern Office",
                "description": "Professional workspace setting",
                "prompt_template": "Professional lifestyle photography of {product_description} in a modern office environment with clean design, natural lighting, professional atmosphere, commercial photography style, minimalist composition"
            }
        }
    
    def detect_product_category(self, image_path: str) -> str:
        """
        Analyze uploaded product image to determine category for better scene matching.
        """
        try:
            with open(image_path, 'rb') as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')
            
            # Use Gemini's image understanding to detect product category
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    "Analyze this product image and determine the category. Respond with only one word: footwear, clothing, electronics, accessories, home, beauty, or other.",
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_data
                        }
                    }
                ]
            )
            
            category = response.text.strip().lower()
            return category if category in ["footwear", "clothing", "electronics", "accessories", "home", "beauty", "other"] else "other"
            
        except Exception as e:
            print(f"Error detecting product category: {e}")
            return "other"
    
    def generate_scene(self, product_image_path: str, scene_preset: str, 
                      product_description: str = None, custom_prompt: str = None) -> Image.Image:
        """
        Generate a professional lifestyle shot by placing the product in the selected scene.
        """
        try:
            # Read and encode the product image
            with open(product_image_path, 'rb') as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')
            
            # Get scene prompt
            if custom_prompt:
                prompt = custom_prompt
            else:
                if not product_description:
                    product_description = "the product"
                prompt = self.scene_presets[scene_preset]["prompt_template"].format(
                    product_description=product_description
                )
            
            print(f"Generating scene: {self.scene_presets[scene_preset]['name']}")
            print(f"Prompt: {prompt}")
            
            # Generate the scene using Nano Banana's multi-image fusion
            response = self.client.models.generate_content(
                model=self.model,
                contents=[
                    prompt,
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_data
                        }
                    }
                ]
            )
            
            # Extract and return the generated image
            image_parts = [
                part.inline_data.data
                for part in response.candidates[0].content.parts
                if part.inline_data
            ]
            
            if image_parts:
                image = Image.open(BytesIO(image_parts[0]))
                return image
            else:
                raise Exception("No image was generated")
                
        except Exception as e:
            print(f"Error generating scene: {e}")
            raise
    
    def conversational_edit(self, base_image: Image.Image, edit_request: str) -> Image.Image:
        """
        Apply conversational edits to an existing generated image.
        """
        try:
            # Convert PIL image to base64
            buffer = BytesIO()
            base_image.save(buffer, format='PNG')
            image_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
            
            # Create conversational edit prompt
            prompt = f"Apply this edit to the image: {edit_request}. Maintain the overall composition and lighting while making the requested changes. Keep the product details accurate."
            
            print(f"Applying edit: {edit_request}")
            
            response = self.client.models.generate_content(
                model=self.model,
                contents=[
                    prompt,
                    {
                        "inline_data": {
                            "mime_type": "image/png",
                            "data": image_data
                        }
                    }
                ]
            )
            
            # Extract and return the edited image
            image_parts = [
                part.inline_data.data
                for part in response.candidates[0].content.parts
                if part.inline_data
            ]
            
            if image_parts:
                edited_image = Image.open(BytesIO(image_parts[0]))
                return edited_image
            else:
                raise Exception("No edited image was generated")
                
        except Exception as e:
            print(f"Error applying conversational edit: {e}")
            raise
    
    def export_marketing_formats(self, image: Image.Image, product_name: str = "product") -> Dict[str, str]:
        """
        Generate marketing-ready assets in different formats.
        """
        formats = {}
        
        try:
            # Instagram Square (1080x1080)
            instagram_square = image.copy()
            instagram_square.thumbnail((1080, 1080), Image.Resampling.LANCZOS)
            instagram_square.save(f"{product_name}_instagram_square.png")
            formats["instagram_square"] = f"{product_name}_instagram_square.png"
            
            # Instagram Story (1080x1920)
            story = image.copy()
            story = story.resize((1080, 1920), Image.Resampling.LANCZOS)
            story.save(f"{product_name}_instagram_story.png")
            formats["instagram_story"] = f"{product_name}_instagram_story.png"
            
            # Hero Banner (1920x1080)
            hero = image.copy()
            hero = hero.resize((1920, 1080), Image.Resampling.LANCZOS)
            hero.save(f"{product_name}_hero_banner.png")
            formats["hero_banner"] = f"{product_name}_hero_banner.png"
            
            # Original high-res
            image.save(f"{product_name}_original.png")
            formats["original"] = f"{product_name}_original.png"
            
            return formats
            
        except Exception as e:
            print(f"Error exporting marketing formats: {e}")
            return {}

# Example usage and testing
if __name__ == "__main__":
    # Initialize with your API key
    API_KEY = "AIzaSyA7X1PH_P3B6nTRu5_bcPG1W6_o34cecLE"
    generator = ProductSceneGenerator(API_KEY)
    
    print("ProductScene Generator initialized!")
    print("Available scene presets:")
    for key, preset in generator.scene_presets.items():
        print(f"  {key}: {preset['name']} - {preset['description']}")
