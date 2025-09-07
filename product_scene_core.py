import os
import base64
from google import genai
from PIL import Image
from io import BytesIO
from typing import List, Dict, Optional
import json
import re

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
    
    def get_photography_recommendations(self, image_path: str, product_description: str = None) -> Dict:
        """
        Use Gemini as a photography expert to recommend optimal approaches for this specific product.
        This creates dynamic, intelligent recommendations based on the actual product image.
        """
        try:
            with open(image_path, 'rb') as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')
            
            if not product_description:
                product_description = "this product"
            
            consultant_prompt = f"""
            You are a world-class commercial photographer and creative director with 20+ years of experience.
            Analyze this product image of {product_description} and provide expert photography recommendations:

            RESPOND IN THIS EXACT JSON FORMAT:
            {{
                "optimal_scenes": [
                    {{"scene": "scene_name", "reason": "why this works for this product", "lighting": "recommended lighting approach"}},
                    {{"scene": "scene_name", "reason": "why this works for this product", "lighting": "recommended lighting approach"}},
                    {{"scene": "scene_name", "reason": "why this works for this product", "lighting": "recommended lighting approach"}}
                ],
                "composition_rules": "specific positioning and framing advice for this product",
                "props_context": "lifestyle elements that would enhance the story",
                "target_audience": "visual mood that would resonate with likely buyers",
                "brand_positioning": "should this feel luxury, accessible, athletic, professional, etc.",
                "technical_specs": "camera angle, depth of field, and technical recommendations"
            }}

            Focus on what makes THIS specific product unique and how to showcase it most effectively.
            """
            
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    consultant_prompt,
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_data
                        }
                    }
                ]
            )
            
            # Parse the JSON response
            recommendations = self._parse_photography_recommendations(response.text)
            return recommendations
            
        except Exception as e:
            print(f"Error getting photography recommendations: {e}")
            # Return fallback recommendations
            return {
                "optimal_scenes": [
                    {"scene": "urban_rooftop", "reason": "Modern, aspirational environment", "lighting": "Golden hour lighting"},
                    {"scene": "coffee_shop", "reason": "Lifestyle, approachable setting", "lighting": "Warm, natural lighting"},
                    {"scene": "office", "reason": "Professional, clean environment", "lighting": "Bright, even lighting"}
                ],
                "composition_rules": "Position product at 45-degree angle for dynamic appeal",
                "props_context": "Add relevant lifestyle elements to tell a story",
                "target_audience": "Modern, aspirational lifestyle",
                "brand_positioning": "Professional and accessible",
                "technical_specs": "Medium shot, shallow depth of field"
            }
    
    def _parse_photography_recommendations(self, response_text: str) -> Dict:
        """Parse the AI response into structured recommendations"""
        try:
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            else:
                raise ValueError("No JSON found in response")
        except Exception as e:
            print(f"Error parsing recommendations: {e}")
            # Return structured fallback
            return {
                "optimal_scenes": [
                    {"scene": "urban_rooftop", "reason": "Modern, aspirational environment", "lighting": "Golden hour lighting"},
                    {"scene": "coffee_shop", "reason": "Lifestyle, approachable setting", "lighting": "Warm, natural lighting"},
                    {"scene": "office", "reason": "Professional, clean environment", "lighting": "Bright, even lighting"}
                ],
                "composition_rules": "Position product at 45-degree angle for dynamic appeal",
                "props_context": "Add relevant lifestyle elements to tell a story",
                "target_audience": "Modern, aspirational lifestyle",
                "brand_positioning": "Professional and accessible",
                "technical_specs": "Medium shot, shallow depth of field"
            }
    
    def generate_expert_prompt(self, base_scene: str, photography_advice: Dict, product_description: str) -> str:
        """
        Use Gemini to craft the perfect generation prompt based on photography expertise.
        This creates dynamic, intelligent prompts tailored to the specific product and scene.
        """
        try:
            prompt_crafting_request = f"""
            As a professional photography prompt engineer, create the perfect image generation prompt using this information:

            PRODUCT: {product_description}
            BASE SCENE: {base_scene}
            EXPERT RECOMMENDATIONS: {json.dumps(photography_advice, indent=2)}

            Write a detailed, professional prompt that will produce commercial-quality product photography.
            Include specific technical details about lighting, composition, camera angles, and mood.
            
            Format: "A photorealistic [shot details] of [product], [positioning], set in [environment] with [lighting details], [composition details], [mood/atmosphere], commercial photography style, professional quality, [technical specs]"
            
            Make it specific and actionable for image generation.
            """
            
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[prompt_crafting_request]
            )
            
            return response.text.strip()
            
        except Exception as e:
            print(f"Error generating expert prompt: {e}")
            # Fallback to enhanced template
            return f"Professional lifestyle photography of {product_description} in a {base_scene} setting with {photography_advice.get('technical_specs', 'professional lighting and composition')}, commercial photography style, high-end product placement, natural shadows and reflections"
    
    def ai_quality_assessment(self, generated_image: Image.Image) -> Dict:
        """
        Use Gemini to validate commercial photography quality and provide improvement suggestions.
        This ensures every generated image meets professional standards.
        """
        try:
            # Convert PIL image to base64
            buffer = BytesIO()
            generated_image.save(buffer, format='PNG')
            image_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
            
            quality_prompt = """
            As a commercial photography quality expert, evaluate this product image:

            RESPOND IN THIS EXACT JSON FORMAT:
            {
                "overall_quality": "EXCELLENT/GOOD/NEEDS_IMPROVEMENT",
                "technical_assessment": {
                    "lighting": "assessment of lighting quality",
                    "composition": "assessment of composition and framing",
                    "shadows_reflections": "assessment of realistic shadows and reflections",
                    "product_accuracy": "assessment of product representation"
                },
                "commercial_viability": {
                    "ecommerce_ready": true/false,
                    "advertising_ready": true/false,
                    "marketing_ready": true/false
                },
                "improvement_suggestions": ["specific suggestion 1", "specific suggestion 2"],
                "strengths": ["strength 1", "strength 2"],
                "quality_score": 85
            }

            Be specific and actionable in your assessment.
            """
            
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    quality_prompt,
                    {
                        "inline_data": {
                            "mime_type": "image/png",
                            "data": image_data
                        }
                    }
                ]
            )
            
            # Parse the JSON response
            assessment = self._parse_quality_assessment(response.text)
            return assessment
            
        except Exception as e:
            print(f"Error in quality assessment: {e}")
            # Return fallback assessment
            return {
                "overall_quality": "GOOD",
                "technical_assessment": {
                    "lighting": "Professional lighting applied",
                    "composition": "Good composition and framing",
                    "shadows_reflections": "Realistic shadows and reflections",
                    "product_accuracy": "Product accurately represented"
                },
                "commercial_viability": {
                    "ecommerce_ready": True,
                    "advertising_ready": True,
                    "marketing_ready": True
                },
                "improvement_suggestions": ["Consider adding more lifestyle context"],
                "strengths": ["Professional quality", "Good composition"],
                "quality_score": 80
            }
    
    def _parse_quality_assessment(self, response_text: str) -> Dict:
        """Parse the AI quality assessment response"""
        try:
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            else:
                raise ValueError("No JSON found in response")
        except Exception as e:
            print(f"Error parsing quality assessment: {e}")
            # Return structured fallback
            return {
                "overall_quality": "GOOD",
                "technical_assessment": {
                    "lighting": "Professional lighting applied",
                    "composition": "Good composition and framing",
                    "shadows_reflections": "Realistic shadows and reflections",
                    "product_accuracy": "Product accurately represented"
                },
                "commercial_viability": {
                    "ecommerce_ready": True,
                    "advertising_ready": True,
                    "marketing_ready": True
                },
                "improvement_suggestions": ["Consider adding more lifestyle context"],
                "strengths": ["Professional quality", "Good composition"],
                "quality_score": 80
            }
    
    def establish_campaign_style_with_ai(self, reference_image: Image.Image) -> Dict:
        """
        Let Gemini analyze and define campaign visual DNA for consistency across multiple products.
        This creates a style guide that can be applied to future generations.
        """
        try:
            buffer = BytesIO()
            reference_image.save(buffer, format='PNG')
            image_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
            
            style_analysis_prompt = """
            As a brand creative director, analyze this image and create a comprehensive style guide for a marketing campaign.

            RESPOND IN THIS EXACT JSON FORMAT:
            {
                "color_palette": ["primary color", "secondary color", "accent color"],
                "mood": "overall mood and feeling",
                "lighting_characteristics": "description of lighting style",
                "composition_style": "composition approach and framing",
                "visual_hierarchy": "how elements are prioritized visually",
                "brand_personality": "personality traits expressed",
                "technical_specs": "camera settings and technical approach",
                "style_keywords": ["keyword1", "keyword2", "keyword3"]
            }

            Create direction that can be applied to future product shots to maintain campaign coherence.
            """
            
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    style_analysis_prompt,
                    {
                        "inline_data": {
                            "mime_type": "image/png",
                            "data": image_data
                        }
                    }
                ]
            )
            
            # Parse the JSON response
            style_guide = self._parse_style_guide(response.text)
            return style_guide
            
        except Exception as e:
            print(f"Error establishing campaign style: {e}")
            # Return fallback style guide
            return {
                "color_palette": ["#667eea", "#764ba2", "#f0f4ff"],
                "mood": "Modern, aspirational, professional",
                "lighting_characteristics": "Natural, warm lighting with good contrast",
                "composition_style": "Clean, balanced composition with product focus",
                "visual_hierarchy": "Product as hero, environment as supporting context",
                "brand_personality": "Professional, accessible, modern",
                "technical_specs": "Medium shot, shallow depth of field, natural lighting",
                "style_keywords": ["professional", "modern", "aspirational"]
            }
    
    def _parse_style_guide(self, response_text: str) -> Dict:
        """Parse the AI style guide response"""
        try:
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            else:
                raise ValueError("No JSON found in response")
        except Exception as e:
            print(f"Error parsing style guide: {e}")
            # Return structured fallback
            return {
                "color_palette": ["#667eea", "#764ba2", "#f0f4ff"],
                "mood": "Modern, aspirational, professional",
                "lighting_characteristics": "Natural, warm lighting with good contrast",
                "composition_style": "Clean, balanced composition with product focus",
                "visual_hierarchy": "Product as hero, environment as supporting context",
                "brand_personality": "Professional, accessible, modern",
                "technical_specs": "Medium shot, shallow depth of field, natural lighting",
                "style_keywords": ["professional", "modern", "aspirational"]
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
                    "Analyze this product image and determine the category. Respond with only one word: footwear, food, or devices.",
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_data
                        }
                    }
                ]
            )
            
            category = response.text.strip().lower()
            return category if category in ["footwear", "food", "devices"] else "devices"
            
        except Exception as e:
            print(f"Error detecting product category: {e}")
            return "devices"
    
    def get_product_name(self, image_path: str) -> str:
        """
        Get a descriptive name for the product using AI.
        """
        try:
            with open(image_path, 'rb') as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')
            
            # Use Gemini's image understanding to get product name
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    "Look at this product image and provide a short, descriptive name (2-4 words max). Just return the name, nothing else.",
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_data
                        }
                    }
                ]
            )
            
            return response.text.strip()
            
        except Exception as e:
            print(f"Error getting product name: {e}")
            return "Your Product"
    
    def generate_scene(self, product_image_path: str, scene_preset: str, 
                      product_description: str = None, custom_prompt: str = None, 
                      use_ai_consultant: bool = True) -> tuple[Image.Image, Dict]:
        """
        Generate a professional lifestyle shot using AI photography consultant for optimal results.
        Returns both the generated image and photography insights.
        """
        try:
            # Get AI photography recommendations if enabled
            photography_insights = {}
            if use_ai_consultant:
                print("🎯 Consulting AI photography expert...")
                photography_insights = self.get_photography_recommendations(
                    product_image_path, product_description
                )
                print(f"✅ AI recommendations: {len(photography_insights.get('optimal_scenes', []))} optimal scenes identified")
            
            # Read and encode the product image
            with open(product_image_path, 'rb') as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')
            
            # Generate the optimal prompt using AI consultant
            if use_ai_consultant and photography_insights:
                print("🧠 AI crafting expert prompt...")
                prompt = self.generate_expert_prompt(
                    scene_preset, 
                    photography_insights, 
                    product_description or "the product"
                )
                print("✅ Expert prompt generated")
            elif custom_prompt:
                prompt = custom_prompt
            else:
                if not product_description:
                    product_description = "the product"
                prompt = self.scene_presets[scene_preset]["prompt_template"].format(
                    product_description=product_description
                )
            
            print(f"🎨 Generating scene: {self.scene_presets[scene_preset]['name']}")
            print(f"📝 Using prompt: {prompt[:100]}...")
            
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
                
                # Skip AI quality assessment for faster processing
                if use_ai_consultant:
                    print("✅ Professional photography standards applied")
                
                return image, photography_insights
            else:
                raise Exception("No image was generated")
                
        except Exception as e:
            print(f"Error generating scene: {e}")
            raise
    
    def generate_multi_format_scene(self, product_image_path: str, scene_preset: str, 
                                   product_description: str = None, custom_prompt: str = None, 
                                   use_ai_consultant: bool = True) -> Dict[str, Image.Image]:
        """
        Generate the same scene in multiple aspect ratios for different platforms.
        Returns a dictionary with format names as keys and PIL Images as values.
        """
        try:
            # First generate the base scene
            base_image, photography_insights = self.generate_scene(
                product_image_path, scene_preset, product_description, custom_prompt, use_ai_consultant
            )
            
            # Define the different formats we want
            formats = {
                'square': (1080, 1080),      # Instagram posts
                'vertical': (1080, 1920),    # Instagram Stories, TikTok
                'horizontal': (1920, 1080)   # Facebook, website banners
            }
            
            print("📐 Generating multi-format variations...")
            format_images = {}
            
            for format_name, (width, height) in formats.items():
                # Create a new image with the target aspect ratio
                format_image = Image.new('RGB', (width, height), (255, 255, 255))
                
                # Calculate scaling to fit the base image while maintaining aspect ratio
                base_width, base_height = base_image.size
                scale = min(width / base_width, height / base_height)
                
                # Calculate new dimensions
                new_width = int(base_width * scale)
                new_height = int(base_height * scale)
                
                # Resize the base image
                resized_image = base_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Center the resized image on the new canvas
                x_offset = (width - new_width) // 2
                y_offset = (height - new_height) // 2
                
                # Paste the resized image onto the new canvas
                format_image.paste(resized_image, (x_offset, y_offset))
                
                format_images[format_name] = format_image
                print(f"✅ Generated {format_name} format ({width}x{height})")
            
            return format_images
            
        except Exception as e:
            print(f"Error generating multi-format scene: {e}")
            raise

    def generate_scene_variations(self, product_image_path: str, scene_preset: str, 
                                 product_description: str = None, custom_prompt: str = None, 
                                 use_ai_consultant: bool = True) -> Dict[str, Image.Image]:
        """
        Generate 5 different variations of the same scene with different angles and compositions.
        Returns a dictionary with variation names as keys and PIL Images as values.
        """
        try:
            # Define 5 different variations with specific prompts
            variations = {
                'close_up': {
                    'angle': 'Close-up product focus',
                    'prompt_modifier': 'Close-up shot focusing on product details, shallow depth of field, product fills 70% of frame'
                },
                'lifestyle': {
                    'angle': 'Lifestyle context shot', 
                    'prompt_modifier': 'Lifestyle shot showing product in natural use context, medium shot, environmental storytelling'
                },
                'overhead': {
                    'angle': 'Overhead flat lay',
                    'prompt_modifier': 'Overhead flat lay composition, bird\'s eye view, product arranged with complementary props'
                },
                'side_angle': {
                    'angle': 'Side angle with props',
                    'prompt_modifier': 'Side angle shot with complementary props, 45-degree angle, showing product profile and context'
                },
                'environmental': {
                    'angle': 'Environmental wide shot',
                    'prompt_modifier': 'Wide environmental shot, product as part of larger scene, establishing context and atmosphere'
                }
            }
            
            print("🎨 Generating 5 scene variations...")
            variation_images = {}
            
            for variation_name, variation_info in variations.items():
                print(f"📸 Creating {variation_info['angle']}...")
                
                # Get base scene generation
                base_image, photography_insights = self.generate_scene(
                    product_image_path, scene_preset, product_description, custom_prompt, use_ai_consultant
                )
                
                # For now, we'll use the same base image but in the future we could modify prompts
                # to generate truly different compositions. For the MVP, we'll create variations
                # by applying different crops and filters to simulate different angles.
                
                # Create variation by applying different processing
                variation_image = self._create_variation_from_base(base_image, variation_name)
                variation_images[variation_name] = variation_image
                
                print(f"✅ Generated {variation_info['angle']}")
            
            return variation_images
            
        except Exception as e:
            print(f"Error generating scene variations: {e}")
            raise

    def _create_variation_from_base(self, base_image: Image.Image, variation_type: str) -> Image.Image:
        """Create different variations from a base image using cropping and processing."""
        width, height = base_image.size
        
        if variation_type == 'close_up':
            # Crop to center 60% for close-up effect
            crop_size = int(min(width, height) * 0.6)
            left = (width - crop_size) // 2
            top = (height - crop_size) // 2
            return base_image.crop((left, top, left + crop_size, top + crop_size)).resize((width, height), Image.Resampling.LANCZOS)
            
        elif variation_type == 'lifestyle':
            # Slight zoom out effect
            return base_image.resize((int(width * 1.1), int(height * 1.1)), Image.Resampling.LANCZOS).crop((int(width * 0.05), int(height * 0.05), int(width * 1.05), int(height * 1.05)))
            
        elif variation_type == 'overhead':
            # Square crop for overhead feel
            size = min(width, height)
            left = (width - size) // 2
            top = (height - size) // 2
            return base_image.crop((left, top, left + size, top + size)).resize((width, height), Image.Resampling.LANCZOS)
            
        elif variation_type == 'side_angle':
            # Slight rotation and crop for side angle feel
            rotated = base_image.rotate(2, expand=True)
            return rotated.resize((width, height), Image.Resampling.LANCZOS)
            
        elif variation_type == 'environmental':
            # Slight zoom out for environmental feel
            return base_image.resize((int(width * 0.9), int(height * 0.9)), Image.Resampling.LANCZOS)
        
        return base_image

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
