function htmlvisitante() {
        location = '../visitantes.html';
} 
    


    function registro() {
        const emailValue = exampleInputEmail1.value;
        const passwordValue = exampleInputPassword1.value;
       
        firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then((response) => {
            
         })
        .catch((error) => {
            console.log("Error de firebase > Código > "+error.code);
            console.log("Error de firebase > Mensaje > "+error.message);
         });

        //  const nombre =  exampleInputNombre.value;
        //  const empresas = inputState.value;
        //  if (empresas == 'Laboratoria') {
        //      const newMessageKey = firebase.database().ref().child('HabitantesIFBlanco').push().empresas;
 
        //   firebase.database().ref(`HabitantesIFBlanco/${newMessageKey}`).set({
        //       name : nombre,
        //       email : emailValue
        //   });
        //  }
    }

    function login(){
        const emailValue = exampleInputEmail1.value;
        const passwordValue = exampleInputPassword1.value;
        firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
            .then(()=>{
                location = '../opciones.html';
                console.log("Usuario con login exitoso");
            })
            .catch((error)=>{
                console.log("Error de firebase > "+error.code);
                console.log("Error de firebase, mensaje > "+error.message);
            });
}

function  guardarVisitantes(){
    //  let email = Email.value;
     let empresas = inputState.value;
     let nombreyapellido = exampleInputNombre.value;
     let patentes = patente.value;
     let estacionamientos = estacionamiento.value;
     let galpones = galpon.value;
     let contactos = contacto.value;
// current user para ver los datos del usuario conectado
const currentUser = firebase.auth().currentUser;

//Para tener una nueva llave en la colección messages
const newMessageKey = firebase.database().ref().child('visitantes').push().key;

firebase.database().ref(`visitantes/${newMessageKey}`).set({
    creator : currentUser.uid,
    visitante : nombreyapellido,
    empresa: empresas,
    patente: patentes,
    estacionamiento: estacionamientos,
    galpon: galpones,
    contacto: contactos
});
}
function logout(){
    firebase.auth().signOut()
        .then(()=>{
            console.log("Chao");
        })
        .catch();
}
