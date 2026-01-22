import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productSize, setProductSize] = useState("");

  const [productISBN, setProductISBN] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [language, setLanguage] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
const [isBestSeller, setIsBestSeller] = useState(false);
const [isTrending, setIsTrending] = useState(false);
const [isFeatured, setIsFeatured] = useState(false);
const [isSpecial, setIsSpecial] = useState(false);
const [productTag, setProductTag] = useState([]); // ✅ array
const [features, setFeatures] = useState([]);     // ✅ array

const [decorationMethods, setDecorationMethods] = useState([
  { name: "", note: "" },
]);

 
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState("");
  const [closureType, setClosureType] = useState("");
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);

  const [videoOrAudioFile, setVideoOrAudioFile] =  useState(null);
  const [supportingFile, setSupportingFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const [grandParents, setGrandParents] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  const [selectedGrandParent, setSelectedGrandParent] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");

  const [newSubCategory, setNewSubCategory] = useState("");
  const navigate = useNavigate();

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/db/categories`);
    const allCategories = res.data;

    setGrandParents(allCategories); // They are already top-level categories
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
 const fetchBrands = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/db/brands`);
      setBrands(res.data); // assuming API returns [{ _id, name, image }]
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

const handleGrandParentChange = (e) => {
  const grandParentId = e.target.value;
  setSelectedGrandParent(grandParentId);
  setSelectedParent("");
  setSelectedChild("");

  // find the selected grandparent
  const grandParent = grandParents.find(cat => cat._id === grandParentId);
  setParents(grandParent ? grandParent.children : []);
  setChildren([]);
};

const handleParentChange = (e) => {
  const parentId = e.target.value;
  setSelectedParent(parentId);
  setSelectedChild("");

  const parent = parents.find(cat => cat._id === parentId);
  setChildren(parent ? parent.children : []);
};


  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== "") {
      setSubCategories([...subCategories, newSubCategory.trim()]);
      setNewSubCategory("");
    }
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...subCategories];
    updated.splice(index, 1);
    setSubCategories(updated);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
// Predefined colors (can also fetch from backend if you want dynamic)
const availableColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Gray", hex: "#808080" },
  { name: "Navy", hex: "#001F54" },
  { name: "Orange", hex: "#FFA500" },
];

const [selectedColors, setSelectedColors] = useState([]);

// Handle selecting/unselecting colors
const toggleColor = (color) => {
  if (selectedColors.includes(color)) {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  } else {
    if (selectedColors.length < 10) {
      setSelectedColors([...selectedColors, color]);
    }
  }
};


const AVAILABLE_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const [sizes, setSizes] = useState(
  AVAILABLE_SIZES.map((size) => ({
    label: size,
    quantity: 0,
  }))
);


