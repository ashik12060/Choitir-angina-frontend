// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Dropzone from "react-dropzone";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axiosInstance from "axiosInstance";
// import { toast } from "react-toastify";
// import "react-quill/dist/quill.snow.css";
// import { modules } from "../components/moduleToolbar";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstanceInstance from "../pages/axiosInstanceInstance";
// // import axiosInstanceInstance from "../pages/axiosInstanceInstance";

// const validationSchema = yup.object({
//   title: yup
//     .string("Add a product title")
//     .min(1)
//     .required("Product title is required"),
//   content: yup
//     .string("Add text content")
//     .min(1)
//     .required("Text content is required"),
//     price: yup.number("Add text content"),
//     brand: yup.string("Add text content"),
  
// });

// const EditProduct = () => {
//   const { id } = useParams();
//   const [imagePreview, setImagePreview] = useState("");
//   const navigate = useNavigate();

//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     setFieldValue,
//   } = useFormik({
//     initialValues: {
//       title: "",
//       content: "",
//       price: "",
//       brand: "",
      
//       image: "",
//     },
//     validationSchema: validationSchema,
//     enableReinitialize: true,
//     onSubmit: (values, actions) => {
//       updateProduct(values);
//       actions.resetForm();
//     },
//   });

//   // Show product by Id
//   const singleProductById = async () => {
//     try {
//       // 
//       const { data } = await axiosInstanceInstance.get(`${process.env.REACT_APP_API_URL}/api/product/${id}`);
//       const product = data.product;
//       setFieldValue("title", product.title);
//       setFieldValue("content", product.content);
//       setFieldValue("price", product.price);
//       setFieldValue("brand", product.brand);
      
//       setImagePreview(product.image.url);
//     } catch (error) {
//       console.log(error);
//       toast.error(error);
//     }
//   };

//   useEffect(() => {
//     singleProductById();
//   }, []);

//   const updateProduct = async (values) => {
//     try {
//       const { data } = await axiosInstanceInstance.put(`${process.env.REACT_APP_API_URL}/api/update/product/${id}`, values);
//       if (data.success === true) {
//         toast.success("Product updated");
//         navigate("/admin/dashboard");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.error);
//     }
//   };

//   return (
//     <>
//       <Box sx={{ bgColor: "white", padding: "20px 200px" }}>
//         <Typography variant="h5" sx={{ pb: 4 }}>
//           Edit product
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             sx={{ mb: 3 }}
//             fullWidth
//             id="title"
//             label="Product title"
//             name="title"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             placeholder="Product title"
//             value={values.title}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.title && Boolean(errors.title)}
//             helperText={touched.title && errors.title}
//           />

//           <Box sx={{ mb: 3 }}>
//             <TextField
//               sx={{ mb: 3 }}
//               fullWidth
//               id="content"
//               label="Content"
//               name="content"
//               multiline
//               rows={4}
//               placeholder="Write the product content..."
//               value={values.content}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.content && Boolean(errors.content)}
//               helperText={touched.content && errors.content}
//             />
//           </Box>

//           <TextField
//             fullWidth
//             id="price"
//             label="price "
//             name="price"
//             value={values.price}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.price && Boolean(errors.price)}
//             helperText={touched.price && errors.price}
//           />

//           <TextField
//             fullWidth
//             id="brand"
//             label="Brand"
//             name="brand"
//             className="my-3"
//             value={values.brand}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={touched.brand && Boolean(errors.brand)}
//             helperText={touched.brand && errors.brand}
//           />
          

//           {/* Add the remaining TextField components for technical specifications 2-12 here */}

//           <Box border="2px dashed blue" sx={{ p: 1 }}>
//             <Dropzone
//               acceptedFiles=".jpg,.jpeg,.png"
//               multiple={false}
//               onDrop={(acceptedFiles) =>
//                 acceptedFiles.map((file, index) => {
//                   const reader = new FileReader();
//                   reader.readAsDataURL(file);
//                   reader.onloadend = () => {
//                     setFieldValue("image", reader.result);
//                   };
//                 })
//               }
//             >
//               {({ getRootProps, getInputProps }) => (
//                 <div {...getRootProps()}>
//                   <input {...getInputProps()} />
//                   <p style={{ textAlign: "center" }}>
//                     <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
//                   </p>
//                   <p style={{ textAlign: "center", fontSize: "12px" }}>
//                     Drag and Drop image here or click to choose
//                   </p>
//                 </div>
//               )}
//             </Dropzone>
//           </Box>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             elevation={0}
//             sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
//           >
//             Update product
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default EditProduct;


