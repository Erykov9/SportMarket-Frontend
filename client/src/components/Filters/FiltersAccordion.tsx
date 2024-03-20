import {
  Accordion,
  AccordionSummary,
  Container,
  AccordionDetails,
  Autocomplete,
  TextField,
  Stack,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import styles from "./FiltersAccordion.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProductsStore, { IProductQuery } from "../../mobx/ProductsStore";
import { useEffect, useState } from "react";
import cities from "../../vendor/cities.json";
import { observer } from "mobx-react";

const FiltersAccordion = observer(() => {
  const { query } = ProductsStore;
  const citiesName: string[] = cities.map((city) => city.city);

  const [filterOptions, setFilterOptions] = useState<IProductQuery>(query);
  // const [cityFilter, setCityFilter] = useState<string>(""); to do later

  useEffect(() => {
    setFilterOptions(query);
  }, [query])

  const sortByCategories = [
    { label: "Name", query: "productName" },
    { label: "Price", query: "productPrice" },
    { label: "Category", query: "productCategory" },
  ];

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, sortBy: event.target.value });
  };

  const handleAscending = () => {
    setFilterOptions({
      ...filterOptions,
      isAscending: !filterOptions.isAscending,
    });
  };

  const handleSearchByFilter = () => {
    ProductsStore.setQuery(filterOptions);
  };

  return (
    <Container>
      <div className={styles.filtersAccordion}>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <Tooltip title="Show/Hide">
                <ArrowDropDownIcon />
              </Tooltip>
            }
            aria-controls="filters-accordion"
            id="filters-accordion"
          >
            <h3>Filters</h3>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tooltip title="If city doesn't exist on the list, enter it manually">
              <Autocomplete
                disablePortal
                id="city-filter"
                options={citiesName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter city..."
                    // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    //   setCityFilter(event.target.value)
                    // } to do later
                  />
                )}
                sx={{ width: "200px" }}
                freeSolo
              />
            </Tooltip>
            <Stack
              gap={2}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <RadioGroup
                aria-label="sort-by"
                name="sort-by-group"
                value={filterOptions.sortBy}
                onChange={handleSort}
              >
                {sortByCategories.map((option) => (
                  <FormControlLabel
                    key={option.query}
                    value={option.query}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterOptions.isAscending}
                    onChange={handleAscending}
                  />
                }
                label={filterOptions.isAscending ? "Ascending" : "Descending"}
              />
            </Stack>
            <Button variant="contained" color="primary" onClick={handleSearchByFilter}>Search</Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
});

export default FiltersAccordion;
