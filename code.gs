const SHEET_ID = "1mxDmEk9HV91_I-slNrQcgDPp90ltXMi9TTXbh39UPCM";

function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    .evaluate()
    .setTitle('LabSystem - Gestión de Pacientes')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no') // <--- ESTA ES LA LÍNEA QUE ACTIVA EL MODO APP
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(nombreArchivo){
  return HtmlService
    .createHtmlOutputFromFile(nombreArchivo)
    .getContent();
}

////////////// Usuario actual (saludo personalizado) //////////////
const ADMIN_EMAIL = "gtaminezr@gmail.com";

function getUsuarioActual() {
  var email = "";
  try { email = (Session.getActiveUser().getEmail() || "").toLowerCase(); } catch (e) {}

  var nombre = "";

  // 1) Nombre real desde la cuenta de Google (requiere habilitar la "People API")
  try {
    var me = People.People.get("people/me", { personFields: "names" });
    if (me && me.names && me.names.length) {
      var n = me.names[0];
      nombre = n.displayName || ((n.givenName || "") + " " + (n.familyName || "")).trim();
    }
  } catch (e) {}

  // 2) Fallback: usar la parte antes del @ del correo
  if (!nombre && email) {
    nombre = email.split("@")[0];
  }

  return {
    email: email,
    nombre: nombre || "Usuario",
    esAdmin: (email === ADMIN_EMAIL)
  };
}

// Función de diagnóstico: ejecútala desde el editor y revisa "Registro de ejecución"
function probarUsuario() {
  Logger.log("Resultado final: " + JSON.stringify(getUsuarioActual()));

  try {
    Logger.log("Correo: " + Session.getActiveUser().getEmail());
  } catch (e) {
    Logger.log("Error correo: " + e);
  }

  try {
    var me = People.People.get("people/me", { personFields: "names" });
    Logger.log("People OK -> names: " + JSON.stringify(me.names));
  } catch (e) {
    Logger.log("People ERROR: " + e);
  }
}

////////////// Obtener Listas Desplegables Dinámicas //////////////
function obtenerListasDesplegables() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaEjecutivos = spreadsheet.getSheetByName("Ejecutivos");
    const hojaExamenes = spreadsheet.getSheetByName("Examenes");
    const hojaMedicos = spreadsheet.getSheetByName("Medicos");
    const hojaSeguros = spreadsheet.getSheetByName("Seguros");

    let ejecutivos = [];
    let ejecutivosConPin = [];

    if (hojaEjecutivos && hojaEjecutivos.getLastRow() >= 2) {
      let dataEjec = hojaEjecutivos.getRange(2, 1, hojaEjecutivos.getLastRow() - 1, 6).getValues();
      // El desplegable "Ejecutivo que registra" excluye a los Supervisores
      ejecutivos = dataEjec
        .filter(fila => fila[0].toString().trim() !== "" && (fila[5] ? fila[5].toString().trim() : "") !== "Supervisor")
        .map(fila => fila[0].toString().trim());
      ejecutivosConPin = dataEjec.filter(fila => fila[0].toString().trim() !== "").map(fila => {
        let fechaEjec = "—";
        if (fila[3]) {
          fechaEjec = fila[3] instanceof Date
            ? Utilities.formatDate(fila[3], Session.getScriptTimeZone(), "dd/MM/yyyy")
            : fila[3].toString().trim();
        }
        return { nombre: fila[0].toString().trim(), pin: fila[1] ? fila[1].toString().trim() : "", tipoRegistro: fila[2] ? fila[2].toString().trim() : "", fechaRegistro: fechaEjec, rol: fila[5] ? fila[5].toString().trim() : "Ejecutivo" };
      });
    }

    let examenes = hojaExamenes && hojaExamenes.getLastRow() >= 2 ? hojaExamenes.getRange(2, 1, hojaExamenes.getLastRow() - 1, 1).getValues().flat().filter(String) : [];
    let seguros = hojaSeguros && hojaSeguros.getLastRow() >= 2 ? hojaSeguros.getRange(2, 1, hojaSeguros.getLastRow() - 1, 1).getValues().flat().filter(String) : ["MAPFRE", "RIMAC", "LA POSITIVA", "PARTICULAR", "VIP"];

    let medicos = [];
    if (hojaMedicos && hojaMedicos.getLastRow() >= 2) {
      medicos = hojaMedicos.getRange(2, 1, hojaMedicos.getLastRow() - 1, 8).getValues()
      .filter(fila => fila[0].toString().trim() !== "")
      .map(fila => {
        let fecha = "—";
        if (fila[2]) {
          fecha = fila[2] instanceof Date
            ? Utilities.formatDate(fila[2], Session.getScriptTimeZone(), "dd/MM/yyyy")
            : fila[2].toString().trim();
        }
        // Fecha de Nacimiento (col H) en formato yyyy-MM-dd para el selector de fecha
        let fechaNacISO = "";
        if (fila[7]) {
          fechaNacISO = fila[7] instanceof Date
            ? Utilities.formatDate(fila[7], Session.getScriptTimeZone(), "yyyy-MM-dd")
            : fila[7].toString().trim();
        }
        // La edad se recalcula sola desde la fecha de nacimiento (si existe)
        let edadCalc = calcularEdad(fila[7]);
        let edadFinal = edadCalc !== "" ? edadCalc : (fila[6] ? fila[6].toString().trim() : "—");
        return {
          nombre: fila[0].toString().trim(),
          especialidad: fila[1] ? fila[1].toString().trim() : "General",
          fechaRegistro: fecha,
          cmp: fila[3] ? fila[3].toString().trim() : "—",
          rne: fila[4] ? fila[4].toString().trim() : "—",
          nacionalidad: fila[5] ? fila[5].toString().trim() : "—",
          edad: edadFinal,
          fechaNacimiento: fechaNacISO
        };
      });
    }

    return {
      ejecutivos: ejecutivos,
      ejecutivosConPin: ejecutivosConPin,
      examenes: examenes,
      seguros: seguros,
      medicos: medicos
    };
  } catch (error) {
    Logger.log("Error en obtenerListasDesplegables: " + error.toString());
    return { ejecutivos: [], ejecutivosConPin: [], examenes: [], seguros: [], medicos: [] };
  }
}

