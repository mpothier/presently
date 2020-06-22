import React, { Component } from 'react'
import moment from 'moment'

import CalendarMonthBlock from './CalendarMonthBlock'

import './PastEntries.scss'

class PastEntries extends Component {
    state = {
        selectedDate: moment(new Date(2020, 5, 16)).utc(),
        monthsToDisplay: []
    }
    
    sampleData = [
        {
            timestamp: new Date(2020, 5, 16, 13, 42, 0, 0),
            text: `Esse occaecat excepteur anim deserunt est sunt ad do minim quis reprehenderit non consequat. Pariatur esse cillum et est anim elit officia cillum ut. Fugiat exercitation irure in nostrud nulla ex.
            Est nisi ipsum ullamco ad ipsum. Minim qui et incididunt esse ex duis id sunt exercitation commodo est aliquip ipsum. Eiusmod anim enim voluptate dolor ut do ad Lorem irure.
            Aliqua duis esse ut dolore excepteur laborum adipisicing excepteur dolore irure eu. Nostrud minim laboris mollit excepteur sint sint. Proident aliquip proident reprehenderit tempor exercitation cillum. Sit tempor qui proident eu esse tempor voluptate non consectetur voluptate qui dolor. Non ullamco qui esse incididunt ea ut do et sunt nostrud dolore dolore. Culpa velit ad ea pariatur proident quis et ipsum esse aliqua.
            Aliqua duis esse ut dolore excepteur laborum adipisicing.`
        },
        {
            timestamp: new Date(2020, 5, 16, 21, 28, 0, 0),
            text: `Ullamco ipsum ad ex sunt do occaecat occaecat tempor eu nisi do id.\n\nIpsum anim cupidatat incididunt voluptate proident excepteur nisi aliqua magna proident eiusmod voluptate cillum incididunt. Do consequat ea non amet duis non. Labore id consequat qui proident deserunt ut aliquip irure. Sit et ipsum ea magna.`
        },
    ]

    getMonthsToDisplay = (endMonth) => {
        // console.log("End month is: ", endMonth)
        var monthsToDisplay = []
        const calendarElement = document.querySelector('#calendar')
        if (!calendarElement) return [];
        const calendarWindowHeight = calendarElement.clientHeight
        const numMonthsToShow = Math.floor(calendarWindowHeight / (245 + 20))
        for (let i = numMonthsToShow; i > 0; i--) {
            monthsToDisplay.push(endMonth.clone().subtract(i - 1, 'months'))
        }
        // console.log(monthsToDisplay)
        return monthsToDisplay
    }

    componentDidMount() {
        this.setState({
            monthsToDisplay: this.getMonthsToDisplay(moment(new Date('2020-06-01')).utc())
        })
    }

    render() {
        return (
            <div className="container past-entries-wrapper">
                <div id="calendar">
                    {this.state.monthsToDisplay.map(month => {
                        return (
                            <CalendarMonthBlock key={month} month={month} selectedDate={this.state.selectedDate} />
                        )
                    })}
                </div>
                <div className="selected-entry-date">
                    <div className="entry-date">{this.state.selectedDate.format('LL')}</div>
                    {this.sampleData.map((entry, i) => {
                        return (
                            <div className="entry" key={i}>
                                <div className="entry-time">{moment(entry.timestamp).format('LT').toLocaleLowerCase()}</div>
                                <div className="entry-text">
                                    {entry.text.split('\n').map((chunk, i) => {
                                        if (chunk.length > 0) {
                                            return <p key={i}>{chunk}</p>
                                        } else {
                                            return <br key={i}/>
                                        }
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default PastEntries
