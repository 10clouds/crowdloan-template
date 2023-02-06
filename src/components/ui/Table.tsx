import { SITE } from '@/config';
import { getErrorMessage } from '@/features/Contribution/utils';
import type { TransferData, Transfers } from '@/types';
import { useState, useEffect } from 'react';

const howManyResults = 5;

const headersList = {
  Accept: '*/*',
  'Content-Type': 'application/json',
};

const bodyContent = JSON.stringify({
  row: howManyResults,
  page: 0,
  address: SITE.polkadotConfig.targetAccountAddress,
});

const Table = () => {
  const [tableData, setTableData] = useState<TransferData[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let isCurrent = true;

    fetch(SITE.polkadotConfig.apiScanUrl, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error - status returned: ${response.status}`);
        }

        return response.json();
      })
      .then((response: Transfers) => {
        if (isCurrent) {
          setTableData(response.data.transfers);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(getErrorMessage(err));
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const tHeaders = ['Account', 'Date', 'Contributed'];
  const milliseconds = 1000;

  return (
    <div className="mx-auto w-full max-w-4xl overflow-x-auto rounded-lg border border-gray bg-white drop-shadow-primary">
      <div className="h-2 w-full bg-timer-gradient opacity-60"></div>
      <table className="w-full table-auto">
        <thead className="rounded-lg border bg-gray text-xs font-medium text-gray-dark">
          <tr>
            {tHeaders.map((label) => (
              <th
                className="border-b-[1px] border-gray py-4 text-start uppercase first-of-type:px-4"
                key={label}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-base lg:text-lg">
          {!tableData &&
            [...Array(howManyResults).keys()].map((idx) => (
              <tr
                className="rounded-lg border-b-[1px] border-gray last-of-type:border-b-0"
                key={idx}
              >
                <td className=" w-full pr-11">
                  <div className="mx-4 my-2 h-5 w-full animate-pulse rounded-full bg-gray"></div>
                </td>
                <td className=" w-full pr-11">
                  <div className="mx-4 my-2 h-5 w-full animate-pulse rounded-full bg-gray"></div>
                </td>
                <td className=" w-full pr-11">
                  <div className="mx-4 my-2 h-5 w-full animate-pulse rounded-full bg-gray"></div>
                </td>
              </tr>
            ))}
          {tableData?.map(
            ({
              from_account_display,
              amount,
              block_timestamp,
              asset_symbol,
            }) => (
              <tr
                className="rounded-lg border-b-[1px] border-gray last-of-type:border-b-0"
                key={block_timestamp}
              >
                <td className="py-3 pr-11 pl-4">
                  {from_account_display?.address?.slice(0, 24) + '...'}
                </td>
                <td className="pr-11">
                  {new Date(
                    block_timestamp * milliseconds
                  )?.toLocaleDateString()}
                </td>
                <td className="pr-8">{`${amount} ${asset_symbol}`}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {!!error && <div className="p-4 text-center text-error">{error}</div>}
    </div>
  );
};

export default Table;
