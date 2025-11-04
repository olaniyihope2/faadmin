// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import AdminHeader from "../../Components/AdminHeader/AdminHeader";

// const EditCat = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   // For hierarchy
//   const [grandParents, setGrandParents] = useState([]);
//   const [parents, setParents] = useState([]);
//   const [children, setChildren] = useState([]);
// const [categories, setCategories] = useState([]);

//   const [selectedGrandParent, setSelectedGrandParent] = useState("");
//   const [selectedParent, setSelectedParent] = useState("");
//   const [selectedChild, setSelectedChild] = useState("");

//   // Fetch categories and current category
//   // useEffect(() => {
//   //   const fetchCategories = async () => {
//   //     try {
//   //       const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
        
//   //       // Build hierarchy for dropdowns
//   //       const topLevel = data.filter((cat) => !cat.parent);
//   //       setGrandParents(topLevel);

//   //       // Find current category to edit
//   //       const category = data.find((cat) => cat._id === id);
//   //       if (category) {
//   //         setName(category.name);
//   //         setPreview(category.image || "");

//   //         // If category has parent, set selected parent and grandparent
//   //         if (category.parent) {
//   //           const parentCat = data.find((cat) => cat._id === category.parent);
//   //           if (parentCat) {
//   //             setSelectedParent(parentCat._id);
//   //             if (parentCat.parent) {
//   //               setSelectedGrandParent(parentCat.parent);
//   //               const grandParentCat = data.find((cat) => cat._id === parentCat.parent);
//   //               if (grandParentCat) {
//   //                 setParents(grandParentCat.children || []);
//   //               }
//   //             } else {
//   //               setParents(topLevel.find((gp) => gp._id === parentCat._id)?.children || []);
//   //             }
//   //             setChildren(parentCat.children || []);
//   //           }
//   //         } else {
//   //           setSelectedGrandParent("");
//   //           setSelectedParent("");
//   //           setSelectedChild("");
//   //         }
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch categories:", error);
//   //     }
//   //   };

//   //   fetchCategories();
//   // }, [id]);
// // useEffect(() => {
// //   const fetchCategories = async () => {
// //     try {
// //       console.log("Fetching categories...");
// //       const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
// //       console.log("Categories fetched:", data);

// //       if (!data || !data.length) {
// //         console.warn("No categories returned from API");
// //         return;
// //       }

// //       // Find category to edit
// //       const category = data.find(cat => String(cat._id) === String(id));
// //       console.log("Category found for edit:", category);

// //       if (!category) {
// //         console.warn("Category not found for ID:", id);
// //         return;
// //       }

// //       // Set name and preview
// //       setName(category.name);
// //       setPreview(category.image || "");
// //       console.log("Set name:", category.name);

// //       // Build grandparent dropdown
// //       const topLevel = data.filter(cat => !cat.parent);
// //       setGrandParents(topLevel);
// //       console.log("Grandparents:", topLevel);

// //       // Determine hierarchy
// //       let grandParentId = "";
// //       let parentId = "";
// //       let childId = "";

// //       if (category.parent) {
// //         const parentCat = data.find(c => c._id === category.parent);
// //         console.log("Parent category:", parentCat);

// //         if (parentCat) {
// //           parentId = parentCat._id;
// //           if (parentCat.parent) {
// //             grandParentId = parentCat.parent;
// //           } else {
// //             grandParentId = parentCat._id;
// //           }
// //         }
// //       } else {
// //         grandParentId = category._id; // category itself is top-level
// //       }

// //       console.log("Hierarchy IDs:", { grandParentId, parentId, childId });

// //       // Set selected values
// //       setSelectedGrandParent(grandParentId);
// //       setSelectedParent(parentId);
// //       setSelectedChild(childId);

// //       // Build parent and children dropdowns
// //       const parentsList = data.filter(cat => cat.parent === grandParentId);
// //       setParents(parentsList);
// //       const childrenList = data.filter(cat => cat.parent === parentId);
// //       setChildren(childrenList);

// //       console.log("Parents dropdown:", parentsList);
// //       console.log("Children dropdown:", childrenList);

// //     } catch (err) {
// //       console.error("Failed to fetch categories:", err);
// //     }
// //   };

// //   fetchCategories();
// // }, [id]);

// useEffect(() => {
//   const fetchCategory = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/${id}`);
//       console.log("Category fetched:", data);

//       setName(data.name);
//       setPreview(data.image || "");

//       if (data.parent) {
//         const { data: parentCat } = await axios.get(`${import.meta.env.VITE_BASE_URL}/category/${data.parent}`);
//         setSelectedParent(parentCat._id);
//         setSelectedGrandParent(parentCat.parent || parentCat._id);
//       } else {
//         setSelectedGrandParent(data._id);
//       }

//       // Fetch all categories separately for dropdowns
//       const { data: allCats } = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
//       setGrandParents(allCats.filter(cat => !cat.parent));
//       setParents(allCats.filter(cat => cat.parent === (data.parent || "")));
//       setChildren([]); // optional, depending on your hierarchy
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchCategory();
// }, [id]);

