'use client';

import AuthenticatedRoute from '@/components/AuthenticatedRoute';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import ProductCard from '@/components/ProductCard'; // Asegúrate de que la ruta sea correcta

const CustomStyles = {
  headCells: {
    style: {
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '#01587a',
      color: '#fff',
    },
  },
  cells: {
    style: {
      fontSize: '1rem',
      padding: '8px 16px',
    },
  },
  rows: {
    style: {
      minHeight: '72px', // override the row height
    },
  },
  pagination: {
    style: {
      border: 'none',
      color: '#01587a',
    },
  },
};

const StyledContainer = styled.div`
  background-color: #f4f4f4;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
  borderRadius: '0.5rem'

  h2 {
    color: #01587a;
  }

  h3 {
    color: #5cb3c1;
  }

  .card {
    background-color: #ffffff;
    color: #000000;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    borderRadius: '0.5rem'
  }
`;

const ReportsSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [salesItems, setSalesItems] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [mostSoldProduct, setMostSoldProduct] = useState({});

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('/api/sales');
        const data = await response.json();
        if (Array.isArray(data)) {
          setSales(data);
        } else {
          console.error("Unexpected data format for sales:", data);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    const fetchSalesItemsData = async () => {
      try {
        const response = await fetch('/api/sales_items');
        const data = await response.json();
        if (Array.isArray(data)) {
          setSalesItems(data);
        } else {
          console.error("Unexpected data format for sales items:", data);
        }
      } catch (error) {
        console.error("Error fetching sales items data:", error);
      }
    };

    const fetchReportsData = async () => {
      try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        if (data) {
          setTotalSales(data.totalSales);
          setMostSoldProduct(data.mostSoldProduct);
        } else {
          console.error("Unexpected data format for reports:", data);
        }
      } catch (error) {
        console.error("Error fetching reports data:", error);
      }
    };

    fetchSalesData();
    fetchSalesItemsData();
    fetchReportsData();
  }, []);

  const salesColumns = [
    { name: "Sale ID", selector: row => row.sale_id, sortable: true },
    { name: "User ID", selector: row => row.user_id, sortable: true },
    { name: "Total", selector: row => row.total, sortable: true },
    { name: "Created At", selector: row => new Date(row.createdAt).toLocaleString(), sortable: true }
  ];

  const salesItemsColumns = [
    { name: "Sale Item ID", selector: row => row.sale_item_id, sortable: true },
    { name: "Sale ID", selector: row => row.sale_id, sortable: true },
    { name: "Product ID", selector: row => row.product_id, sortable: true },
    { name: "Quantity", selector: row => row.quantity, sortable: true },
    { name: "Price", selector: row => row.price, sortable: true },
    { name: "Created At", selector: row => new Date(row.createdAt).toLocaleString(), sortable: true }
  ];

  return (
    <AuthenticatedRoute allowedRoles={[1]}>  {/* Only admins */}
      <StyledContainer>
        <main className="flex-grow container mx-auto p-8 flex flex-col justify-between">
          <section className="text-center mb-8 mt-20">
            <h2 className="text-4xl font-extrabold mb-4">Sales Overview</h2>
            <p className="text-2xl mb-8">Overview of all sales and sales items.</p>

            <div className="grid grid-cols-1 gap-4 mb-8 w-auto h-auto">
              {/* Ganancias */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-2">Total Sales</h3>
                <p className="text-xl">${totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              </div>

              {/* Producto más vendido */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-2 w-auto h-24 justify-center align-items">Most Sold Product</h3>
                {mostSoldProduct.product_id ? (
                  <ProductCard
                    key={mostSoldProduct.product_id}
                    product={{
                      product_id: mostSoldProduct.product_id,
                      name: mostSoldProduct.name,
                      price: mostSoldProduct.price,
                      image: mostSoldProduct.image,
                    }}
                  />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-3xl font-semibold mb-4">Sales</h3>
              <DataTable
                columns={salesColumns}
                data={sales}
                customStyles={CustomStyles}
                pagination
                responsive
                striped
                highlightOnHover
              />
            </div>

            <div className="mb-8">
              <h3 className="text-3xl font-semibold mb-4">Sales Items</h3>
              <DataTable
                columns={salesItemsColumns}
                data={salesItems}
                customStyles={CustomStyles}
                pagination
                responsive
                striped
                highlightOnHover
              />
            </div>
          </section>
        </main>
      </StyledContainer>
    </AuthenticatedRoute>
  );
};

export default ReportsSalesPage;
