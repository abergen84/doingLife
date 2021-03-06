import React from 'react'
import ReactDOM from 'react-dom'

const ToDoView = React.createClass({

	getInitialState: function() {
		return {
			reminderColl: this.props.reminderColl //does this make this.state.reminderColl accessible?
		}
	},

	componentWillMount: function(){
		console.log('h-tine hol it dine')
		// console.log(this)
		// console.log(this.state.reminderColl)
		var self = this
		this.props.reminderColl.on('update', function(){
			// console.log(self.state.reminderColl)
			self.setState({
				reminderColl: self.props.reminderColl
			})
		})
	},
	
	_addSingleReminder: function(reminder){
		this.props.reminderColl.add({
			reminder: reminder,
			// duedate: duedate
		})
	},

	render: function(){
		console.log(this)
		return (
			<div id="toDoWrapper">
				<Header />
				<RemindAdder addReminder={this._addSingleReminder} />
				<ReminderList reminderColl={this.state.reminderColl}/>
			</div>
			)
	}
})

const Header = React.createClass({

	render: function(){
		return (
			<header>
				<h1>doingLIFE</h1>
			</header>
		)
	}
})

const RemindAdder = React.createClass({
	
	_handleKeyDown: function(event){
		if(event.keyCode === 13) {
			// console.log(event.target.value)
			this.props.addReminder(event.target.value)
			// console.log(this)
			event.target.value = ''
		}
	},

	render: function() {
		// console.log(this)
		return (
			<input type="text" placeholder="remind me" onKeyDown={this._handleKeyDown}/>
			)
	}
})

const ReminderList = React.createClass({
	
	_getReminderComponents: function(reminderColl){
		var jsxArray = reminderColl.models.map(function(mod){
			return <ToDo key={mod.cid} reminderModel={mod} />
		})

		return jsxArray
	},



	render: function(){
		console.log('rendering reminder list....', this.props.reminderColl)
		return (
			<ul className="reminderList">
				{this._getReminderComponents(this.props.reminderColl)}
			</ul>
		)
	}
})


const ToDo = React.createClass({
	render: function(){
		console.log(this.props.reminderModel.attributes.reminder)
		return (
			<li className="todo-item">
				{this.props.reminderModel.get('reminder')}
			</li>
			)
	}
})




export default ToDoView