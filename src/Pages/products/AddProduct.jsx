import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productSize, setProductSize] = useState("");
  const [productTag, setProductTag] = useState("");
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

const [decorationMethods, setDecorationMethods] = useState([
  { name: "", note: "" },
]);

  const [features, setFeatures] = useState("");
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

  // Fetch all categories
  // const fetchCategories = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/categories`
  //     );
  //     const allCategories = res.data;
  //     setCategories(allCategories);

  //     // Parent categories are those with null or no parent
  //     const parents = allCategories.filter(
  //       (cat) => !cat.parent || cat.parent === null
  //     );
  //     setParentCategories(parents);
  //   } catch (error) {
  //     console.error("Failed to fetch categories:", error);
  //   }
  // };
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


  // Handle parent selection
  // const handleParentChange = (e) => {
  //   const parentId = e.target.value;
  //   setSelectedParentId(parentId);
  //   setSelectedChildId("");

  //   const children = categories.filter((cat) => cat.parent === parentId);
  //   setChildCategories(children);
  // };
  // const handleParentChange = (e) => {
  //   const parentId = e.target.value;
  //   setSelectedParentId(parentId);
  //   setSelectedChildId("");

  //   const children = categories.filter((cat) => {
  //     // Normalize the parent ID
  //     if (!cat.parent) return false;

  //     const catParentId =
  //       typeof cat.parent === "string" ? cat.parent : cat.parent._id;

  //     return catParentId === parentId;
  //   });
  //   console.log("Parent ID:", selectedParentId);
  //   console.log("All categories:", categories);
  //   console.log("Filtered children:", childCategories);

  //   setChildCategories(children);
  // };
  // const handleParentChange = (e) => {
  //   const parentId = e.target.value;
  //   setSelectedParentId(parentId);
  //   setSelectedChildId("");

  //   const selectedParent = categories.find((cat) => cat._id === parentId);

  //   const children =
  //     selectedParent?.children?.filter((child) => {
  //       // Optional: Filter out products if you only want subcategories
  //       return child.name && child._id;
  //     }) || [];

  //   console.log("Parent ID:", parentId);
  //   console.log("Selected Parent:", selectedParent);
  //   console.log("Filtered children:", children);

  //   setChildCategories(children);
  // };

  // Handle grandparent change
  // const handleGrandParentChange = (e) => {
  //   const grandParentId = e.target.value;
  //   setSelectedGrandParent(grandParentId);
  //   setSelectedParent("");
  //   setSelectedChild("");

  //   // Find parents of this grandparent
  //   const parentsList = categories.filter(
  //     (cat) =>
  //       cat.parent &&
  //       (typeof cat.parent === "string"
  //         ? cat.parent === grandParentId
  //         : cat.parent._id === grandParentId)
  //   );
  //   setParents(parentsList);
  //   setChildren([]);
  // };


  // Handle parent change
  // const handleParentChange = (e) => {
  //   const parentId = e.target.value;
  //   setSelectedParent(parentId);
  //   setSelectedChild("");

  //   // Find children of this parent
  //   const childList = categories.filter(
  //     (cat) =>
  //       cat.parent &&
  //       (typeof cat.parent === "string"
  //         ? cat.parent === parentId
  //         : cat.parent._id === parentId)
  //   );
  //   setChildren(childList);
  // };

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

  // const handleSubmit = async () => {
  //   try {
  //     // Step 1: Create the parent category
  //     const formData = new FormData();
  //     formData.append("name", categoryName);
  //     formData.append("icon", selectedIcon);
  //     if (categoryImage) formData.append("image", categoryImage);

  //     // Create the category
  //     const parentRes = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/category`,
  //       formData
  //     );

  //     const parentCategory = parentRes.data;

  //     // Step 2: Create each subcategory
  //     for (let sub of subCategories) {
  //       const subData = new FormData();
  //       subData.append("name", sub);
  //       subData.append("icon", selectedIcon); // Optional: reuse or change icon
  //       subData.append("parent", parentCategory._id);

  //       await axios.post(`${import.meta.env.VITE_BASE_URL}/category`, subData);
  //     }

  //     // Step 3: Now create the product
  //     const productFormData = new FormData();
  //     productFormData.append("name", productName);
  //     productFormData.append("description", productDescription);
  //     productFormData.append("price", productPrice);
  //     productFormData.append("category", parentCategory._id); // Attach the category to the product
  //     productFormData.append("quantityAvailable", productQuantity);
  //     productFormData.append("size", productSize);
  //     productFormData.append("isbn", productISBN);
  //     productFormData.append("productType", productType);
  //     if (productImages.length > 0) {
  //       productImages.forEach((image, index) => {
  //         productFormData.append(`images[${index}]`, image);
  //       });
  //     }

  //     const productRes = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/create-product`,
  //       productFormData
  //     );

  //     console.log("Product created:", productRes.data);

  //     // Reset form
  //     setProductName("");
  //     setProductDescription("");
  //     setProductPrice("");
  //     setProductCategory("");
  //     setProductImages([]);
  //     setProductType("");
  //     setProductQuantity(0);
  //     setProductSize("");
  //     setProductISBN("");
  //     setCategoryName("");
  //     setCategoryImage(null);
  //     setSelectedIcon("");
  //     setSubCategories([]);
  //     navigate("/products"); // Navigate back to products list
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", productName);
  //     formData.append("description", productDescription);
  //     formData.append("price", productPrice);
  //     formData.append("discountPrice", discountPrice);
  //     formData.append("quantityAvailable", productQuantity);
  //     formData.append("size", productSize);
  //     formData.append("language", language);
  //     formData.append("isbn", productISBN);
  //     formData.append("productType", productType);
  //     formData.append("category", selectedChildId); // Attach child category
  //     // if (videoOrAudioFile) {
  //     //   formData.append("videoFile", videoOrAudioFile);
  //     // }

  //     // productImages.forEach((image, index) => {
  //     //   formData.append(`images[${index}]`, image);
  //     // });
  //     productImages.forEach((image) => {
  //       formData.append("images", image); // Use same key 'images'
  //     });
  //     // if (videoOrAudioFile) {
  //     //   formData.append("videoFile", videoOrAudioFile);
  //     // }
  //     if (supportingFile) {
  //       formData.append("supportingFile", supportingFile);
  //     }

  //     const productRes = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/create-product`,
  //       formData
  //     );

  //     console.log("Product created:", productRes.data);
  //     navigate("/products");
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };


  // const handleSubmit = async () => {
  //   setLoading(true); // Start loading before making the request

  //   try {
  //     const formData = new FormData();

  //     // Append fields only if they are not empty
  //     if (productName) formData.append("name", productName);
  //     if (productDescription)
  //       formData.append("description", productDescription);
  //     if (productPrice) formData.append("price", productPrice);
  //     if (discountPrice) formData.append("discountPrice", discountPrice);
  //     if (productQuantity)
  //       formData.append("quantityAvailable", productQuantity);
  //     if (productSize) formData.append("size", productSize);
  //     if (language) formData.append("language", language);
  //     if (productISBN) formData.append("isbn", productISBN);
  //     if (productType) formData.append("productType", productType);
  //     if (selectedChildId) formData.append("category", selectedChildId); // Attach child category

  //     // Images
  //     productImages.forEach((image) => {
  //       formData.append("images", image);
  //     });

  //     // Supporting file (optional)
  //     if (supportingFile) {
  //       formData.append("supportingFile", supportingFile);
  //     }

  //     // Make the POST request to the server
  //     const productRes = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/create-product`,
  //       formData
  //     );

  //     console.log("Product created:", productRes.data);
  //     navigate("/products");
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   } finally {
  //     setLoading(false); // Stop loading after submission
  //   }
  // };
// const handleSubmit = async () => {
//   setLoading(true);

//   try {
//     const formData = new FormData();

//     // ✅ Basic fields
//     if (productName) formData.append("name", productName);
//     if (productDescription) formData.append("description", productDescription);
//     if (productPrice) formData.append("price", productPrice);
//     if (discountPrice) formData.append("discountPrice", discountPrice);
//     if (productType) formData.append("type", productType);

//     // ✅ Inventory
//     if (productQuantity) {
//       formData.append("quantityAvailable", productQuantity);
//     }
//     if (minimumQuantity) {
//       formData.append("minimumQuantity", minimumQuantity);
//     }

//     // ✅ Attributes (arrays)
//     if (selectedColors.length > 0) {
//       selectedColors.forEach((color) => formData.append("color", color));
//     }
// if (productSize) {
//   formData.append("size", productSize);
// }


// if (productTag) {
//   formData.append("tag", productTag);
// }


//     if (Array.isArray(decorationMethods) && decorationMethods.length > 0) {
//       decorationMethods.forEach((method) =>
//         formData.append("decorationMethods", method)
//       );
//     } else if (decorationMethods) {
//       formData.append("decorationMethods", decorationMethods);
//     }

//     if (Array.isArray(features) && features.length > 0) {
//       features.forEach((feature) => formData.append("features", feature));
//     } else if (features) {
//       formData.append("features", features);
//     }

//     // ✅ Extra details (single values)
//     if (material) formData.append("material", material);
//     if (weight) formData.append("weight", weight);
//     if (brand) formData.append("brand", brand);
//     if (closureType) formData.append("closureType", closureType);

//     // ✅ Category
//     if (selectedChild) formData.append("category", selectedChild);

//     // ✅ Images (multiple uploads)
//     if (productImages.length > 0) {
//       productImages.forEach((image) => {
//         formData.append("images", image);
//       });
//     }

//     // ✅ Supporting file (optional)
//     if (supportingFile) {
//       formData.append("supportingFile", supportingFile);
//     }

//     // 🚀 API call
//     const productRes = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/create-product`,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );

//     console.log("✅ Product created:", productRes.data);
//     navigate("/products");
//   } catch (error) {
//     console.error("❌ Error creating product:", error);
//   } finally {
//     setLoading(false);
//   }
// };
const handleSubmit = async () => {
  setLoading(true);

  try {
    const formData = new FormData();

    // ✅ Basic fields
    if (productName) formData.append("name", productName);
    if (productDescription) formData.append("description", productDescription);
    if (productPrice) formData.append("price", productPrice);
    if (discountPrice) formData.append("discountPrice", discountPrice);
    if (productType) formData.append("type", productType);

    // ✅ Inventory
    if (productQuantity) {
      formData.append("quantityAvailable", productQuantity);
    }
    if (minimumQuantity) {
      formData.append("minimumQuantity", minimumQuantity);
    }

    // ✅ Attributes (arrays)
    if (selectedColors.length > 0) {
      selectedColors.forEach((color) => formData.append("color", color));
    }
    if (productSize) {
      formData.append("size", productSize);
    }

    if (productTag) {
      formData.append("tag", productTag);
    }

    // if (Array.isArray(decorationMethods) && decorationMethods.length > 0) {
    //   decorationMethods.forEach((method) =>
    //     formData.append("decorationMethods", method)
    //   );
    // } else if (decorationMethods) {
    //   formData.append("decorationMethods", decorationMethods);
    // }
// if (Array.isArray(decorationMethods) && decorationMethods.length > 0) {
//   decorationMethods.forEach((method, index) => {
//     formData.append(`decorationMethods[${index}][name]`, method.name);
//     formData.append(`decorationMethods[${index}][note]`, method.note || "");
//   });
// }

if (Array.isArray(decorationMethods) && decorationMethods.length > 0) {
  decorationMethods
    .filter((method) => method.name && method.name.trim() !== "")
    .forEach((method, index) => {
      formData.append(`decorationMethods[${index}][name]`, method.name);
      formData.append(`decorationMethods[${index}][note]`, method.note || "");
    });
}


    if (Array.isArray(features) && features.length > 0) {
      features.forEach((feature) => formData.append("features", feature));
    } else if (features) {
      formData.append("features", features);
    }

    // ✅ Extra details (single values)
    if (material) formData.append("material", material);
    if (weight) formData.append("weight", weight);
    if (brand) formData.append("brand", brand);
    if (closureType) formData.append("closureType", closureType);

    // ✅ Category (child → parent → grandparent fallback)
    if (selectedChild) {
      formData.append("category", selectedChild);
    } else if (selectedParent) {
      formData.append("category", selectedParent);
    } else if (selectedGrandParent) {
      formData.append("category", selectedGrandParent);
    }

    // ✅ Images (multiple uploads)
    if (productImages.length > 0) {
      productImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    // ✅ Supporting file (optional)
    if (supportingFile) {
      formData.append("supportingFile", supportingFile);
    }
    // ✅ Product flags (booleans)
    formData.append("isBestSeller", isBestSeller ? "true" : "false");
    formData.append("isTrending", isTrending ? "true" : "false");
    formData.append("isFeatured", isFeatured ? "true" : "false");

    // 🔍 Debug: show what’s being sent
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // 🚀 API call
    const productRes = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/db/create-product`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Product created:", productRes.data);
    navigate("/products");
  } catch (error) {
    console.error("❌ Error creating product:", error);
  } finally {
    setLoading(false);
  }
};


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // ✅ Convert to array
    setProductImages(files);
  };

  return (
    <>
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
          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        {/* Quantity, Size, Language */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <input
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
              className="w-full p-2 border rounded"
            />
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
  <label className="block mb-1 font-medium">Weight</label>
  <select
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Weight --</option>
    <option value="Lightweight">Lightweight</option>
    <option value="Mediumweight">Mediumweight</option>
    <option value="Heavyweight">Heavyweight</option>
  </select>
</div>

        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block mb-1 font-medium">Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Brand --</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
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

        {/* Array fields */}
        {[

       
          { label: "Tags (comma separated)", state: productTag, setter: setProductTag },
       
          { label: "Features (comma separated)", state: features, setter: setFeatures },
        ].map(({ label, state, setter }) => (
          <div key={label} className="mb-4">
            <label className="block mb-1 font-medium">{label}</label>
            <input
              value={state}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
<label className="block mb-1 font-medium">Decoration Methods</label>
<div className="space-y-2">
  {decorationMethods.map((method, idx) => (
    <div key={idx} className="flex gap-2">
      <select
        value={method.name}
        onChange={(e) => {
          const updated = [...decorationMethods];
          updated[idx].name = e.target.value;
          setDecorationMethods(updated);
        }}
        className="p-2 border rounded w-1/2"
      >
        <option value="">-- Select Method --</option>
        <option value="Printed">Printed</option>
        <option value="Embroidered">Embroidered</option>
        <option value="Debossed">Debossed</option>
      </select>
      <input
        type="text"
        placeholder="Note (e.g. No Minimum)"
        value={method.note || ""}
        onChange={(e) => {
          const updated = [...decorationMethods];
          updated[idx].note = e.target.value;
          setDecorationMethods(updated);
        }}
        className="p-2 border rounded w-1/2"
      />
    </div>
  ))}
</div>

<button
  type="button"
  onClick={() =>
    setDecorationMethods([...decorationMethods, { name: "", note: "" }])
  }
  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
>
  + Add Decoration Method
</button>


<div className="mb-4">
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
</div>


        {/* Parent Category */}
  {/* Grandparent */}
<div className="mb-4">
  <label className="block mb-1 font-medium">Grandparent Category</label>
  <select
    value={selectedGrandParent}
    onChange={handleGrandParentChange}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Grandparent --</option>
    {grandParents.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Parent */}
<div className="mb-4">
  <label className="block mb-1 font-medium">Parent Category</label>
  <select
    value={selectedParent}
    onChange={handleParentChange}
    className="w-full p-2 border rounded"
    disabled={!parents.length}
  >
    <option value="">-- Select Parent --</option>
    {parents.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Child */}
<div className="mb-4">
  <label className="block mb-1 font-medium">Child Category</label>
  <select
    value={selectedChild}
    onChange={(e) => setSelectedChild(e.target.value)}
    className="w-full p-2 border rounded"
    disabled={!children.length}
  >
    <option value="">-- Select Child --</option>
    {children.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>


        {/* Product Type */}
     
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Product Images</label>
    
          <input
  type="file"
  multiple
  accept="image/*"
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
