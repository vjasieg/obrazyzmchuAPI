function upload() {
    file.mv('./static/files/' + id + ".png", function(err) {
        const pic = new productPicModel({
            "_id": id,
            "path": "/files/" + id + ".png",
            "productID": product.id,
            "order": order
        });
        pic.save().then().catch(err => {
            return res.status(500).send(err);
        })
    });
}