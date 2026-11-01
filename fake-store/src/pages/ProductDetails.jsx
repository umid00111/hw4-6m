
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки товара");
      }

      return response.json();
    },
  });

  if (isPending) {
    return <h2>Загрузка товара...</h2>;
  }

  if (isError) {
    return <h2>Ошибка загрузки товара!</h2>;
  }

  return (
    <div className="details">
      <button onClick={() => navigate(-1)}>
        Назад
      </button>

      <img src={data.image} alt={data.title} />

      <div>
        <h1>{data.title}</h1>

        <p>{data.description}</p>

        <p>Категория: {data.category}</p>

        <h2>Цена: ${data.price}</h2>

        <p>
          Рейтинг: {data.rating.rate} / 5
        </p>

        <p>
          Количество отзывов: {data.rating.count}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
