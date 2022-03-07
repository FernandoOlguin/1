function calcularCurp(){
    var nombre=document.getElementById("Nombres").value.substring(0,1).toUpperCase();
    var apellido_paterno=document.getElementById("ApPaterno").value.substring(0,1).toUpperCase();
    var apellido_materno=document.getElementById("ApMaterno").value.substring(0,1).toUpperCase();
    var sexo=document.getElementById("Sexo").value;
    var estado=document.getElementById("Estados").value;
    var anio = document.getElementById("fchNacimiento").value.substring(2,4);
    var mes = document.getElementById("fchNacimiento").value.substring(5,7);
    var dia = document.getElementById("fchNacimiento").value.substring(8,10);
    var fecha = anio+mes+dia;
    var AP = document.getElementById("ApPaterno").value.slice(1).replace(/[AEIOU]/gi, "").charAt(0).toUpperCase();
    var AM = document.getElementById("ApMaterno").value.slice(1).replace(/[AEIOU]/gi, "").charAt(0).toUpperCase();
    var NS = document.getElementById("Nombres").value.slice(1).replace(/[AEIOU]/gi, "").charAt(0).toUpperCase();
    var APC = document.getElementById("ApPaterno").value.trim().substring(1).replace(/[BCDFGHJKLMNÑPQRSTVWXYZ]/gi, '').substring(0, 1).toUpperCase();
    var Malas_Pala = apellido_paterno+APC+apellido_materno+nombre;
    Malas_Pala=filtraInconvenientes(Malas_Pala)
    var curp_1 = Malas_Pala+fecha+sexo+estado+AP+AM+NS;
    var curp =agregaDigitoVerificador(curp_1)
    //var curp = Malas_Pala+fecha+sexo+estado+AP+AM+NS;
    //document.write("<h1>"+curp+"</h1>");

    
    alert(curp);
    //document.getElementById('resultado').value=nombre;
  }
  
  
  function filtraInconvenientes(str) {
    var inconvenientes = [ 'BACA', 'LOCO', 'BUEI', 'BUEY', 'MAME', 'CACA', 'MAMO',
      'CACO', 'MEAR', 'CAGA', 'MEAS', 'CAGO', 'MEON', 'CAKA', 'MIAR', 'CAKO', 'MION',
      'COGE', 'MOCO', 'COGI', 'MOKO', 'COJA', 'MULA', 'COJE', 'MULO', 'COJI', 'NACA',
      'COJO', 'NACO', 'COLA', 'PEDA', 'CULO', 'PEDO', 'FALO', 'PENE', 'FETO', 'PIPI',
      'GETA', 'PITO', 'GUEI', 'POPO', 'GUEY', 'PUTA', 'JETA', 'PUTO', 'JOTO', 'QULO',
      'KACA', 'RATA', 'KACO', 'ROBA', 'KAGA', 'ROBE', 'KAGO', 'ROBO', 'KAKA', 'RUIN',
      'KAKO', 'SENO', 'KOGE', 'TETA', 'KOGI', 'VACA', 'KOJA', 'VAGA', 'KOJE', 'VAGO',
      'KOJI', 'VAKA', 'KOJO', 'VUEI', 'KOLA', 'VUEY', 'KULO', 'WUEI', 'LILO', 'WUEY',
      'LOCA' ];

    if (inconvenientes.indexOf(str) > -1) {
      str = str.replace(/^(\w)\w/, '$1X');
    }

    return str;
  }


  function agregaDigitoVerificador(curp_str) {
    var curp, caracteres, curpNumerico, suma, digito;

    // Convierte el CURP en un arreglo
    curp = curp_str.substring(0, 17).toUpperCase().split('');
    caracteres  = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E',
      'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
      'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    // Convierte el curp a un arreglo de números, usando la posición de cada
    // carácter, dentro del arreglo `caracteres`.
    curpNumerico = curp.map(function (caracter) {
      return caracteres.indexOf(caracter);
    });

    suma = curpNumerico.reduce(function (prev, valor, indice) {
      return prev + (valor * (18 - indice));
    }, 0);

    digito = (10 - (suma % 10));

    if (digito === 10) {
      digito = 0;
    }

    return curp_str + digito;
  }