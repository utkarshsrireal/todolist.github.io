var ToDo = React.createClass({displayName: "ToDo",
    getInitialState: function(){
        return {editing: false}
    },
    render: function() {
        if(this.state.editing){
            return this.renderEditCard();
        }
        else{
            return this.renderDefaultCard();
        }
    },
    renderDefaultCard: function(){
        return (
            React.createElement("div", {className: "todo"}, 
                React.createElement("h3", null, "Some Random Task"), 
                React.createElement("button", {className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.edit}), 
                React.createElement("button", {className: "btn btn-warning glyphicon glyphicon-trash", onClick: this.delete})
            )
        )
    },
    renderEditCard: function(){
        return (
            React.createElement("div", {className: "todo"}, 
                React.createElement("textarea", {defaultValue: "Enter your task", ref: "savedText"}), 
                React.createElement("button", {className: "btn btn-primary glyphicon glyphicon-floppy-disk", onClick: this.save})
            )
        )
    },
    edit: function(){
        console.log("Editing task");
        this.setState({editing: true});
    },
    delete: function(){
        console.log("Task Deleted!");
    },
    save: function(){
        console.log('Task Saved!');
        this.setState({editing: false});
        var txt=this.refs.savedText.getDOMNode().value;
        console.log('The saved text is ' + txt);
    }
});

var ToDoList=React.createClass({displayName: "ToDoList",
    render: function(){
        return (
            React.createElement("div", {className: "todo-list"}, 
                this.props.count
            )
        )
    }
})

React.render(React.createElement(ToDoList, {count: 1}), document.getElementById('react-component'));