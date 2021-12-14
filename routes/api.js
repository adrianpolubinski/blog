const express = require('express');
const router = express.Router();
const News = require("../models/news");
const defaultSort = -1;
const xml = require("xml");




/* GET home page. */
router.get('/', (req, res) => {
  const search = req.query.search || '';
  let sort = req.query.sort || -1;
  const type = req.query.type || "json";

    if(sort !== -1 || sort !== 1){
        sort = defaultSort;
    }

  const findNews = News
  .find({ title: new RegExp(search.trim(), 'i')})
  .sort({date: sort});


  findNews.exec((err, data)=>{
    if(type=="json"){
        res.json(data);}
    else if(type=="xml"){
      let xmlData = `<?xml version="1.0" encoding="UTF-8"?>`;
      xmlData += `<posts>`;
      for(let i=0; i<data.length; i++){
        xmlData += `<post> 
        <id>${data[i]._id}</id>
        <title>${data[i].title}</title>
        <description>${data[i].description}</description>
        <date>${data[i].date}</date>
        </post>`;
      }
      xmlData += `</posts>`;
      res.header("Content-Type", "application/xml");
      res.status(200).send(xmlData);
    }
  });
});




router.get('/:id', (req, res) => {
    const id = req.params.id;

    const findNews = News
    .findById(id);

    findNews.exec((err, data)=>{
    
      res.json(data);
    });
  });


module.exports = router;
