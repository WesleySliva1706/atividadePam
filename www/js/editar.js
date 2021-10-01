var app = {

    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        //buscar
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

        ag.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    document.getElementById("txtNome").value = doc.data().nome;
                    document.getElementById("txtTelefone").value = doc.data().telefone;
                    document.getElementById("txtOrigem").value = doc.data().origem;
                    document.getElementById("txtDataContato").value = doc.data().data_contato;
                    document.getElementById("txtObservacao").value = doc.data().observacao;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    },

    onDeviceReady: function () {
        document.getElementById("btnEditar").addEventListener("click", app.editar);
    },

    editar: function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let cnome = document.getElementById("txtNome").value;
        let ctelefone = document.getElementById("txtTelefone").value;
        let corigem = document.getElementById("txtOrigem").value;
        let cdata_contato = document.getElementById("txtDataContato").value;
        let cobservacao = document.getElementById("txtObservacao").value;

        var db = firebase.firestore();
        var ag = db.collection("agendamentos").where("telefone", "==", getTelefone);

        ag.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var dados = db.collection("agendamentos").doc(doc.id);

                    return dados.update({
                        nome: cnome,
                        telefone: ctelefone,
                        origem: corigem,
                        data_contato: cdata_contato,
                        observacao: cobservacao
                    })
                        .then(() => {
                            console.log("Document successfully updated!");
                            window.location.href = cordova.file.applicationDirectory + "www/consClientes.html";
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }

};

app.initialize();