import Layout from '../components/mainLayout'
import ProductGrid from '../components/productGrid';

const products = [
    {
        id: 1,
        name: '',
        description: 'Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.',
        price: 20,
        image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        rating: 5.0
    },
    {
        id: 1,
        name: 'Wooden House, Florida',
        description: 'Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.',
        price: 12,
        image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        rating: 5.0
    },
    {
        id: 1,
        name: 'Wooden House, Florida',
        description: 'Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        rating: 5.0
    },
    {
        id: 1,
        name: 'Wooden House, Florida',
        description: 'Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.',
        price: 22.16,
        image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        rating: 5.0
    },
    // ... more products
];

export default function Home() {
    return (
        <Layout>
            <div>
                <h1>My Projects</h1>
                <ProductGrid products={products} />
            </div>

        </Layout>
    )
}