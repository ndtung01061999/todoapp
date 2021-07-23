import React, {useCallback, useEffect, useState} from "react";
import { TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/styles";
import {v4} from 'uuid';
import Todo from "./components/Todo";
import {List} from "antd";
const App = () =>{
    const styles = useStyles();
    const [todolist,setTodoList] =useState([]);
    const [textinput,setTextinput] =useState("");
    const TODO_STORAGE_KEY="TODO";
    const checkClick = useCallback((id) =>{
        setTodoList(item =>
        item.map((todo) =>
            todo.id === id ?{ ...todo,iscompleted : true}:todo
        )
        )
    },[])
    const delClick =useCallback((index) =>{
        setTodoList(item =>
        item.filter(todo => todo!==index)
        )
    })
    useEffect(()=>{
        const storage = localStorage.getItem(TODO_STORAGE_KEY);
        if (storage){
            setTodoList(JSON.parse(storage))
        }
    },[])
    useEffect(()=>{
        localStorage.setItem(TODO_STORAGE_KEY,JSON.stringify(todolist));
    },[todolist])
    return(
        <div className={styles.root}>
            <h3>Danh sách cần làm</h3>
            <div className={styles.container}>
                <TextField
                    id="text"
                    label="Nhập việc làm"
                    variant="outlined"
                    value={textinput}
                    onChange={useCallback((event)=>{
                        setTextinput(event.target.value)
                    },[])}
                />
                <Button
                    disabled={!textinput}
                    className={styles.button}
                    variant="contained"
                    onClick={useCallback(()=>{
                        setTodoList([
                            ...todolist,
                            {
                                id: v4(),
                                name:textinput,
                                iscompleted:false,
                            }
                        ])
                        setTextinput('')
                    },[todolist,textinput])}
                >
                    Thêm
                </Button>
            </div>
            {
                todolist.length===0 ?
                <div>
                    <p>không có việc làm</p>
                </div>
                :
                <List
                    grid={{column: 1 }}
                    dataSource={todolist}
                    renderItem={item => (
                        <Todo item={item} checkClick={checkClick} delClick={delClick}/>
                    )}
                />
            }

        </div>
    )
}
export default App;

const useStyles= makeStyles({
    root:{
      width:'100%',
    },
    container:{
        display: "flex",
    },
    button:{
        marginLeft: 3,
        backgroundColor: 'blue',
        color:'#fff'
    }
})