////////////// Guardar o Modificar Paciente //////////////
function guardarPaciente(datos){
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const hojaPacientes = spreadsheet.getSheetByName("Pacientes");

  let idPaciente;
  let examenesUnificados = "";
  if (datos.listaExamenes && Array.isArray(datos.listaExamenes)) {
    examenesUnificados = datos.listaExamenes.join(", ");
  } else if (typeof datos.listaExamenes === "string") {
    examenesUnificados = datos.listaExamenes;
  }

  let estadoNormalizado = datos.estado;
  if (estadoNormalizado === "Resultados") estadoNormalizado = "Completado";

  // ESCENARIO A: MODIFICAR PACIENTE EXISTENTE
  if (datos.esEdicion && datos.dniOriginal) {
    const totalFilas = hojaPacientes.getLastRow();
    if(totalFilas >= 2) {
      const rangoID = hojaPacientes.getRange(1, 1, totalFilas, 1).getValues();
      const rangoDNI = hojaPacientes.getRange(1, 4, totalFilas, 1).getValues();

      let filaEncontrada = -1;
      for (let i = 1; i < rangoID.length; i++) {
        if (rangoID[i][0].toString().trim() === datos.dniOriginal.toString().trim()) {
          filaEncontrada = i + 1;
          break;
        }
        if (rangoDNI[i][0].toString().trim() === datos.dniOriginal.toString().trim()) {
          filaEncontrada = i + 1;
          break;
        }
      }

      if (filaEncontrada !== -1) {
        idPaciente = hojaPacientes.getRange(filaEncontrada, 1).getValue();
        hojaPacientes.getRange(filaEncontrada, 3).setValue(datos.nombre);
        hojaPacientes.getRange(filaEncontrada, 4).setValue(datos.dni);
        hojaPacientes.getRange(filaEncontrada, 5).setValue(datos.edad);
        hojaPacientes.getRange(filaEncontrada, 6).setValue(datos.telefono);
        hojaPacientes.getRange(filaEncontrada, 7).setValue(datos.caso);
        hojaPacientes.getRange(filaEncontrada, 8).setValue(datos.ejecutivo);
        hojaPacientes.getRange(filaEncontrada, 9).setValue(examenesUnificados);
        hojaPacientes.getRange(filaEncontrada, 10).setValue(datos.observaciones);
        hojaPacientes.getRange(filaEncontrada, 11).setValue(datos.seguro);
        hojaPacientes.getRange(filaEncontrada, 12).setValue(datos.medico);
        hojaPacientes.getRange(filaEncontrada, 13).setValue(datos.vencimiento);
        hojaPacientes.getRange(filaEncontrada, 14).setValue(estadoNormalizado);
        hojaPacientes.getRange(filaEncontrada, 15).setValue(datos.precioTotal);
        hojaPacientes.getRange(filaEncontrada, 16).setValue(datos.subEstado || "");
        hojaPacientes.getRange(filaEncontrada, 17).setValue(datos.medicoLector || "");
        hojaPacientes.getRange(filaEncontrada, 18).setValue(datos.especialidad || "");
        hojaPacientes.getRange(filaEncontrada, 19).setValue(datos.fechaCierre || "");
        hojaPacientes.getRange(filaEncontrada, 20).setValue(datos.ejecutivoCierre || "");
        return "Información del paciente actualizada correctamente";
      }
    }
    datos.esEdicion = false;
  }

  // ESCENARIO B: CREAR NUEVO PACIENTE
  if (!datos.esEdicion) {
    idPaciente = new Date().getTime();
    hojaPacientes.appendRow([
      idPaciente,                       // A: ID
      new Date(),                       // B: Fecha de creación
      datos.nombre,                     // C: Nombre
      datos.dni,                        // D: DNI
      datos.edad,                       // E: Edad
      datos.telefono,                   // F: Telefono
      datos.caso,                       // G: Caso
      datos.ejecutivo,                  // H: Ejecutivo
      examenesUnificados,               // I: Exámenes juntos
      datos.observaciones,              // J: Observaciones
      datos.seguro,                     // K: Tipo de Seguro
      datos.medico,                     // L: Medico Ordena
      datos.vencimiento,                // M: Vencimiento
      estadoNormalizado || "Pendiente", // N: Estado
      datos.precioTotal,                // O: Precio Total
      datos.subEstado || "",            // P: Sub-Estado
      datos.medicoLector || "",         // Q: Medico Lector
      datos.especialidad || "",         // R: Especialidad
      datos.fechaCierre || "",          // S: Fecha Cierre
      datos.ejecutivoCierre || ""       // T: Ejecutivo Cierre
    ]);
    return "Paciente y exámenes guardados correctamente";
  }
}

////////////// Obtener Lista General de Pacientes //////////////
function obtenerPacientes(){
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hoja = spreadsheet.getSheetByName("Pacientes");

    if (!hoja) return [];
    const ultimaFila = hoja.getLastRow();
    if (ultimaFila < 2) return [];
    const datos = hoja.getDataRange().getValues();
    datos.shift();

    const pacientesEstructurados = datos.map(fila => {
      let fechaVencimiento = "";
      if (fila[12] instanceof Date) {
        fechaVencimiento = Utilities.formatDate(fila[12], Session.getScriptTimeZone(), "yyyy-MM-dd");
      } else {
        fechaVencimiento = fila[12] ? fila[12].toString() : "";
      }

      let listaExams = [];
      if (fila[8]) {
        listaExams = fila[8].toString().split(",").map(e => e.trim()).filter(String);
      }

      let estadoLeido = fila[13] || "Pendiente";
      if (estadoLeido === "Resultados") estadoLeido = "Completado";

      return {
        id: fila[0],
        fechaCreacion: fila[1] instanceof Date ? Utilities.formatDate(fila[1], Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : fila[1],
        nombre: fila[2],
        dni: fila[3],
        edad: fila[4],
        telefono: fila[5],
        caso: fila[6],
        ejecutivo: fila[7],
        listaExamenes: listaExams,
        observaciones: fila[9],
        seguro: fila[10],
        medico: fila[11],
        vencimiento: fechaVencimiento,
        estado: estadoLeido,
        precioTotal: fila[14] || 0,
        subEstado: fila[15] || "",
        medicoLector: fila[16] || "",
        especialidad: fila[17] || "",  // CORREGIDO: faltaba leer esta columna
        fechaCierre: fila[18] || "",
        ejecutivoCierre: fila[19] || "",
      };
    });

    return pacientesEstructurados;
  } catch(error) {
    Logger.log("Error en obtenerPacientes: " + error.toString());
    return [];
  }
}

