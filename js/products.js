// js/products.js

const PRODUCTS = [
  {
    id: 1,
    title: "NVIDIA GeForce RTX 4090",
    specs: "24GB GDDR6X · PCIe 4.0",

    description:
      "Flagship graphics card for 4K gaming, AI workloads, and professional rendering.",

    price: 2199,

    inStock: true,

    brand: "NVIDIA",
    memory: "24GB",
    boostClock: "2520 MHz",
    power: "450W",

    images: [
      "images/rtx4090-1.png",
      "images/rtx4090-2.jpeg",
      "images/rtx4090-3.jpeg"
    ]
  },

  {
    id: 2,
    title: "NVIDIA GeForce RTX 4080",
    specs: "16GB GDDR6X · PCIe 4.0",

    description:
      "High-performance GPU for gaming, streaming, and creative workloads.",

    price: 1399,

    inStock: true,

    brand: "NVIDIA",
    memory: "16GB",
    boostClock: "2505 MHz",
    power: "320W",

    images: [
      "images/rtx4080-1.png",
      "images/rtx4080-2.png",
      "images/rtx4080-3.png"
    ]
  },

  {
    id: 3,
    title: "AMD Radeon RX 7900 XTX",
    specs: "24GB GDDR6 · PCIe 4.0",

    description:
      "AMD flagship GPU with outstanding gaming and rendering performance.",

    price: 1499,

    inStock: false,

    brand: "AMD",
    memory: "24GB",
    boostClock: "2500 MHz",
    power: "355W",

    images: [
      "images/rtx7900xtx-1.png",
      "images/rtx7900xtx-2.png",
      "images/rtx7900xtx-3.jpeg"
    ]
  }
];

PRODUCTS.forEach(product => {

  product.image =
    product.images?.[0]
    || "images/placeholder.png";

});