const handleSubmit = async () => {
  setLoading(true);

  try {
    const formData = new FormData();

    /* =======================
       BASIC PRODUCT INFO
    ======================= */
    if (productName) formData.append("name", productName);
    if (productDescription) formData.append("description", productDescription);
    if (productPrice) formData.append("price", productPrice);
   
    if (productType) formData.append("type", productType);
if (productTag.length > 0) {
  productTag.forEach((tag) => formData.append("tag", tag));
}

if (features.length > 0) {
  features.forEach((feature) => formData.append("features", feature));
}


    /* =======================
       SIZES & STOCK (IMPORTANT)
    ======================= */
    const filteredSizes = sizes.filter(
      (s) => s.quantity && Number(s.quantity) > 0
    );

    if (filteredSizes.length > 0) {
      formData.append("sizes", JSON.stringify(filteredSizes));
    }

    /* =======================
       MINIMUM QUANTITY
    ======================= */
    if (minimumQuantity) {
      formData.append("minimumQuantity", minimumQuantity);
    }

    /* =======================
       COLORS
    ======================= */
    // if (Array.isArray(selectedColors) && selectedColors.length > 0) {
    //   selectedColors.forEach((color) => {
    //     formData.append("color", color);
    //   });
    // }

    /* =======================
       DECORATION METHODS
    ======================= */
    if (Array.isArray(decorationMethods) && decorationMethods.length > 0) {
      decorationMethods
        .filter((method) => method.name && method.name.trim() !== "")
        .forEach((method, index) => {
          formData.append(`decorationMethods[${index}][name]`, method.name);
          formData.append(
            `decorationMethods[${index}][note]`,
            method.note || ""
          );
        });
    }

    /* =======================
       FEATURES
    ======================= */
    if (Array.isArray(features) && features.length > 0) {
      features.forEach((feature) => {
        formData.append("features", feature);
      });
    }

    /* =======================
       EXTRA DETAILS
    ======================= */
    if (material) formData.append("material", material);
    if (weight) formData.append("weight", weight);
    if (brand) formData.append("brand", brand);
    if (closureType) formData.append("closureType", closureType);

    /* =======================
       CATEGORY (SMART FALLBACK)
    ======================= */
    if (selectedChild) {
      formData.append("category", selectedChild);
    } else if (selectedParent) {
      formData.append("category", selectedParent);
    } else if (selectedGrandParent) {
      formData.append("category", selectedGrandParent);
    }

    /* =======================
       IMAGES
    ======================= */
    if (Array.isArray(productImages) && productImages.length > 0) {
      productImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    /* =======================
       OPTIONAL SUPPORTING FILE
    ======================= */
    if (supportingFile) {
      formData.append("supportingFile", supportingFile);
    }

    /* =======================
       PRODUCT FLAGS
    ======================= */
    formData.append("isBestSeller", isBestSeller ? "true" : "false");
    formData.append("isTrending", isTrending ? "true" : "false");
    formData.append("isFeatured", isFeatured ? "true" : "false");
    formData.append("isSpecial", isSpecial ? "true" : "false");

    /* =======================
       DEBUG (OPTIONAL)
    ======================= */
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    /* =======================
       API REQUEST
    ======================= */
    const productRes = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/db/create-product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  toast.success("Product added successfully!", {
  position: "top-right",
  autoClose: 3000,
});

console.log("✅ Product created:", productRes.data);

// Navigate after toast finishes
setTimeout(() => {
  navigate("/products");
}, 3100); // slightly longer than autoClose

  } catch (error) {
    console.error("❌ Error creating product:", error);
     const errorMessage = error.response?.data?.message || error.message || "Failed to add product";
    toast.error(`Error: ${errorMessage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } finally {
    setLoading(false);
  }
};



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // ✅ Convert to array
    setProductImages(files);
  };
const ArrayInputField = ({ label, values, setValues }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      setValues([...values, trimmed]);
      setInput("");
    }
  };

  const handleRemove = (item) => {
    setValues(values.filter((v) => v !== item));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="mb-4">

      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((val) => (
          <span
            key={val}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1"
          >
            {val}{" "}
            <button
              type="button"
              onClick={() => handleRemove(val)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add ${label.toLowerCase()}`}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            style={{ backgroundColor: "#8b023a" }}
        >
          +
        </button>
      </div>
    </div>
  );
};

  return (
    <>
         <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Product Price */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
       
        </div>
   <div className="mb-6">
  <label className="block mb-2 font-medium">
    Sizes & Stock
  </label>

  <div className="grid grid-cols-2 gap-3">
    {sizes.map((size, index) => (
      <div key={size.label} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={size.quantity > 0}
          onChange={(e) => {
            const updated = [...sizes];
            updated[index].quantity = e.target.checked ? 1 : 0;
            setSizes(updated);
          }}
        />

        <span className="w-10">{size.label}</span>

        <input
          type="number"
          min="0"
          value={size.quantity}
          onChange={(e) => {
            const updated = [...sizes];
            updated[index].quantity = Number(e.target.value);
            setSizes(updated);
          }}
          className="w-20 p-1 border rounded"
        />
      </div>
    ))}
  </div>
</div>

 {/* Grandparent Category */}
   <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Material</label>
            <input
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
<div>
  <label className="block mb-1 font-medium">Fabric Weight</label>
  <div className="flex items-center">
    <input
      type="number"
      step="0.01"
      min="0"
      placeholder="4.5"
      value={weight}
      onChange={(e) => setWeight(Number(e.target.value))}
      className="w-full p-2 border rounded"
    />
    <span className="ml-2 font-medium">oz/yd²</span>
  </div>
  <p className="text-sm text-gray-500 mt-1">
    Typical clothing weight: 3–6 oz/yd² (light t-shirt ≈ 4 oz/yd²)
  </p>
</div>



        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
   
   <div>
  <label className="block mb-1 font-medium">Closure Type</label>
  <select
    value={closureType}
    onChange={(e) => setClosureType(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Closure Type --</option>
    <option value="No Closure">No Closure</option>
    <option value="Zipper">Zipper</option>
    <option value="Buttons">Buttons</option>
    <option value="Hooks">Hooks</option>
    <option value="Velcro">Velcro</option>
  </select>
</div>

        </div>
<ArrayInputField
  label="Tags"
  values={productTag}
  setValues={setProductTag}
/>

<ArrayInputField
  label="Features"
  values={features}
  setValues={setFeatures}

/>




{/* <div className="mb-4">
  <label className="block mb-2 font-medium">Select Colors</label>
  <div className="flex flex-wrap gap-2">
    {availableColors.map((color) => (
      <div
        key={color.name}
        className={`w-10 h-10 rounded cursor-pointer border-2 ${
          selectedColors.includes(color.name)
            ? "border-blue-500"
            : "border-gray-300"
        }`}
        style={{ backgroundColor: color.hex }}
        onClick={() => toggleColor(color.name)}
      />
    ))}
  </div>
  <div className="mt-2 text-sm text-gray-600">
    Selected: {selectedColors.join(", ") || "None"}
  </div>
</div> */}


        {/* Parent Category */}
  {/* Grandparent */}
<div className="mb-4">
  <label className="block mb-1 font-medium"> Category</label>
  <select
    value={selectedGrandParent}
    onChange={handleGrandParentChange}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select category --</option>
    {grandParents.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Parent */}
<div className="mb-4">
  <label className="block mb-1 font-medium"> Category</label>
  <select
    value={selectedParent}
    onChange={handleParentChange}
    className="w-full p-2 border rounded"
    disabled={!parents.length}
  >
    <option value=""></option>
    {parents.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Child */}
<div className="mb-4">
  <label className="block mb-1 font-medium"> Category</label>
  <select
    value={selectedChild}
    onChange={(e) => setSelectedChild(e.target.value)}
    className="w-full p-2 border rounded"
    disabled={!children.length}
  >
    <option value=""></option>
    {children.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>


        {/* Product Type */}
<div className="mb-4">
  <label className="block mb-1 font-medium">
    Upload Product Images / Videos
  </label>

  <input
    type="file"
    multiple
    accept="image/*,video/*"
    onChange={(e) => setProductImages([...e.target.files])}
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">Product Highlights</label>
  <div className="flex gap-4">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isBestSeller}
        onChange={(e) => setIsBestSeller(e.target.checked)}
      />
      Best Seller
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isTrending}
        onChange={(e) => setIsTrending(e.target.checked)}
      />
      Trending
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isFeatured}
        onChange={(e) => setIsFeatured(e.target.checked)}
      />
      Featured
    </label>
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isSpecial}
        onChange={(e) => setIsSpecial(e.target.checked)}
      />
      Special
    </label>
  </div>
</div>

        {/* Submit Button */}
        {/*} <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Submit Product
          </button>
        </div>*/}

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            style={{ backgroundColor: "#8b023a" }}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
