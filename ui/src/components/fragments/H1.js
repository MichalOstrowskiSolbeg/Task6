export default function H1(props) {
    return (
        <>
            <h1 className="text-center text-4xl mt-4 mb-2">
                {props.text}
            </h1>
            <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />
        </>
    )
}