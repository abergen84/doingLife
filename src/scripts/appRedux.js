import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ToDoView from './ToDoView'


const app = function() {

const ReminderModel = Backbone.Model.extend({
	// defaults: {
	// 	test: 'test'
	// }
})

const ReminderCollection = Backbone.Collection.extend({
	model: ReminderModel
})

const reminderCollection = new ReminderCollection();

ReactDOM.render(<ToDoView reminderColl={reminderCollection} />, document.querySelector('.container'))

}
	

app()