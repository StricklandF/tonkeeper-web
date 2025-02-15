import { formatAddress, toShortValue } from '@tonkeeper/core/dist/utils/common';
import React, { FC, useCallback, useMemo, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    DraggableProvidedDragHandleProps,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { InnerBody } from '../../components/Body';
import { DropDown } from '../../components/DropDown';
import { EllipsisIcon, ReorderIcon } from '../../components/Icon';
import { ColumnText, Divider } from '../../components/Layout';
import { ListBlock, ListItem, ListItemElement, ListItemPayload } from '../../components/List';
import { SkeletonListPayload } from '../../components/Skeleton';
import { SubHeader } from '../../components/SubHeader';
import { Label1 } from '../../components/Text';
import { ImportNotification } from '../../components/create/ImportNotification';
import {
    DeleteWalletNotification,
    LogOutWalletNotification
} from '../../components/settings/LogOutNotification';
import { SetUpWalletIcon } from '../../components/settings/SettingsIcons';
import { SettingsList } from '../../components/settings/SettingsList';
import { RenameWalletNotification } from '../../components/settings/WalletNameNotification';
import { useAppContext } from '../../hooks/appContext';
import { useTranslation } from '../../hooks/translation';
import { AppRoute, SettingsRoute } from '../../libs/routes';
import { useMutateAccountState } from '../../state/account';
import { useWalletState } from '../../state/wallet';

const Row = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

    width: 100%;
`;

const Icon = styled.span`
    display: flex;
    color: ${props => props.theme.iconSecondary};
`;

const WalletRow: FC<{
    publicKey: string;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}> = ({ publicKey, dragHandleProps }) => {
    const navigate = useNavigate();
    const { data: wallet } = useWalletState(publicKey);
    const { t } = useTranslation();

    const [rename, setRename] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);

    if (!wallet) {
        return <SkeletonListPayload />;
    }

    const address = formatAddress(wallet.active.rawAddress, wallet.network);

    return (
        <>
            <ListItemPayload>
                <Row>
                    <Icon {...dragHandleProps}>
                        <ReorderIcon />
                    </Icon>
                    <ColumnText
                        noWrap
                        text={wallet.name ? wallet.name : t('wallet_title')}
                        secondary={toShortValue(address)}
                    />
                    <DropDown
                        payload={onClose => (
                            <ListBlock margin={false} dropDown>
                                <ListItem
                                    dropDown
                                    onClick={() => {
                                        setRename(true);
                                        onClose();
                                    }}
                                >
                                    <ListItemPayload>
                                        <Label1>{t('Rename')}</Label1>
                                    </ListItemPayload>
                                </ListItem>
                                <ListItem
                                    dropDown
                                    onClick={() => {
                                        navigate(
                                            AppRoute.settings +
                                                SettingsRoute.recovery +
                                                `/${wallet.publicKey}`
                                        );
                                    }}
                                >
                                    <ListItemPayload>
                                        <Label1>{t('settings_backup_seed')}</Label1>
                                    </ListItemPayload>
                                </ListItem>
                                <Divider />
                                <ListItem
                                    dropDown
                                    onClick={() => {
                                        setLogout(true);
                                        onClose();
                                    }}
                                >
                                    <ListItemPayload>
                                        <Label1>{t('settings_reset')}</Label1>
                                    </ListItemPayload>
                                </ListItem>
                                <ListItem
                                    dropDown
                                    onClick={() => {
                                        setRemove(true);
                                        onClose();
                                    }}
                                >
                                    <ListItemPayload>
                                        <Label1>{t('settings_delete_account')}</Label1>
                                    </ListItemPayload>
                                </ListItem>
                            </ListBlock>
                        )}
                    >
                        <Icon>
                            <EllipsisIcon />
                        </Icon>
                    </DropDown>
                </Row>
            </ListItemPayload>
            <RenameWalletNotification
                wallet={rename ? wallet : undefined}
                handleClose={() => setRename(false)}
            />
            <LogOutWalletNotification
                wallet={logout ? wallet : undefined}
                handleClose={() => setLogout(false)}
            />
            <DeleteWalletNotification
                wallet={remove ? wallet : undefined}
                handleClose={() => setRemove(false)}
            />
        </>
    );
};

export const Account = () => {
    const [isOpen, setOpen] = useState(false);
    const { t } = useTranslation();

    const { account } = useAppContext();
    const { mutate } = useMutateAccountState();

    const createItems = useMemo(() => {
        return [
            {
                name: t('balances_setup_wallet'),
                icon: <SetUpWalletIcon />,
                action: () => setOpen(true)
            }
        ];
    }, []);

    const handleDrop: OnDragEndResponder = useCallback(
        droppedItem => {
            if (!droppedItem.destination) return;
            const updatedList = [...account.publicKeys];
            const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
            updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
            mutate({
                activePublicKey: account.activePublicKey,
                publicKeys: updatedList
            });
        },
        [account, mutate]
    );

    return (
        <>
            <SubHeader title={t('Manage_wallets')} />
            <InnerBody>
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="wallets">
                        {provided => (
                            <ListBlock {...provided.droppableProps} ref={provided.innerRef}>
                                {account.publicKeys.map((publicKey, index) => (
                                    <Draggable
                                        key={publicKey}
                                        draggableId={publicKey}
                                        index={index}
                                    >
                                        {p => (
                                            <ListItemElement
                                                ios={true}
                                                hover={false}
                                                ref={p.innerRef}
                                                {...p.draggableProps}
                                            >
                                                <WalletRow
                                                    dragHandleProps={p.dragHandleProps}
                                                    publicKey={publicKey}
                                                />
                                            </ListItemElement>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ListBlock>
                        )}
                    </Droppable>
                </DragDropContext>

                <SettingsList items={createItems} />
            </InnerBody>

            <ImportNotification isOpen={isOpen} setOpen={setOpen} />
        </>
    );
};
