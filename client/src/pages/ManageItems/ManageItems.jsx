import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

import "./ManageItems.css";
import ItemsForm from "../../components/ItemsForm/ItemsForm";
import ItemsList from "../../components/ItemsList/ItemsList";
import { getItems } from "../../service/ItemService";
import { AppContext } from "../../context/AppContext";

const ManageItems = () => {
  const { items, setItems } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const response = await getItems();
        setItems(response.data);
      } catch (error) {
        toast.error("Unable to fetch items");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);
  return (
    <div className="items-container text-light">
      <div className="left-column">
        <ItemsForm setItems={setItems} />
      </div>
      <div className="right-column">
        <ItemsList items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default ManageItems;