function eliminarPaciente(idODni, usuario, pin, motivo) {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // ── 1) Validar PIN del usuario que tiene la sesión abierta ────────────────
  const nombreUsuario = (usuario || '').toString().trim();
  const pinIngresado  = (pin || '').toString().trim();
  if (!nombreUsuario || !pinIngresado) {
    throw new Error('Se requiere PIN de verificación para eliminar.');
  }
  const hojaEjec = ss.getSheetByName('Ejecutivos');
  let pinCorrecto = null;
  let rolUsuario = '';
  if (hojaEjec && hojaEjec.getLastRow() >= 2) {
    const dataEjec = hojaEjec.getRange(2, 1, hojaEjec.getLastRow() - 1, 6).getValues();
    for (let i = 0; i < dataEjec.length; i++) {
      if (dataEjec[i][0].toString().trim() === nombreUsuario) {
        pinCorrecto = dataEjec[i][1] ? dataEjec[i][1].toString().trim() : '';
        rolUsuario  = dataEjec[i][5] ? dataEjec[i][5].toString().trim() : 'Ejecutivo';
        break;
      }
    }
  }
  if (pinCorrecto === null) {
    throw new Error('Usuario no encontrado para validar el PIN.');
  }
  if (pinIngresado !== pinCorrecto) {
    throw new Error('PIN incorrecto. No se eliminó el registro.');
  }

  // ── 2) Ubicar el paciente y capturar sus datos antes de borrar ────────────
  const hoja = ss.getSheetByName('Pacientes');
  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0].toString() === idODni.toString() || datos[i][3].toString() === idODni.toString()) {
      const dniPac    = datos[i][3] ? datos[i][3].toString().trim() : '';
      const nombrePac = datos[i][2] ? datos[i][2].toString().trim() : '';
      const estadoPac = datos[i][13] ? datos[i][13].toString().trim() : '';

      // ── 3) Registrar la eliminación en la bitácora ANTES de borrar ────────
      _registrarEliminacion({
        dni: dniPac,
        nombre: nombrePac,
        estado: estadoPac,
        usuario: nombreUsuario,
        rol: rolUsuario,
        motivo: (motivo || '').toString().trim()
      });

      hoja.deleteRow(i + 1);
      return true;
    }
  }
  throw new Error('Paciente no encontrado.');
}

// Escribe una fila en la hoja "RegistroEliminaciones" (la crea si no existe).
function _registrarEliminacion(info) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let hojaLog = ss.getSheetByName('RegistroEliminaciones');
    if (!hojaLog) {
      hojaLog = ss.insertSheet('RegistroEliminaciones');
      hojaLog.appendRow(['Fecha/Hora', 'DNI', 'Nombre Paciente', 'Estado', 'Eliminado por', 'Rol', 'Motivo']);
      hojaLog.getRange(1, 1, 1, 7).setFontWeight('bold');
      hojaLog.setFrozenRows(1);
    }
    const fechaHora = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    hojaLog.appendRow([
      fechaHora,
      info.dni || '',
      info.nombre || '',
      info.estado || '',
      info.usuario || '',
      info.rol || '',
      info.motivo || ''
    ]);
  } catch (e) {
    Logger.log('Error en _registrarEliminacion: ' + e.toString());
    // No interrumpimos la eliminación si falla el log, pero queda en Logger.
  }
}

function generarReporteMedico(nombreMedico, mes, anio) {
  var datos = obtenerPacientes().filter(function(p) {
    var fecha = new Date(p.fechaCreacion);
    return (p.medico || '').trim() === nombreMedico &&
           fecha.getMonth() === mes &&
           fecha.getFullYear() === anio;
  });
  return crearExcelTemporal(datos);
}

function crearExcelTemporal(datos) {
  var ss = SpreadsheetApp.create("Reporte_" + new Date().getTime());
  var hoja = ss.getActiveSheet();
  var url = ss.getUrl();
  return url;
}

// Guardar un paciente programado en hoja separada
function guardarPacienteProgramado(datos) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let hoja = ss.getSheetByName("ProgramacionExamenes");
    if (!hoja) {
      hoja = ss.insertSheet("ProgramacionExamenes");
      hoja.appendRow([
        "ID","FechaProgramada","Nombre","DNI","Edad","Telefono",
        "Caso","Ejecutivo","Examenes","Observaciones","Seguro",
        "Medico","Vencimiento","Estado","PrecioTotal","SubEstado",
        "MedicoLector","Especialidad","FechaCierre","EjecutivoCierre"
      ]);
    }

    let examenesUnificados = "";
    if (datos.listaExamenes && Array.isArray(datos.listaExamenes)) {
      examenesUnificados = datos.listaExamenes.join(", ");
    }

    const idPaciente = new Date().getTime();
    hoja.appendRow([
      idPaciente,
      datos.fechaProgramada,
      datos.nombre,
      datos.dni,
      datos.edad,
      datos.telefono,
      datos.caso,
      datos.ejecutivo,
      examenesUnificados,
      datos.observaciones,
      datos.seguro,
      datos.medico,
      datos.vencimiento,
      "Programado",
      datos.precioTotal,
      datos.subEstado || "",
      datos.medicoLector || "",
      datos.especialidad || "",
      "",
      datos.ejecutivoCierre || ""
    ]);
    return "Paciente programado correctamente";
  } catch(e) {
    Logger.log("Error guardarPacienteProgramado: " + e);
    throw new Error("No se pudo guardar la programación");
  }
}

