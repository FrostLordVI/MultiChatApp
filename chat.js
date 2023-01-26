
const send = document.querySelector('#send')
const board = document.querySelector('#board')
let id = 4
let user={
    name:[],
    question:[],
    num:[],
    date:[],
}

function sendMess(){

    const dat = new Date()
    const year = dat.getFullYear()
    const month = dat.getMonth()
    const day = dat.getDate()

    let numMonth;
    function createMonth(){
        if(month.legth>1){
            numMonth=month
            return numMonth
        }else{
            numMonth = `0${month+1}`
            return numMonth
        }
    }

    createMonth()

    let nick = document.querySelector('#nick').value
    let message = document.querySelector('#message').value
    
    if(nick.length<5){
        alert('Your nickname should have a minimum of 5 characters!')
    }else if(message.length===0){
        alert('Your message can not be empty!')
    }else{

        user.name.push(nick)
        user.question.push(message)
        user.num.push(id)
        user.date.push([year,numMonth,day])

        localStorage.setItem('user-info', JSON.stringify(user));

        board.innerHTML+= `<div class="userBoard">
        <h2 class="nickName" id="nick${id}">${nick}</h2>
        <p class="message" id="message${id}">${message}</p>
        <p class="date">${year}-${numMonth}-${day}</p>
        <hr>
        </div>`

         id++

        const inputs = document.querySelectorAll('input')
        inputs.forEach(el=>{
            el.value=''
        })
        const txtM = document.querySelectorAll('textarea')
        txtM.forEach(el=>{
            el.value=''
        })
           
    }

    
}
send.addEventListener('click',sendMess)

function getLocal(){

const myExistElement = JSON.parse(localStorage.getItem('user-info'))

if (myExistElement !== null){
user.name = myExistElement.name
user.question = myExistElement.question
user.num = myExistElement.num
user.date = myExistElement.date
}

    if (myExistElement !== null){
        
        for(i=0;i<myExistElement.name.length;i++){
            board.innerHTML+= `<div class="userBoard">
            <h2 class="nickName" id="nick${myExistElement.num[i]}">${myExistElement.name[i]}</h2>
            <p class="message" id="message${myExistElement.num[i]}">${myExistElement.question[i]}</p>
            <p class="date">${myExistElement.date[i][0]}-${myExistElement.date[i][1]}-${myExistElement.date[i][2]}</p>
            <hr>
            </div>`
                }
            }   
}
window.onload=getLocal

function restart(){
    localStorage.clear()
    window.location.reload()
}
const resetBtn = document.querySelector('#reset')

resetBtn.addEventListener('click',restart)