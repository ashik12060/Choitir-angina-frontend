
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import axiosInstance from "../pages/axiosInstance";
import JsBarcode from "jsbarcode";
import imageCompression from "browser-image-compression";
import { useParams } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string().required("Product title is required"),
  content: yup.string().required("Content is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  supplier: yup.string().required("Supplier is required"),
  categories: yup.array().min(1, "At least one category is required"),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        size: yup.string().required("Size is required"),
        color: yup.string().required("Color is required"),
        quantity: yup.number().min(1).required("Quantity is required"),
        description: yup.string().required("Description is required"),
        productLength: yup.number().nullable(),
      })
    )
    .min(1, "At least one variant is required"),
});

export default function EditProduct() {
  const { id } = useParams();
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [generatedBarcode, setGeneratedBarcode] = useState("");
  const [error, setError] = useState("");
  const observedElementRef = useRef(null);

  const categoriesList = [
    "All",
    "Top Brands",
    "New Arrival",
    "Stitched",
    "Unstitched",
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      price: "",
      brand: "",
      supplier: "",
      categories: [],
      barcode: "",
      subcategory: "",
      variants: [
        {
          size: "",
          color: "",
          quantity: 0,
          description: "",
          productLength: null,
          subBarcode: "",
          subBarcodeSvg: "",
          imageUrl: "",
        },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      generateSubBarcodeImages();
      await updateProduct(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = formik;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/product/${id}`
        );
        const product = res.data.product;
        setFieldValue("title", product.title);
        setFieldValue("content", product.content);
        setFieldValue("price", product.price);
        setFieldValue("brand", product.brand);
        setFieldValue("supplier", product.supplier);
        setFieldValue("categories", product.categories);
        setFieldValue("subcategory", product.subcategory);
        setFieldValue("barcode", product.barcode);
        setFieldValue("variants", product.variants);
        setBarcode(product.barcode);
      } catch (err) {
        toast.error("Failed to fetch product");
      }
    };

    const fetchDependencies = async () => {
      const brandsRes = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/brands`
      );
      setBrands(brandsRes.data);

      const suppliersRes = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/suppliers`
      );
      setSuppliers(suppliersRes.data.suppliers || []);

      const subRes = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/subcategories`
      );
      setSubcategories(subRes.data || []);
      setFilteredSubcategories(subRes.data || []);
    };

    fetchProduct();
    fetchDependencies();
  }, [id]);

  const updateProduct = async (values) => {
    try {
      const result = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/update/product/${id}`,
        values
      );
      if (result.data.success) {
        toast.success("Product updated");
      } else {
        toast.error("Failed to update");
      }
    } catch (err) {
      toast.error("Error updating");
    }
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setFieldValue("brand", selectedBrand);
    const filtered = subcategories.filter(
      (subcategory) => subcategory.brand === selectedBrand
    );
    setFilteredSubcategories(filtered);
  };

  const handleBarcodeChange = (e) => {
    const newBarcode = e.target.value;
    setBarcode(newBarcode);
    setFieldValue("barcode", newBarcode);
    generateSubBarcodes(newBarcode, values.variants);
  };

  const generateSubBarcodes = (main, variants) => {
    const updated = variants.map((variant, index) => ({
      ...variant,
      subBarcode: main ? `${main}${String.fromCharCode(97 + index)}` : "",
    }));
    setFieldValue("variants", updated);
  };

  const generateSubBarcodeImages = () => {
    const container = document.createElement("div");
    const updatedVariants = values.variants.map((variant) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      JsBarcode(svg, variant.subBarcode, {
        format: "CODE128",
        displayValue: true,
        fontSize: 14,
        height: 50,
      });
      container.appendChild(svg);
      return { ...variant, subBarcodeSvg: svg.outerHTML };
    });
    setFieldValue("variants", updatedVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...values.variants];
    updated[index][field] = value;
    generateSubBarcodes(barcode, updated);
  };

  const addVariant = () => {
    const updated = [
      ...values.variants,
      { size: "", color: "", quantity: 0, description: "", productLength: null },
    ];
    generateSubBarcodes(barcode, updated);
  };

  const removeVariant = (index) => {
    const updated = [...values.variants];
    updated.splice(index, 1);
    generateSubBarcodes(barcode, updated);
  };

  const handleImageDrop = async (index, acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...values.variants];
        updated[index].imageUrl = reader.result;
        setFieldValue("variants", updated);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      toast.error("Image compression failed");
    }
  };

  return (
    <div ref={observedElementRef}>
      <Box sx={{ bgcolor: "white", p: 3, maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Edit Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Content"
            name="content"
            multiline
            rows={4}
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && Boolean(errors.content)}
            helperText={touched.content && errors.content}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            select
            label="Brand"
            name="brand"
            value={values.brand}
            onChange={handleBrandChange}
          >
            {brands.map((brand) => (
              <MenuItem key={brand._id} value={brand._id}>
                {brand.brandName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            select
            label="Subcategory"
            name="subcategory"
            value={values.subcategory}
            onChange={handleChange}
          >
            {filteredSubcategories.map((sub) => (
              <MenuItem key={sub._id} value={sub._id}>
                {sub.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            select
            label="Supplier"
            name="supplier"
            value={values.supplier}
            onChange={handleChange}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
          <Select
            fullWidth
            sx={{ mb: 3 }}
            multiple
            value={values.categories}
            onChange={(e) => setFieldValue("categories", e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {categoriesList.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            label="Barcode"
            name="barcode"
            value={barcode}
            onChange={handleBarcodeChange}
          />

          {values.variants.map((variant, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label={`Size ${index + 1}`}
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label={`Color ${index + 1}`}
                value={variant.color}
                onChange={(e) =>
                  handleVariantChange(index, "color", e.target.value)
                }
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label={`Quantity ${index + 1}`}
                type="number"
                value={variant.quantity}
                onChange={(e) =>
                  handleVariantChange(index, "quantity", e.target.value)
                }
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label={`Length ${index + 1}`}
                type="number"
                value={variant.productLength}
                onChange={(e) =>
                  handleVariantChange(index, "productLength", e.target.value)
                }
              />
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label={`Description ${index + 1}`}
                value={variant.description}
                onChange={(e) =>
                  handleVariantChange(index, "description", e.target.value)
                }
              />
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) =>
                  handleImageDrop(index, acceptedFiles)
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border="2px dashed #3f51b5"
                    sx={{ p: 2, mb: 2 }}
                  >
                    <input {...getInputProps()} />
                    {variant.imageUrl ? (
                      <img src={variant.imageUrl} alt="Uploaded" width="100" />
                    ) : (
                      <Typography>Upload Image</Typography>
                    )}
                  </Box>
                )}
              </Dropzone>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeVariant(index)}
              >
                Remove
              </Button>
            </Box>
          ))}

          <Button variant="contained" onClick={addVariant}>
            Add Variant
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, borderRadius: "25px" }}
          >
            Update Product
          </Button>
        </Box>
      </Box>
    </div>
  );
}
