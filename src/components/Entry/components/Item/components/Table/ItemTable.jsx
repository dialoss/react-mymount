import React from 'react';
import "./ItemTable.scss";

const ItemTable = ({data}) => {
    return (
        <table className="item__table">
            <tbody>
            {
                data.table_rows.map((row, i) =>
                    <tr key={i}>
                        {
                            row.map((col, j) =>
                                <td key={i*100 + j}>{col}</td>
                            )
                        }
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

export default ItemTable;