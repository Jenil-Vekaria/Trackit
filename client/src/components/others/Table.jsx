import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useEffect, useState } from "react";
import React from "react";
import { getFieldValue } from "@/util/GetObjectProperty";
import SearchBar from "./SearchBar";

const Table = ({
  tableData = [],
  columns,
  searchPlaceholder,
  onRowClick,
  defaultSortInfo,
  hasCheckboxColumn = false,
  sortable = true,
  selectedRowIds,
  onSelectionChange,
  height = 400,
  rowHeight = 45,
  disableCheckBox = false,
  isLoading = false,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [dataFields, setDataFields] = useState([]);
  const gridStyle = { minHeight: height };

  const getDataSourceFields = () => {
    const result = [];

    columns.forEach((column) => {
      if (column.searchInField) {
        result.push(...column.searchInField);
      }
    });

    setDataFields(result);
  };

  const handleSearchInputChange = ({ target: { value } }) => {
    const lowerSearchText = value.toLowerCase();

    const newData = tableData.filter((data) => {
      return dataFields.some((key) => {
        const value = getFieldValue(data, key);
        return value.toLowerCase().includes(lowerSearchText);
      });
    });

    setDataSource(newData);
  };

  useEffect(() => {
    getDataSourceFields();
  }, []);

  useEffect(() => {
    if (tableData) {
      setDataSource(tableData);
    }
  }, [tableData]);

  useEffect(() => {
    if (selectedRowIds) {
      const selectedRowData = {};

      selectedRowIds.forEach((id) => (selectedRowData[id] = true));

      setSelectedRow(selectedRowData);
    }
  }, [selectedRowIds]);

  return (
    <>
      <SearchBar
        placeholder={searchPlaceholder}
        handleSearchInputChange={handleSearchInputChange}
      />

      <ReactDataGrid
        idProperty="_id"
        style={gridStyle}
        theme="default-dark"
        dataSource={dataSource}
        columns={columns}
        defaultSortInfo={defaultSortInfo}
        sortable={sortable}
        onRowClick={onRowClick}
        checkboxColumn={!disableCheckBox && hasCheckboxColumn}
        checkboxOnlyRowSelect={hasCheckboxColumn}
        selected={selectedRow}
        onSelectionChange={onSelectionChange}
        showColumnMenuTool={false}
        loading={isLoading}
        rowHeight={rowHeight}
        showCellBorders="horizontal"
      />
    </>
  );
};

export default Table;
