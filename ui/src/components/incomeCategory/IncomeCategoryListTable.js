import { Link } from "react-router-dom";
import TableItemDelete from "../fragments/TableItemDelete";
import TableItemDetails from "../fragments/TableItemDetails";
import TableItemEdit from "../fragments/TableItemEdit";

function IncomeCategoryListTable(props) {
    const list = props.data

    return (
        <>
            <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-400">
                <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Name</th>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(x => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                            key={x.Id}>
                            <td className="px-6 uppercase py-2 text-center">{x.Name}</td>
                            <td className="px-6 uppercase py-2 justify-center text-center flex">
                                <TableItemEdit link={`/income-categories/edit/${x.Id}`} />
                                <TableItemDelete link={`/income-categories/delete/${x.Id}`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default (IncomeCategoryListTable)