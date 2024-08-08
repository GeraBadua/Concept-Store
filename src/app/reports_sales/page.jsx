'use client';

import AuthenticatedRoute from '@/components/AuthenticatedRoute';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ProductCard from '@/components/ProductCard'; // Asegúrate de que la ruta sea correcta

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
      <div className="min-h-screen flex flex-row bg-cover bg-center text-white">
        <main className="flex-grow container mx-auto p-8 flex flex-row justify-center">
          <section className="text-center mb-8 mt-20">
            <h2 className="text-8xl font-extrabold mb-4" style={{ color: '#01587a' }}>Sales Overview</h2>
            <p className="text-2xl mb-8" style={{ color: '#5cb3c1' }}>Overview of all sales and sales items.</p>

            <div className="grid grid-rows-1 gap-4 h-min">
              {/* Ganancias */}
              <div className="bg-white text-black p-5 rounded-lg shadow-lg justify-center align-items h-fit object-cover">
                <h3 className="text-4xl font-bold mb-2 justify-center align-items">Total Sales</h3>
                <p className="text-xl justify-center align-items">${totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              </div>

              {/* Producto más vendido */}
              <div className="bg-white from-slate-300 text-black p-5 rounded-lg shadow-lg justify-center align-items object-cover object-cover gap-4">
                <h3 className="text-4xl font-bold mb-2">Most Sold Product</h3>
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
                <br></br>
            <div className="mb-8">
              <h3 className="text-4xl font-semibold mb-4">Sales</h3>
              <DataTable
                columns={salesColumns}
                data={sales}
                responsive
                striped
                pagination
                highlightOnHover
                customStyles={{
                  table: {
                    style: {
                      borderRadius: '0.5rem', // Aplicar borde redondeado
                    },
                  },
                }}
              />
            </div>

            <div className="mb-8">
              <h3 className="text-4xl font-semibold mb-4">Sales Items</h3>
              <DataTable
                columns={salesItemsColumns}
                data={salesItems}
                responsive
                striped
                pagination
                highlightOnHover
                customStyles={{
                  table: {
                    style: {
                      borderRadius: '0.5rem', // Aplicar borde redondeado
                    },
                  },
                }}
              />
            </div>
          </section>
        </main>
      </div>
    </AuthenticatedRoute>
  );
};

export default ReportsSalesPage;
