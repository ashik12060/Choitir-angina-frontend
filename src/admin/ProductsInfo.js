// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../pages/axiosInstance';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
// import { Box, Button, gridClasses, IconButton, Paper } from '@mui/material';
// import { DataGrid, GridAddIcon } from '@mui/x-data-grid';


// const ProductsInfo = () => {
//       const [products, setProducts] = useState([]);
    

//        //display products
//   const displayProduct = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/show`
//       );
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     displayProduct();
//   }, []);

//   //delete product by Id
//   const deleteProductById = async (e, id) => {
//     console.log(id);
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         //
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

  
//   //   //products columns add extra
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

//     // {
//     //   field: "image",
//     //   headerName: "Image",
//     //   width: 150,
//     //   renderCell: (params) => <img width="40%" src={params.row.image.url} />,
//     // },
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
//             <IconButton aria-label="edit" className='text-sm'>
//               {/* <EditIcon sx={{ color: "#1976d2" }} /> */}
//               Edit
//             </IconButton>
//           </Link>
//           <IconButton
//             aria-label="delete"
//             onClick={(e) => deleteProductById(e, value.row._id)}
//           >
//             {/* <DeleteIcon sx={{ color: "red" }} /> */}Delete
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];





//   return (
//     <div>ProductsInfo


//            {/* Products  */}
//            <Box>
//               <h3 className="mt-3">
//                 <span className="py-2 px-4 rounded bg-primary text-white ">
//                   PRODUCTS
//                 </span>
//               </h3>
//               <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   startIcon={<GridAddIcon />}
//                 >
//                   <Link
//                     style={{ color: "white", textDecoration: "none" }}
//                     to="/admin/product/create"
//                   >
//                     Add Products
//                   </Link>{" "}
//                 </Button>
//               </Box>
//               <Paper sx={{ bgColor: "white" }}>
//                 <Box sx={{ height: 400, width: "100%" }}>
//                   <DataGrid
//                     getRowId={(row) => row._id}
//                     sx={{
//                       "& .MuiTablePagination-displayedRows": {
//                         color: "black",
//                       },
//                       color: "black",
//                       [`& .${gridClasses.row}`]: {
//                         bgColor: "white",
//                       },
//                     }}
//                     rows={products}
//                     columns={ProductColumns}
//                     pageSize={3}
//                     rowsPerPageOptions={[3]}
//                     checkboxSelection
//                   />
//                 </Box>
//               </Paper>
//             </Box>
//     </div>
//   )
// }

// export default ProductsInfo


import React, { useEffect, useState } from 'react';
import axiosInstance from '../pages/axiosInstance';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Paper, Grid } from '@mui/material';  // Added Grid for responsiveness
import { DataGrid, GridAddIcon, gridClasses } from '@mui/x-data-grid';
// import { GridAddIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ProductsInfo = () => {
  const [products, setProducts] = useState([]);

  // Display products
  const displayProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/products/show`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayProduct();
  }, []);

  // Delete product by Id
  const deleteProductById = async (e, id) => {
    console.log(id);
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
        toast.error(error);
      }
    }
  };

  // Product columns
  const ProductColumns = [
    {
      field: "_id",
      headerName: "Post ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Post title",
      width: 150,
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 150,
      renderCell: (params) => params.row.likes.length,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 150,
      renderCell: (params) => params.row.comments.length,
    },
    {
      field: "postedBy",
      headerName: "Posted by",
      width: 150,
      valueGetter: (data) => data.row.postedBy.name,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
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
            <IconButton aria-label="edit" className='text-sm'>
            <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
         
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => deleteProductById(e, value.row._id)}
          >
            <FontAwesomeIcon className='text-red-500' icon={faTrashCan} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      {/* Products */}
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

        <Paper sx={{ bgColor: "white" }}>
          <Box sx={{ height: 'auto', width: "100%" }}>
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
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              autoHeight
            />
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default ProductsInfo;
