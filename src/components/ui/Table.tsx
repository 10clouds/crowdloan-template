import { DateTime } from 'luxon';
import i18next from 'i18next';
import { useLastContributors } from '@/hooks/api';

const howManyResults = 5;

const Table = () => {
  const { tableData, error } = useLastContributors();

  const tHeaders = ['Account', 'Date', 'Contributed'];

  return (
    <div className="mx-auto w-full max-w-4xl overflow-x-auto rounded-lg border border-gray bg-white drop-shadow-primary">
      <table className="w-full table-auto">
        <thead className="relative rounded-lg bg-gray text-xs font-medium text-gray-dark">
          <div className="absolute top-0 h-2 w-full bg-timer-gradient opacity-60"></div>
          <tr>
            {tHeaders.map((label) => (
              <th
                className="border-b-[1px] border-gray pb-4 pt-5 text-start uppercase first-of-type:px-4 last-of-type:pr-4"
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
                  {DateTime.fromSeconds(block_timestamp)
                    .setLocale(i18next.language)
                    .toLocaleString()}
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
