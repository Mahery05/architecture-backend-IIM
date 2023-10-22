const PKM = require('../models/pkm');

//Create and Save a new Pkm
exports.create = (req, res) => {
    console.log(req.body);
    const postPkm = req.body;

    const pkm = new PKM ({
        name : postPkm.name,
        type: postPkm.type,
        level: postPkm.level,
    
    });
    pkm.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

};


    exports.findAll = (req, res) => {
        
        PKM.find()
        .then(data => res.send(data))
        .catch( err => res.status(500).send({message: err}))
    }

    exports.update = (req, res) => {
        const pkm = new PKM({
            _id: req.params.id,
            name: req.body.name,
            type: req.body.type,
            level: req.body.level,
          });
          PKM.updateOne({_id: req.params.id}, pkm).then(
            () => {
              res.status(201).json({
                message: 'Pokemon updated successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
    }

    exports.delete  = (req, res) => {
        PKM.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        }