import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import imageCompression from "browser-image-compression";
// import axiosInstance from "axiosInstance";
import JsBarcode from "jsbarcode";
import toast from "react-hot-toast";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../pages/axiosInstance";
// import axiosInstanceInstance from "../pages/axiosInstanceInstance";

const EditProduct = ({ productId }) => {
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch initial data
  useEffect(() => {
    // Fetch brands
    axiosInstance.get("/api/brands").then((res) => setBrands(res.data));
    // Fetch suppliers
    axiosInstance.get("/api/suppliers").then((res) => setSuppliers(res.data));
    // Fetch subcategories
    axiosInstance.get("/api/subcategories").then((res) => setSubCategories(res.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      price: "",
      quantity: "",
      brand: "",
      supplier: "",
      subCategory: "",
      mainBarcode: "",
      variants: [],
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      brand: Yup.string().required("Required"),
      supplier: Yup.string().required("Required"),
      mainBarcode: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Prepare form data for submission if needed
        const formData = new FormData();

        // Append basic fields
        for (const key of [
          "title",
          "content",
          "price",
          "quantity",
          "brand",
          "supplier",
          "subCategory",
          "mainBarcode",
        ]) {
          formData.append(key, values[key]);
        }

        // Append variants as JSON string
        formData.append("variants", JSON.stringify(values.variants));

        // Append images as files
        values.images.forEach((img, idx) => {
          if (img.file) {
            formData.append("images", img.file);
          } else if (img.url) {
            // If images are URLs, you may want to send the URLs or handle differently
            formData.append(`imageUrl_${idx}`, img.url);
          }
        });

        // Send update request
        await axiosInstance.put(`/api/products/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Product updated successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update product.");
      }
    },
  });

  const { values, handleChange, setFieldValue, errors, touched } = formik;

  // Load product data on mount
  useEffect(() => {
    axiosInstance.get(`/api/products/${productId}`).then((res) => {
      const product = res.data;
      formik.setValues({
        title: product.title,
        content: product.content,
        price: product.price,
        quantity: product.quantity,
        brand: product.brand,
        supplier: product.supplier,
        subCategory: product.subCategory,
        mainBarcode: product.mainBarcode,
        variants: product.variants || [],
        images: product.images || [],
      });
    });
  }, [productId]);

  // Generate barcode images for main and sub barcodes
  useEffect(() => {
    // Generate main barcode SVG
    if (values.mainBarcode) {
      try {
        JsBarcode("#mainBarcodeSvg", values.mainBarcode, {
          format: "CODE128",
          displayValue: true,
          height: 50,
        });
      } catch {}
    }

    // Generate variant sub barcodes
    values.variants.forEach((variant, idx) => {
      if (variant.subBarcode) {
        try {
          JsBarcode(`#subBarcodeSvg_${idx}`, variant.subBarcode, {
            format: "CODE128",
            displayValue: true,
            height: 40,
          });
        } catch {}
      }
    });
  }, [values.mainBarcode, values.variants]);

  // Update variants' subBarcodes when mainBarcode or variants change
  useEffect(() => {
    if (!values.mainBarcode) return;

    const updatedVariants = values.variants.map((v, i) => ({
      ...v,
      subBarcode: `${values.mainBarcode}${String.fromCharCode(97 + i)}`, // a, b, c ...
    }));

    setFieldValue("variants", updatedVariants);
  }, [values.mainBarcode]);

  // Handle variant field changes
  const handleVariantChange = (index, field, value) => {
    const updated = [...values.variants];
    updated[index][field] = value;
    setFieldValue("variants", updated);
  };

  // Add a new empty variant
  const addVariant = () => {
    const newVariant = { size: "", color: "", quantity: 0, productLength: 0, subBarcode: "" };
    setFieldValue("variants", [...values.variants, newVariant]);
  };

  // Remove a variant by index
  const removeVariant = (index) => {
    const updated = [...values.variants];
    updated.splice(index, 1);
    setFieldValue("variants", updated);
  };

  // Handle image drop
  const handleImageDrop = async (acceptedFiles) => {
    const compressedFiles = [];

    for (const file of acceptedFiles) {
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });

        compressedFiles.push({
          file: compressed,
          preview: URL.createObjectURL(compressed),
          name: file.name,
        });
      } catch (error) {
        console.error("Compression failed:", error);
      }
    }

    setFieldValue("images", [...values.images, ...compressedFiles]);
  };

  // Filter subcategories by selected brand
  const filteredSubCategories = subCategories.filter(
    (sub) => sub.brand === values.brand
  );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
      <Typography variant="h4" mb={4}>
        Edit Product
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />

        <TextField
          label="Content"
          name="content"
          value={values.content}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
        />

        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={values.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal" error={touched.brand && Boolean(errors.brand)}>
          <InputLabel>Brand</InputLabel>
          <Select
            name="brand"
            value={values.brand}
            onChange={(e) => {
              handleChange(e);
              setFieldValue("subCategory", "");
            }}
            label="Brand"
          >
            {brands.map((b) => (
              <MenuItem key={b._id} value={b._id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
          {touched.brand && errors.brand && (
            <Typography color="error" variant="caption">
              {errors.brand}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" error={touched.subCategory && Boolean(errors.subCategory)}>
          <InputLabel>Sub Category</InputLabel>
          <Select
            name="subCategory"
            value={values.subCategory}
            onChange={handleChange}
            label="Sub Category"
            disabled={!values.brand}
          >
            {filteredSubCategories.map((sub) => (
              <MenuItem key={sub._id} value={sub._id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" error={touched.supplier && Boolean(errors.supplier)}>
          <InputLabel>Supplier</InputLabel>
          <Select
            name="supplier"
            value={values.supplier}
            onChange={handleChange}
            label="Supplier"
          >
            {suppliers.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
          {touched.supplier && errors.supplier && (
            <Typography color="error" variant="caption">
              {errors.supplier}
            </Typography>
          )}
        </FormControl>

        <TextField
          label="Main Barcode"
          name="mainBarcode"
          value={values.mainBarcode}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={touched.mainBarcode && Boolean(errors.mainBarcode)}
          helperText={touched.mainBarcode && errors.mainBarcode}
        />

        <Box mt={2} mb={4}>
          <Typography>Main Barcode:</Typography>
          <svg id="mainBarcodeSvg" />
        </Box>

        <Typography variant="h6" mb={2}>
          Variants
        </Typography>

        {values.variants.map((variant, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ddd",
              p: 2,
              mb: 2,
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <TextField
              label="Size"
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
              margin="normal"
              fullWidth
            />

            <TextField
              label="Color"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(index, "color", e.target.value)
              }
              margin="normal"
              fullWidth
            />

            <TextField
              label="Quantity"
              type="number"
              value={variant.quantity}
              onChange={(e) =>
                handleVariantChange(index, "quantity", +e.target.value)
              }
              margin="normal"
              fullWidth
            />

            <TextField
              label="Length"
              type="number"
              value={variant.productLength}
              onChange={(e) =>
                handleVariantChange(index, "productLength", +e.target.value)
              }
              margin="normal"
              fullWidth
            />

            <TextField
              label="Sub Barcode"
              value={variant.subBarcode}
              disabled
              margin="normal"
              fullWidth
            />

            <Box mt={1} mb={1}>
              <svg id={`subBarcodeSvg_${index}`} />
            </Box>

            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => removeVariant(index)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              Remove
            </Button>
          </Box>
        ))}

        <Button variant="contained" onClick={addVariant} sx={{ mb: 4 }}>
          Add Variant
        </Button>

        <Typography variant="h6" mb={2}>
          Images
        </Typography>

        <Dropzone onDrop={handleImageDrop} multiple>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "4px",
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 48, color: "#aaa" }} />
              <Typography>Drag & drop images here, or click to select files</Typography>
            </Box>
          )}
        </Dropzone>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          {values.images.map((img, i) => (
            <Box
              key={i}
              sx={{
                position: "relative",
                width: 120,
                height: 120,
                border: "1px solid #ddd",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={img.preview || img.url || img.imageUrl}
                alt={`preview-${i}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Button
                size="small"
                color="error"
                sx={{ position: "absolute", top: 4, right: 4 }}
                onClick={() => {
                  const newImages = [...values.images];
                  newImages.splice(i, 1);
                  setFieldValue("images", newImages);
                }}
              >
                X
              </Button>
            </Box>
          ))}
        </Box>

        <Box mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Update Product
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProduct;
