'use client';

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const fetchData = async (endpoint) => {
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return data;
};

const ReportsSales = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const sales = await fetchData('/api/product');
                setSalesData(sales);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    const salesColumns = [
        { name: 'Sale ID', selector: row => row.sale_id, sortable: true },
        { name: 'User ID', selector: row => row.user_id, sortable: true },
        { name: 'Total', selector: row => row.total, sortable: true },
        { name: 'Created At', selector: row => row.createdAt, sortable: true }
    ];

    return (
        <div>
            <h1 className='text-white'>Sales Table</h1>
            <DataTable
                columns={salesColumns}
                data={salesData}
                pagination
            />
        </div>
    );
};

export default ReportsSales;