// Actualizar una programación existente (identificada por su ID)
function actualizarPacienteProgramado(datos) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("ProgramacionExamenes");
    if (!hoja || hoja.getLastRow() < 2) {
      throw new Error("No hay programaciones registradas.");
    }
    const idBuscado = (datos.id || "").toString().trim();
    if (!idBuscado) throw new Error("Falta el identificador de la programación.");

    const rangoId = hoja.getRange(2, 1, hoja.getLastRow() - 1, 1).getValues();
    let fila = -1;
    for (let i = 0; i < rangoId.length; i++) {
      if (rangoId[i][0].toString().trim() === idBuscado) { fila = i + 2; break; }
    }
    if (fila === -1) throw new Error("No se encontró la programación a actualizar.");

    let examenesUnificados = "";
    if (datos.listaExamenes && Array.isArray(datos.listaExamenes)) {
      examenesUnificados = datos.listaExamenes.join(", ");
    }

    // Conserva la columna A (ID) y reescribe el resto de campos
    hoja.getRange(fila, 2).setValue(datos.fechaProgramada);
    hoja.getRange(fila, 3).setValue(datos.nombre);
    hoja.getRange(fila, 4).setValue(datos.dni);
    hoja.getRange(fila, 5).setValue(datos.edad);
    hoja.getRange(fila, 6).setValue(datos.telefono);
    hoja.getRange(fila, 7).setValue(datos.caso);
    hoja.getRange(fila, 8).setValue(datos.ejecutivo);
    hoja.getRange(fila, 9).setValue(examenesUnificados);
    hoja.getRange(fila, 10).setValue(datos.observaciones);
    hoja.getRange(fila, 11).setValue(datos.seguro);
    hoja.getRange(fila, 12).setValue(datos.medico);
    hoja.getRange(fila, 13).setValue(datos.vencimiento);
    hoja.getRange(fila, 15).setValue(datos.precioTotal);
    hoja.getRange(fila, 18).setValue(datos.especialidad || "");
    return "Programación actualizada correctamente";
  } catch(e) {
    Logger.log("Error actualizarPacienteProgramado: " + e);
    throw new Error("No se pudo actualizar la programación");
  }
}

// Obtener todos los pacientes programados para el calendario
function obtenerPacientesProgramados() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("ProgramacionExamenes");
    if (!hoja || hoja.getLastRow() < 2) return [];

    const datos = hoja.getDataRange().getValues();
    datos.shift();

    return datos.map(fila => ({
      id: fila[0],
      fechaProgramada: fila[1] instanceof Date
        ? Utilities.formatDate(fila[1], Session.getScriptTimeZone(), "yyyy-MM-dd")
        : fila[1].toString(),
      nombre: fila[2],
      dni: fila[3],
      edad: fila[4],
      telefono: fila[5],
      caso: fila[6],
      ejecutivo: fila[7],
      listaExamenes: fila[8] ? fila[8].toString().split(",").map(e => e.trim()).filter(String) : [],
      observaciones: fila[9],
      seguro: fila[10],
      medico: fila[11],
      vencimiento: fila[12] instanceof Date
        ? Utilities.formatDate(fila[12], Session.getScriptTimeZone(), "yyyy-MM-dd")
        : fila[12].toString(),
      estado: "Programado",
      precioTotal: fila[14] || 0,
      subEstado: fila[15] || "",
      medicoLector: fila[16] || "",
      especialidad: fila[17] || "",
      ejecutivoCierre: fila[19] || ""
    }));
  } catch(e) {
    Logger.log("Error obtenerPacientesProgramados: " + e);
    return [];
  }
}

// Mover programaciones cuya fecha ya llegó a Pacientes y eliminarlas de ProgramacionExamenes
function moverProgramacionesVencidas() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hojaOrigen = ss.getSheetByName("ProgramacionExamenes");
    const hojaDestino = ss.getSheetByName("Pacientes");
    if (!hojaOrigen || hojaOrigen.getLastRow() < 2) return 0;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const datos = hojaOrigen.getDataRange().getValues();
    let filasAEliminar = [];

    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      let fechaProg = fila[1];

      if (typeof fechaProg === "string") {
        fechaProg = new Date(fechaProg + "T00:00:00");
      }
      if (!(fechaProg instanceof Date) || isNaN(fechaProg)) continue;
      fechaProg.setHours(0, 0, 0, 0);

      if (fechaProg <= hoy) {
        hojaDestino.appendRow([
          fila[0],       // ID
          new Date(),    // Fecha creación = hoy
          fila[2],       // Nombre
          fila[3],       // DNI
          fila[4],       // Edad
          fila[5],       // Telefono
          fila[6],       // Caso
          fila[7],       // Ejecutivo
          fila[8],       // Examenes
          fila[9],       // Observaciones
          fila[10],      // Seguro
          fila[11],      // Medico
          fila[12],      // Vencimiento
          "Pendiente",   // Estado
          fila[14],      // PrecioTotal
          "",            // SubEstado
          fila[16],      // MedicoLector
          fila[17],      // Especialidad
          "",            // FechaCierre
          fila[19]       // EjecutivoCierre
        ]);
        filasAEliminar.push(i + 1);
      }
    }

    for (let i = filasAEliminar.length - 1; i >= 0; i--) {
      hojaOrigen.deleteRow(filasAEliminar[i]);
    }

    return filasAEliminar.length;
  } catch(e) {
    Logger.log("Error moverProgramacionesVencidas: " + e);
    return 0;
  }
}

////////////// REGISTRO DE PERSONAL //////////////
function obtenerPersonal() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let hoja = ss.getSheetByName("Personal");
    if (!hoja || hoja.getLastRow() < 2) return [];
    const datos = hoja.getDataRange().getValues();
    datos.shift();
    return datos.map(fila => ({
      id:     fila[0] ? fila[0].toString() : "",
      nombre: fila[1] || "",
      dni:    fila[2] || "",
      cargo:  fila[3] || "",
      area:   fila[4] || "",
      estado: fila[5] || "Activo"
    }));
  } catch(e) {
    Logger.log("Error obtenerPersonal: " + e);
    return [];
  }
}

function guardarPersonal(datos) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let hoja = ss.getSheetByName("Personal");
    if (!hoja) {
      hoja = ss.insertSheet("Personal");
      hoja.appendRow(["ID", "Nombre", "DNI", "Cargo", "Area", "Estado", "FechaRegistro"]);
    }
    const id = new Date().getTime().toString();
    hoja.appendRow([id, datos.nombre, datos.dni, datos.cargo, datos.area, datos.estado, new Date()]);
    return "Personal guardado correctamente";
  } catch(e) {
    Logger.log("Error guardarPersonal: " + e);
    throw new Error("No se pudo guardar el personal");
  }
}

