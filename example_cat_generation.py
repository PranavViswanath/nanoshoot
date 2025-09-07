import os
from google import genai
from PIL import Image
from io import BytesIO
from config import GOOGLE_AI_API_KEY

# --- IMPORTANT ---
# API key is now loaded from config.py which reads from environment variables
# For better security, set GOOGLE_AI_API_KEY in your .env file
API_KEY = GOOGLE_AI_API_KEY
# -----------------

# Configure the client with your API key
client = genai.Client(api_key=API_KEY)

# The text prompt for image generation
prompt = "Create a photorealistic image of an orange cat with green eyes, sitting on a couch."

print("Generating image...")

# Call the API to generate the image
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents=prompt,
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]
 
if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('cat.png')
    print("Image saved as 'cat.png'!")
    # Uncomment the line below if you want to display the image (requires Jupyter/IPython)
    # display(image)
else:
    print("No image was generated.")