//   // Handle hierarchy changes
//   const handleGrandParentChange = (e) => {
//     const grandParentId = e.target.value;
//     setSelectedGrandParent(grandParentId);
//     setSelectedParent("");
//     setSelectedChild("");

//     const grandParent = grandParents.find((cat) => cat._id === grandParentId);
//     setParents(grandParent?.children || []);
//     setChildren([]);
//   };

//   const handleParentChange = (e) => {
//     const parentId = e.target.value;
//     setSelectedParent(parentId);
//     setSelectedChild("");

//     const parentCat = parents.find((cat) => cat._id === parentId);
//     setChildren(parentCat?.children || []);
//   };

//   const handleChildChange = (e) => {
//     setSelectedChild(e.target.value);
//   };

//   // Handle image selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) setPreview(URL.createObjectURL(file));
//   };

//   // Handle update
// const handleUpdate = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("name", name);

//     let finalParent = "";

//     if (selectedChild) {
//       finalParent = selectedChild;
//     } else if (selectedParent) {
//       finalParent = selectedParent;
//     } else if (selectedGrandParent && selectedGrandParent !== id) {
//       finalParent = selectedGrandParent;
//     }

//     formData.append("parent", finalParent || null);

//     if (image) formData.append("image", image);

//     await axios.put(`${import.meta.env.VITE_BASE_URL}/category/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     navigate("/categories");
//   } catch (error) {
//     console.error("Error updating category:", error);
//   }
// };

//   return (
//     <>
//       <AdminHeader />
//       <div className="p-6 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

//         <div className="flex flex-col space-y-4">
//           {/* Category Name */}
//           <div>
//             <label className="block mb-2 font-medium">Category Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Category Name"
//               className="border px-4 py-2 rounded-md w-full"
//             />
//           </div>

//           {/* Grandparent */}
//           <div>
//             <label className="block mb-1 font-medium">Grandparent Category</label>
//             <select
//               value={selectedGrandParent}
//               onChange={handleGrandParentChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">-- Select Grandparent --</option>
//               {grandParents.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Parent */}
//           <div>
//             <label className="block mb-1 font-medium">Parent Category</label>
//             <select
//               value={selectedParent}
//               onChange={handleParentChange}
//               className="w-full p-2 border rounded"
//               disabled={!parents.length}
//             >
//               <option value="">-- Select Parent --</option>
//               {parents.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Child */}
//           <div>
//             <label className="block mb-1 font-medium">Child Category</label>
//             <select
//               value={selectedChild}
//               onChange={handleChildChange}
//               className="w-full p-2 border rounded"
//               disabled={!children.length}
//             >
//               <option value="">-- Select Child --</option>
//               {children.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block mb-2 font-medium">Category Image</label>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="mt-2 w-32 h-32 object-cover rounded-md border"
//               />
//             )}
//           </div>

//           {/* Update Button */}
//           <button
//             onClick={handleUpdate}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4"
//           >
//             Update Category
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditCat;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const EditCat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [grandParents, setGrandParents] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  const [selectedGrandParent, setSelectedGrandParent] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");

  // Fetch current category and all categories for dropdowns
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Fetch current category
        const { data: category } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/db/category/${id}`
        );

        setName(category.name);
        setPreview(category.image || "");

        // Fetch parent if exists
        if (category.parent) {
          const { data: parentCat } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/db/category/${category.parent}`
          );
          setSelectedParent(parentCat._id);
          setSelectedGrandParent(parentCat.parent || parentCat._id);
        } else {
          setSelectedGrandParent(category._id); // top-level
        }

        // Fetch all categories for dropdowns
        const { data: allCats } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/db/categories`
        );
        setGrandParents(allCats.filter((cat) => !cat.parent));
        setParents(
          allCats.filter((cat) => cat.parent === (category.parent || ""))
        );
        setChildren([]);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle dropdown changes
  const handleGrandParentChange = (e) => {
    const grandParentId = e.target.value;
    setSelectedGrandParent(grandParentId);
    setSelectedParent("");
    setSelectedChild("");

    const grandParent = grandParents.find((cat) => cat._id === grandParentId);
    setParents(grandParent?.children || []);
    setChildren([]);
  };

  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setSelectedParent(parentId);
    setSelectedChild("");

    const parentCat = parents.find((cat) => cat._id === parentId);
    setChildren(parentCat?.children || []);
  };

  const handleChildChange = (e) => setSelectedChild(e.target.value);

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Handle category update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      // Determine correct parent
      let finalParent = null;
      if (selectedChild) finalParent = selectedChild;
      else if (selectedParent) finalParent = selectedParent;
      else if (selectedGrandParent && selectedGrandParent !== id)
        finalParent = selectedGrandParent;

      // Only append parent if it's not null
      if (finalParent) formData.append("parent", finalParent);

      if (image) formData.append("image", image);

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/db/category/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/");
    } catch (err) {
      console.error("Category update error:", err);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block mb-2 font-medium">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="border px-4 py-2 rounded-md w-full"
            />
          </div>

          <div>
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

          <div>
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

          <div>
            <label className="block mb-1 font-medium">Child Category</label>
            <select
              value={selectedChild}
              onChange={handleChildChange}
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

          <div>
            <label className="block mb-2 font-medium">Category Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4"
          >
            Update Category
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCat;
