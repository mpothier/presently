import React, { Component } from 'react'
import _ from 'lodash'

import './NewEntry.scss'

class NewEntryInput extends Component {
    // Text line calculations from:
    // https://stackoverflow.com/questions/3697096/finding-number-of-lines-in-an-html-textarea?rq=1

    // COMPONENT STATE
    state = {
        lineText: ""
    }

    // PROPS
    addNewLine = this.props.addNewLine
    updateCurrentLine = this.props.updateCurrentLine
    autoSaveEntry = this.props.autoSaveEntry

    // COMPONENT METHODS

    // Run height calculation every x milliseconds max to improve performance
    throttledCalculation = _.throttle(() => {
        this.calculateHeight();
    }, 150);

    // Trigger auto-save after x milliseconds of last input event
    debouncedSave = _.debounce(() => {
        this.autoSaveEntry()
    }, 5000)

    handleChangeInput = (e) => {
        // Update text in state, then run the callback function to recalculate height to see if line wrapped
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            this.updateCurrentLine(this.state.lineText)
            this.throttledCalculation()
            this.debouncedSave()
        })
    }
    
    calculateContentHeight = (ta, lineHeight) => {
        var origHeight = ta.style.height,
            height = ta.offsetHeight,
            scrollHeight = ta.scrollHeight,
            overflow = ta.style.overflow;
        /// only bother if the ta is bigger than content
        if ( height >= scrollHeight ) {
            /// check that our browser supports changing dimension
            /// calculations mid-way through a function call...
            ta.style.height = (height + lineHeight) + 'px';
            /// because the scrollbar can cause calculation problems
            ta.style.overflow = 'hidden';
            /// by checking that scrollHeight has updated
            if ( scrollHeight < ta.scrollHeight ) {
                /// now try and scan the ta's height downwards
                /// until scrollHeight becomes larger than height
                while (ta.offsetHeight >= ta.scrollHeight) {
                    ta.style.height = (height -= lineHeight)+'px';
                }
                /// be more specific to get the exact height
                while (ta.offsetHeight < ta.scrollHeight) {
                    ta.style.height = (height++)+'px';
                }
                /// reset the ta back to it's original height
                ta.style.height = origHeight;
                /// put the overflow back
                ta.style.overflow = overflow;
                return height;
            }
        } else {
            return scrollHeight;
        }
    }
    
    calculateHeight = () => {
        const ta = document.getElementById("lineText")
        var style = (window.getComputedStyle) ? window.getComputedStyle(ta) : ta.currentStyle
            
        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        var taLineHeight = parseInt(style.lineHeight, 10)
        // Get the scroll height of the textarea
        var taHeight = this.calculateContentHeight(ta, taLineHeight)
        // calculate the number of lines
        var numberOfLines = Math.floor(taHeight / taLineHeight)  // TODO: fix calculateContentHeight; should be able to use Math.ceil here...

        if (numberOfLines > 1) {
            this.processLine()
        }

        // console.log(taLineHeight, taHeight, numberOfLines)
    
        // document.getElementById("templines").innerHTML = "there are " +
        //     numberOfLines + " lines in the text area";
    };

    processLine = () => {
        // split lineText into two parts:
        // 1. most recent word (after either space or linebreak)
        // 2. everything before that (including the trailing space or linebreak)

        var baseLineText;
        // If new line created via explicit new line character (e.g. linefeed or hitting 'enter' key),
        // emit the entire current lineText to parent
        if (this.state.lineText.endsWith('\n') || this.state.lineText.endsWith('\r')) {
            baseLineText = this.state.lineText
            this.setState({
                lineText: ""
            })
        } else {
            // Break lineText at the last whitespace (space) character and update state
            // e.g. "Some text here" >> ["Some text ", "here"]
            const match = /(.*\s)([^\s]+)/.exec(this.state.lineText)
            if (!match) return;
            baseLineText = match[1]
            const wrappedText = match[2]
            this.setState({
                lineText: wrappedText
            })
        }
        this.addNewLine(baseLineText)
        this.updateCurrentLine("")
    }

    // LIFECYCLE METHODS
    componentDidMount() {}

    render() {
        return (
            <div className="textbox-wrapper">
                <div className="input-group">
                    <textarea
                    autoFocus
                    className="form-control"
                    id="lineText"
                    rows="1"
                    placeholder="Type something..."
                    onChange={this.handleChangeInput}
                    value={this.state.lineText} />
                </div>
            </div>
        )
    }
}

export default NewEntryInput
