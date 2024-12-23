

// import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../pages/axiosInstance";



import { Box, Button, TextField, Typography, MenuItem, Select, Chip } from "@mui/material";

const validationSchema = yup.object({
  title: yup
    .string("Add a product title")
    .min(1, "Product title should have a minimum of 1 character")
    .required("Product title is required"),
  content: yup
    .string("Add text content")
    .min(1, "Text content should have a minimum of 1 character")
    .required("Text content is required"),
  price: yup.number("Add Price").required("Price is required"),
  quantity: yup.number("Add quantity").required("quantity is required"),
  brand: yup.string("Add brand name").required("Brand name is required"),
  supplier: yup.string("Select a supplier").required("Supplier is required"),
  categories: yup
    .array()
    .of(yup.string().required("Category is required"))
    .min(1, "At least one category is required"),

    barcode: yup.string("Add a barcode").min(6, "Barcode must be at least 6 characters"),
});

const CreateProduct = () => {
  const [suppliers, setSuppliers] = useState([]); // Store supplier list
  const [error, setError] = useState(null);
  const observedElementRef = useRef(null);
  const [barcode, setBarcode] = useState(null);


  const categoriesList = ["All", "Top Brands", "New Arrival", "Unstitched"]; // Predefined categories

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: null,
      price: "",
      quantity: "",
      brand: "",
      supplier: "",
      categories: [], // Initialize as an empty array
      barcode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      await createNewProduct(values);
      actions.resetForm();
    },
  });

  // Fetch suppliers when component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/suppliers`);
        setSuppliers(response.data.suppliers || []);
      } catch (err) {
        toast.error("Failed to load suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  const createNewProduct = async (values) => {
    try {
      const result = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/product/create`,
        values
      );
      if (result?.data?.success) {
        toast.success("Product created");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error creating product");
    }
  };

  const generateBarcode = () => {
    const generatedBarcode = `BAR${Date.now()}`; // Example barcode logic
    setFieldValue("barcode", generatedBarcode);
    toast.success("Barcode generated");
  };

  return (
    <div ref={observedElementRef}>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <Box
          sx={{
            bgcolor: "white",
            padding: "20px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Typography variant="h5" sx={{ pb: 4 }}>
            Create Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Product Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="content"
              label="Country Origin"
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
              sx={{ mb: 3 }}
              fullWidth
              id="price"
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
              sx={{ mb: 3 }}
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              type="number"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.quantity && Boolean(errors.quantity)}
              helperText={touched.quantity && errors.quantity}
            />



            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="brand"
              label="Brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.brand && Boolean(errors.brand)}
              helperText={touched.brand && errors.brand}
            />
            {/* Supplier Dropdown */}
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              select
              id="supplier"
              label="Supplier"
              name="supplier"
              value={values.supplier}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.supplier && Boolean(errors.supplier)}
              helperText={touched.supplier && errors.supplier}
            >
              {suppliers.length === 0 ? (
                <MenuItem disabled>No suppliers available</MenuItem>
              ) : (
                suppliers.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </MenuItem>
                ))
              )}
            </TextField>
            {/* Categories Multi-Select */}
            <Select
              sx={{ mb: 3, width: "100%" }}
              id="categories"
              name="categories"
              multiple
              value={values.categories}
              onChange={(e) => setFieldValue("categories", e.target.value)}
              onBlur={handleBlur}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              error={touched.categories && Boolean(errors.categories)}
            >
              {categoriesList.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {touched.categories && errors.categories && (
              <Typography color="error" variant="caption">
                {errors.categories}
              </Typography>
            )}

            {/* barcode */}

<TextField
            sx={{ mb: 3 }}
            fullWidth
            id="barcode"
            label="Barcode"
            name="barcode"
            value={values.barcode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.barcode && Boolean(errors.barcode)}
            helperText={touched.barcode && errors.barcode}
          />
          <Button
            variant="outlined"
            onClick={generateBarcode}
            sx={{ mb: 3 }}
          >
            Generate Barcode
          </Button>


            <Box border="2px dashed blue" sx={{ p: 1, mb: 3 }}>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  acceptedFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setFieldValue("image", reader.result);
                    };
                  })
                }
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <Box
                    {...getRootProps()}
                    p="1rem"
                    sx={{
                      "&:hover": { cursor: "pointer" },
                      bgColor: isDragActive ? "#cceffc" : "#fafafa",
                    }}
                  >
                    <input name="banner" {...getInputProps()} />
                    {isDragActive ? (
                      <Typography>Drop the file here</Typography>
                    ) : values.image ? (
                      <img
                        style={{ maxWidth: "100px" }}
                        src={values.image}
                        alt="Uploaded"
                      />
                    ) : (
                      <Typography>
                        Drag and drop here or click to upload
                      </Typography>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
            >
              Create Product
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CreateProduct;


