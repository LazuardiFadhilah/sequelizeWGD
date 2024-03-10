const { test } = require("media-typer");
const {Users} = require("../models");
const bcrypt = require("bcrypt");

class UserController{
    async store(req, res){
        try {
            const {nama, email, password} = req.body;
            const user = await Users.create({
                nama,
                email,
                password: bcrypt.hashSync(password, 10),
            });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }

    async index(req, res){
        try {
            // const limit = req.query.limit ?? 5;
           
            // const users = await Users.findAll(
            //    { limit: parseInt(limit),
            //     offset: 0,}
            // );
            // return res.json(users);


            // let {page, pageSize} = req.query;
            // if(!req.query.page){
            //     page = 1;
            // }
            // if(!req.query.pageSize){
            //     pageSize = 10;
            // }

            const page = Number(req.query.page) || 1;
            const pageSize = Number(req.query.pageSize) || 10;

            const offset = Number((page-1)*pageSize) || 0;
            const limit = Number(pageSize) || 10;

            const user = await Users.findAndCountAll({
                offset: offset,
                limit: limit,
            });
            return res.json({
                data: user.rows,
                total: user.count,
                page: page,
                pageSize: limit,
            });
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }

    async show(req, res){
        
        try {
            const {id} = req.params;
            const user = await Users.findOne({where:{id:id}});
            return res.json(user);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }

    async update(req, res){
        try {
            const {id} = req.params;
            const {nama, email, password} = req.body;
            const user = await Users.update({
                nama,
                email,
                password: bcrypt.hashSync(password, 10),
            },{where:{id:id}});
            return res.json(user);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }

    async delete(req, res){
        try {
            const {id} = req.params;
            console.log(id);
            const user = await Users.destroy({where:{id:id}});
            return res.json(user);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }

    async login(req, res){
        try {
            const id = req.query.id;
          
            const user = await Users.findOne({where:{id:id}});
        
            res.json(
                {
                    "code":200,
                    "message":"Login Success",
                    "user":user,
                }
            );
            console.log("test");
        } catch (error) {
            return res.status(400).json({message:error.message});

        }
    }
}

module.exports = new UserController();