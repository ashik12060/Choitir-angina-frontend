import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import axiosInstance from "../pages/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [initialValues, setInitialValues] = useState(null);

  // Load brands, subcategories, suppliers once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, subsRes, suppliersRes] = await Promise.all([
          axiosInstance.get(`/api/brands`),
          axiosInstance.get(`/api/subcategories`),
          axiosInstance.get(`/api/suppliers`),
        ]);
        setBrands(brandsRes.data || []);
        setSubcategories(subsRes.data || []);
        setSuppliers(suppliersRes.data.suppliers || []);
      } catch (err) {
        console.error("Failed to load initial data", err);
      }
    };
    fetchData();
  }, []);

  // Load product data by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/api/product/${id}`);
        console.log("Fetched product data:", JSON.stringify(res.data, null, 2));

        const p = res.data.product || res.data; // adjust if nested
        setInitialValues({
          title: p.title || "",
          description: p.description || "",
          content: p.content || p.content || "",
          price: p.price || 0,
          brand: p.brand?._id || p.brand || "",
          subcategory: p.subcategory?._id || p.subcategory || "",
          supplier: p.supplier?._id || p.supplier || "",
          barcode: p.barcode || "",
          variants: p.variants || [],
          images:
            p.images?.map((img) =>
              typeof img === "string" ? { url: img } : img
            ) || [],
        });
      } catch (error) {
        console.error("Failed to load product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      title: "",
      description: "",
      content: "",
      price: 0,
      brand: "",
      subcategory: "",
      supplier: "",
      barcode: "",
      variants: [],
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      brand: Yup.string().required("Required"),
      supplier: Yup.string().required("Required"),
      barcode: Yup.string().required("Required"),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("price", values.price);
        formData.append("brand", values.brand);
        formData.append("subcategory", values.subcategory);
        formData.append("supplier", values.supplier);
        formData.append("barcode", values.barcode);
        formData.append("variants", JSON.stringify(values.variants));

        values.images.forEach((img, i) => {
          if (img.file) {
            formData.append("images", img.file);
          } else if (img.url) {
            formData.append(`imageUrl_${i}`, img.url);
          }
        });

        await axiosInstance.put(
          `${process.env.REACT_APP_API_URL}/api/update/product/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Product Updated");
        navigate("/products");
      } catch (error) {
        console.error("Update failed", error);
      }
    },
  });

  const handleImageDrop = async (acceptedFiles) => {
    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const compressed = await imageCompression(file, { maxSizeMB: 1 });
        return {
          file: compressed,
          preview: URL.createObjectURL(compressed),
          name: file.name,
        };
      })
    );
    formik.setFieldValue("images", [
      ...formik.values.images,
      ...compressedFiles,
    ]);
  };

  if (!initialValues)
    return <Typography p={3}>Loading product data...</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />

        {/* Content */}
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          margin="normal"
        />

        {/* Price */}
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />

        {/* Brand */}
        <Select
          fullWidth
          name="brand"
          value={formik.values.brand}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("subcategory", "");
          }}
          displayEmpty
          margin="normal"
        >
          <MenuItem value="">Select Brand</MenuItem>
          {brands.map((b) => (
            <MenuItem key={b._id} value={b._id}>
              {b.name}
            </MenuItem>
          ))}
        </Select>

        {/* Subcategory */}
        <Select
          fullWidth
          name="subcategory"
          value={formik.values.subcategory}
          onChange={formik.handleChange}
          displayEmpty
          disabled={!formik.values.brand}
          margin="normal"
        >
          <MenuItem value="">Select Subcategory</MenuItem>
          {subcategories
            .filter((sub) => {
              if (!sub.brand) return false;
              const brandId =
                typeof sub.brand === "object" ? sub.brand._id : sub.brand;
              return brandId === formik.values.brand;
            })
            .map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
        </Select>

        {/* Supplier */}
        <Select
          fullWidth
          name="supplier"
          value={formik.values.supplier}
          onChange={formik.handleChange}
          displayEmpty
          margin="normal"
        >
          <MenuItem value="">Select Supplier</MenuItem>
          {suppliers.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>

        {/* Barcode */}
        <TextField
          fullWidth
          label="Barcode"
          name="barcode"
          value={formik.values.barcode}
          onChange={formik.handleChange}
          error={formik.touched.barcode && Boolean(formik.errors.barcode)}
          helperText={formik.touched.barcode && formik.errors.barcode}
          margin="normal"
        />

        {/* Variants */}
        <Typography variant="h6" mt={3}>
          Variants
        </Typography>
        {formik.values.variants.map((variant, idx) => (
          <Box
            key={idx}
            sx={{
              border: "1px solid #ccc",
              p: 2,
              my: 1,
              borderRadius: 1,
            }}
          >
            <TextField
              label="Size"
              value={variant.size || ""}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].size = e.target.value;
                formik.setFieldValue("variants", newVariants);
              }}
              sx={{ mr: 2, mb: 1 }}
            />

            <TextField
              label="Description"
              value={variant.description || ""}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].description = e.target.value; // <== Fix here
                formik.setFieldValue("variants", newVariants);
              }}
              sx={{ mr: 2, mb: 1 }}
            />

            <TextField
              label="Color"
              value={variant.color || ""}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].color = e.target.value;
                formik.setFieldValue("variants", newVariants);
              }}
              sx={{ mr: 2, mb: 1 }}
            />
            <TextField
              type="number"
              label="Quantity"
              value={variant.quantity || 0}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].quantity = parseInt(e.target.value) || 0;
                formik.setFieldValue("variants", newVariants);
              }}
              sx={{ mr: 2, mb: 1 }}
            />
            <TextField
              label="Length"
              value={variant.productLength || ""}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].productLength = e.target.value;
                formik.setFieldValue("variants", newVariants);
              }}
              sx={{ mb: 1 }}
            />
            <Typography variant="body2">
              Sub Barcode: {variant.subBarcode || "-"}
            </Typography>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={() =>
            formik.setFieldValue("variants", [
              ...formik.values.variants,
              {
                size: "",
                color: "",
                quantity: 0,
                productLength: "",
                subBarcode: "",
              },
            ])
          }
          sx={{ mt: 2 }}
        >
          Add Variant
        </Button>

        {/* Images */}
        <Typography variant="h6" mt={4}>
          Images
        </Typography>
        <Dropzone onDrop={handleImageDrop} multiple>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 3,
                mt: 1,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                Drag & drop images here, or click to select files
              </Typography>
            </Box>
          )}
        </Dropzone>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {formik.values.images.map((img, i) => (
            <Box
              key={i}
              sx={{
                width: 120,
                height: 120,
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <img
                src={img.preview || img.url || img.imageUrl}
                alt={`img-${i}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Button
                size="small"
                color="error"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  minWidth: "24px",
                  padding: "0 6px",
                }}
                onClick={() => {
                  const newImages = [...formik.values.images];
                  newImages.splice(i, 1);
                  formik.setFieldValue("images", newImages);
                }}
              >
                X
              </Button>
            </Box>
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Update Product
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
