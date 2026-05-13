// js/products.js

const PRODUCTS = [
  {
    id:1,
    title:"NVIDIA GeForce RTX 4090",
    specs:"24GB GDDR6X · PCIe 4.0",
    description:"Флагманская видеокарта для 4K-гейминга, AI и рендера.",
    price:199990,
    inStock:true,
    brand:"NVIDIA",
    memory:"24GB",
    boostClock:"2520 MHz",
    power:"450W",
    images:[
      "images/rtx4090-1.png",
      "images/rtx4090-2.jpeg",
      "images/rtx4090-3.jpeg"
    ]
  },

  {
    id:2,
    title:"NVIDIA GeForce RTX 4080",
    specs:"16GB GDDR6X · PCIe 4.0",
    description:"Мощная видеокарта для игр и профессиональных задач.",
    price:129990,
    inStock:true,
    brand:"NVIDIA",
    memory:"16GB",
    boostClock:"2505 MHz",
    power:"320W",
    images:[
      "images/rtx4080-1.jpeg",
      "images/rtx4080-2.png",
      "images/rtx4080-3.png"
    ]
  },

  {
    id:3,
    title:"AMD Radeon RX 7900 XTX",
    specs:"24GB GDDR6 · PCIe 4.0",
    description:"Флагман AMD с высокой производительностью.",
    price:139990,
    inStock:false,
    brand:"AMD",
    memory:"24GB",
    boostClock:"2500 MHz",
    power:"355W",
    images:[
      "images/rtx7900xtx-1.png",
      "images/rtx7900xtx-2.png",
      "images/rtx7900xtx-3.jpeg"
    ]
  }
];

PRODUCTS.forEach(product => {

  product.image =
    product.images?.[0]
    || 'images/placeholder.png';

});