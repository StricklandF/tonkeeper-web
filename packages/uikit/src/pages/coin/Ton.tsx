import { useInfiniteQuery } from '@tanstack/react-query';
import { CryptoCurrency } from '@tonkeeper/core/dist/entries/crypto';
import { AccountRepr } from '@tonkeeper/core/dist/tonApiV1';
import { AccountsApi } from '@tonkeeper/core/dist/tonApiV2';
import { formatDecimals } from '@tonkeeper/core/dist/utils/balance';
import React, { FC, useMemo, useRef } from 'react';
import { InnerBody } from '../../components/Body';
import { CoinSkeletonPage } from '../../components/Skeleton';
import { SubHeader } from '../../components/SubHeader';
import { ActivityList } from '../../components/activity/ActivityGroup';
import { HomeActions } from '../../components/home/TonActions';
import { CoinInfo } from '../../components/jettons/Info';
import { useAppContext, useWalletContext } from '../../hooks/appContext';
import { useTranslation } from '../../hooks/translation';
import { useFetchNext } from '../../hooks/useFetchNext';
import { QueryKey } from '../../libs/queryKey';
import { useFormatFiat, useRate } from '../../state/rates';
import { groupAndFilterTonActivityItems } from '../../state/ton/tonActivity';
import { useWalletAccountInfo } from '../../state/wallet';

const TonHeader: FC<{ info: AccountRepr }> = ({ info: { balance } }) => {
    const { t } = useTranslation();

    const amount = useMemo(() => formatDecimals(balance), [balance]);

    const { data } = useRate(CryptoCurrency.TON);
    const { fiatAmount } = useFormatFiat(data, amount);

    return (
        <CoinInfo
            amount={amount}
            symbol="TON"
            price={fiatAmount}
            description={t('Ton_page_description')}
            image="/img/toncoin.svg"
        />
    );
};

export const TonPage = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    const { data: info } = useWalletAccountInfo();

    const { api, standalone } = useAppContext();
    const wallet = useWalletContext();

    const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isFetched } = useInfiniteQuery({
        queryKey: [wallet.active.rawAddress, QueryKey.activity, 'ton'],
        queryFn: ({ pageParam = undefined }) =>
            new AccountsApi(api.tonApiV2).getAccountEvents({
                accountId: wallet.active.rawAddress,
                limit: 20,
                beforeLt: pageParam
            }),
        getNextPageParam: lastPage => (lastPage.nextFrom > 0 ? lastPage.nextFrom : undefined)
    });

    useFetchNext(hasNextPage, isFetchingNextPage, fetchNextPage, standalone, ref);

    const activity = useMemo(() => {
        return data ? groupAndFilterTonActivityItems(data) : undefined;
    }, [data]);

    if (!info) {
        return <CoinSkeletonPage activity={4} />;
    }

    return (
        <>
            <SubHeader title={t('Toncoin')} />
            <InnerBody ref={ref}>
                <TonHeader info={info} />
                <HomeActions />
                <ActivityList
                    isFetched={isFetched}
                    isFetchingNextPage={isFetchingNextPage}
                    tonEvents={activity}
                />
            </InnerBody>
        </>
    );
};
