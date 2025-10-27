import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react";

import "./DisplayItem.css";
import Item from "../../Item/Item";
import SearchBox from "../SearchBox/SearchBox";

const DisplayItem = ({ selectedCategory }) => {
  const { items } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = items
    .filter((item) => {
      if (!selectedCategory) return true;
      return item.categoryId === selectedCategory;
    })
    .filter((item) => {
      if (!searchText) return true;
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>
      <div className="row g-3">
        {filteredItems.map((item) => (
          <div key={item.itemId} className="col-md-4 col-sm-6">
            <Item
              name={item.name}
              imgUrl={item.imgUrl}
              price={item.price}
              itemId={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItem;
