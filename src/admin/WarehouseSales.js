
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import axiosInstance from "../pages/axiosInstance";
// import { toast } from "react-toastify";

// const WarehouseSales = () => {
//   const [warehouseSales, setWarehouseSales] = useState([]);

//   // Fetch sales data
//   useEffect(() => {
//     const fetchWarehouseSales = async () => {
//       try {
//         const response = await axiosInstance.get("/api/warehouse-sales/show");
//         if (response.data && Array.isArray(response.data)) {
//           setWarehouseSales(response.data); // Set the sales data
//         } else {
//           setWarehouseSales([]); // Set empty array if no sales data
//         }
//       } catch (error) {
//         console.error("Error fetching warehouseSales:", error);
//         setWarehouseSales([]); // Prevent crash on error
//       }
//     };

//     fetchWarehouseSales();
//   }, []);

//   const handleStatusChange = async (saleId, productId, newStatus) => {
//     try {
//       const response = await axiosInstance.put(`/api/warehouse-products/update-status/${productId}`, {
//         status: newStatus,
//       });

//       if (response.status === 200) {
//         setWarehouseSales((prevSales) =>
//           prevSales.map((sale) => {
//             if (sale._id === saleId) {
//               // Find the product within the sale and update its status
//               return {
//                 ...sale,
//                 warehouseProducts: sale.warehouseProducts.map((product) =>
//                   product.productId._id === productId
//                     ? {
//                         ...product,
//                         status: newStatus,
//                         quantity:
//                           newStatus === "Canceled" ? product.productId.originalQuantity : product.quantity, // Restore original quantity on cancel
//                       }
//                     : product
//                 ),
//               };
//             }
//             return sale;
//           })
//         );
//         toast.success(`Status updated to ${newStatus}`);
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Warehouse Sales
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Sale ID</b></TableCell>
//               <TableCell><b>Customer Name</b></TableCell>
//               <TableCell><b>Total Price</b></TableCell>
//               <TableCell><b>Status</b></TableCell>
//               <TableCell><b>Product</b></TableCell>
//               <TableCell><b>Price</b></TableCell>
//               <TableCell><b>Quantity</b></TableCell>
//               <TableCell><b>Type</b></TableCell>
//               <TableCell><b>Update Status</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {warehouseSales.map((sale) => (
//               sale.warehouseProducts.map((product) => (
//                 <TableRow key={product.productId._id}>
//                   <TableCell>{sale._id}</TableCell>
//                   <TableCell>{sale.customerName}</TableCell>
//                   <TableCell>${sale.totalPrice}</TableCell>
//                   <TableCell>{sale.status}</TableCell>
//                   <TableCell>{product.title}</TableCell>
//                   <TableCell>${product.price}</TableCell>
//                   <TableCell>{product.quantity}</TableCell>
//                   <TableCell>{product.type}</TableCell>
//                   <TableCell>
//                     <Select
//                       value={product.status || "Pending"}
//                       onChange={(e) =>
//                         handleStatusChange(sale._id, product.productId._id, e.target.value)
//                       }
//                       sx={{ width: 150 }}
//                     >
//                       <MenuItem value="Pending">Pending</MenuItem>
//                       <MenuItem value="Sold Out">Sold Out</MenuItem>
//                       <MenuItem value="Canceled">Canceled</MenuItem>
//                     </Select>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default WarehouseSales;




import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../pages/axiosInstance";