function eliminarPersonal(id) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("Personal");
    if (!hoja) throw new Error("Hoja Personal no encontrada");
    const datos = hoja.getDataRange().getValues();
    for (let i = 1; i < datos.length; i++) {
      if (datos[i][0].toString() === id.toString()) {
        hoja.deleteRow(i + 1);
        return true;
      }
    }
    throw new Error("Registro no encontrado");
  } catch(e) {
    Logger.log("Error eliminarPersonal: " + e);
    throw new Error(e.message || "No se pudo eliminar");
  }
}

function obtenerConteoEjecutivos() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("Ejecutivos");
    if (!hoja || hoja.getLastRow() < 2) return 0;
    return hoja.getLastRow() - 1;
  } catch(e) {
    Logger.log("Error obtenerConteoEjecutivos: " + e);
    return 0;
  }
}

function obtenerConteoMedicos() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("Medicos");
    if (!hoja || hoja.getLastRow() < 2) return { generales: 0, pediatras: 0, total: 0 };
    const datos = hoja.getRange(2, 1, hoja.getLastRow() - 1, 2).getValues();
    let generales = 0, pediatras = 0;
    datos.forEach(function(fila) {
      const esp = (fila[1] || "").toString().trim().toLowerCase();
      if (esp === "medico general") generales++;
      else if (esp === "medico pediatra") pediatras++;
    });
    return { generales: generales, pediatras: pediatras, total: generales + pediatras };
  } catch(e) {
    Logger.log("Error obtenerConteoMedicos: " + e);
    return { generales: 0, pediatras: 0, total: 0 };
  }
}

////////////// Generar Usuario Automático //////////////
function _generarUsuario_(nombre, hoja) {
  var partes = nombre.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z\s]/g, "").trim().split(/\s+/);
  if (partes.length === 0 || !partes[0]) return "";
  if (partes.length === 1) return partes[0];
  var apellido = partes[partes.length - 1];
  var prefijo  = partes.slice(0, -1).map(function(p){ return p[0]; }).join('');
  var base     = prefijo + apellido;
  var existentes = [];
  var lastRow = hoja.getLastRow();
  if (lastRow >= 2) {
    existentes = hoja.getRange(2, 5, lastRow - 1, 1).getValues()
      .map(function(r){ return r[0].toString().trim().toLowerCase(); })
      .filter(function(v){ return v !== ""; });
  }
  if (existentes.indexOf(base) === -1) return base;
  var i = 2;
  while (existentes.indexOf(base + i) !== -1) i++;
  return base + i;
}

////////////// Registrar Nuevo Ejecutivo //////////////
function registrarEjecutivo(datos) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaEjecutivos = spreadsheet.getSheetByName("Ejecutivos");
    if (!hojaEjecutivos) throw new Error('No se encontró la hoja "Ejecutivos".');

    const nombre = (datos.nombre || "").toString().trim();
    const pin    = (datos.pin    || "").toString().trim();
    const tipo   = (datos.tipo   || "Ejecutivo").toString().trim();
    if (!nombre) throw new Error("El nombre del ejecutivo es obligatorio.");
    if (!pin)    throw new Error("El PIN de seguridad es obligatorio.");

    // Fecha de registro automática
    const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy");

    // Generar usuario automáticamente: inicial(es) + apellido completo
    const usuario = _generarUsuario_(nombre, hojaEjecutivos);

    // Columnas: A=Nombre, B=PIN, C=legacy, D=Fecha, E=Usuario, F=Rol
    hojaEjecutivos.appendRow([nombre, pin, "", fecha, usuario, tipo]);

    return "Ejecutivo registrado correctamente.";
  } catch (error) {
    Logger.log("Error en registrarEjecutivo: " + error.toString());
    throw new Error(error.message || "No se pudo registrar el ejecutivo.");
  }
}

////////////// Editar Ejecutivo //////////////
function editarEjecutivo(datos) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaEjecutivos = spreadsheet.getSheetByName("Ejecutivos");
    if (!hojaEjecutivos) throw new Error('No se encontró la hoja "Ejecutivos".');

    const nombreOriginal = (datos.nombreOriginal || "").toString().trim();
    const nombre = (datos.nombre || "").toString().trim();
    const pin = (datos.pin || "").toString().trim();
    const tipo = (datos.tipo || "Ejecutivo").toString().trim();
    const puedeCambiarPin = datos.puedeCambiarPin === true || datos.puedeCambiarPin === "true";
    if (!nombreOriginal) throw new Error("No se identificó al ejecutivo a editar.");
    if (!nombre) throw new Error("El nombre del ejecutivo es obligatorio.");
    if (puedeCambiarPin && !pin) throw new Error("El PIN de seguridad es obligatorio.");
    if (!tipo) throw new Error("El tipo de registro es obligatorio.");

    const ultimaFila = hojaEjecutivos.getLastRow();
    if (ultimaFila < 2) throw new Error("No hay ejecutivos registrados.");

    const nombres = hojaEjecutivos.getRange(2, 1, ultimaFila - 1, 1).getValues();
    for (let i = 0; i < nombres.length; i++) {
      if (nombres[i][0].toString().trim() === nombreOriginal) {
        const fila = i + 2;
        hojaEjecutivos.getRange(fila, 1).setValue(nombre); // A: Nombre
        if (puedeCambiarPin) {
          hojaEjecutivos.getRange(fila, 2).setValue(pin);  // B: PIN
        }
        hojaEjecutivos.getRange(fila, 6).setValue(tipo);   // F: Rol
        return "Ejecutivo actualizado correctamente.";
      }
    }
    throw new Error("No se encontró al ejecutivo.");
  } catch (error) {
    Logger.log("Error en editarEjecutivo: " + error.toString());
    throw new Error(error.message || "No se pudo editar el ejecutivo.");
  }
}

