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

export const useLastContributors = () => {
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
  return { tableData, error } as const;
};
