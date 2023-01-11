import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import { getFieldValue } from "../../util/GetObjectProperty";
import { Center, Spinner } from "@chakra-ui/react";

const Table = ({
	tableData,
	columns,
	searchPlaceholder,
	searchbarVariant,
	onRowClick,
	defaultSortInfo,
	hasCheckboxColumn = false,
	sortable = true,
	selectedRow,
	onSelectionChange,
	height = 400,
	rowHeight = 40,
	disableCheckBox = false,
}) => {
	const [dataSource, setDataSource] = useState([]);
	const [dataFields, setDataFields] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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
		/*
			I want the table loading sign when rendering new data but don't want to show it when some specific data (row) is updated
			All the table data is in dataSource:
				if data exist in the dataSource (updating specific row), update dataSource
				if data does not exist in dataSource (new data), show loading sign
		*/
		if (dataSource.length > 0) {
			setDataSource(tableData);
		} else {
			setIsLoading(true);

			setTimeout(() => {
				setDataSource(tableData);
				setIsLoading(false);
			}, 500);
		}
	}, [tableData]);

	return (
		<>
			<SearchBar
				placeholder={searchPlaceholder}
				variant={searchbarVariant}
				handleSearchInputChange={handleSearchInputChange}
			/>

			{/* {isLoading ? (
				<Center w="100%">
					<Spinner color="purple" size="xl" />
				</Center>
			) : ( */}
			<ReactDataGrid
				idProperty="_id"
				style={gridStyle}
				dataSource={dataSource}
				columns={columns}
				defaultSortInfo={defaultSortInfo}
				sortable={sortable}
				onRowClick={onRowClick}
				checkboxColumn={!disableCheckBox && hasCheckboxColumn}
				checkboxOnlyRowSelect={hasCheckboxColumn}
				defaultSelected={selectedRow}
				onSelectionChange={onSelectionChange}
				showColumnMenuTool={false}
				loading={isLoading}
				rowHeight={rowHeight}
			/>
			{/* )} */}
		</>
	);
};

export default Table;
