import type { ApiVestingInfo } from '../../types';

import { parseAccountId } from '../../../util/account';
import { fetchStoredTonWallet } from '../../common/accounts';
import { callBackendGet } from '../../common/backend';

export async function fetchVestings(accountId: string) {
  const { network } = parseAccountId(accountId);
  const isTestnet = network === 'testnet';
  const { address } = await fetchStoredTonWallet(accountId);

  return callBackendGet<ApiVestingInfo[]>(`/vesting/${address}`, { isTestnet });
}
