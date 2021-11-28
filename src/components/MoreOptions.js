import React from 'react';
import { BsTrash, BsSearch, BsCheck2, BsThreeDotsVertical} from 'react-icons/bs';
import './styles/MoreOptions.scss';

export default function MoreOptions() {
    return (
        <div className="more">
            <BsThreeDotsVertical className="icon icon-more" />
            <ul className="more-options">
                <li><BsCheck2 className="icon icon-check"/></li>
                <li><BsTrash className="icon icon-trash"/></li>
                <li><BsSearch className="icon icon-search"/></li>
            </ul>
        </div>
    )
}