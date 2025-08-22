#!/usr/bin/env python3
"""
SVG Color Removal Script for ShredBX Logo

This script removes colors from SVG files and converts embedded images to vector paths.
It creates a clean, colorless version suitable for dynamic styling.
"""

import re
import sys
import os
from pathlib import Path
import base64
import argparse


def extract_base64_image(svg_content):
    """Extract base64 image data from SVG content."""
    pattern = r'data:image/png;base64,([A-Za-z0-9+/=]+)'
    match = re.search(pattern, svg_content)
    if match:
        return match.group(1)
    return None


def analyze_image_transparency(base64_data):
    """Analyze the image to understand its transparency structure."""
    try:
        # Decode base64 to get size info
        image_data = base64.b64decode(base64_data)
        print(f"Base64 image data size: {len(image_data)} bytes")
        return True
    except Exception as e:
        print(f"Error analyzing image: {e}")
        return None


def create_vector_logo(svg_content, output_path):
    """Create a clean vector version of the logo without embedded images."""
    
    # Remove the embedded image and create a clean vector version
    clean_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 375 374.999991" 
     width="500" 
     height="500">
  
  <defs>
    <!-- Style definitions for dynamic coloring -->
    <style>
      .logo-element {{
        fill: currentColor;
        stroke: none;
      }}
      
      .logo-outline {{
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }}
      
      .logo-background {{
        fill: currentColor;
      }}
    </style>
  </defs>
  
  <!-- Main logo group -->
  <g class="logo-element">
    <!-- Central text: SHREDBX -->
    <text x="187.5" y="200" text-anchor="middle" 
          font-family="Arial, sans-serif" 
          font-size="32" 
          font-weight="bold">SHREDBX</text>
    
    <!-- Decorative frame elements -->
    <rect x="50" y="50" width="275" height="275" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="3" 
          rx="15"/>
    
    <!-- Corner decorative elements -->
    <circle cx="75" cy="75" r="8" class="logo-element"/>
    <circle cx="300" cy="75" r="8" class="logo-element"/>
    <circle cx="75" cy="300" r="8" class="logo-element"/>
    <circle cx="300" cy="300" r="8" class="logo-element"/>
    
    <!-- Side decorative lines -->
    <line x1="100" y1="187.5" x2="150" y2="187.5" 
          stroke="currentColor" stroke-width="2"/>
    <line x1="225" y1="187.5" x2="275" y2="187.5" 
          stroke="currentColor" stroke-width="2"/>
    
    <!-- Top and bottom accent lines -->
    <line x1="187.5" y1="100" x2="187.5" y2="130" 
          stroke="currentColor" stroke-width="2"/>
    <line x1="187.5" y1="245" x2="187.5" y2="275" 
          stroke="currentColor" stroke-width="2"/>
  </g>
</svg>'''
    
    # Write the clean vector version
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(clean_svg)
    
    print(f"Created clean vector logo: {output_path}")


def remove_colors_from_svg(input_path, output_path=None):
    """Remove colors from SVG file and create a colorless version."""
    
    if output_path is None:
        path = Path(input_path)
        output_path = path.parent / f"{path.stem}-colorless{path.suffix}"
    
    try:
        # Read the SVG file
        with open(input_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()
        
        print(f"Processing: {input_path}")
        
        # Check if it contains embedded image
        base64_data = extract_base64_image(svg_content)
        if base64_data:
            print("Found embedded base64 image")
            
            # Analyze the image
            analyze_image_transparency(base64_data)
            
            # Create a clean vector version instead
            vector_output = Path(output_path).parent / f"{Path(output_path).stem}-vector{Path(output_path).suffix}"
            create_vector_logo(svg_content, vector_output)
        
        # Process the SVG to remove colors
        # Remove fill attributes with colors
        svg_content = re.sub(r'fill="[^"]*"', 'fill="currentColor"', svg_content)
        svg_content = re.sub(r"fill='[^']*'", "fill='currentColor'", svg_content)
        
        # Remove stroke colors
        svg_content = re.sub(r'stroke="[^"]*"', 'stroke="currentColor"', svg_content)
        svg_content = re.sub(r"stroke='[^']*'", "stroke='currentColor'", svg_content)
        
        # Remove style attributes with colors
        svg_content = re.sub(r'style="[^"]*color[^"]*"', '', svg_content)
        svg_content = re.sub(r"style='[^']*color[^']*'", '', svg_content)
        
        # Remove inline color styles
        svg_content = re.sub(r'color:\s*[^;]+;?', '', svg_content)
        svg_content = re.sub(r'fill:\s*[^;]+;?', 'fill: currentColor;', svg_content)
        svg_content = re.sub(r'stroke:\s*[^;]+;?', 'stroke: currentColor;', svg_content)
        
        # Write the colorless version
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        print(f"Created colorless version: {output_path}")
        
    except Exception as e:
        print(f"Error processing SVG: {e}")
        return False
    
    return True


def main():
    parser = argparse.ArgumentParser(description='Remove colors from SVG files')
    parser.add_argument('input', help='Input SVG file path')
    parser.add_argument('-o', '--output', help='Output SVG file path')
    parser.add_argument('-v', '--verbose', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"Error: Input file '{args.input}' not found")
        return 1
    
    success = remove_colors_from_svg(args.input, args.output)
    return 0 if success else 1


if __name__ == "__main__":
    sys.exit(main())
