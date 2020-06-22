import React, { Component } from 'react'
import moment from 'moment'
import CalendarHeatmap from 'react-calendar-heatmap';
import { ResponsiveCalendar } from '@nivo/calendar'
import ReactTooltip from 'react-tooltip'

class CalendarMonthBlock extends Component {

    monthStart = this.props.month
    monthEnd = this.props.month.clone().add(1, 'months')
    state = {
        data: [
            {
              "day": "2020-06-05",
              "value": 391
            },
            {
              "day": "2020-06-21",
              "value": 221
            },
            {
              "day": "2020-06-22",
              "value": 183
            },
            {
              "day": "2020-06-07",
              "value": 103
            },
            {
              "day": "2020-06-08",
              "value": 296
            }
        ]
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    currentMonthDates = (momentMonthDate) => {
        console.log("month is...", momentMonthDate.format('LL'))
        const datesInMonth = Array.from({length: moment(momentMonthDate).daysInMonth()}, (x, i) => moment(momentMonthDate).startOf('month').add(i + 1, 'days'));
        console.log("datesInMonth", datesInMonth)
        return datesInMonth
    }

    componentDidMount() {
        console.log("mounting block for ", this.monthStart.format('LL'))
        console.log("end of month is ", this.monthEnd.format('LL'))
    }

    render() {
        const { selectedDate } = this.props
        return (
            <div className="calendar-month-block">
                <div className="month-title">{this.monthStart.format("MMMM YYYY")}</div>

                <ResponsiveCalendar
                    data={this.state.data}
                    from="2020-06-01"
                    to="2020-07-01"
                    emptyColor="#eeeeee"
                    colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                    direction="vertical"
                    monthBorderWidth={0}
                    monthBorderColor="#ffffff"
                    monthLegendOffset={5}
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                />

                {/* <CalendarHeatmap
                    startDate={this.monthStart}
                    endDate={this.monthEnd}
                    values={this.currentMonthDates(this.monthStart).map(date => {
                        return {
                            date: date,
                            count: this.getRandomInt(0,4)
                        }
                    })}
                    horizontal={false}
                    showMonthLabels={false}
                    onClick={value => value && alert(`Clicked on value with count: ${value.count}`)}
                    classForValue={(value) => {
                        var classList = []
                        if (value === null) return;
                        if (selectedDate.isSame(value.date, 'day')) {
                            classList.push('color-selected-date')
                        }
                        if (moment().isSame(value.date, 'day')) {
                            classList.push('color-today')
                        } else if (value.count === 0) {
                            classList.push('color-empty')
                        } else {
                            classList.push(`color-scale-${value.count}`)
                        }
                        return classList.join(" ")
                    }}
                    tooltipDataAttrs={value => {
                        if (value === null) return;
                        if (value.date === null) return;
                        if (value.count === 0) return;
                        return {
                            'data-tip': `${value.date.format('l')} - ${
                            value.count
                            } ${value.count > 1 ? 'entries' : 'entry'}`,
                        };
                    }}
                    // transformDayElement={(element, value, index) => {
                    //     // console.log(element, value, index)
                    //     return element;
                    //     React.cloneElement(element, { title: value.date })
                    // }} 
                    /> */}
                    <ReactTooltip />
            </div>
        )
    }
}

export default CalendarMonthBlock
