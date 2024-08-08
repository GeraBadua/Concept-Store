"use client";

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';

function ProviderForm({ provider = {} }) {
  const [formState, setFormState] = useState({
    name: provider.name || "",
    address: provider.address || "",
    phone: provider.phone || "",
    email: provider.email || "",
  });
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleClose = () => {
    router.push("/providers");
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!params.id_provider) {
        await axios.post("/api/providers", formState);
        Toast.fire({
          icon: 'success',
          title: 'Proveedor creado exitosamente'
        });
      } else {
        await axios.put(`/api/providers/${params.id_provider}`, formState);
        Toast.fire({
          icon: 'success',
          title: 'Proveedor actualizado exitosamente'
        });
      }
      router.push("/providers");
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al enviar el formulario'
      });
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <form onSubmit={handleSubmit} ref={form}>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nombre del Proveedor:
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          value={formState.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          required
        />

        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
          Dirección:
        </label>
        <input
          name="address"
          type="text"
          placeholder="Dirección"
          value={formState.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
          Teléfono:
        </label>
        <input
          name="phone"
          type="text"
          placeholder="Teléfono"
          value={formState.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          name="email"
          type="email"
          placeholder="Correo Electrónico"
          value={formState.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 mt-4"
        >
          Save
        </button>
      </form>
        <button
        onClick={handleClose}
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Cancel
      </button>
    </div>
  );
}

export default ProviderForm;
