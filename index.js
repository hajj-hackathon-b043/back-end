const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const findNearestLocation = require('map-nearest-location');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./models/User');
const Group = require('./models/Group');
const Place = require('./models/Place');
const bodyParser = require('body-parser');
const Locations = require('./locations.json');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan('dev'));

// app.use(bodyParser.json({ type : '*/*' })); // force json

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(require('./routes'));

mongoose.connect("mongodb://all:abc123@ds263571.mlab.com:63571/hackthon-stage", { useNewUrlParser: true })

app.get('/user/:id', (req,res)=>{
    let id = req.params.id;
    if(id){
        User.find({id}).then(dRes=>{
            if(dRes){
                if(dRes.length > 0){
                    let info = dRes[0]
                    res.json(info)
                }
            }
        }).catch(why=>{
            res.json({error: why.message})
        })
    }else{
        res.json({error: 'something worng'})
    }
})

app.post('/user', (req,res)=>{
    let form = req.body
    console.log(form)
    if(form.id && form.team && form.food ){

        User.create(form).then((dRes)=>{
            console.log(dRes);
            try {
                Group.find({name: form.team}).then(Gres=>{
                    if(Gres.length > 0){
                        let members = Gres[0].members
                        members.push(form.id)
                        Group.findOneAndUpdate({name: form.team}, {members}).then(updateRes=>{
                            res.json({status: true})
                        })
                    }else{
                        let groupPos = form.name.split('-')[0]
                        Group.create({name: form.team, location: Locations[groupPos],members:[form.id]}).then(CreateRes=>{
                            res.json({status: true})
                        })
                    }
                })

            } catch (error) {
                json.res({error})
            }

        }).catch((why)=>{
            console.log(why)
            res.json({error: why.message})
        })
    }else{
        res.json({error: 'messing info'})
    }
})

app.post('/lastLocation', (req,res)=>{
    let id = req.body.id
    let lastLocation = req.body.lastLocation
    console.log(req.body)
    if(id && lastLocation){
        User.findOneAndUpdate({id},{lastLocation}).then(dRes=>{
            res.json({status: 'updated'})
        }).catch(why=>{
            res.json({error: why.message})
        })
    }
})
app.get('/lastLocation/:team', (req,res)=>{
    let team = req.params.team
    User.find({team}).then(dRes =>{
        if(dRes){
            let locations = dRes.map(obj => obj.lastLocation)
            res.json({locations})
        }else{
            res.json({locations:[]})
        }
    }).catch(error => res.json({error:error.message}))
})

app.post('/category',(req,res)=>{
    let {postion, type} = req.body

    if(postion && type){
        Place.find({category:type}).then(places=>{
            if(places.length){
                placesPos = places.map(obj=>obj.location)
                let resault = findNearestLocation(postion,placesPos)
                res.json(resault)
            }
        })
    }
})
app.get('/category/:type', (req,res)=>{
    let category = req.params.type;
    Place.findOneAndUpdate({category},{$inc:{views: 1}},{new: true }).then(dRes=>{
        res.json({status: true})
    }).catch(error=>{
        res.json({status: false, error: error.message})
    })
})

app.get('*', (req,res)=>{
    res.json({error: 'worng end point'})
})

app.listen(PORT,()=>{
    console.log('server opend on ' + PORT)
})