////////////// Eliminar Ejecutivo //////////////
function eliminarEjecutivo(nombre) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaEjecutivos = spreadsheet.getSheetByName("Ejecutivos");
    if (!hojaEjecutivos) throw new Error('No se encontró la hoja "Ejecutivos".');

    const objetivo = (nombre || "").toString().trim();
    if (!objetivo) throw new Error("No se identificó al ejecutivo a eliminar.");

    const ultimaFila = hojaEjecutivos.getLastRow();
    if (ultimaFila < 2) throw new Error("No hay ejecutivos registrados.");

    const nombres = hojaEjecutivos.getRange(2, 1, ultimaFila - 1, 1).getValues();
    for (let i = 0; i < nombres.length; i++) {
      if (nombres[i][0].toString().trim() === objetivo) {
        hojaEjecutivos.deleteRow(i + 2);
        return "Ejecutivo eliminado correctamente.";
      }
    }
    throw new Error("No se encontró al ejecutivo.");
  } catch (error) {
    Logger.log("Error en eliminarEjecutivo: " + error.toString());
    throw new Error(error.message || "No se pudo eliminar el ejecutivo.");
  }
}

////////////// Calcular edad desde fecha de nacimiento //////////////
function calcularEdad(fechaNac) {
  if (!fechaNac) return "";
  var fn;
  if (fechaNac instanceof Date) {
    fn = fechaNac;
  } else {
    var s = fechaNac.toString().trim();
    if (!s) return "";
    fn = new Date(s.length === 10 ? s + "T00:00:00" : s);
  }
  if (!(fn instanceof Date) || isNaN(fn.getTime())) return "";
  var hoy = new Date();
  var edad = hoy.getFullYear() - fn.getFullYear();
  var m = hoy.getMonth() - fn.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) edad--;
  return edad < 0 ? "" : edad;
}

////////////// Registrar Nuevo Médico //////////////
function registrarMedico(datos) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaMedicos = spreadsheet.getSheetByName("Medicos");
    if (!hojaMedicos) throw new Error('No se encontró la hoja "Medicos".');

    const nombre = (datos.nombre || "").toString().trim();
    if (!nombre) throw new Error("El nombre del médico es obligatorio.");

    // Fecha de registro automática
    const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy");

    // Fecha de nacimiento y edad calculada automáticamente desde ella
    const fechaNac = (datos.fechaNacimiento || "").toString().trim();
    const edad = fechaNac ? calcularEdad(fechaNac) : (datos.edad || "").toString().trim();

    // Columnas: A=Nombre, B=Especialidad, C=Fecha, D=CMP, E=RNE/RNA, F=Nacionalidad, G=Edad, H=Fecha de Nacimiento
    hojaMedicos.appendRow([
      nombre,
      (datos.especialidad || "General").toString().trim(),
      fecha,
      (datos.cmp || "").toString().trim(),
      (datos.rne || "").toString().trim(),
      (datos.nacionalidad || "").toString().trim(),
      edad,
      fechaNac
    ]);

    return "Médico registrado correctamente.";
  } catch (error) {
    Logger.log("Error en registrarMedico: " + error.toString());
    throw new Error(error.message || "No se pudo registrar el médico.");
  }
}

////////////// Editar Médico //////////////
function editarMedico(datos) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaMedicos = spreadsheet.getSheetByName("Medicos");
    if (!hojaMedicos) throw new Error('No se encontró la hoja "Medicos".');

    const nombreOriginal = (datos.nombreOriginal || "").toString().trim();
    const nombre = (datos.nombre || "").toString().trim();
    if (!nombreOriginal) throw new Error("No se identificó al médico a editar.");
    if (!nombre) throw new Error("El nombre del médico es obligatorio.");

    const ultimaFila = hojaMedicos.getLastRow();
    if (ultimaFila < 2) throw new Error("No hay médicos registrados.");

    const nombres = hojaMedicos.getRange(2, 1, ultimaFila - 1, 1).getValues();
    for (let i = 0; i < nombres.length; i++) {
      if (nombres[i][0].toString().trim() === nombreOriginal) {
        const fila = i + 2;
        const fechaNac = (datos.fechaNacimiento || "").toString().trim();
        const edad = fechaNac ? calcularEdad(fechaNac) : (datos.edad || "").toString().trim();
        // Columnas: A=Nombre, B=Especialidad, C=Fecha (no se toca), D=CMP, E=RNE/RNA, F=Nacionalidad, G=Edad, H=Fecha de Nacimiento
        hojaMedicos.getRange(fila, 1).setValue(nombre);
        hojaMedicos.getRange(fila, 2).setValue((datos.especialidad || "General").toString().trim());
        hojaMedicos.getRange(fila, 4).setValue((datos.cmp || "").toString().trim());
        hojaMedicos.getRange(fila, 5).setValue((datos.rne || "").toString().trim());
        hojaMedicos.getRange(fila, 6).setValue((datos.nacionalidad || "").toString().trim());
        hojaMedicos.getRange(fila, 7).setValue(edad);
        hojaMedicos.getRange(fila, 8).setValue(fechaNac);
        return "Médico actualizado correctamente.";
      }
    }
    throw new Error("No se encontró al médico.");
  } catch (error) {
    Logger.log("Error en editarMedico: " + error.toString());
    throw new Error(error.message || "No se pudo editar el médico.");
  }
}

////////////// Eliminar Médico //////////////
function eliminarMedico(nombre) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const hojaMedicos = spreadsheet.getSheetByName("Medicos");
    if (!hojaMedicos) throw new Error('No se encontró la hoja "Medicos".');

    const objetivo = (nombre || "").toString().trim();
    if (!objetivo) throw new Error("No se identificó al médico a eliminar.");

    const ultimaFila = hojaMedicos.getLastRow();
    if (ultimaFila < 2) throw new Error("No hay médicos registrados.");

    const nombres = hojaMedicos.getRange(2, 1, ultimaFila - 1, 1).getValues();
    for (let i = 0; i < nombres.length; i++) {
      if (nombres[i][0].toString().trim() === objetivo) {
        hojaMedicos.deleteRow(i + 2);
        return "Médico eliminado correctamente.";
      }
    }
    throw new Error("No se encontró al médico.");
  } catch (error) {
    Logger.log("Error en eliminarMedico: " + error.toString());
    throw new Error(error.message || "No se pudo eliminar el médico.");
  }
}

function PRUEBA_medicos() {
  const r = obtenerListasDesplegables();
  Logger.log("Cantidad de médicos: " + r.medicos.length);
  Logger.log(JSON.stringify(r.medicos));
}

