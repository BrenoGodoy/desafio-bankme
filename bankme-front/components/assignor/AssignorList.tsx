import { getAssignors } from "@/services/assignor";
import { useEffect, useState } from "react";
import ErrorComponent from "../shared/error/Error";
import TableItem from "./components/TableItem";

export default function ListAssignor() {
  const [assignors, setAssignors] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('user');
      if (!token) {
        setIsError(true);
        setErrorMessage('Invalid token JWT!');

        return;
      }

      const request = await getAssignors(JSON.parse(token));
      if (request.status === 200) {
        setIsError(false);
        setAssignors(request.data);
        return;
      }

      setIsError(true);

      if ('message' in request) {
        setErrorMessage(request.message);
      }
    }

    fetchData();
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ID
            </th>
            <th scope="col" className="px-6 py-3">
                Documento
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Email
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Telefone
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Nome
            </th>
          </tr>
        </thead>
        <tbody>
            {assignors.map((item: any, index) => {
              return <TableItem key={index} item={item} />
            })}
        </tbody>
        {isError && <ErrorComponent errorMessage={errorMessage}/>}
      </table>
    </div>
  );
}
