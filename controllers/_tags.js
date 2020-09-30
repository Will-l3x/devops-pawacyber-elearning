let sql = require("mssql");


//Create new tag
let newTag = async (req, res) => {
    let obj = req.body;
    if (!obj.name) {
        return res.json({
            status: 500,
            success: false,
            error: "Missing tag name in request body",
        });
    } else {
        let q = `insert into tags\
        (name)\
        values ('${obj.name}')`;
        let ms_req = new sql.Request();
        ms_req.query(q, (err, data) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "An error occured",
                    error: err.message,
                });
            } else {
                let new_tag = data.recordset;
                console.log(data.recordset);
                return res.json({
                    status: 200,
                    success: true,
                    data: JSON.parse(JSON.stringify({new_tag})),
                });
            }
        })
    }
};
//Retrieve all tags
let allTags = async (req, res) => {
    let q = `select * from [tags]`;
    let ms_req = new sql.Request();
    ms_req.query(q, (err, data) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: "An error occured",
                error: err.message,
            });
        } else {
            let tags;
            if (data.recordset) {
                tags = data.recordset;
            } else {
                tags = [];
            }
            return res.json({
                status: 200,
                success: true,
                data: JSON.parse(JSON.stringify({tags})),
            });
        }

    });
};
//Update, link tag with material
//tagIds must be an array of tagIds to be linked
let linkTag = async (req, res) => {
    let obj = req.body;
    console.log(obj.tagIds.length);
    if (!obj.tagIds || !obj.materialId || typeof obj.tagIds.length != 'number') {
        return res.json({
            status: 500,
            success: false,
            error: "Missing tagIds or materialId in request body",
        });
    } else {
        let counter = 0;
        obj.tagIds.forEach(tag => {
            let q = `insert into tag_material\
            (tagId, materialId)\
            values ( ${tag}, ${obj.materialId} )`;
            let ms_req = new sql.Request();
            ms_req.query(q, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: "An error occured",
                        error: err.message,
                    });
                } else {
                    counter++
                    if (counter == obj.tagIds.length) {
                        return res.json({
                            status: 200,
                            success: true,
                            message: "Tags linked successfully",
                        });
                    }
                }
            })
        });
    }

};
//Delete
let deleteTag = async (req, res) => {
    let obj = req.body;
    if (!obj.tagId) {
        return res.json({
            status: 500,
            success: false,
            error: "Missing tagId in request body",
        });
    } else {
        let q = `delete from [tags] where tags.tagId = ${obj.tagId}`;
        let ms_req = new sql.Request();
        ms_req.query(q, (err, data) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "An error occured",
                    error: err.message,
                });
            } else {
                return res.json({
                    status: 200,
                    success: true,
                    message: "Tag deleted",
                });
            }
        })
    }
};
//Get all tags for given material ID
let getTags = async (req, res) => {
    let obj = req.body;
    if (!obj.materialId) {
        return res.json({
            status: 500,
            success: false,
            error: "Missing materialId in request body",
        });
    } else {
        let q = `select * from [tags]\
        where tags.tagId\
        in (select tag_material.tagId from [tag_material] where tag_material.materialId = ${obj.materialId});`
        let ms_req = new sql.Request();
        ms_req.query(q, (err, data) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "An error occured",
                    error: err.message,
                });
            } else {
                let material_tags = data.recordset;
                return res.json({
                    status: 200,
                    success: true,
                    data: JSON.parse(JSON.stringify({material_tags})),
                });
            }
        })
    }


};

module.exports = {
    newTag,
    allTags,
    linkTag,
    deleteTag,
    getTags,
};
