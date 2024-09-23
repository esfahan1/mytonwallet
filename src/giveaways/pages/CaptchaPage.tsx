import type { Wallet } from '@tonconnect/sdk';
import React, { memo, useEffect } from '../../lib/teact/teact';

import type { SetGiveaway, SetParticipantStatus } from '../utils/giveaway';

import { GIVEAWAY_CAPTCHA_PUBLIC_KEY } from '../config';
import { checkinGiveaway } from '../utils/giveaway';

import CommonPage from '../components/CommonPage';

import styles from './CaptchaPage.module.scss';

interface OwnProps {
  wallet: Wallet;
  setParticipantStatus: SetParticipantStatus;
  setGiveaway: SetGiveaway;
}

function CaptchaPage({ wallet, setParticipantStatus, setGiveaway }: OwnProps) {
  useEffect(() => {
    // eslint-disable-next-line func-names
    window.onloadTurnstileCallback = function () {
      // @ts-expect-error
      turnstile.render('#turnstile-container', {
        sitekey: GIVEAWAY_CAPTCHA_PUBLIC_KEY,
        callback(token: string) {
          checkinGiveaway(token, wallet, setParticipantStatus, setGiveaway);
        },
      });
    };

    window.onloadTurnstileCallback();
  });

  return (
    <CommonPage wallet={wallet}>

      <div className={styles.section}>
        <div className={styles.sectionText}>Complete the captcha:</div>
        <div id="turnstile-container" />
      </div>

    </CommonPage>
  );
}

export default memo(CaptchaPage);
