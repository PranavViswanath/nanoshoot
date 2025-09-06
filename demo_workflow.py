"""
ProductScene Demo Workflow - 90-Second Demonstration
Implements the exact flow described in the system design for hackathon judging.
"""

import time
from product_scene_core import ProductSceneGenerator
from PIL import Image
import os

def run_demo_workflow():
    """
    Execute the complete 90-second demonstration workflow:
    1. Product Upload (15s): Drag athletic shoe → System auto-detects "footwear" category
    2. Scene Selection (15s): Click "urban rooftop sunset" → Generates professional lifestyle shot
    3. Conversational Edit (20s): Type "add a skateboard next to it" → Seamless prop addition
    4. Style Refinement (20s): "Make it feel more vintage" → Color grading while preserving details
    5. Asset Export (10s): One-click download of Instagram story, square post, and hero banner
    6. Impact Statement (10s): "Traditional photoshoot: $2,000 and 2 weeks. This: 2 minutes."
    """
    
    print("🍌 ProductScene Demo - Nano Banana Hackathon")
    print("=" * 50)
    
    # Initialize the generator
    API_KEY = "AIzaSyA7X1PH_P3B6nTRu5_bcPG1W6_o34cecLE"
    generator = ProductSceneGenerator(API_KEY)
    
    # For demo purposes, we'll use the cat image as a placeholder product
    # In the real demo, this would be an uploaded athletic shoe
    product_image_path = "cat.png"
    
    if not os.path.exists(product_image_path):
        print("❌ Product image not found. Please run example_cat_generation.py first to create cat.png")
        return
    
    print("\n📸 STEP 1: Product Upload & Category Detection (15s)")
    print("-" * 50)
    start_time = time.time()
    
    # Auto-detect product category
    category = generator.detect_product_category(product_image_path)
    print(f"✅ Product category detected: {category}")
    
    elapsed = time.time() - start_time
    print(f"⏱️  Category detection completed in {elapsed:.1f}s")
    
    print("\n🏙️  STEP 2: Scene Selection & Generation (15s)")
    print("-" * 50)
    start_time = time.time()
    
    # Generate urban rooftop scene
    scene_preset = "urban_rooftop"
    product_description = "athletic shoe" if category == "footwear" else "product"
    
    try:
        generated_image = generator.generate_scene(
            product_image_path=product_image_path,
            scene_preset=scene_preset,
            product_description=product_description
        )
        
        # Save the initial scene
        generated_image.save("demo_scene_initial.png")
        print(f"✅ Generated {generator.scene_presets[scene_preset]['name']} scene")
        
        elapsed = time.time() - start_time
        print(f"⏱️  Scene generation completed in {elapsed:.1f}s")
        
    except Exception as e:
        print(f"❌ Error generating scene: {e}")
        return
    
    print("\n🎨 STEP 3: Conversational Edit - Add Props (20s)")
    print("-" * 50)
    start_time = time.time()
    
    # Add skateboard prop
    edit_request = "add a skateboard next to the product with matching lighting and shadows"
    
    try:
        edited_image = generator.conversational_edit(generated_image, edit_request)
        edited_image.save("demo_scene_with_props.png")
        print(f"✅ Added skateboard prop: {edit_request}")
        
        elapsed = time.time() - start_time
        print(f"⏱️  Prop addition completed in {elapsed:.1f}s")
        
    except Exception as e:
        print(f"❌ Error adding props: {e}")
        edited_image = generated_image  # Fallback to original
    
    print("\n🎭 STEP 4: Style Refinement - Vintage Look (20s)")
    print("-" * 50)
    start_time = time.time()
    
    # Apply vintage styling
    style_request = "make it feel more vintage with warm, nostalgic colors and film grain effect"
    
    try:
        final_image = generator.conversational_edit(edited_image, style_request)
        final_image.save("demo_scene_final.png")
        print(f"✅ Applied vintage styling: {style_request}")
        
        elapsed = time.time() - start_time
        print(f"⏱️  Style refinement completed in {elapsed:.1f}s")
        
    except Exception as e:
        print(f"❌ Error applying style: {e}")
        final_image = edited_image  # Fallback to previous version
    
    print("\n📦 STEP 5: Multi-Format Export (10s)")
    print("-" * 50)
    start_time = time.time()
    
    # Export marketing formats
    exported_files = generator.export_marketing_formats(final_image, "demo_product")
    
    print("✅ Exported marketing assets:")
    for format_name, filename in exported_files.items():
        print(f"   📄 {format_name}: {filename}")
    
    elapsed = time.time() - start_time
    print(f"⏱️  Export completed in {elapsed:.1f}s")
    
    print("\n💰 STEP 6: Impact Statement (10s)")
    print("-" * 50)
    print("🎯 TRADITIONAL PHOTOSHOOT:")
    print("   💸 Cost: $2,000+ (photographer, studio, props, editing)")
    print("   ⏰ Time: 2+ weeks (scheduling, shooting, post-production)")
    print("   🚚 Logistics: Studio rental, prop sourcing, model coordination")
    print()
    print("🚀 PRODUCTSCENE SOLUTION:")
    print("   💸 Cost: $0 (using free Nano Banana API)")
    print("   ⏰ Time: 2 minutes (upload → generate → export)")
    print("   🎯 Quality: Professional lifestyle photography")
    print("   🔄 Iterations: Unlimited conversational edits")
    print("   📱 Formats: Instagram, stories, banners, hero images")
    
    print("\n🏆 DEMO COMPLETE!")
    print("=" * 50)
    print("Generated files:")
    for filename in ["demo_scene_initial.png", "demo_scene_with_props.png", 
                     "demo_scene_final.png"] + list(exported_files.values()):
        if os.path.exists(filename):
            print(f"   ✅ {filename}")
    
    print("\n🎬 Ready for hackathon submission!")
    print("This demo showcases Nano Banana's unique capabilities:")
    print("   • Multi-image scene fusion")
    print("   • Conversational editing without losing context")
    print("   • Professional composition and lighting")
    print("   • Brand-safe, marketing-ready outputs")

def quick_test():
    """
    Quick test to verify the system works with the existing cat image.
    """
    print("🧪 Quick Test - Using existing cat.png as product placeholder")
    print("=" * 50)
    
    API_KEY = "AIzaSyA7X1PH_P3B6nTRu5_bcPG1W6_o34cecLE"
    generator = ProductSceneGenerator(API_KEY)
    
    if not os.path.exists("cat.png"):
        print("❌ cat.png not found. Run example_cat_generation.py first.")
        return
    
    # Test scene generation
    try:
        print("Testing scene generation...")
        image = generator.generate_scene(
            product_image_path="cat.png",
            scene_preset="coffee_shop",
            product_description="cat"
        )
        image.save("test_coffee_shop.png")
        print("✅ Test successful! Generated test_coffee_shop.png")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        quick_test()
    else:
        run_demo_workflow()
