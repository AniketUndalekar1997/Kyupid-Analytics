import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import selectColData from '../utils/getTableColData';
import { addDerivedData } from '../utils/helpers';

export default function DataTable(props) {
    let rows;
    if (props.formattedData && props.areaNameMap) {
        rows = Object.keys(props?.formattedData).map(key => {
            const modifiedProps = addDerivedData(props?.formattedData, key, props?.areaNameMap)
            return modifiedProps;
        })
    }
    const columns = selectColData(props.tableName);

    return (
        <div style={{ height: 410, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}
