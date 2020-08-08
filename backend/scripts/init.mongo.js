db.products.remove({});

const initialProducts = [
    {
        productId: "1",
        name: "Laptop",
        description: "Laptops for Pros",
        price: 45000,
        quantity: 20,
        images: [],
        thumbnail: '',
    },
    {
        productId: "2",
        name: "Jeans",
        description: "Jeans Savvy",
        price: 3000,
        quantity: 20,
        images: [],
        thumbnail: '',
    },
    {
        productId: "3",
        name: "Shirts",
        description: "Shirts for the Superhero in you",
        price: 1000,
        quantity: 40,
        images: [],
        thumbnail: '',
    },
    {
        productId: "4",
        name: "T-Shirts",
        description: "T-Shirts!!!",
        price: 500,
        quantity: 60,
        images: [],
        thumbnail: '',
    },
    {
        productId: "5",
        name: "Bermuda Shorts",
        description: "kids will love it !!",
        price: 1000,
        quantity: 40,
        images: [],
        thumbnail: '',
    },
    {
        productId: "6",
        name: "Sunglasses",
        description: "Look crazy in the heat",
        price: 1200,
        quantity: 40,
        images: [],
        thumbnail: '',
    },
    {
        productId: "7",
        name: "Sarees",
        description: "The novelty of India",
        price: 2200,
        quantity: 30,
        images: [],
        thumbnail: '',
    },
    {
        productId: "8",
        name: "Bedsheet",
        description: "To sleep well at night",
        price: 3000,
        quantity: 10,
        images: [],
        thumbnail: '',
    }
];

db.products.insertMany(initialProducts);
const count = initialProducts.length;
print("Inserted", count, "Products");
db.products.createIndex({ productId: 1 }, { unique: true });