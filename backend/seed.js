const sqlite3 =
  require('sqlite3').verbose();

const db =
  new sqlite3.Database('./store.db');

const products = [

  {
    title:'RTX 4090',
    specs:'24GB GDDR6X',
    description:'Flagship GPU',
    price:199990,
    inStock:1,
    brand:'NVIDIA',
    memory:'24GB',
    boostClock:'2520 MHz',
    power:'450W',
    image:'images/rtx4090.png'
  }

];

products.forEach(product => {

  db.run(
    `
    INSERT INTO products (

      title,
      specs,
      description,
      price,
      inStock,
      brand,
      memory,
      boostClock,
      power,
      image

    )
    VALUES (?,?,?,?,?,?,?,?,?,?)
    `,
    [
      product.title,
      product.specs,
      product.description,
      product.price,
      product.inStock,
      product.brand,
      product.memory,
      product.boostClock,
      product.power,
      product.image
    ]
  );
});

console.log('Products inserted');