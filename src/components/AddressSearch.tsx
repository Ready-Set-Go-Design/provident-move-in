import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { searchAddressesAsync } from "./../store/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import ShowSearchResultsByType from "./ShowSearchResultsByType";
import { updateField } from "../store/formSlice";
import ShowUnitResults from "./ShowUnitResults";
import { Button } from "./button";
import { withPrefix } from "../utils/withPrefix";
import { Table, TableBody, TableRow, TableCell } from "./table";
import { Input } from "./input";

function AddressSearch() {
  const [unitQuery, setUnitQuery] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.address.filteredAddresses || []
  );

  const unitResults = useSelector(
    (state: RootState) => state.address.filteredUnits || []
  );
  const [showResults, setShowResults] = useState<boolean>(
    searchResults.length > 0 ? true : false
  );

  const [showUnitResults, setShowUnitResults] = useState<boolean>(
    unitResults.length > 0 ? true : false
  );

  const formData = useSelector((state: RootState) => state.form);
  const [searchQuery, setSearchQuery] = useState<string>(
    formData.selected_address || ""
  );

  const throttledBuildingSearch = useCallback(
    throttle(
      (addressQuery: string) => {
        dispatch(searchAddressesAsync({ addressQuery, type: "BUILDING" }));

        if (addressQuery.length > 0) {
          setShowResults(true);
        } else {
          setShowResults(false);
        }
      },
      750,
      { leading: false }
    ),
    [dispatch]
  );

  const throttledUnitSearch = useCallback(
    throttle(
      (addressQuery: string, selected_address: string) => {
        const street_number = selected_address
          ? selected_address.split(" ")[0]
          : "";

        const street_name = selected_address
          ? selected_address.split(" ").slice(1).join(" ")
          : "";

        dispatch(
          searchAddressesAsync({
            addressQuery,
            type: "UNIT",
            street_number,
            street_name,
          })
        );

        if (addressQuery.length > 0) {
          setShowUnitResults(true);
        } else {
          setShowUnitResults(false);
        }
      },
      750,
      { leading: false }
    ),
    [dispatch]
  );

  const searchForAddresses = async (query: string) => {
    setSearchQuery(query);
    throttledBuildingSearch(query);
    dispatch(updateField({ field: "selected_address", value: "" }));
  };

  const searchForUnits = (query: string) => {
    setUnitQuery(query);

    throttledUnitSearch(query, formData.selected_address);
    // throttledSearch(searchQuery, query);
    // console.log("Searching for units:", query);
    dispatch(updateField({ field: "selected_unit", value: "" }));
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      throttledBuildingSearch(searchQuery);
    }
  }, []);

  const selectThisAddress = (address: string) => {
    setSearchQuery(address);
    dispatch(updateField({ field: "selected_address", value: address }));

    // searchForAddressesImmediately(address);
  };

  const selectThisUnit = (unit: string, location_id: string) => {
    setUnitQuery(unit);
    dispatch(updateField({ field: "selected_unit", value: unit }));
    console.log("setting location id", location_id);
    dispatch(updateField({ field: "location_id", value: location_id }));
  };

  return (
    <div className={withPrefix("mt-4 mb-4")}>
      {formData.selected_address === "" && (
        <div>
          <strong>Enter Address</strong>
          <br />
          <span>
            Start typing the address below, then select from the available
            choices.
          </span>
        </div>
      )}

      {formData.selected_address !== "" && (
        <Table bleed>
          <TableBody>
            <TableRow>
              <TableCell className={withPrefix("font-medium")}>
                Building:
              </TableCell>
              <TableCell>{formData.selected_address}</TableCell>
              <TableCell className={withPrefix("text-sm text-right")}>
                <Button
                  plain
                  className={withPrefix("text-red-500")}
                  onClick={() => {
                    setUnitQuery("");
                    setSearchQuery("");
                    dispatch(
                      updateField({ field: "selected_address", value: "" })
                    );
                    setShowResults(false);
                  }}
                >
                  <span className={withPrefix("text-red-500")}>X</span>
                </Button>
              </TableCell>
            </TableRow>
            {formData.selected_unit !== "" && (
              <TableRow>
                <TableCell className={withPrefix("font-medium")}>
                  Unit:
                </TableCell>
                <TableCell>{formData.selected_unit}</TableCell>
                <TableCell
                  className={withPrefix("text-zinc-500 pf:text-right")}
                >
                  <Button
                    plain
                    onClick={() => {
                      setUnitQuery("");

                      dispatch(
                        updateField({ field: "selected_unit", value: "" })
                      );
                      setShowUnitResults(false);
                    }}
                  >
                    <span className={withPrefix("text-red-500")}>X</span>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {formData.selected_address === "" && (
        <Table bleed>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input
                  type="text"
                  placeholder="Enter address"
                  value={searchQuery}
                  onChange={(e) => searchForAddresses(e.target.value)}
                />
              </TableCell>
              <TableCell className={withPrefix("text-right")}>
                <Button
                  plain
                  onClick={() => {
                    setUnitQuery("");
                    setSearchQuery("");
                    dispatch(
                      updateField({ field: "selected_address", value: "" })
                    );
                    setShowResults(false);
                  }}
                >
                  <span className={withPrefix("text-red-500")}>X</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      {searchResults.length > 0 &&
        showResults === true &&
        (!formData.selected_address || formData.selected_address === "") &&
        searchQuery > "" && (
          <ShowSearchResultsByType
            searchResults={searchResults as any}
            selectThisAddress={selectThisAddress}
            formData={formData}
          />
        )}

      {searchResults.length === 0 && showResults === true && (
        <div>No results found</div>
      )}

      {formData.selected_address && formData.selected_address > "" && (
        <div className={withPrefix("mt-4 mb-4")}>
          {formData.selected_unit === "" && (
            <div>
              <strong>Suite or Unit Number</strong>
              <br />
              eg., 1507, 1001B, PH10
            </div>
          )}
          {formData.selected_unit === "" && (
            <Table bleed>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input
                      type="text"
                      placeholder="Enter Unit or Suite Number"
                      value={unitQuery}
                      onChange={(e) => searchForUnits(e.target.value)}
                    />
                  </TableCell>
                  <TableCell className={withPrefix("text-right")}>
                    <Button
                      plain
                      onClick={() => {
                        setUnitQuery("");
                        setSearchQuery(formData.selected_address);
                        dispatch(
                          updateField({ field: "selected_unit", value: "" })
                        );
                        setShowResults(false);
                      }}
                    >
                      <span className={withPrefix("text-red-500")}>X</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          {searchResults.length > 0 &&
            showUnitResults === true &&
            (!formData.selected_unit || formData.selected_unit === "") && (
              <ShowUnitResults
                searchResults={unitResults as any}
                unitQuery={unitQuery}
                selectThisUnit={selectThisUnit}
              />
            )}
        </div>
      )}
    </div>
  );
}

export default AddressSearch;
