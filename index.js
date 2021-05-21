const express=require('express')
const axios=require('axios')
const ejs=require('ejs')
require('dotenv').config()
const path = require('path')
const bodyparse=require('body-parser')

const app=express()

const port=process.env.PORT || 4000

app.set('view engine','ejs')

const css =path.join(__dirname, '/css')

app.use(express.static(css))
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({extended:true}))

axios.get('https://api.wazirx.com/api/v2/tickers')
.then(data=>{
    //console.log((data['data']))
    datalist=[]
    for( var keys in data['data']){
        datalist.push(data['data'][keys])
    }
})
.catch(err=>{
    console.log(err)
})

app.get('/',(req,res)=>{
   res.render('../views/index',{
       'data':datalist
   })

})


app.listen(port,()=>{
    console.log(`app is running at Port: ${port}`)
})






