import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

const ToDoView = React.createClass({
	
	getInitialState: function(){
		// console.log(this)
		return {
			reminderColl: this.props.reminderColl,
			currentView: 'allTasks'
		}
	},

	componentWillMount: function(){
		console.log('htineeeee')
		// console.log(this)
		var self = this
		this.props.reminderColl.on('update', function(){
			self.setState({
				reminderColl: self.props.reminderColl,
				// currentView: 'allTasks'
			})
			console.log(self)
		})
	},

	_addReminder: function(reminder){
		// console.log(reminder)
		// console.log(this)
		this.props.reminderColl.add({
			reminder: reminder,
			task: "notdone"
		})
	},

	_handleTask: function(taskStatus) {
		// console.log('firing')
		this.setState({
			currentView: taskStatus
		})
		console.log(this.state)
	},

	// _handleIncomplete: function() {
	// 	// console.log('firing')
	// 	this.setState({
	// 		currentView: 'notdone'
	// 	})
	// 	console.log(this.state)
	// },

	render: function(){
		// console.log(this)
		return (
			<div id="appContainer">
				<Header taskState={this._handleTask} incompleteState={this._handleIncomplete} />
				<Input addReminder={this._addReminder} />
				<ReminderContainer currentView={this.state.currentView} reminderColl={this.state.reminderColl} />
			</div>
			)
	}
})



const Header = React.createClass({

	render: function(){
		// console.log(this)
		return (
			<header id="appHeader">
			<h1>remindMeAboutLife</h1>
			<button>All Tasks</button>
			<button value="done" onClick={(e)=>this.props.taskState(e.target.value)} >Completed</button>
			<button value="notdone" onClick={(e)=>this.props.taskState(e.target.value)} >Still Gotta Do</button>
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
		console.log(this)
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

	_filterStatus: function(array){
		console.log('firing off filter method', array)
		var filteredArray = array.filter(function(model){
			console.log(model.attributes.task)
			if(model.attributes.task === "done") {
				// console.log("works")
				return true
			}
		})
		console.log(filteredArray)
		return filteredArray
	},

	render: function(){
		console.log(this)
		return (
		<div id="reminderContainer">
			<ul>
			{this.props.currentView === "done" ? this._getJSXArray(this._filterStatus(this.props.reminderColl.models)) : this._getJSXArray(this.props.reminderColl.models)}
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