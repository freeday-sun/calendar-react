import React from "react";

import './index.css';
import * as calendar from './calendar'
import classNames from "classnames";

export default class Calendar extends React.Component {
    static defaultProps = {
        date: new Date(),
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        onChange: Function.prototype
    }

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null,
    }

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth()
    }

    get day() {
        return this.state.date.getDate()
    }

    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year, this.month - 1)
        console.log(date)

        this.setState({date})
    };
    handleNextMonthButtonClick = () => {
        const date = new Date(this.year, this.month + 1)
        console.log(date)
        console.log(this.state)
        this.setState({date})
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;
        console.log(year)
        const date = new Date(year, month)
        console.log(date)


        this.setState({date})
    };

    handleDayClick = date => {
        console.log(date)
        console.log(this.state)
        this.setState({
            selectedDate: date
        })

        this.props.onChange(date)
    };

    handleTodayClick = () => {
        this.setState({
            selectedDate: new Date(),
            date: new Date()
        })

        this.props.onChange(new Date())
    };

    render() {
        const {years, monthNames, weekDayNames} = this.props;
        const {currentDate, selectedDate} = this.state;

        const monthData = calendar.getMonthData(this.year, this.month)
        return (
            <div className="calendar">
                <header>
                    <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
                    <select
                        onChange={this.handleSelectChange}
                        ref={element => this.monthSelect = element}
                        value={this.month}
                    >
                        {monthNames.map((name, index) =>
                            <option value={index} key={name}>{name}</option>
                        )}
                    </select>
                    <select
                        ref={element => this.yearSelect = element}
                        onChange={this.handleSelectChange}
                        value={this.year}
                    >
                        {years.map(year =>
                            <option value={year} key={year}>{year}</option>
                        )}
                    </select>
                    <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
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
                                <td
                                    className={classNames("day", {
                                        'today': calendar.areDatesEqual(date, currentDate),
                                        'selected': calendar.areDatesEqual(date, selectedDate)
                                    })}
                                    key={index}
                                    onClick={() => this.handleDayClick(date)}
                                >{date.getDate()}</td> : <td key={index}></td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
                <div onClick={this.handleTodayClick} className={"comeBackToToday"}><button>Today</button></div>
            </div>
        )
    }
}
