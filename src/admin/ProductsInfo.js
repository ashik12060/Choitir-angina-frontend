// import React, { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { Box, Button, IconButton, Paper, Grid } from "@mui/material"; // Added Grid for responsiveness
// import { DataGrid, GridAddIcon, gridClasses } from "@mui/x-data-grid";
// // import { GridAddIcon } from '@mui/icons-material';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

// const ProductsInfo = () => {
//   const [products, setProducts] = useState([]);

//   // Display products
//   const displayProduct = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/show`
//       );
//       console.log9(data)
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     displayProduct();
//   }, []);

//   // Delete product by Id
//   const deleteProductById = async (e, id) => {
//     console.log(id);
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const { data } = await axiosInstance.delete(
//           `${process.env.REACT_APP_API_URL}/api/delete/product/${id}`
//         );
//         if (data.success === true) {
//           toast.success(data.message);
//           displayProduct();
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(error);
//       }
//     }
//   };

//   // Product columns
//   const ProductColumns = [
//     {
//       field: "_id",
//       headerName: "Post ID",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "title",
//       headerName: "Post title",
//       width: 150,
//     },
//     {
//       field: "likes",
//       headerName: "Likes",
//       width: 150,
//       renderCell: (params) => params.row.likes.length,
//     },
//     {
//       field: "comments",
//       headerName: "Comments",
//       width: 150,
//       renderCell: (params) => params.row.comments.length,
//     },
//     {
//       field: "postedBy",
//       headerName: "Posted by",
//       width: 150,
//       valueGetter: (data) => data.row.postedBy.name,
//     },
//     {
//       field: "createdAt",
//       headerName: "Create At",
//       width: 150,
//       renderCell: (params) =>
//         moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
//     },
//     {
//       field: "Actions",
//       width: 100,
//       renderCell: (value) => (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "250px",
//           }}
//         >
//           <Link to={`/admin/product/edit/${value.row._id}`}>
//             <IconButton aria-label="edit" className="text-sm">
//               <FontAwesomeIcon icon={faPenToSquare} />
//             </IconButton>
//           </Link>
//           {/* <IconButton
//             aria-label="delete"
//             onClick={(e) => deleteProductById(e, value.row._id)}
//           >
//             <FontAwesomeIcon className='text-red-500' icon={faTrashCan} />
//           </IconButton> */}
//           <IconButton
//             aria-label="delete"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent row click conflict
//               deleteProductById(e, value.row._id);
//             }}
//           >
//             <FontAwesomeIcon className="text-red-500" icon={faTrashCan} />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {/* Products */}
//       <Box>
//         <h3 className="mt-3">
//           <span className="py-2 px-4 rounded bg-primary text-white">
//             PRODUCTS
//           </span>
//         </h3>
//         <Grid container spacing={2} justifyContent="flex-end" sx={{ pb: 2 }}>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="success"
//               startIcon={<GridAddIcon />}
//             >
//               <Link
//                 style={{ color: "white", textDecoration: "none" }}
//                 to="/admin/product/create"
//               >
//                 Add Products
//               </Link>
//             </Button>
//           </Grid>
//         </Grid>

//         <Paper sx={{ bgColor: "white" }}>
//           <Box sx={{ height: "auto", width: "100%" }}>
//             <DataGrid
//               getRowId={(row) => row._id}
//               sx={{
//                 "& .MuiTablePagination-displayedRows": {
//                   color: "black",
//                 },
//                 color: "black",
//                 [`& .${gridClasses.row}`]: {
//                   bgColor: "white",
//                 },
//               }}
//               rows={products}
//               columns={ProductColumns}
//               pageSize={3}
//               rowsPerPageOptions={[3]}
//               checkboxSelection
//               autoHeight
//             />
//           </Box>
//         </Paper>
//       </Box>
//     </div>
//   );
// };

// export default ProductsInfo;

import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Paper, Grid } from "@mui/material";
import { DataGrid, GridAddIcon, gridClasses } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Loader from "../components/Loader";

const ProductsInfo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Display products
  const displayProduct = async () => {
    console.log("Fetching products from", `${process.env.REACT_APP_API_URL}/api/products/show`);

    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/products/show`
      );
      setProducts(data.products || []);
      console.log(data.products)
       console.log("Raw API response:", data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products in admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayProduct();
  }, []);
  

  // Delete product by Id
  const deleteProductById = async (e, id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/product/${id}`
        );
        if (data.success === true) {
          toast.success(data.message);
          displayProduct();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete product");
      }
    }
  };

  // Product columns
  const ProductColumns = [
    { field: "_id", headerName: "Post ID", width: 150 },
    { field: "title", headerName: "Post title", width: 150 },
    {
      field: "likes",
      headerName: "Likes",
      width: 150,
      renderCell: (params) => params.row.likes?.length || 0,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 150,
      renderCell: (params) => params.row.comments?.length || 0,
    },
    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => data.row.postedBy?.name || "Unknown",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "250px",
          }}
        >
          <Link to={`/admin/product/edit/${value.row._id}`}>
            <IconButton aria-label="edit" className="text-sm">
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteProductById(e, value.row._id);
            }}
          >
            <FontAwesomeIcon className="text-red-500" icon={faTrashCan} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Box>
        <h3 className="mt-3">
          <span className="py-2 px-4 rounded bg-primary text-white">
            PRODUCTS
          </span>
        </h3>

        <Grid container spacing={2} justifyContent="flex-end" sx={{ pb: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              startIcon={<GridAddIcon />}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/admin/product/create"
              >
                Add Products
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ bgColor: "white", p: 2 }}>
          {loading ? (
            <p className="text-center text-gray-500"><Loader /></p>
          ) : products.length > 0 ? (
            <Box sx={{ height: "auto", width: "100%" }}>
              {/* <DataGrid
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiTablePagination-displayedRows": {
                    color: "black",
                  },
                  color: "black",
                  [`& .${gridClasses.row}`]: {
                    bgColor: "white",
                  },
                }}
                rows={products}
                columns={ProductColumns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                checkboxSelection
                autoHeight
              /> */}
              <DataGrid
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiTablePagination-displayedRows": {
                    color: "black",
                  },
                  color: "black",
                  [`& .${gridClasses.row}`]: {
                    bgColor: "white",
                  },
                }}
                rows={products}
                columns={ProductColumns}
                pageSize={10} // ✅ show 10 rows at a time
                rowsPerPageOptions={[10, 20]} // ✅ let user choose per page
                pagination // ✅ enables pagination
                checkboxSelection
                autoHeight
              />
            </Box>
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default ProductsInfo;
