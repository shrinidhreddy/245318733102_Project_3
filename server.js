const express=require('express')   
const app=express()   
const bodyParser=require('body-parser')   
const MongoClient=require('mongodb').MongoClient   
var db; 
var s;

MongoClient.connect('mongodb://localhost:27017/Inventory', (err,database) =>{        
	if(err) return console.log(err)
	db=database.db('Inventory')     
	app.listen(5000,() =>{
		console.log('Listening at port number 5000')
	})
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true})) 
app.use(bodyParser.json())   
app.use(express.static('public'))  

//homepage
app.get('/', (req,res)=>{                
	db.collection('clothing').find().toArray( (err,result)=>{     
		if(err) return console.log(err)     
	res.render('home.ejs', {data:result})      
	})
})
app.get('/clothing', (req,res)=>{                
	db.collection('clothing').find().toArray( (err,result)=>{     
		if(err) return console.log(err)     
	res.render('clothing.ejs', {data:result})      
	})
})
app.get('/footwear', (req,res)=>{                
	db.collection('footwear').find().toArray( (err,result)=>{     
		if(err) return console.log(err)     
	res.render('footwear.ejs', {data:result})      
	})
})
app.get('/accessories', (req,res)=>{                
	db.collection('accessories').find().toArray( (err,result)=>{     
		if(err) return console.log(err)     
	res.render('accessories.ejs', {data:result})      
	})
})

//for add
app.get('/createclothing', (req,res)=>{     
	res.render('addclothing.ejs')           
})
app.get('/createfootwear', (req,res)=>{     
	res.render('addfootwear.ejs')            
})
app.get('/createaccessories', (req,res)=>{     
	res.render('addaccessories.ejs')            
})

//for update
app.get('/updateclothingstock', (req,res)=>{			
	res.render('updateclothing.ejs')				
})
app.get('/updatefootwearstock', (req,res)=>{			
	res.render('updatefootwear.ejs')				
})
app.get('/updateaccessoriesstock', (req,res)=>{			
	res.render('updateaccessories.ejs')				
})


//for delete
app.get('/deleteclothingproduct', (req,res)=>{		
	res.render('deleteclothing.ejs')	
})
app.get('/deletefootwearproduct', (req,res)=>{		
	res.render('deletefootwear.ejs')		
})
app.get('/deleteaccessoriesproduct', (req,res)=>{		
	res.render('deleteaccessories.ejs')		
})

//post request code-
app.post('/AddDataClothing', (req,res)=>{			
	db.collection('clothing').save(req.body, (err,result)=>{			
		if(err) return console.log(err)
	res.redirect('/clothing')                        
	})
})
app.post('/AddDataFootwear', (req,res)=>{			
	db.collection('footwear').save(req.body, (err,result)=>{			
		if(err) return console.log(err)
	res.redirect('/footwear')                        
	})
})
app.post('/AddDataAccessories', (req,res)=>{			
	db.collection('accessories').save(req.body, (err,result)=>{			
		if(err) return console.log(err)
	res.redirect('/accessories')                        
	})
})

//post-update stock 
app.post('/updateclothing', (req,res)=>{			
		db.collection('clothing').find().toArray((err,result)=>{	   			
			if(err) 
				return console.log(err)
			for(var i=0;i<result.length;i++){
				if(result[i].pid==req.body.id){
					s=result[i].stock
					break
				}
			}
			if(req.body.type == "increase"){
				db.collection('footwear').findOneAndUpdate({pid:req.body.id},{
				
						$set:{stock: parseInt(s) +parseInt(req.body.stock)}} , {sort:{_id:-1}},
						(err,result) =>{
							if(err)
								return console.log(err)
							console.log(req.body.id+'stock updated')
							res.redirect('/footwear')
					
				})
			}
			else{
				db.collection('footwear').findOneAndUpdate({pid:req.body.id},{
				
					$set:{stock: parseInt(s) -parseInt(req.body.stock)}} , {sort:{_id:-1}},
					(err,result) =>{
						if(err)
							return console.log(err)
						console.log(req.body.id+'stock updated')
						res.redirect('/footwear')
				
				})
			}
		})	
})
	

app.post('/updatefootwear', (req,res)=>{			
	db.collection('footwear').find().toArray((err,result)=>{	   			
		if(err) 
		return console.log(err)
		for(var i=0;i<result.length;i++){
			if(result[i].pid==req.body.id){
				s=result[i].stock
					break
			}
		}
		if(req.body.type == "increase"){
			db.collection('footwear').findOneAndUpdate({pid:req.body.id},{
			
					$set:{stock: parseInt(s) +parseInt(req.body.stock)}} , {sort:{_id:-1}},
					(err,result) =>{
						if(err)
							return console.log(err)
						console.log(req.body.id+'stock updated')
						res.redirect('/footwear')
				
			})
		}
		else{
			db.collection('footwear').findOneAndUpdate({pid:req.body.id},{
			
				$set:{stock: parseInt(s) -parseInt(req.body.stock)}} , {sort:{_id:-1}},
				(err,result) =>{
					if(err)
						return console.log(err)
					console.log(req.body.id+'stock updated')
					res.redirect('/footwear')
			
		    })
		}
	})	
})

app.post('/updateaccessories', (req,res)=>{			
	db.collection('accessories').find().toArray((err,result)=>{	   			
		if(err) 
		return console.log(err)
		for(var i=0;i<result.length;i++){
			if(result[i].pid==req.body.id){
				s=result[i].stock
					break
			}
		}
		if(req.body.type == "increase"){
			db.collection('accessories').findOneAndUpdate({pid:req.body.id},{
			
					$set:{stock: parseInt(s) +parseInt(req.body.stock)}} , {sort:{_id:-1}},
					(err,result) =>{
						if(err)
							return console.log(err)
						console.log(req.body.id+'stock updated')
						res.redirect('/accessories')
				
			})
		}
		else{
			db.collection('accessories').findOneAndUpdate({pid:req.body.id},{
			
				$set:{stock: parseInt(s) -parseInt(req.body.stock)}} , {sort:{_id:-1}},
				(err,result) =>{
					if(err)
						return console.log(err)
					console.log(req.body.id+'stock updated')
					res.redirect('/accessories')
			
		    })
		}
	})	
})

//post- delete stock
app.post('/deleteclothing',(req,res)=>{
	db.collection('clothing').findOneAndDelete({pid:req.body.id}, (err,result)=>{    
		if(err)
			return console.log(err)
		res.redirect('/clothing')
	})
})

app.post('/deletefootwear',(req,res)=>{
	db.collection('footwear').findOneAndDelete({pid:req.body.id}, (err,result)=>{    
		if(err)
			return console.log(err)
		res.redirect('/footwear')
	})
})
app.post('/deleteaccessories',(req,res)=>{
	db.collection('accessories').findOneAndDelete({pid:req.body.id}, (err,result)=>{    
		if(err)
			return console.log(err)
		res.redirect('/accessories')
	})
})