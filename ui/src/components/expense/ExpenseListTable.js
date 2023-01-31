import TableItemDelete from "../fragments/TableItemDelete";
import TableItemDetails from "../fragments/TableItemDetails";
import TableItemEdit from "../fragments/TableItemEdit";
import { getFormattedDate } from "../../helpers/DateFormat";

function ExpenseListTable(props) {
    const list = props.data
    return (
        <>
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Category</th>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Price</th>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Date</th>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Comment</th>
                        <th scope="col" className="px-6 uppercase py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(x => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                            key={x.Id}>
                            <td className="px-6 uppercase py-2 text-center">{x.Category}</td>
                            <td className="px-6 uppercase py-2 text-center">{x.Price}</td>
                            <td className="px-6 uppercase py-2 text-center">{getFormattedDate(x.Date)}</td>
                            <td className="px-6 uppercase py-2 text-center">{x.Comment ? x.Comment : "-"}</td>
                            <td className="px-6 uppercase py-2 justify-center text-center flex">
                                <TableItemEdit link={`/expense/edit/${x.Id}`} />
                                <TableItemDelete link={`/expense/delete/${x.Id}`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default (ExpenseListTable)