import { Link } from "react-router-dom";
import TableItemDelete from "../fragments/TableItemDelete";
import TableItemDetails from "../fragments/TableItemDetails";
import TableItemEdit from "../fragments/TableItemEdit";
import { getFormattedDate } from "../../helpers/DateFormat";

function IncomeListTable(props) {
    const list = props.data.Items
    const currentPage = props.data.PageIndex
    const pageCount = props.data.PageCount

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            props.changePage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            props.changePage(currentPage + 1)
        }
    }

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
                                <TableItemEdit link={`/income/edit/${x.Id}`} />
                                <TableItemDelete link={`/income/delete/${x.Id}`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-2 mb-4">
                <button
                    onClick={() => handlePreviousPage()}
                    className="bg-gray-300 text-lg hover:bg-blue-400 px-4 py-2 mx-2 rounded-l">
                    Prev
                </button>
                {Array.from({ length: pageCount }).map((x, i) => (
                    <button
                        key={i + 1}
                        onClick={() => props.changePage(i + 1)}
                        disabled={i + 1 === currentPage}
                        className={i + 1 === currentPage ? 'bg-blue-400 text-lg px-4 py-2 mx-2' : 'bg-gray-300 text-lg hover:bg-blue-400 px-4 py-2 mx-2'}>
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handleNextPage()}
                    className="bg-gray-300 text-lg hover:bg-blue-400 px-4 py-2 mx-2 rounded-r">
                    Next
                </button>
            </div>
        </>
    )
}

export default (IncomeListTable)