import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

const ToDoView = React.createClass({
	
	getInitialState: function(){
		return {
			reminderColl: this.props.reminderColl
		}
	},

	componentWillMount: function(){
		console.log('htineeeee')
		console.log(this)
		var self = this
		this.props.reminderColl.on('update', function(){
			self.setState({
				reminderColl: self.props.reminderColl
			})
		})
	},

	_addReminder: function(reminder){
		// console.log(reminder)
		// console.log(this)
		this.props.reminderColl.add({
			reminder: reminder
		})
	},

	render: function(){
		// console.log(this)
		return (
			<div id="appContainer">
				<Header />
				<Input addReminder={this._addReminder} />
				<ReminderContainer reminderColl={this.props.reminderColl} />
			</div>
			)
	}
})



const Header = React.createClass({
	render: function(){
		return (
			<header id="appHeader">
			<h1>remindMeAboutLife</h1>
			</header>
			)
	}
})

const Input = React.createClass({
	
	_handleClick: function(event){
		if(event.keyCode === 13) {
			// console.log(event.target.value)
			this.props.addReminder(event.target.value)
			event.target.value = ''
		}
	},

	render: function(){
		// console.log(this)
		return (
			<div id="inputbar">
				<input type="text" placeholder="reminder?" onKeyDown={this._handleClick} />
			</div>
			)
	}
})

const ReminderContainer = React.createClass({
	
	_getJSXArray: function(array){
		var self=this
		var jsxArray = array.map(function(model){
			return <ToDo models={model} key={model.cid} />
		})

		return jsxArray
	},

	render: function(){
		console.log(this)
		return (
		<div id="reminderContainer">
			<ul>
			{this._getJSXArray(this.props.reminderColl.models)}
			</ul>
		</div>
		)
	}
})

const ToDo = React.createClass({
	
	// _removeReminder: function(){
	// 	this.props.models.destroy()
	// },

	_handleTask: function(event){
		console.log(event.target.checked)
		if(event.target.checked === true) {
			this.props.models.set({
				task: "done"
			})
		} else {
			this.props.models.set({
				task: "notdone"
			})
		}
		console.log(this.props.models.attributes)

	},

	render: function(){
		console.log(this)
		return (
			<div className="reminders">
				{this.props.models.get('reminder')}
				<input type="checkbox" onClick={this._handleTask} />
			</div>
			)
	}
})






export default ToDoView
// export default DoneView