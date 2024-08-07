'use client';

import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');



const fetchData = async (endpoint) => {
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return data;
};

const ReportsProducts = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const products = await fetchData('/api/products');
                console.log(products); // Verifica la estructura de los datos aquí
                setProductData(products);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, []);

    const productColumns = [
        { name: 'Product ID', selector: row => row.id_product, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Price', selector: row => row.price, sortable: true },
        { name: 'Inventory', selector: row => row.inventory, sortable: true },
        { name: 'Provider ID', selector: row => row.id_provider, sortable: true },
        { name: 'Created At', selector: row => row.createdAt, sortable: true }
    ];

    return (
        <div>
            <DataTable
            title="Products"
            columns={productColumns}
            data={productData}
            pagination
            theme="solarized"
  />
        </div>
    );
};

export default ReportsProducts;
