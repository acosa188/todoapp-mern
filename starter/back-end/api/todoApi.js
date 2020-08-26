const express = require('express');
const router = express.Router();
const todoModel = require('../models/todoModel');
const e = require('express');


router.get('/',(req, res) => {
    todoModel.find((err, items)=>{
        if(!err){
            res.json(items);
        }else{
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) =>{
    todoModel.findById(req.params.id, (err, todo)=>{
        if(!err){
            res.json(todo);
        }else{
            console.log(err);
        }
    });
});

router.post('/add', async (req, res) =>{
    let todo = new todoModel(req.body)
    await todo.save(err=>{
        if(!err){
            res.status(200).json('todo successfully saved to the database');
        }else{
            res.status(400).send(`saving todo to the database failed with error ${err}`);
        }

    });
});

router.put('/:id', (req, res) =>{
    todoModel.findById(req.params.id, async (err, todo)=>{
        if(!err){
            todo.isCompleted = !todo.isCompleted;
            await todo.save(err =>{
                if(!err){
                    res.status(200).json('todo successfully updated to the database');
                }else{
                    res.status(400).send(`saving todo to the database failed with error ${err}`);
                }
            });
            
        }else{
            res.send(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    todoModel.findByIdAndRemove(req.params.id, (err, todo) =>{
        if(!err){
            res.status(200).json('todo successfully deleted');
        }else{
            res.status(400).json(err)
        }
    });
});

module.exports = router;