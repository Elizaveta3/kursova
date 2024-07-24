import './ListInDiary.css'
import React from 'react';
import iconForDelete from '../../pages/static/images/icon for delete.svg';

export default function ListInDiary({ items, type }) {
    return (
        <div className="diary-items-container">
            {items && items.filter(item => item).length > 0 ? (
                <div className="wrapper-diary-items">
                    {items.filter(item => item).map((item) => (
                        item[type] && item[type].map((activity, idx) => (
                            <div key={`${item._id}-${idx}`} className='diary_item_container'>
                                <div className="activity-grams">
                                    <strong className="activity">{activity}</strong>
                                    <div className="grams">
                                        {type === 'foodItem' ? item.quantityGrams && item.quantityGrams[idx] : item.quantityMinutes && item.quantityMinutes[idx]}
                                        {type === 'foodItem' ? 'гр' : 'хв'}</div>
                                </div>
                                <div className="calories">{type === 'foodItem' ? item.caloriesForProduct && item.caloriesForProduct[idx] : item.caloriesForActivity && item.caloriesForActivity[idx]} кк</div>
                                <button className="delete-button">
                                    <img src={iconForDelete} alt="Delete" />
                                </button>
                            </div>
                        ))
                    ))}
                </div>
            ) : (
                <p className='no-food-item'>No {type === 'foodItem' ? 'food' : 'activity'} items found</p>
            )}
        </div>
    )
}