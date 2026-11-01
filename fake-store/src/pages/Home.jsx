import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard/ProductCard";


function Home() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки товаров");
      }

      return response.json();
    },
  });

  if (isPending) {
    return <h2>Загрузка товаров...</h2>;
  }

  if (isError) {
    return <h2>Ошибка загрузки товаров!</h2>;
  }

  return (
    <div className="container">
      <h1>Интернет-магазин</h1>

      <div className="products">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;