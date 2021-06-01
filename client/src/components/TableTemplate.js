import MaterialTable from "material-table"
import React from "react"

const TableTemplate = ({ title, columns, data, actions, rowClick }) => {
  return (
    <div>
      <MaterialTable
        title={title}
        data={data}
        columns={columns}
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
          pageSize: 20,
          showFirstLastPageButtons: true,
          detailPanel: true
        }}
        actions={actions}
        onRowClick={rowClick}
      />
    </div>
  )
}

export default TableTemplate