////////////// Autenticación de usuarios //////////////
function validarCredenciales(usuario, pin) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("Ejecutivos");
    if (!hoja || hoja.getLastRow() < 2) return { ok: false };

    // Columnas: A=Nombre, B=PIN, C=Tipo, D=Fecha, E=Usuarios, F=Rol, G=ColorTema
    const data = hoja.getRange(2, 1, hoja.getLastRow() - 1, 7).getValues();

    for (var i = 0; i < data.length; i++) {
      var usuarioHoja = (data[i][4] || "").toString().trim();
      var pinHoja     = (data[i][1] || "").toString().trim();
      var nombreHoja  = (data[i][0] || "").toString().trim();
      var rolHoja     = (data[i][5] || "Admin").toString().trim();
      var colorTema   = (data[i][6] || "").toString().trim();

      if (usuarioHoja.toLowerCase() === usuario.toLowerCase().trim()
          && pinHoja === pin.toString().trim()) {
        return { ok: true, nombre: nombreHoja, usuario: usuarioHoja, rol: rolHoja, colorTema: colorTema };
      }
    }
    return { ok: false };
  } catch (e) {
    Logger.log("Error en validarCredenciales: " + e);
    return { ok: false };
  }
}

////////////// Guardar color de tema del usuario //////////////
function guardarColorTema(usuario, color) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("Ejecutivos");
    if (!hoja || hoja.getLastRow() < 2) return { ok: false };

    const data = hoja.getRange(2, 5, hoja.getLastRow() - 1, 1).getValues();
    for (var i = 0; i < data.length; i++) {
      if ((data[i][0] || "").toString().trim().toLowerCase() === usuario.toString().trim().toLowerCase()) {
        hoja.getRange(i + 2, 7).setValue(color); // Col G
        return { ok: true };
      }
    }
    return { ok: false, error: 'Usuario no encontrado.' };
  } catch (e) {
    Logger.log("Error en guardarColorTema: " + e);
    return { ok: false, error: e.message };
  }
}

////////////// Generar Excel con Top Exámenes y gráfico de columnas //////////////
function crearTopExamenesExcel(filas, etiquetaMes) {
  try {
    var label = etiquetaMes || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM yyyy');
    var ss = SpreadsheetApp.create('Top Exámenes - ' + label);
    var sheet = ss.getActiveSheet();
    sheet.setName('Top Exámenes');

    // Encabezados
    var header = sheet.getRange(1, 1, 1, 3);
    header.setValues([['Posición', 'Examen', 'Cantidad']]);
    header.setFontWeight('bold');
    header.setBackground('#004EE0');
    header.setFontColor('#FFFFFF');
    header.setHorizontalAlignment('center');

    // Datos con filas alternadas
    if (filas.length > 0) {
      sheet.getRange(2, 1, filas.length, 3).setValues(filas);
      for (var i = 0; i < filas.length; i++) {
        if (i % 2 === 1) {
          sheet.getRange(i + 2, 1, 1, 3).setBackground('#EEF4FF');
        }
      }
    }

    // Anchos de columna
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 300);
    sheet.setColumnWidth(3, 100);
    sheet.setFrozenRows(1);

    // Paleta multicolor para las columnas
    var colores = [
      '#004EE0','#E03A00','#00A86B','#9B00E0','#E0A800',
      '#00C4E0','#E05C00','#0094E0','#C4E000','#E000A8'
    ];

    // Gráfico de columnas (Examen vs Cantidad)
    var dataRange = sheet.getRange(1, 2, filas.length + 1, 2);
    var chart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(dataRange)
      .setPosition(2, 5, 0, 0)
      .setOption('title', 'Top Exámenes — ' + label)
      .setOption('titleTextStyle', { fontSize: 16, bold: true, color: '#1e293b' })
      .setOption('isStacked', false)
      .setOption('legend', { position: 'labeled', textStyle: { fontSize: 11 } })
      .setOption('hAxis', { title: 'Examen', slantedText: true, slantedTextAngle: 45, textStyle: { fontSize: 11 } })
      .setOption('vAxis', { title: 'Cantidad de usos', minValue: 0, textStyle: { fontSize: 11 } })
      .setOption('colors', colores)
      .setOption('width', 820)
      .setOption('height', 520)
      .build();
    sheet.insertChart(chart);

    SpreadsheetApp.flush();
    return { ok: true, fileId: ss.getId() };
  } catch (e) {
    Logger.log('Error crearTopExamenesExcel: ' + e);
    return { ok: false, error: e.message || 'No se pudo generar el archivo.' };
  }
}

////////////// Generar Excel con Pacientes por Seguro y gráfico de columnas //////////////
function crearSeguroExcel(filas, etiquetaMes) {
  try {
    var label = etiquetaMes || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM yyyy');
    var ss = SpreadsheetApp.create('Pacientes por Seguro - ' + label);
    var sheet = ss.getActiveSheet();
    sheet.setName('Por Seguro');

    // Encabezados
    var header = sheet.getRange(1, 1, 1, 3);
    header.setValues([['Posición', 'Seguro', 'Pacientes']]);
    header.setFontWeight('bold');
    header.setBackground('#004EE0');
    header.setFontColor('#FFFFFF');
    header.setHorizontalAlignment('center');

    // Datos con filas alternadas
    if (filas.length > 0) {
      sheet.getRange(2, 1, filas.length, 3).setValues(filas);
      for (var i = 0; i < filas.length; i++) {
        if (i % 2 === 1) {
          sheet.getRange(i + 2, 1, 1, 3).setBackground('#EEF4FF');
        }
      }
    }

    // Anchos de columna
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 280);
    sheet.setColumnWidth(3, 100);
    sheet.setFrozenRows(1);

    // Paleta multicolor
    var colores = [
      '#004EE0','#E03A00','#00A86B','#9B00E0','#E0A800',
      '#00C4E0','#E05C00','#0094E0','#C4E000','#E000A8'
    ];

    // Gráfico de columnas (Seguro vs Pacientes)
    var dataRange = sheet.getRange(1, 2, filas.length + 1, 2);
    var chart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(dataRange)
      .setPosition(2, 5, 0, 0)
      .setOption('title', 'Pacientes por Seguro — ' + label)
      .setOption('titleTextStyle', { fontSize: 16, bold: true, color: '#1e293b' })
      .setOption('isStacked', false)
      .setOption('legend', { position: 'labeled', textStyle: { fontSize: 11 } })
      .setOption('hAxis', { title: 'Seguro', slantedText: true, slantedTextAngle: 45, textStyle: { fontSize: 11 } })
      .setOption('vAxis', { title: 'Cantidad de pacientes', minValue: 0, textStyle: { fontSize: 11 } })
      .setOption('colors', colores)
      .setOption('width', 820)
      .setOption('height', 520)
      .build();
    sheet.insertChart(chart);

    SpreadsheetApp.flush();
    return { ok: true, fileId: ss.getId() };
  } catch (e) {
    Logger.log('Error crearSeguroExcel: ' + e);
    return { ok: false, error: e.message || 'No se pudo generar el archivo.' };
  }
}

