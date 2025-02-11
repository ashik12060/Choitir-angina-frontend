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
  Button,
  Typography,
} from "@mui/material";
import axiosInstance from "../pages/axiosInstance";
import { toast } from "react-toastify";

const WarehouseProductsTable = () => {
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  // Fetch products

useEffect(() => {
    const fetchWarehouseProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/warehouse-products/show");
        console.log(response.data.warehouseProducts)
        if (response.data && Array.isArray(response.data.warehouseProducts)) {
            setWarehouseProducts(response.data.warehouseProducts);
        } else {
            setWarehouseProducts([]); // Set empty array if data is missing
        }
      } catch (error) {
        console.error("Error fetching warehouseProducts:", error);
        setWarehouseProducts([]); // Prevent crash on error
      }
    };
  
    fetchWarehouseProducts();
  }, []);
  

  // Handle status change
  const toggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Sold Out" : "Pending";

    try {
      const response = await axiosInstance.put(`/api/warehouse-products/update/${productId}`, {
        status: newStatus,
      });

      if (response.data.success) {
        setWarehouseProducts((prev) =>
          prev.map((product) =>
            product._id === productId ? { ...product, status: newStatus } : product
          )
        );
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Warehouse Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.status || "Pending"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={product.status === "Pending" ? "warning" : "success"}
                    onClick={() => toggleStatus(product._id, product.status)}
                  >
                    {product.status === "Pending" ? "Mark as Sold Out" : "Mark as Pending"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WarehouseProductsTable;
