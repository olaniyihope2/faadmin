
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash,
  Mail,
  UserPlus,
} from "lucide-react";
import { LuView } from "react-icons/lu";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/db/products`);
        const data = await res.json();

        console.log("Fetched products:", data);

        const cleanedProducts = data.map((product) => ({
          ...product,
          name: product.name.trim(),
        }));

        setProducts(cleanedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // const handleAction = (action, product) => {
  //   setOpenDropdownId(null);

  //   switch (action) {
  //     case "view":
  //       navigate(`/product/${product._id}`);
  //       break;
  //     case "edit":
  //       navigate(`/edit-product/${product._id}`);
  //       break;
  //      case "delete":
  //     if (window.confirm("Are you sure you want to delete this product?")) {
  //       try {
  //         const response = await fetch(
  //           `https://faclothingapi.vercel.app/api/db/product/${product._id}`,
  //           {
  //             method: "DELETE",
  //             headers: {
  //               "Content-Type": "application/json",
  //               // Add Authorization header if needed
  //               // "Authorization": `Bearer ${token}`
  //             },
  //           }
  //         );

  //         if (response.ok) {
  //           alert("Product deleted successfully");
  //           // Optional: remove product from frontend state
  //           setProducts(prev => prev.filter(p => p._id !== product._id));
  //         } else {
  //           const data = await response.json();
  //           alert("Failed to delete product: " + data.message);
  //         }
  //       } catch (error) {
  //         console.error("Error deleting product:", error);
  //         alert("Error deleting product");
  //       }
  //     }
  //     break;
  //     case "email":
  //       console.log("Email about product:", product);
  //       break;
  //     case "promote":
  //       console.log("Promote product:", product);
  //       break;
  //     default:
  //       break;
  //   }
  // };
const handleAction = async (action, product) => {
  setOpenDropdownId(null);

  switch (action) {
    case "view":
      navigate(`/product/${product._id}`);
      break;
    case "edit":
      navigate(`/edit-product/${product._id}`);
      break;
    case "delete":
      if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          const response = await fetch(
            `https://faclothingapi.vercel.app/api/db/product/${product._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                // Add Authorization header if needed
                // "Authorization": `Bearer ${token}`
              },
            }
          );

          if (response.ok) {
            alert("Product deleted successfully");
            // Optional: remove product from frontend state
            setProducts(prev => prev.filter(p => p._id !== product._id));
          } else {
            const data = await response.json();
            alert("Failed to delete product: " + data.message);
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Error deleting product");
        }
      }
      break;
    case "email":
      console.log("Email about product:", product);
      break;
    case "promote":
      console.log("Promote product:", product);
      break;
    default:
      break;
  }
};

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="w-full px-3 lg:px-[8rem]">
        <div className="px-4 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600 mt-1">
            View and manage all your clothing products
          </p>
        </div>

        {/* Search + Add button */}
        <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="btn w-full lg:w-[20%]">
            <button
              className="px-6 py-3 bg-secondary text-white w-full rounded-md hover:bg-blue-600"
              onClick={() => navigate("/add-product")}
              style={{ backgroundColor: "#8b023a" }}
            >
              Add New Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                 {/*} <td className="px-6 py-4 text-sm text-gray-700">
                    {product.grandParentCategory?.name} &raquo;{" "}
                    {product.parentCategory?.name} &raquo;{" "}
                    {product.category?.name}
                  </td>*/}

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {[
          product.grandParentCategory?.name,
          product.parentCategory?.name,
          product.category?.name,
        ]
          .filter(Boolean)
          .join(" → ")}
      </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.type}
                  </td>
               <td className="px-6 py-4 text-sm text-gray-700">
  {typeof product.brand === "string"
    ? product.brand
    : product.brand?.name || "—"}
</td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.color?.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.size?.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.quantityAvailable}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    ₦{product.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₦{product.discountPrice?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center relative">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === product._id ? null : product._id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdownId === product._id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={() => handleAction("view", product)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <LuView className="w-4 h-4 mr-2" /> View
                          </button>
                          <button
                            onClick={() => handleAction("edit", product)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => handleAction("email", product)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Mail className="w-4 h-4 mr-2" /> Send Email
                          </button>
                          <button
                            onClick={() => handleAction("promote", product)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <UserPlus className="w-4 h-4 mr-2" /> Promote
                          </button>
                          <button
                            onClick={() => handleAction("delete", product)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