const WarehouseSales = () => {
  const [warehouseSales, setWarehouseSales] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch sales data
  useEffect(() => {
    const fetchWarehouseSales = async () => {
      try {
        const response = await axiosInstance.get("/api/warehouse-sales/show");
        if (response.data && Array.isArray(response.data)) {
          setWarehouseSales(response.data); // Set the sales data
        } else {
          setWarehouseSales([]); // Set empty array if no sales data
        }
      } catch (error) {
        console.error("Error fetching warehouseSales:", error);
        setWarehouseSales([]); // Prevent crash on error
      }
    };

    fetchWarehouseSales();
  }, []);


// const handleStatusChange = async (saleId, productId, newStatus) => {
//     try {
//       const response = await axiosInstance.put(`/api/warehouse-sales/update-status/${saleId}/${productId}`, {
//         status: newStatus,
//       });
  
//       if (response.status === 200) {
//         setWarehouseSales((prevSales) =>
//           prevSales.map((sale) => {
//             if (sale._id === saleId) {
//               return {
//                 ...sale,
//                 warehouseProducts: sale.warehouseProducts.map((product) =>
//                   product.productId._id === productId
//                     ? { ...product, status: newStatus }
//                     : product
//                 ),
//               };
//             }
//             return sale;
//           })
//         );
//         toast.success(`Status updated to ${newStatus}`);
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast.error("Failed to update status");
//     }
//   };
  
const handleStatusChange = async (saleId, productId, newStatus) => {
    try {
      console.log("Updating status:", { saleId, productId, newStatus });
  
      const response = await axiosInstance.put(`/api/warehouse-sales/update-status/${saleId}/${productId}`, {
        status: newStatus,
      });
  
      console.log("Response:", response);
  
      if (response.status === 200) {
        setWarehouseSales((prevSales) =>
          prevSales.map((sale) => {
            if (sale._id === saleId) {
              return {
                ...sale,
                warehouseProducts: sale.warehouseProducts.map((product) =>
                  product.productId._id === productId
                    ? { ...product, status: newStatus }
                    : product
                ),
              };
            }
            return sale;
          })
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error.response ? error.response.data : error);
      toast.error("Failed to update status");
    }
  };
  

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Sold Out":
        return "#ffb3b3"; // Light red for Sold Out
      case "Canceled":
        return "#ffcc99"; // Light orange for Canceled
      case "Pending":
      default:
        return "#d1e7dd"; // Light green for Pending
    }
  };

  return (
    <Box sx={{ width: "100%", px: 2, mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Warehouse Sales
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell><b>Sale ID</b></TableCell> */}
              {!isMobile && <TableCell><b>Customer</b></TableCell>}
              <TableCell><b>Total Price</b></TableCell>
              {/* {!isMobile && <TableCell><b>Status</b></TableCell>} */}
              <TableCell><b>Product</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              {!isMobile && <TableCell><b>Type</b></TableCell>}
              <TableCell><b>Update Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseSales.map((sale) =>
              sale.warehouseProducts.map((product) => (
                <TableRow key={product.productId._id}>
                  {/* <TableCell sx={{ minWidth: "100px" }}>{sale._id}</TableCell> */}
                  {!isMobile && (
                    <TableCell sx={{ minWidth: "120px" }}>
                      {sale.customerName}
                    </TableCell>
                  )}
                  <TableCell sx={{ minWidth: "100px" }}>
                    ${sale.totalPrice}
                  </TableCell>
                  {/* {!isMobile && (
                    <TableCell sx={{ minWidth: "120px" }}>{sale.status}</TableCell>
                  )} */}
                  <TableCell sx={{ minWidth: "150px" }}>{product.title}</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>${product.price}</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>{product.quantity}</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ minWidth: "100px" }}>{product.type}</TableCell>
                  )}
                  {/* <TableCell sx={{ minWidth: "150px" }}>
                    <Select
                      value={product.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(sale._id, product.productId?._id || product.productId, e.target.value)

                      }
                      sx={{ width: 130 }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Sold Out">Sold Out</MenuItem>
                      <MenuItem value="Canceled">Canceled</MenuItem>
                    </Select>
                  </TableCell> */}
                  <TableCell sx={{ minWidth: "150px" }}>
                    <Select
                      value={product.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(sale._id, product.productId?._id || product.productId, e.target.value)
                      }
                      sx={{ width: 130, backgroundColor: getStatusBackgroundColor(product.status) }}
                    >
                      <MenuItem value="Pending" sx={{ backgroundColor: getStatusBackgroundColor("Pending") }}>
                        Pending
                      </MenuItem>
                      <MenuItem value="Sold Out" sx={{ backgroundColor: getStatusBackgroundColor("Sold Out") }}>
                        Sold Out
                      </MenuItem>
                      <MenuItem value="Canceled" sx={{ backgroundColor: getStatusBackgroundColor("Canceled") }}>
                        Canceled
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WarehouseSales;