////////////// Generar Excel Base del Mes (tabla completa de pacientes) //////////////
function crearBaseMesExcel(filas, etiquetaMes) {
  try {
    var label = etiquetaMes || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM yyyy');
    var ss = SpreadsheetApp.create('Base del Mes - ' + label);
    var sheet = ss.getActiveSheet();
    sheet.setName('Base ' + label);

    var encabezados = [
      'FECHA DE REGISTRO',
      'ESTADO DEL CASO',
      'NÚMERO DE CASO',
      'DNI',
      'NOMBRE DE PACIENTE',
      'EXÁMENES',
      'CELULAR',
      'SEGURO',
      'MÉDICO SOLICITANTE',
      'FECHA DE RECOJO',
      'FECHA DE ENVÍO DE RESULTADOS',
      'EJECUTIVO',
      'PRECIO DE EXÁMENES',
      'MÉDICO LECTOR',
      'FECHA DE VENCIMIENTO',
      'RESULTADO CIERRE'
    ];

    var numCols = encabezados.length;

    // Encabezados
    var headerRange = sheet.getRange(1, 1, 1, numCols);
    headerRange.setValues([encabezados]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#004EE0');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    sheet.setRowHeight(1, 36);

    // Datos
    if (filas.length > 0) {
      sheet.getRange(2, 1, filas.length, numCols).setValues(filas);
      // Filas alternadas
      for (var i = 0; i < filas.length; i++) {
        if (i % 2 === 1) {
          sheet.getRange(i + 2, 1, 1, numCols).setBackground('#EEF4FF');
        }
      }
      // Columna RESULTADO CIERRE: color según valor
      for (var j = 0; j < filas.length; j++) {
        var cierre = (filas[j][15] || '').toString().trim();
        var cierreCell = sheet.getRange(j + 2, 16);
        if (cierre === 'Completado') {
          cierreCell.setBackground('#D1FAE5');
          cierreCell.setFontColor('#065F46');
          cierreCell.setFontWeight('bold');
        } else if (cierre === 'Desestimado') {
          cierreCell.setBackground('#FEE2E2');
          cierreCell.setFontColor('#991B1B');
          cierreCell.setFontWeight('bold');
        }
      }
    }

    // Anchos de columna
    var anchos = [130, 110, 120, 85, 200, 250, 100, 130, 180, 120, 170, 140, 110, 180, 130, 120];
    for (var c = 0; c < anchos.length; c++) {
      sheet.setColumnWidth(c + 1, anchos[c]);
    }
    sheet.setFrozenRows(1);

    // Borde exterior de la tabla
    if (filas.length > 0) {
      sheet.getRange(1, 1, filas.length + 1, numCols)
        .setBorder(true, true, true, true, true, true, '#CBD5E1', SpreadsheetApp.BorderStyle.SOLID);
    }

    SpreadsheetApp.flush();
    return { ok: true, fileId: ss.getId() };
  } catch (e) {
    Logger.log('Error crearBaseMesExcel: ' + e);
    return { ok: false, error: e.message || 'No se pudo generar el archivo.' };
  }
}

function obtenerTarifario() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const hoja = ss.getSheetByName("Tarifario");
    if (!hoja || hoja.getLastRow() < 2) return { seguros: [], examenes: [] };
    const lastCol = Math.max(6, hoja.getLastColumn());
    const data = hoja.getRange(1, 1, hoja.getLastRow(), lastCol).getValues();

    // Columnas A-F fijas; de la G (índice 6) en adelante son seguros.
    // Los nombres de los seguros se toman de la fila de encabezados.
    const idxSeguroInicio = 6;
    let seguros = [];          // [{ col: índice, nombre: "MAPFRE" }, ...]

    // Detectar la fila de encabezados: primera fila NO de datos (código no numérico)
    // que tenga texto en alguna columna de seguros.
    for (let i = 0; i < data.length; i++) {
      const r = data[i];
      const codigo = (r[1] || '').toString().trim();
      const esDato = codigo && !isNaN(Number(codigo));
      if (esDato) break; // ya llegamos a los datos sin encontrar encabezado de seguros
      const candidatos = [];
      for (let c = idxSeguroInicio; c < lastCol; c++) {
        const nombre = (r[c] || '').toString().trim();
        if (nombre) candidatos.push({ col: c, nombre: nombre });
      }
      if (candidatos.length) { seguros = candidatos; break; }
    }

    // Normaliza el valor de una celda de cobertura a booleano
    const _cubre = function(v) {
      const t = (v || '').toString().trim().toLowerCase();
      if (!t) return false;
      return ['si','sí','s','x','1','true','verdadero','cubre','cubierto','y','yes','✓','✔'].indexOf(t) !== -1;
    };

    const resultado = [];
    for (let i = 0; i < data.length; i++) {
      const r = data[i];
      const nombre = (r[0] || '').toString().trim();
      const codigo = (r[1] || '').toString().trim();
      if (!nombre || !codigo || isNaN(Number(codigo))) continue;
      const coberturas = {};
      seguros.forEach(function(s) { coberturas[s.nombre] = _cubre(r[s.col]); });
      resultado.push({
        nombre: nombre,
        codigo: codigo,
        sinIgv: parseFloat(r[2]) || 0,
        conIgv: parseFloat(r[3]) || 0,
        particular: parseFloat(r[4]) || 0,
        plazo: (r[5] || '').toString().trim(),
        coberturas: coberturas
      });
    }
    return { seguros: seguros.map(function(s) { return s.nombre; }), examenes: resultado };
  } catch(e) {
    Logger.log('Error obtenerTarifario: ' + e);
    return { seguros: [], examenes: [] };
  }
}
