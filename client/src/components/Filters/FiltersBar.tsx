import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, Container, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./FiltersBar.module.scss";
import ProductsStore from "../../mobx/ProductsStore";
import { useState } from "react";

const FiltersBar = () => {
  const { query } = ProductsStore;
  const [searchInputData, setSearchInputData] = useState<string>("");

  const handleSearch = (): void => {
    ProductsStore.setQuery({...query, filterOn: "productname", filterQuery: searchInputData });
  };

  const handleRemove = (): void => {
    ProductsStore.setQuery({...query, filterOn: "", filterQuery: "" });
    setSearchInputData("");
  };

  return (
    <Container>
      <div className={styles.filtersBar}>
        <TextField
          style={{ width: '100%', backgroundColor: 'white' }}
          variant="outlined"
          placeholder="Search for the product you need..."
          value={searchInputData}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInputData(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Search">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove">
                  <IconButton onClick={handleRemove}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Container>
  )
};

export default FiltersBar;