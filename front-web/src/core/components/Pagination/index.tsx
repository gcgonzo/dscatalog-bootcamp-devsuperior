import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';
import { generateList } from 'core/utils/list';

type Props = {
    totalPages: number;
    activePages: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePages, onChange }: Props) => {
    const items = generateList(totalPages);
    const previousClass = totalPages > 0 && activePages > 0 ? 'page-active' : 'page-inactive';
    const nextClass = (activePages + 1) < totalPages ? 'page-active' : 'page-inactive';

    return (
        <div className="pagination-container">
            <ArrowIcon
                className={`pagination-previous ${previousClass}`}
                onClick={() => onChange(activePages - 1)}
            />
            {items.map(item => (
                <div
                    key={item}
                    className={`pagination-item ${item === activePages ? 'active' : ''}`}
                    onClick={() => onChange(item)}
                >
                    {item}
                </div>
            ))}


            <ArrowIcon
                className={`pagination-next ${nextClass}`}
                onClick={() => onChange(activePages + 1)}
            />
        </div>
    );

}

export default Pagination;