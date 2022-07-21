import React from "react";

import './index.css';

export default class Calendar extends React.Component {
    static defaultProps = {
        date: new Date(),
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null,
    }

    render() {
        const {years, monthNames, weekDayNames} = this.props;
        const monthData = [
            [undefined, undefined, new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), undefined, undefined, undefined]
        ]
        return (
            <div className="calendar">
                <header>
                    <button>{'<'}</button>
                    <select>
                        {monthNames.map((name, index) =>
                            <option value={index} key={name}>{name}</option>
                        )}
                    </select>
                    <select>
                        {years.map((year, index) =>
                            <option value={index} key={year}>{year}</option>
                        )}
                    </select>
                    <button>{'>'}</button>
                </header>

                <table>
                    <thead>
                    <tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index} className="week">
                            {week.map((date, index) => date ?
                                <td className="day" key={index}>{date.getDate()}</td> : <td key={index}></td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
