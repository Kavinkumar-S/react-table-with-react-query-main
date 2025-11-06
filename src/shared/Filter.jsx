import React, { useState } from "react";
import { Dropdown, Accordion, Form } from "react-bootstrap";
const Filter = ({ filter, setFilter, filterOptions }) => {
  console.log("filterOptions", filterOptions);

  const [tempFilter, setTempFilter] = useState({});
  const handleFilterChange = (category, val) => {
    const updatedFilters = { ...tempFilter };
    if (!updatedFilters[category]) {
      updatedFilters[category] = []; // Initialize array if not present
    }

    if (updatedFilters[category].includes(val)) {
      updatedFilters[category] = updatedFilters[category].filter(
        (item) => item !== val
      );
      if (updatedFilters[category].length === 0) {
        delete updatedFilters[category]; // Remove key if no values remain
      }
    } else {
      updatedFilters[category].push(val);
    }
    setFilter(updatedFilters);
    setTempFilter(updatedFilters);
  };
  console.log("filter state : ", filter);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          className="filter-btn d-flex align-items-center gap-2"
          id="dropdown-basic"
        >
          <span className="header-btn-text"> Filter</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Accordion defaultActiveKey="0">
            {/* {filterDetails?.map((category, index) => (
              <Accordion.Item
                eventKey={index.toString()}
                key={`${category.title}_${index}`}
              >
                <Accordion.Header>{category.title}</Accordion.Header>
                <Accordion.Body>
                  {getFilterList(category).length > 0 ? (
                    getFilterList(category)?.map((val, list_index) => (
                      <div
                        className="filter-opt "
                        key={`${val.value}_${list_index}`}
                      >
                        <label
                          htmlFor={val.value}
                          className="d-flex align-items-center gap-2 cursor-pointer"
                        >
                          <Form.Check type="checkbox">
                            <Form.Check.Input
                              type="checkbox"
                              id={val.value}
                              name={val.value}
                              checked={
                                tempFilter?.[category.key]?.includes(
                                  val.value
                                ) || false
                              }
                              onChange={() =>
                                handleFilterChange(category.key, val.value)
                              }
                            />
                          </Form.Check>
                          <span className=" text-cap">{val.name}</span>
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>No data</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))} */}
            {filterOptions?.map(
              (category, index) => (
                console.log("category", category),
                (
                  <Accordion.Item>
                    <Accordion.Header>{category?.title}</Accordion.Header>
                    <Accordion.Body>
                      {category?.list?.map((val, list_index) => (
                        <div className="filter-opt ">
                          <label
                            htmlFor={val.value}
                            className="d-flex align-items-center gap-2 cursor-pointer"
                          >
                            <Form.Check type="checkbox">
                              <Form.Check.Input
                                type="checkbox"
                                id={val.value}
                                name={val.value}
                                checked={
                                  tempFilter?.[category.key]?.includes(
                                    val.value
                                  ) || false
                                }
                                onChange={() =>
                                  handleFilterChange(category.key, val.value)
                                }
                              />
                            </Form.Check>
                            <span className=" text-cap">{val.name}</span>
                          </label>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )
              )
            )}
          </Accordion>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Filter;
