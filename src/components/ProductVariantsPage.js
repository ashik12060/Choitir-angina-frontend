import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";

export default function ProductVariantsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        if (data.success) setProduct(data.product);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-serif mb-6">
        {product.title} — Choose a color
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(product.variants || []).map((v) => {
          const img = v.imageUrl
            ? v.imageUrl.replace("/upload/", "/upload/w_400,h_400,q_auto,f_auto/")
            : "/default-image.jpg";
          return (
            <Link
              key={v._id}
              to={`/product/${product._id}/variant/${v._id}`}
              className="shadow-md p-2 rounded-lg bg-white hover:shadow-lg transition"
            >
              <img className="w-full h-64 object-cover rounded-md" src={img} alt={`${product.title} - ${v.color}`} />
              <p className="pt-2 text-lg font-serif truncate">{product.title} — {v.color}</p>
              <p className="text-lg font-mono">৳ {v.price ?? product.price}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
