var routerModule = function(hapiServer,connection){

    hapiServer.route([
        {
            // router get note (all)
            method : 'GET',
            path : '/note',
            handler : function(req, res){

                // mendapatkan id_note , isi_note dan tanggal_note dari tabel note
                var query = "SELECT id_note, isi_note, tanggal_note FROM note ORDER BY tanggal_note DESC";
                connection.query(query, function(err, result, fields){
                    if(err){
                        // jika error maka throw errornya.
                        throw err;
                    } else {
                        if(result.length > 0){
                            // jika teradpat data maka, hasil dari query akan diberikan.
                            const response = res(result);
                            response.type('application/json');
                        } else {
                            // jika tidak ada data menampilkan pesan.
                            const response = res({
                                msg : "tidak ada data note pada database"
                            });
                            // response bertipe application/json
                            response.type('application/json');
                        }
                    }
                });

            } // end handler
        },
        {
            // router get single note
            method : 'GET',
            path : '/note/{id}',
            handler : function(req, res){
                
                var id = req.params.id;
                // mendapatkan id_note , isi_note dan tanggal_note dari tabel note
                var query = "SELECT id_note, isi_note, tanggal_note FROM note WHERE id_note = "+id+" ORDER BY tanggal_note DESC";
                connection.query(query, function(err, result, fields){
                    if(err){
                        // jika error maka throw errornya.
                        throw err;
                    } else {
                        if(result.length > 0){
                            // jika teradpat data maka, hasil dari query akan diberikan.
                            const response = res(result);
                            response.type('application/json');
                        } else {
                            // jika tidak ada data menampilkan pesan.
                            const response = res({
                                msg : "tidak ada data note pada database"
                            });
                            // response bertipe application/json
                            response.type('application/json');
                        }
                    }
                });


            } // end handler
        },
        {
            // router add note
            method : 'POST',
            path : '/note',
            handler : function(req, res){

                // payload digunakan untuk mengambil isi dari http body
                if(typeof req.payload.isi_note !== "undefined"){
                    var query = "INSERT INTO NOTE(isi_note,tanggal_note) VALUES('"+req.payload.isi_note+"', NOW())";
                    connection.query(query, function(err, result, fields){
                        if(err){
                            throw err;
                        } else {
                            // berhasil menambahkan note.
                            const response = res({
                                msg : "berhasil menambahkan note baru"
                            });
                            // response bertipe application/json
                            response.type('application/json');
                        }
                    });
                } else {
                    const response =  res({
                        msg : "required body not defined"
                    });
                    response.type('application/json');                    
                }

            } // end handler
        },
        {
            // router delete  note
            method : 'DELETE',
            path : '/note/{id}',
            handler : function(req, res){

                var id = req.params.id;
                var query = "DELETE FROM note where id_note = '"+id+"'";
                connection.query(query, function(err, result, fields){
                    if(err){
                        throw err;
                    } else {
                        if(fields){
                            const response = res({
                                msg : "berhasil menghapus note."
                            });
                            response.type('application/json');                    
                        } else {
                            const response = res({
                                msg : "tidak ada data note"
                            });
                            response.type('application/json');                    
                        }
                    }
                });

            } // end handler
        },
        {
            // router edit  note
            method : 'PUT',
            path : '/note/{id}',
            handler : function(req, res){ 

                if(typeof req.payload.isi_note !== "undefined"){

                    var query = "UPDATE note SET isi_note = '"+req.payload.isi_note+"', tanggal_note=NOW() WHERE id_note = '"+req.params.id+"'";
                    connection.query(query, function(err, result, fields){
                
                        if(err){
                            const response = res({
                                msg : "gagal mengubah note."
                            });
                            response.type('application/json');   
                        } else{
                            const response = res({
                                msg : "berhasil mengubah note."
                            });
                            response.type('application/json');   
                        }
                
                    });
                
                } else {

                    const response = res({
                        msg : "required body not defined"
                    });
                    response.type('application/json');  

                }


            } // end handler
        }
    ]);

}

module.exports = routerModule;