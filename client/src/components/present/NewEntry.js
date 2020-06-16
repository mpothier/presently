import React, { Component } from 'react'

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
        newDiv.className = "line"
        const textElement = document.createElement("span")
        textElement.innerText = text
        const maskElement = document.createElement("div")
        maskElement.className = "line-mask"
        textElement.appendChild(maskElement)
        newDiv.appendChild(textElement)
        parent.insertBefore(newDiv, parent.children[0])
        
        setTimeout(() => {
            parent.removeChild(newDiv)
        }, 10000)
    }

    autoSaveEntry = () => {
        const totalText = this.state.aggregateText + this.state.currentLineText
        if (!totalText) return
        console.log("Auto-saving entry...")
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
            </div>
        )
    }
}

export default NewEntry
