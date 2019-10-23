import React ,{Component} from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Header from './src/components/Header';
import Subtitle from './src/components/Subtitles';
import InputBox from './src/components/InputBox';
import TodoItem from './src/components/TodoItem';

export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state={
      inputValue: "",
      todos: [
      ],
    }
  }

  componentWillMount(){
    this.getData();
  }

  storeData = () => {
    AsyncStorage.setItem('@todo:state', JSON.stringify(this.state));
  }

  getData = () => {
    AsyncStorage.getItem('@todo:state').then((state) => {
      if (state !== null) {
        this.setState(JSON.parse(state));
      }
    })
  }

  _makeTodoItem = ({item, index}) => {
    return(
      <TodoItem
       text={item.title}
       isComplete={item.isComplete}
       changeComplete={ ()=>{
         const newTodo = [...this.state.todos];
         newTodo[index].isComplete = !newTodo[index].isComplete;
         this.setState({todos: newTodo}, this.storeData)
        }}
        deleteItem = {() => {
          const newTodo = [...this.state.todos];
          newTodo.splice(index, 1);
          this.setState({todos:newTodo}, this.storeData);
        }}
      />
    );
  }

  _changeText = (value) => {
    return(
      this.setState({inputValue: value})
    )
  }
  
  _addTodoItem = () => {
    if(this.state.inputValue !== ''){
      const prevTodo = this.state.todos
      const newTodo = {title: this.state.inputValue, isComplete: false};
      this.setState({
        inputValue: '',
        todos: prevTodo.concat(newTodo)
      }, this.storeData);
    }
  }

  render () {

    const {todos, inputValue} = this.state //비구조화 할당
    const {_makeTodoItem, _changeText, _addTodoItem } = this

    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Header/>
        </View>

        <View style={styles.subcontainer}>
          <Subtitle title="What's going on?"/>
          <InputBox
            value={inputValue}
            changeText={_changeText}
            addTodo={_addTodoItem}
            />
        </View>
  
        <View style={styles.subcontainer}>
          <Subtitle title="LIST"/>
  
          <FlatList
            data = {todos} //FlatList에 띄울 data
            renderItem = {_makeTodoItem}  //FlatList의 data를 어떤 식으로 가공할 것인가 -- 함수
            keyExtractor={(item, index) => {return index.toString()}} // todos는 배열 -> item->배열 index->배열의 index
            /> 
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6C6C6", // 화면을 구성하는 크기를 몇 퍼센트로 맞출것인가
  },
  text: {
    alignItems: 'center',
  },
  subcontainer: {
    marginLeft: 20,
  },
});