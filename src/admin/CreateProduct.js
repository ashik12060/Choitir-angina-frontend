// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Dropzone from "react-dropzone";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-quill/dist/quill.snow.css";
// import { useEffect, useRef, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";


// const validationSchema = yup.object({
//   title: yup
//     .string("Add a product title")
//     .min(1, "Product title should have a minimum of 1 character")
//     .required("Product title is required"),
//   content: yup
//     .string("Add text content")
//     .min(1, "Text content should have a minimum of 1 character1")
//     .required("Text content is required"),
// price: yup.number("Add Price"),
// brand: yup.string("Add text content"),

// });


// const CreateProduct = () => {
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
//       image: null,
//       price: "",
//       brand:"",
      
//     },

//     validationSchema: validationSchema,
//     onSubmit: (values, actions) => {
//       createNewProduct(values);
//       //alert(JSON.stringify(values, null, 2));
//       actions.resetForm();
//     },
//   });

//   const [error, setError] = useState(null);
//   const observedElementRef = useRef(null);

//   useEffect(() => {
//     const resizeObserver = new ResizeObserver(() => {
//       try {
//         // Your logic that could potentially throw an error
//       } catch (error) {
//         if (error.name === 'ResizeObserver loop completed') {
//           setError('ResizeObserver loop error');
//         } else {
//           // Handle other errors
//         }
//       }
//     });

//     if (observedElementRef.current) {
//       resizeObserver.observe(observedElementRef.current);
//     }

//     return () => {
//       if (observedElementRef.current) {
//         resizeObserver.unobserve(observedElementRef.current);
//       }
//     };
//   }, [observedElementRef]);
// //stop
//   const createNewProduct = async (values) => {
//     try {
//        const result = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/product/create`, values);
      
//        if (result?.data?.success === true) {
//         toast.success("product created");
//         // Navigate("/admin/dashboard");
//       }
       
//     } catch (error) {
//       console.log(error);
//       toast.error(error);
//     }
//   };
  

//   return (
//     <div ref={observedElementRef}>

// {error ? (
//         <div>Error: {error}</div>
//       ) : (
      
//       <Box sx={{ bgcolor: "white",
//       padding: "20px",
//       width: "100%",
//       maxWidth: "1200px",
//       margin: "0 auto", }}>
//         <Typography variant="h5" sx={{ pb: 4 }}>
//           {" "}
//           Create Product{" "}
//         </Typography>
        
        
//         {/* noValidate */}
//         <Box component="form"  onSubmit={handleSubmit}  sx={{ mt: 1 }}>
//           <TextField
//             sx={{ mb: 3}}
//             fullWidth
//             id="title"
//             label="Post title"
//             name="title"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             placeholder="Post title"
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
//               label="Country Origin"
//               name="content"
//               multiline
//               rows={4}
//               placeholder="Write the country from..."
//               value={values.content}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.content && Boolean(errors.content)}
//               helperText={touched.content && errors.content}
//             />

//             {/* features start */}
//             <TextField
//               sx={{ mb: 3 }}
//               fullWidth
//               id="price"
//               label="Price"
//               name="price"
//               multiline
//               rows={4}
//               placeholder="Price..."
//               value={values.price}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.price && Boolean(errors.price)}
//               helperText={touched.price && errors.price}
//             />
//             <TextField
//               sx={{ mb: 3 }}
//               fullWidth
//               id="brand"
//               label="Brand"
//               name="brand"
//               multiline
//               rows={4}
//               placeholder="brand name..."
//               value={values.brand}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               error={touched.brand && Boolean(errors.brand)}
//               helperText={touched.brand && errors.brand}
//             />
           
//           </Box>

//           <Box border="2px dashed blue" sx={{ p: 1 }}>
//             <Dropzone
//               acceptedFiles=".jpg,.jpeg,.png"
//               multiple={false}
//               //maxFiles={3}
//               onDrop={(acceptedFiles) =>
//                 acceptedFiles.map((file, index) => {
//                   const reader = new FileReader();
//                   reader.readAsDataURL(file);
//                   reader.onloadend = () => {
//                     setFieldValue("image", reader.result);
//                   };
//                   return null;
//                 })
//               }
//             >
//               {({ getRootProps, getInputProps, isDragActive }) => (
//                 <Box
//                   {...getRootProps()}
//                   p="1rem"
//                   sx={{
//                     "&:hover": { cursor: "pointer" },
//                     bgColor: isDragActive ? "#cceffc" : "#fafafa",
//                   }}
//                 >
//                   <input name="banner" {...getInputProps()} />
//                   {isDragActive ? (
//                     <>
//                       <p style={{ textAlign: "center" }}>
//                         <CloudUploadIcon
//                           sx={{ color: "primary.main", mr: 2 }}
//                         />
//                       </p>
//                       <p style={{ textAlign: "center", fontSize: "12px" }}>
//                         {" "}
//                         Drop here!
//                       </p>
//                     </>
//                   ) : values.image === null ? (
//                     <>
//                       <p style={{ textAlign: "center" }}>
//                         <CloudUploadIcon
//                           sx={{ color: "primary.main", mr: 2 }}
//                         />
//                       </p>
//                       <p style={{ textAlign: "center", fontSize: "12px" }}>
//                         Drag and Drop here or click to choose
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-around",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Box>
//                           <img
//                             style={{ maxWidth: "100px" }}
//                             src={values.image}
//                             alt=""
//                           />
//                         </Box>
//                       </Box>
//                     </>
//                   )}
//                 </Box>
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
//             Create Product
//           </Button>
          
//         </Box>
        
//       </Box>
//       )}
//     </div>
//   );
// };

// export default CreateProduct;



import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../pages/axiosInstance";

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
  brand: yup.string("Add brand name").required("Brand name is required"),
  supplier: yup.string("Select a supplier").required("Supplier is required"),
});

const CreateProduct = () => {
  const [suppliers, setSuppliers] = useState([]); // Store supplier list
  const [error, setError] = useState(null);
  const observedElementRef = useRef(null);

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
      brand: "",
      supplier: "", // Add supplier field
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

