import React, { useState } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import SearchBar from "./SearchBar";
import moment from "moment";
import { Box, Flex } from "@chakra-ui/react";

const BaseCell = React.forwardRef((props, ref) => {
	const { children, rowData, ...rest } = props;
	return (
		<Cell ref={ref} rowData={rowData} {...rest}>
			{children}
		</Cell>
	);
});

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
	return (
		<BaseCell {...props} style={{ padding: 0 }}>
			<div style={{ lineHeight: "46px" }}>
				<input
					type="checkbox"
					value={rowData[dataKey]}
					onChange={onChange}
					checked={checkedKeys.some((item) => item === rowData[dataKey])}
				/>
			</div>
		</BaseCell>
	);
};

const DataTable = ({
	columns,
	data,
	height,
	searchPlaceholder,
	searchbarVariant,
	handleRowClick,
	hasSelect,
	setSelectValues,
}) => {
	const [sortColumn, setSortColumn] = useState(columns[0].field);
	const [sortType, setSortType] = useState("asc");
	const [searchInput, setsearchInput] = useState("");
	const [checkedKeys, setCheckedKeys] = useState([]);

	const handleCheckAll = React.useCallback((event) => {
		const checked = event.target.checked;
		const keys = checked ? data.map((item) => item._id) : [];
		setCheckedKeys(keys);
		setSelectValues(keys);
	}, []);

	const handleCheck = React.useCallback(
		(event) => {
			const checked = event.target.checked;
			const value = event.target.value;
			const keys = checked
				? [...checkedKeys, value]
				: checkedKeys.filter((item) => item !== value);

			setCheckedKeys(keys);
			setSelectValues(keys);
		},
		[checkedKeys],
	);

	const handleSearchInputChange = (e) => {
		setsearchInput(e.target.value.toLowerCase());
		handleSortAndFilter();
	};

	const handleSortAndFilter = () => {
		if (searchInput) {
			data = data.filter((row) => {
				let rowData = "";

				columns.forEach((column) => {
					rowData += row[column.field] + " ";
				});

				return rowData.toLowerCase().includes(searchInput);
			});
		} else if (sortColumn && sortType) {
			const sort = {
				asc: (a, b) => a[sortColumn].localeCompare(b[sortColumn]),
				desc: (a, b) => b[sortColumn].localeCompare(a[sortColumn]),
			};

			data = [...data].sort(sort[sortType]);
		}

		return data;
	};

	const handleSortColumn = (sortColumn, sortType) => {
		setSortColumn(sortColumn);
		setSortType(sortType);
	};

	return (
		<>
			<SearchBar
				placeholder={searchPlaceholder}
				variant={searchbarVariant}
				handleSearchInputChange={handleSearchInputChange}
			/>
			<br />
			<Table
				data={handleSortAndFilter()}
				sortColumn={sortColumn}
				sortType={sortType}
				onSortColumn={handleSortColumn}
				onRowClick={handleRowClick}
				height={height ? height : 300}
			>
				{hasSelect ? (
					<Column width={50} align="center">
						<HeaderCell style={{ padding: 0 }}>
							<div style={{ lineHeight: "40px" }}>
								<input
									type="checkbox"
									onChange={handleCheckAll}
									checked={checkedKeys.length === data.length}
								/>
							</div>
						</HeaderCell>
						<CheckCell
							dataKey="_id"
							checkedKeys={checkedKeys}
							onChange={handleCheck}
						/>
					</Column>
				) : null}

				{columns.map((column, index) => (
					<Column flexGrow={2} sortable key={index}>
						<HeaderCell>{column.name}</HeaderCell>
						{column.type === "date" ? (
							<Cell dataKey={column.field}>
								{(rowData) =>
									moment(rowData[column.field]).format("MMMM DD, YYYY")
								}
							</Cell>
						) : (
							<Cell
								dataKey={column.field}
								style={{
									fontWeight: index === 0 ? "500" : "0",
									color: index === 0 ? "purple" : "",
									cursor: "pointer",
								}}
							>
								{(rowData) => rowData[column.field] || "--no-data--"}
							</Cell>
						)}
					</Column>
				))}
			</Table>
		</>
	);
};

export default React.memo(DataTable);
