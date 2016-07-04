import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ToDoView from './ToDoView.js'
// import DoneView from './ToDoView.js'


const app = function() {

var ReminderModel = Backbone.Model.extend({
	// defaults: {
	// 	reminder: 'dummy data'
	// }
})


var ReminderCollection = Backbone.Collection.extend({
	model: ReminderModel
})


// var Router = Backbone.Router.extend({
// 	routes: {
// 		"tasks/done": "showDoneTasks",
// 		"tasks/undone": "showUndoneTasks",
// 		"*all": "showHomepage"
// 	},

// 	initialize: function(){
// 		Backbone.history.start()
// 	},

// 	showHomepage: function(){
// 		location.hash = "#home"
		ReactDOM.render(<ToDoView reminderColl={new ReminderCollection} />, document.querySelector('.container'))

// 	},

// 	showDoneTasks: function(){
// 		ReactDOM.render(<DoneView reminderColl={new ReminderCollection} />, document.querySelector('.container'))
// 	}
// })

// new Router();



}
	

app()