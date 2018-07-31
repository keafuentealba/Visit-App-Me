window.onload = () => {
    firebase.database().ref('residentes')
        .limitToLast(5) //Filtro de mensajes cuando se cargan los datos
        .on('child_added', (residentes)=>{ //Para escuchar datos más veces o doblegados
            let contenedor = document.getElementById('contendorResidentes');
            contenedor.innerHTML += `
                <p>${residentes.val().visitante}</p>
                <img style="width: 200px" src="${residentes.val().imgurl}">
                </img>
            `;
        });
}


function htmlresidentes() {
        location = '../registroIf.html';
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
function logout(){
    
  firebase.auth().signOut()
    .then(()=>{
    location = '../login.html';
      })
    .catch();
    
}



let video;
let canvas;
let link;
let imgURL;
let linkimg;
function tomarfoto() {
    video =  document.getElementById('video');
    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            canvas = document.getElementById('canvas');

            const contexto = canvas.getContext('2d'); // contexto de dibujo en el lienzo
            const btndonwload = document.getElementById('snap');
            setInterval(function() {
                 contexto.drawImage(this.video, 0, 0); //Coloco la imagen en el lienzo y especifico el ancho y el alto de la imagen
            },1000 / 30)

            btndonwload.addEventListener('click', function() {
                imgURL = canvas.toDataURL('image/png');
                linkimg = imgURL;
                const link =  document.getElementById('download-link');
                link.href= imgURL;
            })
        }, function(e) {
            console.log(e);
           
        })
    }else{
        alert(' tu navegador debe ser muy antiguo')
    }
}






function  guardarResidentes(){
    //  let email = Email.value;
     let empresas = inputState.value;
     let nombreyapellido = exampleInputNombre.value;
     let patentes = patente.value;
     let estacionamientos = estacionamiento.value;
     let galpones = galpon.value;
     let contactos = contacto.value;
     let urlimg = linkimg;
// current user para ver los datos del usuario conectado
const currentUser = firebase.auth().currentUser;

//Para tener una nueva llave en la colección messages
const newMessageKey = firebase.database().ref().child('residentes').push().key;

firebase.database().ref(`residentes/${newMessageKey}`).set({
    creator : currentUser.uid,
    visitante : nombreyapellido,
    empresa: empresas,
    patente: patentes,
    estacionamiento: estacionamientos,
    galpon: galpones,
    contacto: contactos,
    imgurl: urlimg
});

}

