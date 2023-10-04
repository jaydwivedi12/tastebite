import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import {TfiSearch} from "react-icons/tfi";


const FreeRecipe = () => {
  const APP=process.env.REACT_APP_ID;
  const API=process.env.REACT_APP_API;

  const API_URL =
    `https://api.edamam.com/api/recipes/v2?type=public&q=garlic&app_id=${APP}&app_key=${API}&random=true`;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function fetchProductData() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&page=${page}`);
      const data = await response.json();
      const newRecipes = data.hits.map((hit) => hit.recipe);
      setPosts((prevPosts) => [...prevPosts, ...newRecipes]);
      if (newRecipes.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, [page]);

  useEffect(() => {
    function handleScroll(event) {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
        hasMore
      ) {
        event.preventDefault();
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-4xl bg-inherit flex justify-center items-center "> Find Free Recipes</div>
      <div className="text-xl bg-inherit flex justify-center items-center gap-10 my-10 border border-black px-5">
      <i class="fa-solid fa-angles-right fa-beat" style={{color: "#04ff00"}}></i>
      <input className="outline-none" type="text" placeholder="Enter Recipe Name " />
      <TfiSearch/> 
      </div>
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {posts.map((recipe) => (
            <Product key={recipe.uri} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div>
          <p>Recipes not Found</p>
        </div>
      )}
    </div>
  );
};

export default FreeRecipe;
