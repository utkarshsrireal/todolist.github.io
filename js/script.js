var ToDo = React.createClass({
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
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    renderDefaultCard: function(){
        return (
            <div className="todo">
                <h3>{this.props.children}</h3>
                <button className="btn btn-primary glyphicon glyphicon-pencil" onClick={this.edit}></button>
                <button className="btn btn-warning glyphicon glyphicon-trash" onClick={this.delete}></button>
            </div>
        )
    },
    renderEditCard: function(){
        return (
            <div className="todo">
                <textarea defaultValue="Enter your task" ref="savedText"></textarea>
                <button className="btn btn-success glyphicon glyphicon-floppy-disk" onClick={this.save}></button>
            </div>
        )
    },
    edit: function(){
        console.log("Editing task");
        this.setState({editing: true});
    },
    delete: function(){
        console.log("Task Deleted!");
        this.props.onDelete(this.props.index);
    },
    save: function(){
        console.log('Task Saved!');
        this.setState({editing: false});
        var txt=this.refs.savedText.getDOMNode().value;
        console.log('The saved text is ' + txt);
        this.props.onSave(this.refs.savedText.getDOMNode().value,this.props.index);
    }
}); 
 
var ToDoList=React.createClass({
    getInitialState: function(){
        return {
            tasks: []}
    },
    componentWillMount: function(){
        var self=this;
        if(this.props.count){
            $.getJSON("http://baconipsum.com/api/?type-all-meat&sentences="+this.props.count + "&start-with-lorem=1&callback=?", function(results){
                results[0].split('. ').forEach(function(sentence){
                    self.addToList(sentence.substring(0,40));
                })
            });
        }
    },
    addToList: function(newText){
        var tasksArr=this.state.tasks;
        tasksArr.push(newText);
        this.setState({tasks: tasksArr});
    },
    saveList: function(newText, i){
        var tasksArr=this.state.tasks;
        tasksArr[i]=newText;
        this.setState({tasks: tasksArr});
    },
    deleteFromList: function(i){
        var tasksArr=this.state.tasks;
        tasksArr.splice(i,1);
        this.setState({tasks: tasksArr});
    },
    eachTask: function(task, i){
        return(
            <ToDo index={i} onSave={this.saveList} onDelete={this.deleteFromList}>{task}</ToDo>
        )
    },
    render: function(){
        return (
            <div className="todo-list">
                {this.state.tasks.map(this.eachTask)}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.addToList.bind(null,"New Task")}></button>
            </div>
        )
    }
});

React.render(<ToDoList count={10}></ToDoList>, document.getElementById('react-component'));