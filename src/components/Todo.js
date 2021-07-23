import React from "react";
import {makeStyles} from "@material-ui/styles";
import {CheckOutlined,DeleteOutlined} from "@ant-design/icons";


const Todo = ({item, checkClick ,delClick}) =>{
    const styles= useStyle();
    const textstyles=textStyle(item?.iscompleted);
    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.text}>
                    <p className={textstyles.text}>{item?.name}</p>
                </div>

                {
                    item?.iscompleted===false?
                    <CheckOutlined
                        className={styles.checkicon}
                        onClick={()=>{
                            checkClick(item?.id)
                        }}
                    />
                        : null
                }
                    <DeleteOutlined
                        className={styles.checkicon}
                        onClick={()=>{
                            delClick(item)
                        }}
                    />
            </div>
        </div>
        )
}
export default Todo;
const useStyle = makeStyles({
    container:{
      display: 'flex',
    },
    item:{
        backgroundColor: '#ff9900',
        marginTop: '5px',
        width: '100%',
        height:'40px',
        display: 'flex',
        borderRadius: '10px',
    },
    text:{
      width: '70%'
    },
    checkicon:{
        margin:'10px',
        marginLeft:'50px',
        width: '15%',
    },
    delicon:{
        margin:'10px',
        width: '15%',
    }
})

const textStyle = makeStyles({
    text: props => ({
        margin: 0,
        padding:'5px 20px',
        width: '100%',
        fontSize:'20px',
        color:'#fff',
        textDecoration: props===true ? 'line-through' : 'auto',
    }),
})