import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

const categories = () => {
  const [name, setName] = useState("");
  const saveCategory = async (ev) => {
    ev.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category name"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <button type={"Submit"} className="btn-primary py-1">
          Save
        </button>
      </form>
    </Layout>
  );
};

export default categories;
