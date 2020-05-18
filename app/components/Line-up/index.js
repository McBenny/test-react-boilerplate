import React from 'react';
import PropTypes from 'prop-types';
import { compareValues } from '../../utils/utilities';
import { messages } from './messages';
import { POPUPS } from '../../containers/Game/constants';
import Modal, { cancelButton } from '../modal';
import { PERSONS_TYPES } from '../../containers/Settings/constants';

function LineUp({ team, playersList, captainId, officialsList, closeHandler, openPopup }) {
    const memberTemplate = (member, memberType) => (
        <li key={`lineUp${team}${member.id}`}>
            {member.reference} {member.name}{' '}
            {captainId !== 0 && captainId === member.id && memberType === PERSONS_TYPES.players
                ? `(${messages.captainInitial})`
                : ''}{' '}
            {member.goals > 0 ? `${messages.goals}: ${member.goals}, ` : ''}
            {member.yellowCards > 0 ? `${messages.yellowCards}: ${member.yellowCards}, ` : ''}
            {member.redCards > 0 ? `${messages.redCards}: ${member.redCards}, ` : ''}
            {member.blueCards > 0 ? `${messages.blueCards}: ${member.blueCards}` : ''}
            {member.suspensions > 0 ? `${messages.suspension}: ${member.suspensions}` : ''}
        </li>
    );

    const membersListDisplay = memberType => {
        const membersList = memberType === PERSONS_TYPES.players ? playersList : officialsList;
        const sortedMembersList = membersList.sort(compareValues('reference'));
        let captainTemplate = '';
        if (captainId !== 0) {
            const captain =
                memberType === PERSONS_TYPES.players && membersList.filter(player => player.id === captainId);
            if (captain.length === 1) {
                captainTemplate = memberTemplate(captain[0]);
            }
        }
        const buffer = sortedMembersList.map(member => {
            // If it's a player, it shouldn't be the "unknown player', nor the captain, all Ok if it's an official
            if ((member.id !== 0 && member.id !== captainId) || memberType === PERSONS_TYPES.officials) {
                return memberTemplate(member, memberType);
            }
            return '';
        });
        // If no members or just one and it's the "unknown player"
        if (sortedMembersList.length === 0 || (sortedMembersList.length === 1 && sortedMembersList[0].id === 0)) {
            return (
                <p>
                    {messages[memberType === PERSONS_TYPES.players ? 'noPlayers' : 'noOfficials']}{' '}
                    <button type="button" onClick={() => openPopup(POPUPS.settings)}>
                        {messages.settings}
                    </button>
                    .
                </p>
            );
        }
        return (
            <ul>
                {captainTemplate}
                {buffer}
            </ul>
        );
    };

    return (
        <Modal title={messages.title} closeHandler={closeHandler}>
            <h3>{messages.listOfPlayers}</h3>
            {membersListDisplay(PERSONS_TYPES.players)}
            <h3>{messages.listOfOfficials}</h3>
            {membersListDisplay(PERSONS_TYPES.officials)}
            {cancelButton(closeHandler)}
        </Modal>
    );
}

LineUp.propTypes = {
    team: PropTypes.string,
    playersList: PropTypes.array,
    captainId: PropTypes.number,
    officialsList: PropTypes.array,
    closeHandler: PropTypes.func,
    openPopup: PropTypes.func
};

export default LineUp;
