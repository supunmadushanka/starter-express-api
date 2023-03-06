const aboutUs = require('../models/aboutUs');
const Document = require('../models/aboutUs');
module.exports = {
    saveAboutDetals:async(req,res)=>{
          const title=req.body.title
          const body=req.body.body
console.log(title)
console.log(body)
            const documentPath = 'https://black-pronghorn-robe.cyclic.app/documents/' + req.file.filename; // Note: set path dynamically
            const document = new Document({
              title,body,
              documentPath,
            });
            console.log(document)
            const createdDocument = await document.save();
            res.status(201).json({
              document: {
                ...createdDocument._doc,
              },
            });
    },
    getdocument:async(req,res)=>{
            const documents = await Document.find();
            res.status(200).json({ documents});
            console.log("hello")
    }
}