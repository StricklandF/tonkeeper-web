import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSdk } from '../../hooks/appSdk';
import { useTranslation } from '../../hooks/translation';
import { useTonendpointBuyMethods } from '../../state/tonendpoint';
import { Body1, H3, Label1 } from '../Text';
import { BuyNotification } from '../home/BuyAction';

const Header = styled(H3)`
    text-align: center;
`;

const EmptyBody = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BodyText = styled(Body1)`
    color: ${props => props.theme.textSecondary};
    margin-bottom: 1.438rem;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
`;

const Button = styled(Label1)`
    padding: 12px 20px;
    background-color: ${props => props.theme.backgroundContent};
    transition: background-color 0.1s ease;
    border-radius: ${props => props.theme.cornerLarge};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.backgroundContentTint};
    }
`;

const EmptyActivity = () => {
    const { t } = useTranslation();
    const sdk = useAppSdk();

    const [openBuy, setOpenBuy] = useState(false);

    const { data: buy } = useTonendpointBuyMethods();

    return (
        <EmptyBody>
            <Header>{t('activity_empty_transaction_title')}</Header>
            <BodyText>{t('activity_empty_transaction_caption')}</BodyText>
            <ButtonRow>
                <Button onClick={() => setOpenBuy(true)}>{t('exchange_title')}</Button>
                <Button
                    onClick={() => sdk.uiEvents.emit('receive', { method: 'receive', params: {} })}
                >
                    {t('wallet_receive')}
                </Button>
            </ButtonRow>
            <BuyNotification buy={buy} open={openBuy} handleClose={() => setOpenBuy(false)} />
        </EmptyBody>
    );
};

export default EmptyActivity;
