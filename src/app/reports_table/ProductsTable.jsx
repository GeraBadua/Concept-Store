'use client';

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/getProducts');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch products', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Price', selector: row => row.price, sortable: true },
        // Agrega más columnas según las que tengas en tu tabla 'product'
    ];

    return (
        <DataTable
            title="Products"
            columns={columns}
            data={products}
            progressPending={loading}
            pagination
        />
    );
};

export default ProductsTable;
