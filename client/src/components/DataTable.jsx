import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

const DataTable = ({ columns, data }) => {
	const handleRowClick = (rowData, e) => {
		alert(rowData.title);
	};

	return (
		<Table data={data} height={300} cellBordered onRowClick={handleRowClick}>
			{columns.map((column, index) => (
				<Column flexGrow={1} sortable resizable key={index}>
					<HeaderCell>{column.name}</HeaderCell>
					<Cell dataKey={column.field} />
				</Column>
			))}
		</Table>
	);
};

export default DataTable;
