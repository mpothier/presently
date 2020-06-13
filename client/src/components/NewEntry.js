import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import { Random, Wave } from 'react-animated-text'

import NewEntryInput from './NewEntryInput'

import './NewEntry.scss'

class NewEntry extends Component {

    // COMPONENT STATE
    state = {
        aggregateText: "",
        currentLineText: ""
    }

    // COMPONENT METHODS
    addNewLine = (text) => {
        // Add to aggregated session text
        this.setState({
            aggregateText: this.state.aggregateText + text
        })
        // Render new element to DOM
        const parent = document.getElementById("lines")
        const newDiv = document.createElement("div")

        // OPTION 1: PURE CSS ANIMATION
        newDiv.className = "line"
        const textElement = document.createElement("span")
        textElement.innerText = text
        const maskElement = document.createElement("div")
        maskElement.className = "line-mask"
        textElement.appendChild(maskElement)
        newDiv.appendChild(textElement)

        parent.insertBefore(newDiv, parent.children[0])
        
        // OPTION 2: react-animated-text COMPONENT
        // const newLine = <Wave 
        //                 text={text}
        //                 iterations={1}
        //                 speed={15}
        //                 // delay={10.0}
        //                 effect="fadeOut"
        //                 effectDuration={15}
        //                 />
        // ReactDOM.render(newLine, newDiv)

        setTimeout(() => {
            parent.removeChild(newDiv)
        }, 10000)
    }

    autoSaveEntry = () => {
        console.log("Auto-saving entry...")
        const totalText = this.state.aggregateText + this.state.currentLineText
        // TODO: hook this up to an API call to store in database
    }
    
    // LIFECYCLE METHODS
    componentDidMount() {}

    render() {
        return (
            <div className="entry-container">
                <div id="templines"></div>
                <div id="lines"></div>
                <NewEntryInput
                addNewLine={this.addNewLine}
                updateCurrentLine={(text) => this.setState({currentLineText: text})}
                autoSaveEntry={this.autoSaveEntry} />
                {/* <div className="test">{ this.state.aggregateText }</div> */}
            </div>
        )
    }
}

export default NewEntry
