export type Component = {
  name: string;
  desciption: string;
  source: string;
};

export function componentPath(name: string) {
  return `/playground/components/${name}`;
}

export function componentDisplayName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export const components: Component[] = [
  {
    name: "3d-marquee",
    desciption:
      "A 3D Marquee effect with grid, good for showcasing testimonials and hero sections",
    source: "https://ui.aceternity.com/components/3d-marquee",
  },

  {
    name: "animated-testimonials",
    desciption: "Minimal testimonials sections with image and quote",
    source: "https://ui.aceternity.com/components/animated-testimonials",
  },

  {
    name: "apple-cards-carousel",
    desciption:
      "A sleek and minimal carousel implementation, as seen on apple.com",
    source: "https://ui.aceternity.com/components/apple-cards-carousel",
  },

  {
    name: "bento-grid",
    desciption:
      "A skewed grid layout with Title, description and a header component",
    source: "https://ui.aceternity.com/components/bento-grid",
  },

  {
    name: "container-text-flip",
    desciption: "A container that flips through words, animating the width",
    source: "https://ui.aceternity.com/components/container-text-flip",
  },
];
