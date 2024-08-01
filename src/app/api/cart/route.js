import conn from '@/libs/mysql';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;
    
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    try {
      await conn.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
        [userId, productId, quantity, quantity]
      );
      res.status(200).json({ message: 'Product added to cart successfully!' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ message: 'Failed to add product to cart.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}