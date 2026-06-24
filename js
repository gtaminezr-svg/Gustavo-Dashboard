<script>
  // Detección de móvil — inyecta estilos directamente para evitar caché de GAS
  (function() {
    function _esMobile() {
      return window.innerWidth <= 768 ||
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    }
    function _inyectarEstilosMobile() {
      if (document.getElementById('_mobileStyles')) return;
      var s = document.createElement('style');
      s.id = '_mobileStyles';
      s.textContent = `
        #mobileTopbar{display:flex!important;position:fixed;top:0;left:0;right:0;height:54px;background:var(--surface,#fff);align-items:center;justify-content:space-between;padding:0 16px;z-index:500;box-shadow:0 2px 10px rgba(15,23,42,.10);}
        .mobile-hamburger{background:none;border:none;cursor:pointer;font-size:20px;color:#1e293b;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;}
        .mobile-brand{font-size:17px;font-weight:800;color:#2b1070;display:flex;align-items:center;gap:7px;}
        .sidebar{transform:translateX(-100%)!important;transition:transform .28s ease!important;z-index:1000!important;width:240px!important;}
        .sidebar.mobile-open{transform:translateX(0)!important;}
        .main-content,.main-content.rail-only{margin-left:0!important;width:100%!important;padding:66px 12px 72px!important;}
        .search-container{height:auto!important;min-height:56px!important;flex-wrap:wrap!important;padding:10px 12px!important;gap:8px!important;}
        .cards-row-container{grid-template-columns:1fr 1fr!important;gap:8px!important;}
        .counter-card{padding:12px 10px!important;}
        .counter-number{font-size:26px!important;}
        .counter-label{font-size:11px!important;}
        #encabezadoTabla tr th{display:none!important;}
        #cuerpoTabla tr{display:flex!important;flex-direction:column!important;background:var(--surface,#fff)!important;border-radius:14px!important;margin-bottom:10px!important;padding:12px 14px!important;box-shadow:0 2px 10px rgba(15,23,42,.07)!important;border:1px solid #e8ecf2!important;}
        #cuerpoTabla td{display:block!important;border:none!important;padding:3px 0!important;font-size:13px!important;}
        #cuerpoTabla td:first-child{font-size:15px!important;font-weight:700!important;color:#2b1070!important;border-bottom:1px solid #f1f5f9!important;padding-bottom:8px!important;margin-bottom:4px!important;}
        #cuerpoTabla td:last-child .btn-table-view{width:100%!important;justify-content:center!important;margin-top:8px!important;}
        .modal-overlay{align-items:flex-start!important;padding:0!important;}
        .modal-content{width:100%!important;max-width:100%!important;height:100dvh!important;border-radius:0!important;overflow-y:auto!important;overflow-x:hidden!important;padding:16px!important;}
        #mobileBottomNav{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;position:fixed;bottom:0;left:0;right:0;height:64px;background:white;border-radius:26px 26px 0 0;box-shadow:0 -2px 24px rgba(15,23,42,0.10);z-index:500;justify-content:space-around!important;align-items:center;padding:0 4px;overflow:visible!important;}
        .mob-nav-btn{background:none;border:none;cursor:pointer;display:flex!important;flex-direction:column!important;align-items:center;gap:3px;padding:6px 4px;border-radius:12px;color:#94a3b8;font-size:11px;font-weight:600;flex:1!important;max-width:80px;}
        .mob-nav-fab-wrap{position:relative;display:flex;align-items:center;justify-content:center;flex:1;max-width:80px;height:100%;}
        .mob-nav-fab-wrap::before{content:'';position:absolute;top:-20px;left:50%;transform:translateX(-50%);width:76px;height:76px;background:white;border-radius:50%;z-index:598;box-shadow:0 -4px 14px rgba(15,23,42,0.06);}
        #mobFAB{position:absolute;top:-12px;left:50%;transform:translateX(-50%);width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#2b1070,#4f46e5);border:none;color:white;font-size:22px;cursor:pointer;box-shadow:0 6px 22px rgba(43,16,112,.50);display:flex;align-items:center;justify-content:center;z-index:600;}
        .mob-nav-btn i{font-size:18px;}
        .mob-nav-btn.active{color:#2b1070;background:#ede9f8;}
        .login-left{display:none!important;}
        .login-right{width:100%!important;padding:48px 28px!important;background:#0a1628!important;}
        .login-title{color:#fff!important;}
        .login-subtitle{color:rgba(255,255,255,.60)!important;}
        .login-label{color:rgba(255,255,255,.80)!important;}
        .login-input{background:rgba(255,255,255,.08)!important;border-color:rgba(255,255,255,.15)!important;color:#fff!important;}
        .login-input::placeholder{color:rgba(255,255,255,.35)!important;}
        #toastContainer{top:62px!important;right:10px!important;left:10px!important;}
        .toast-notif{min-width:unset!important;max-width:100%!important;}
        #mobileDrawerOverlay.active{display:block!important;}
        .table-card{display:none!important;}
        body.mobile-view #desktopMain{display:none!important;}
        body.mobile-view #mobileApp{display:flex!important;}
      `;
      document.head.appendChild(s);
    }
    function _quitarEstilosMobile() {
      var s = document.getElementById('_mobileStyles');
      if (s) s.remove();
    }
    function _aplicarMobile() {
      if (_esMobile()) {
        document.body.classList.add('mobile-view');
        _inyectarEstilosMobile();
      } else {
        document.body.classList.remove('mobile-view');
        _quitarEstilosMobile();
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', _aplicarMobile);
    } else {
      _aplicarMobile();
    }
    window.addEventListener('resize', _aplicarMobile);
  })();
  let bdPacientes = [];
  let pacientesFiltrados = [];
  let medicosEspecialidades = [];
  let medicoSeleccionado = null;
  let bandejaActual = 'Pendiente';
  let paginaActual = 1;
  const registrosPorPagina = 10;
  let _notifData = { vencidos: 0, porVencer: 0, pendientes: 0, agendados: 0 };
  let _notifDismissed = false;
  let _notifItems = [];
  let _snapshot = { pacientes: -1, medicos: -1, ejecutivos: -1, programados: -1 };
  let examenesSeleccionados = []; 
  let dniFichaActual = "";
  let subEstadoSeleccionado = "";
  let medicoLectorSeleccionado = "";
  let ejecutivoCierreSeleccionado = "";
  let motivoDesestimacion = "";
  let ejecutivosDatosPin = []; // NUEVA VARIABLE PARA LOS PINS
  let ejecutivosData = [];
  let stackEjecutivoIdx = 0;

  const mapaColoresSemaforo = {
    "desestimado": "#800020",            
    "espera de resultados": "#10b981", 
    "lectura programada": "#06b6d4",       
    "lectura realizada": "#ec4899",        
    "lectura parcial": "#f97316",          
    "cerrado por error": "#4b5563",
    "recojo parcial": "#704214" // NUEVO SUB-ESTADO AGREGADO         
  };

  function _autoRefreshSilente() {
    cargarDatosDelServidor(true);
    google.script.run
      .withSuccessHandler(function(lista) {
        const _prevProg = _snapshot.programados;
        if (_prevProg >= 0 && lista.length > _prevProg) {
          const n = lista.length - _prevProg;
          agregarNotificacion(n === 1 ? 'Se agregó 1 evento al calendario' : `Se agregaron ${n} eventos al calendario`, 'fas fa-calendar-plus');
        }
        _snapshot.programados = lista.length;
        localStorage.setItem('sislab_snap_prog', lista.length);
        pacientesProgramados = lista;
        const vistaCalendario = document.getElementById('vistaCalendario');
        if (vistaCalendario && vistaCalendario.style.display !== 'none') {
          renderizarCalendario();
          renderizarProximosEventos();
        }
      })
      .obtenerPacientesProgramados();
    recargarListasGlobales(null);
  }

  function _iniciarApp() {
    cargarListasDesplegables();
    generarBarraMesesDinamica();
    cargarNombreUsuario();
    setInterval(_autoRefreshSilente, 2 * 60 * 1000);
    // Pre-cargar eventos del calendario para que el conteo de agendados sea correcto desde el inicio
    google.script.run
      .withSuccessHandler(function(lista) {
        const _storedProg = parseInt(localStorage.getItem('sislab_snap_prog') || '-1', 10);
        if (_storedProg >= 0 && lista.length > _storedProg) {
          const n = lista.length - _storedProg;
          agregarNotificacion(n === 1 ? 'Se agregó 1 evento al calendario desde tu última sesión' : `Se agregaron ${n} eventos al calendario desde tu última sesión`, 'fas fa-calendar-plus');
        }
        _snapshot.programados = lista.length;
        localStorage.setItem('sislab_snap_prog', lista.length);
        pacientesProgramados = lista;
        actualizarNotificacionCampana(_notifData.vencidos, _notifData.porVencer);
      })
      .withFailureHandler(function(){})
      .obtenerPacientesProgramados();
    setTimeout(_abrirPanelNotificaciones, 600);
    _iniciarControlInactividad();
  }

  // ===== Cierre de sesión automático por inactividad (30 min) =====
  let _inactividadTimer = null;
  const _INACTIVIDAD_MS = 30 * 60 * 1000; // 30 minutos

  function _reiniciarTimerInactividad() {
    if (sessionStorage.getItem('sislab_auth') !== '1') return;
    clearTimeout(_inactividadTimer);
    _inactividadTimer = setTimeout(_cerrarSesionPorInactividad, _INACTIVIDAD_MS);
  }

  function _iniciarControlInactividad() {
    const eventos = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    eventos.forEach(function(ev) {
      document.addEventListener(ev, _reiniciarTimerInactividad, { passive: true });
    });
    _reiniciarTimerInactividad();
  }

  function _cerrarSesionPorInactividad() {
    if (sessionStorage.getItem('sislab_auth') !== '1') return;
    clearTimeout(_inactividadTimer);
    _ejecutarLogout();
    if (typeof Swal !== 'undefined') {
      const esDark = document.body.classList.contains('dark');
      Swal.fire({
        icon: 'info',
        title: 'Sesión cerrada',
        text: 'Tu sesión se cerró automáticamente por inactividad.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#004EE0',
        background: esDark ? 'linear-gradient(145deg,#004EE0,#042E7B)' : '#ffffff',
        color: esDark ? '#e2e8f0' : '#1e293b'
      });
    }
  }

  function _limpiarVisualColorTema() {
    var root = document.documentElement;
    ['--card-bg','--surface','--card-border','--bg','--dashboard-bg','--card-text',
     '--accent','--accent-2','--accent-dk','--on-accent','--on-accent-2','--text','--text-soft']
      .forEach(function(p){ root.style.removeProperty(p); });
    var estilo = document.getElementById('_temaEstilo');
    if (estilo) estilo.remove();
  }

  // Lógica compartida de logout (sin confirmación): limpia sesión y vuelve al login
  function _ejecutarLogout() {
    clearTimeout(_inactividadTimer);
    sessionStorage.removeItem('sislab_auth');
    sessionStorage.removeItem('sislab_usuario');
    sessionStorage.removeItem('sislab_rol');
    sessionStorage.removeItem('sislab_color');
    _limpiarVisualColorTema();
    var restricEl = document.getElementById('_restriccionEjec');
    if (restricEl) restricEl.remove();
    document.getElementById('appContainer').style.display = 'none';
    const screen = document.getElementById('loginScreen');
    screen.style.opacity = '0';
    screen.style.display = 'flex';
    document.getElementById('loginUsuario').value = '';
    document.getElementById('loginPin').value = '';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('btnLogin').disabled = false;
    document.getElementById('btnLogin').innerHTML = 'Iniciar Sesión';
    setTimeout(function() { screen.style.opacity = '1'; }, 20);
  }


  function _abrirPanelNotificaciones() {
    const panel = document.getElementById('panelNotificaciones');
    const btn   = document.getElementById('btnCampana');
    if (!panel || !btn) return;
    const rect = btn.getBoundingClientRect();
    panel.style.top   = (rect.bottom + 8) + 'px';
    panel.style.right = (window.innerWidth - rect.right) + 'px';
    panel.style.left  = 'auto';
    renderPanelNotificaciones();
    panel.style.maxHeight = '360px';
    panel.style.opacity   = '1';
    panel.dataset.abierto = 'true';
    setTimeout(function() { document.addEventListener('click', cerrarPanelNotificacionesFuera); }, 0);
  }

  function _colorLighten(hex, amount) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    r = Math.min(255, Math.round(r + (255-r)*amount));
    g = Math.min(255, Math.round(g + (255-g)*amount));
    b = Math.min(255, Math.round(b + (255-b)*amount));
    return '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');
  }

  function _colorDarken(hex, amount) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    r = Math.max(0, Math.round(r * (1 - amount)));
    g = Math.max(0, Math.round(g * (1 - amount)));
    b = Math.max(0, Math.round(b * (1 - amount)));
    return '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');
  }

  function _luminance(hex) {
    var r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
    r = r <= 0.03928 ? r/12.92 : Math.pow((r+0.055)/1.055, 2.4);
    g = g <= 0.03928 ? g/12.92 : Math.pow((g+0.055)/1.055, 2.4);
    b = b <= 0.03928 ? b/12.92 : Math.pow((b+0.055)/1.055, 2.4);
    return 0.2126*r + 0.7152*g + 0.0722*b;
  }

  function aplicarColorTema(hex, light) {
    try {
      if (!hex) return;
      var lightHex   = light || _colorLighten(hex, 0.45);
      var bgHex      = _colorLighten(hex, 0.84);
      var dkHex      = _colorDarken(hex, 0.25);
      var softBg1    = _colorLighten(hex, 0.84);
      var softBg2    = _colorLighten(hex, 0.68);
      var borderSoft = _colorLighten(hex, 0.52);

      var lum          = _luminance(hex);
      var onVivid      = lum > 0.20 ? _colorDarken(hex, 0.75) : '#ffffff';
      var onVividSub   = lum > 0.20 ? _colorDarken(hex, 0.50) : 'rgba(255,255,255,0.75)';
      var btnOverBg    = lum > 0.20 ? 'rgba(0,0,0,0.13)' : 'rgba(255,255,255,0.20)';
      var iconOverBg   = lum > 0.20 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.20)';
      var colHeaderTxt = _colorDarken(hex, 0.55);

      var root = document.documentElement;
      root.style.setProperty('--card-bg',      'linear-gradient(145deg, ' + lightHex + ', ' + hex + ')');
      root.style.setProperty('--surface',      'linear-gradient(145deg, ' + lightHex + ', ' + hex + ')');
      root.style.setProperty('--card-border',  hex);
      root.style.setProperty('--bg',           bgHex);
      root.style.setProperty('--dashboard-bg', bgHex);
      root.style.setProperty('--card-text',    onVivid);
      root.style.setProperty('--accent',       hex);
      root.style.setProperty('--accent-2',     lightHex);
      root.style.setProperty('--accent-dk',    dkHex);
      root.style.setProperty('--on-accent',    onVivid);
      root.style.setProperty('--on-accent-2',  dkHex);
      root.style.setProperty('--text',         dkHex);
      root.style.setProperty('--text-soft',    hex);

      var estilo = document.getElementById('_temaEstilo');
      if (!estilo) {
        estilo = document.createElement('style');
        estilo.id = '_temaEstilo';
        document.head.appendChild(estilo);
      }
      var softGrad  = 'linear-gradient(145deg, ' + softBg1 + ', ' + softBg2 + ')';
      var vividGrad = 'linear-gradient(145deg, ' + lightHex + ', ' + hex + ')';
      estilo.textContent = [
        /* cards y bloques: degradado suave */
        'body:not(.dark) .stats-card-demo { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        'body:not(.dark) .dash-block { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        'body:not(.dark) .panel-casos-block { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        'body:not(.dark) .rp-panel { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        'body:not(.dark) .rp-card { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        'body:not(.dark) .carrusel-card { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        /* .cal-panel: solo los blancos (excluir el panel oscuro de fecha actual) */
        'body:not(.dark) .cal-panel:not([style*="#1e293b"]) { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        /* bloques sin clase: por ID */
        'body:not(.dark) #bloque7 { background: ' + softGrad + ' !important; border-color: ' + borderSoft + ' !important; }',
        /* table-card: suave para que las filas sean legibles */
        'body:not(.dark) .table-card { background: ' + softGrad + ' !important; }',
        /* encabezado de la bandeja: vivid + diferenciado como barra de título */
        'body:not(.dark) .table-header-container { background: ' + vividGrad + ' !important; border-radius: 12px !important; padding: 14px 20px !important; margin-bottom: 14px !important; }',
        'body:not(.dark) .table-card .table-title { color: ' + onVivid + ' !important; }',
        'body:not(.dark) .table-card #btnNuevoRegistro { background: ' + btnOverBg + ' !important; color: ' + onVivid + ' !important; border: 1.5px solid ' + onVividSub + ' !important; }',
        /* thead sticky: tinte suave del tema */
        'body:not(.dark) .table-card thead[style*="background: white"], body:not(.dark) .table-card thead[style*="background:white"] { background: ' + softBg1 + ' !important; }',
        /* search-container y section-header-bar: vívido */
        'body:not(.dark) .search-container { background: ' + vividGrad + ' !important; }',
        'body:not(.dark) .section-header-bar { background: ' + vividGrad + ' !important; }',
        /* contraste de texto en zonas vívidas */
        'body:not(.dark) .search-container .welcome-text, body:not(.dark) .section-header-bar .welcome-text { color: ' + onVivid + ' !important; }',
        'body:not(.dark) .search-container .saludo-sub, body:not(.dark) .section-header-bar .saludo-sub { color: ' + onVividSub + ' !important; }',
        'body:not(.dark) .search-container .saludo-icon, body:not(.dark) .section-header-bar .saludo-icon { background: ' + iconOverBg + ' !important; color: ' + onVivid + ' !important; }',
        /* botones icono (🔍🔄🔔) dentro del search-container vívido */
        'body:not(.dark) .search-container .btn-icon-action { background: ' + btnOverBg + ' !important; color: ' + onVivid + ' !important; box-shadow: none !important; }',
        /* Descargar Base y píldora de fecha en Panel de Casos (dentro de search-container) */
        'body:not(.dark) .search-container #btnDescargarBase { color: ' + onVivid + ' !important; border-color: ' + onVividSub + ' !important; }',
        'body:not(.dark) .search-container #pildoraFechaPanel { background: ' + btnOverBg + ' !important; color: ' + onVivid + ' !important; box-shadow: none !important; }',
        /* botones cápsula dentro de la barra de saludo vívida */
        'body:not(.dark) .section-header-bar .btn-capsula { color: ' + onVivid + ' !important; border-color: ' + onVividSub + ' !important; background: ' + btnOverBg + ' !important; }',
        'body:not(.dark) .section-header-bar .btn-capsula:hover { background: ' + (lum > 0.20 ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.30)') + ' !important; }',
        /* headers de sub-paneles Calendario: vívido (mismo patrón que la bandeja) */
        'body:not(.dark) .cal-panel-header { background: ' + vividGrad + ' !important; border-bottom-color: ' + hex + ' !important; }',
        'body:not(.dark) .cal-panel-header div { color: ' + onVivid + ' !important; }',
        'body:not(.dark) .cal-panel-header span { color: ' + onVivid + ' !important; }',
        'body:not(.dark) .cal-panel-header button { background: ' + btnOverBg + ' !important; color: ' + onVivid + ' !important; border-color: ' + onVividSub + ' !important; }',
        /* headers de sub-paneles Registro Personal: vívido */
        'body:not(.dark) .rp-panel-header { background: ' + vividGrad + ' !important; padding: 12px 20px !important; border-bottom-color: ' + hex + ' !important; }',
        'body:not(.dark) .rp-panel-header span { color: ' + onVivid + ' !important; }',
        /* columnas de encabezado en sub-paneles: tinte suave */
        'body:not(.dark) .rp-col-header { background: ' + softBg1 + ' !important; border-bottom-color: ' + borderSoft + ' !important; }',
        'body:not(.dark) .rp-col-header div { color: ' + colHeaderTxt + ' !important; }',
        /* counter-cards: sincronizar borde izquierdo y punto con el tema */
        'body:not(.dark) .counter-card { border-left-color: ' + hex + ' !important; }',
        'body:not(.dark) .counter-card .card-dot { background: ' + hex + ' !important; }',
        /* tarjetas de ejecutivos (bloque8Stack): degradado vívido del tema */
        'body:not(.dark) #bloque8Stack > div[id^="ejec-card-"] { background: ' + vividGrad + ' !important; }',
        /* botón Descargar Base (regla general, sobreescrita por la de search-container arriba) */
        'body:not(.dark) #btnDescargarBase { color: ' + onVivid + ' !important; border-color: ' + onVividSub + ' !important; }',
        /* botones de pestaña en Panel de Casos */
        'body:not(.dark) button[data-tabp] { color: ' + hex + ' !important; }',
        'body:not(.dark) button[data-tabp].activo { background: ' + hex + ' !important; color: ' + onVivid + ' !important; }',
      ].join('\n');
    } catch(e) {}
  }

  function _elegirColorTema(hex, light) {
    aplicarColorTema(hex, light);
    sessionStorage.setItem('sislab_color', hex);
    var usuario = sessionStorage.getItem('sislab_usuario') || window.__nombreUsuario || '';
    google.script.run
      .withSuccessHandler(function() {})
      .withFailureHandler(function() {})
      .guardarColorTema(usuario, hex);
    Swal.close();
    Swal.fire({ icon: 'success', title: 'Color guardado', text: 'El color se aplicó y se guardó en tu cuenta.', timer: 1800, showConfirmButton: false, timerProgressBar: true });
  }

  function _restablecerColorTema() {
    var root = document.documentElement;
    root.style.removeProperty('--card-bg');
    root.style.removeProperty('--surface');
    root.style.removeProperty('--card-border');
    root.style.removeProperty('--bg');
    root.style.removeProperty('--dashboard-bg');
    root.style.removeProperty('--card-text');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-2');
    root.style.removeProperty('--accent-dk');
    root.style.removeProperty('--on-accent');
    root.style.removeProperty('--on-accent-2');
    root.style.removeProperty('--text');
    root.style.removeProperty('--text-soft');
    var estilo = document.getElementById('_temaEstilo');
    if (estilo) estilo.remove();
    sessionStorage.removeItem('sislab_color');
    var usuario = sessionStorage.getItem('sislab_usuario') || window.__nombreUsuario || '';
    google.script.run
      .withSuccessHandler(function() {})
      .withFailureHandler(function() {})
      .guardarColorTema(usuario, '');
    Swal.close();
    Swal.fire({ icon: 'success', title: 'Color restablecido', text: 'Se restauró el color por defecto.', timer: 1600, showConfirmButton: false, timerProgressBar: true });
  }

  window.onload = function() {
    if (sessionStorage.getItem('sislab_auth') === '1') {
      window.__nombreUsuario = sessionStorage.getItem('sislab_usuario') || '';
      window.__rolUsuario    = sessionStorage.getItem('sislab_rol') || 'Admin';
      try {
        var colorGuardado = sessionStorage.getItem('sislab_color');
        if (colorGuardado) aplicarColorTema(colorGuardado);
      } catch(e) {}
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('appContainer').style.display = 'flex';
      _iniciarApp();
      _aplicarRestriccionesRol();
    }
    // Si no hay sesión, la loginScreen ya es visible por defecto
  };

  function intentarLogin() {
    const usuario = (document.getElementById('loginUsuario').value || '').trim();
    const pin     = (document.getElementById('loginPin').value || '').trim();
    const errEl   = document.getElementById('loginError');
    errEl.style.display = 'none';

    if (!usuario || !pin) {
      errEl.textContent = 'Por favor ingresa usuario y PIN.';
      errEl.style.display = 'block';
      return;
    }

    const btn = document.getElementById('btnLogin');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Verificando...';

    function _resetLoginBtn(msg) {
      btn.disabled = false;
      btn.innerHTML = 'Iniciar Sesión';
      if (msg && errEl) {
        errEl.textContent = msg;
        errEl.style.display = 'block';
      }
    }

    // Timeout de seguridad: si en 15s no responde, resetear
    const _loginTimer = setTimeout(function() {
      _resetLoginBtn('El servidor tardó demasiado. Inténtalo de nuevo.');
    }, 15000);

    google.script.run
      .withSuccessHandler(function(result) {
        clearTimeout(_loginTimer);
        try {
          if (result && result.ok) {
            window.__nombreUsuario = result.nombre || usuario;
            window.__rolUsuario    = result.rol || 'Admin';
            sessionStorage.setItem('sislab_auth', '1');
            sessionStorage.setItem('sislab_usuario', result.nombre || usuario);
            sessionStorage.setItem('sislab_rol', result.rol || 'Admin');
            if (result.colorTema) {
              sessionStorage.setItem('sislab_color', result.colorTema);
              aplicarColorTema(result.colorTema);
            } else {
              sessionStorage.removeItem('sislab_color');
              _limpiarVisualColorTema();
            }
            const screen = document.getElementById('loginScreen');
            screen.style.opacity = '0';
            setTimeout(function() {
              screen.style.display = 'none';
              document.getElementById('appContainer').style.display = 'flex';
              _iniciarApp();
              _aplicarRestriccionesRol();
            }, 420);
          } else {
            _resetLoginBtn('Usuario o PIN incorrecto. Inténtalo de nuevo.');
            document.getElementById('loginPin').value = '';
            document.getElementById('loginPin').focus();
          }
        } catch(e) {
          _resetLoginBtn('Ocurrió un error inesperado. Inténtalo de nuevo.');
        }
      })
      .withFailureHandler(function(err) {
        clearTimeout(_loginTimer);
        const msg = (err && err.message && err.message.includes('not found'))
          ? 'Función no disponible. Verifica el despliegue del script.'
          : 'Error de conexión con el servidor. Inténtalo de nuevo.';
        _resetLoginBtn(msg);
      })
      .validarCredenciales(usuario, pin);
  }

  // Saludo personalizado: si ya hay nombre del login lo usa directo, si no lo pide al backend
  function cargarNombreUsuario() {
    if (window.__nombreUsuario) { aplicarSaludo(); return; }
    try {
      google.script.run
        .withSuccessHandler(function(u){
          if (u && u.nombre) { window.__nombreUsuario = u.nombre; }
          aplicarSaludo();
        })
        .withFailureHandler(function(){ /* sin conexión: deja el saludo por defecto */ })
        .getUsuarioActual();
    } catch (e) {}
  }

  function _aplicarRestriccionesRol() {
    var esEjecutivo = (window.__rolUsuario || '').toLowerCase() === 'ejecutivo';
    // Botón Descargar Base (Panel de Casos)
    var btnDesc = document.getElementById('btnDescargarBase');
    if (btnDesc) btnDesc.style.display = esEjecutivo ? 'none' : '';
    // Botón Ejecutivos (Registro Personal)
    var btnEjec = document.querySelector('button.btn-capsula[data-tab="ejecutivo"]');
    if (btnEjec) btnEjec.style.display = esEjecutivo ? 'none' : '';
    // Lápiz de filas: se controla en el render, pero también via CSS
    var styleId = '_restriccionEjec';
    var prev = document.getElementById(styleId);
    if (prev) prev.remove();
    if (esEjecutivo) {
      var s = document.createElement('style');
      s.id = styleId;
      s.textContent = '.icon-edit-row { display: none !important; } .dropdown-acciones { display: none !important; }';
      document.head.appendChild(s);
    }
  }

  function aplicarSaludo() {
    if (!window.__nombreUsuario) return;
    const rol = window.__rolUsuario || 'Admin';
    const badgeClass = rol === 'Supervisor' ? 'badge-supervisor'
                     : rol === 'Ejecutivo'  ? 'badge-ejecutivo'
                     : '';
    document.querySelectorAll('.welcome-text').forEach(function(el){
      el.innerHTML = 'Bienvenido ' + window.__nombreUsuario +
        ' <span class="role-badge ' + badgeClass + '">' + rol + '</span>';
    });
  }

  function cerrarSesion() {
    cerrarMenuUsuario();
    const esDark = document.body.classList.contains('dark');
    Swal.fire({
      icon: 'question',
      title: '¿Cerrar sesión?',
      text: 'Se cerrará tu sesión actual.',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      reverseButtons: true,
      background: esDark ? 'linear-gradient(145deg,#004EE0,#042E7B)' : '#ffffff',
      color: esDark ? '#e2e8f0' : '#1e293b'
    }).then(result => {
      if (result.isConfirmed) {
        _ejecutarLogout();
      }
    });
  }

  function toggleMenuUsuario(event) {
    event.stopPropagation();
    const icon = event.currentTarget;
    const menu = document.getElementById('menuUsuario');
    if (!menu) return;
    if (menu.dataset.abierto === 'true') {
      cerrarMenuUsuario();
    } else {
      const rect = icon.getBoundingClientRect();
      menu.style.top = (rect.bottom + 8) + 'px';
      menu.style.left = rect.left + 'px';
      menu.style.maxHeight = '200px';
      menu.style.opacity = '1';
      menu.dataset.abierto = 'true';
      setTimeout(function() { document.addEventListener('click', cerrarMenuUsuarioFuera); }, 0);
    }
  }

  function cerrarMenuUsuario() {
    const menu = document.getElementById('menuUsuario');
    if (!menu) return;
    menu.style.maxHeight = '0';
    menu.style.opacity = '0';
    menu.dataset.abierto = 'false';
    document.removeEventListener('click', cerrarMenuUsuarioFuera);
  }

  function cerrarMenuUsuarioFuera(e) {
    const menu = document.getElementById('menuUsuario');
    if (menu && !menu.contains(e.target)) {
      cerrarMenuUsuario();
    }
  }

  function togglePanelNotificaciones(event) {
    event.stopPropagation();
    cerrarMenuUsuario();
    const panel = document.getElementById('panelNotificaciones');
    if (!panel) return;
    if (panel.dataset.abierto === 'true') {
      cerrarPanelNotificaciones();
    } else {
      const btn = document.getElementById('btnCampana');
      const rect = btn ? btn.getBoundingClientRect() : event.currentTarget.getBoundingClientRect();
      panel.style.top = (rect.bottom + 8) + 'px';
      panel.style.right = (window.innerWidth - rect.right) + 'px';
      panel.style.left = 'auto';
      renderPanelNotificaciones();
      panel.style.maxHeight = '360px';
      panel.style.opacity = '1';
      panel.dataset.abierto = 'true';
      setTimeout(function() { document.addEventListener('click', cerrarPanelNotificacionesFuera); }, 0);
    }
  }

  function cerrarPanelNotificaciones() {
    const panel = document.getElementById('panelNotificaciones');
    if (!panel) return;
    panel.style.maxHeight = '0';
    panel.style.opacity = '0';
    panel.dataset.abierto = 'false';
    document.removeEventListener('click', cerrarPanelNotificacionesFuera);
  }

  function cerrarPanelNotificacionesFuera(e) {
    const panel = document.getElementById('panelNotificaciones');
    if (panel && !panel.contains(e.target)) {
      cerrarPanelNotificaciones();
    }
  }

  function agregarNotificacion(msg, icono) {
    const hora = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
    _notifItems.unshift({ msg, icono, hora });
    if (_notifItems.length > 20) _notifItems.pop();
    const dot = document.getElementById('bellDot');
    if (dot) dot.style.display = 'block';
    const btn = document.getElementById('btnCampana');
    if (btn) {
      btn.classList.add('bell-shake');
      btn.addEventListener('animationend', () => btn.classList.remove('bell-shake'), { once: true });
    }
    const panel = document.getElementById('panelNotificaciones');
    if (panel && panel.dataset.abierto === 'true') renderPanelNotificaciones();
    mostrarToast(msg, icono);
  }

  function mostrarToast(msg, icono) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = `
      <i class="${icono} toast-notif-icon"></i>
      <span class="toast-notif-msg">${msg}</span>
      <div class="toast-progress"></div>
    `;
    toast.addEventListener('click', () => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    });
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, 4000);
  }

  function limpiarNotificaciones() {
    _notifItems = [];
    _notifDismissed = true;
    const dot = document.getElementById('bellDot');
    if (dot) dot.style.display = 'none';
    renderPanelNotificaciones();
  }

  function renderPanelNotificaciones() {
    const body = document.getElementById('notifContenido');
    if (!body) return;
    const esDark = document.body.classList.contains('dark');
    const borderColor = esDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9';

    // Estado vacío tras borrar todo
    if (_notifDismissed && _notifItems.length === 0) {
      body.innerHTML = `
        <div class="notif-empty">
          <i class="far fa-bell-slash" style="font-size:26px; opacity:0.30; display:block; margin-bottom:8px;"></i>
          Sin notificaciones nuevas
        </div>`;
      return;
    }

    let html = '';

    // Sección de actividad reciente
    if (_notifItems.length > 0) {
      html += `<div class="notif-section-label">Actividad Reciente</div>`;
      html += _notifItems.map((item, i) => `
        <div class="notif-item" style="${i < _notifItems.length - 1 ? 'border-bottom:1px solid ' + borderColor + ';' : ''}">
          <div class="notif-item-icon" style="background:#004EE022; color:${esDark ? '#99CAFF' : '#004EE0'};">
            <i class="${item.icono}"></i>
          </div>
          <div class="notif-item-text">
            <span class="notif-item-label">${item.msg}</span>
            <span class="notif-item-desc">${item.hora}</span>
          </div>
        </div>`).join('');
      html += `<div style="height:1px; background:${borderColor}; margin:4px 0 0;"></div>`;
    }

    // Sección de resumen (siempre visible cuando no se ha borrado)
    html += `<div class="notif-section-label">Resumen</div>`;
    const stats = [
      { icon: 'fas fa-hourglass-half', bg: '#f59e0b', label: 'Pacientes Pendientes', count: _notifData.pendientes, desc: 'En espera de atención' },
      { icon: 'fas fa-exclamation-circle', bg: '#ef4444', label: 'Pacientes Vencidos', count: _notifData.vencidos, desc: 'Fecha límite superada' },
      { icon: 'fas fa-calendar-check', bg: '#10b981', label: 'Agendados en Calendario', count: _notifData.agendados, desc: 'Con programación activa' }
    ];
    html += stats.map((item, i) => `
      <div class="notif-item" style="${i < stats.length - 1 ? 'border-bottom:1px solid ' + borderColor + ';' : ''}">
        <div class="notif-item-icon" style="background:${item.bg}22; color:${item.bg};">
          <i class="${item.icon}"></i>
        </div>
        <div class="notif-item-text">
          <span class="notif-item-label">${item.label}</span>
          <span class="notif-item-desc">${item.desc}</span>
        </div>
        <span class="notif-item-badge" style="background:${item.bg}22; color:${item.bg};">${item.count}</span>
      </div>`).join('');

    body.innerHTML = html;
  }

  function abrirPaletaColores() {
    cerrarMenuUsuario();
    const esDark = document.body.classList.contains('dark');
    const colorActual = sessionStorage.getItem('sislab_color') || '';

    const presets = [
      { nombre: 'Azul (defecto)', hex: '#004EE0', light: '#99CAFF' },
      { nombre: 'Bosque',         hex: '#2d6a4f', light: '#74c69d' },
      { nombre: 'Esmeralda',      hex: '#40916c', light: '#95d5b2' },
      { nombre: 'Jade',           hex: '#52b788', light: '#b7e4c7' },
      { nombre: 'Menta',          hex: '#74c69d', light: '#d8f3dc' },
      { nombre: 'Morado',         hex: '#7c3aed', light: '#c4b5fd' },
      { nombre: 'Granate',        hex: '#be123c', light: '#fda4af' },
      { nombre: 'Naranja',        hex: '#ea580c', light: '#fdba74' },
      { nombre: 'Petróleo',       hex: '#0f766e', light: '#5eead4' },
      { nombre: 'Índigo',         hex: '#4338ca', light: '#a5b4fc' },
    ];

    const htmlPresets = presets.map(function(p) {
      const sel = (colorActual === p.hex) ? 'outline:3px solid #042E7B; outline-offset:2px;' : '';
      return `<div onclick="_elegirColorTema('${p.hex}','${p.light}')" title="${p.nombre}"
        style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${p.light},${p.hex});cursor:pointer;${sel}flex-shrink:0;transition:transform 0.15s;"
        onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'"></div>`;
    }).join('');

    Swal.fire({
      title: '🎨 Color del Dashboard',
      html: `
        <div style="text-align:left;">
          <p style="font-size:13px;color:#64748b;margin-bottom:14px;">Elige un color para personalizar tus tarjetas y paneles en modo claro. Se guarda en tu cuenta.</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px;">${htmlPresets}</div>
          <div style="display:flex;align-items:center;gap:10px;padding-top:14px;border-top:1px solid #e2e8f0;">
            <label style="font-size:13px;font-weight:600;color:#475569;white-space:nowrap;">Color libre:</label>
            <input type="color" id="colorLibre" value="${colorActual || '#004EE0'}"
              style="width:44px;height:36px;border:none;border-radius:8px;cursor:pointer;padding:2px;">
            <button onclick="_elegirColorTema(document.getElementById('colorLibre').value, null)"
              style="background:var(--accent,#004EE0);color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;">
              Aplicar
            </button>
          </div>
          <div style="margin-top:14px;">
            <button onclick="_restablecerColorTema()"
              style="background:transparent;color:#94a3b8;border:1px solid #e2e8f0;border-radius:8px;padding:7px 14px;font-size:12px;cursor:pointer;width:100%;">
              Restablecer color por defecto
            </button>
          </div>
        </div>`,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#004EE0',
      background: esDark ? 'linear-gradient(145deg,#004EE0,#042E7B)' : '#ffffff',
      color: esDark ? '#e2e8f0' : '#1e293b',
      width: 420
    });
  }

  // Interruptor de modo claro / oscuro (de momento solo alterna el switch;
  // el modo oscuro real se aplicará cuando definamos la paleta de colores)
  function toggleModoOscuro() {
    const app = document.getElementById('appContainer');
    if (!app) return;

    // Fase 1: desvanecer el contenido
    app.style.transition = 'opacity 0.30s ease';
    app.style.opacity = '0';

    // Fase 2: con el contenido invisible, hacer el swap de tema y re-renders
    setTimeout(function() {
      const t = document.querySelector('.theme-toggle');
      if (t) t.classList.toggle('dark');
      document.body.classList.toggle('dark');

      if (typeof ultimoDonutMedico !== 'undefined' && ultimoDonutMedico) {
        dibujarDonutMedico(ultimoDonutMedico.solicitados, ultimoDonutMedico.leidos);
      }
      if (typeof ultimosPacientesPanelCasos !== 'undefined' && ultimosPacientesPanelCasos) {
        if (typeof dibujarDonutSegurosPanelCasos === 'function') dibujarDonutSegurosPanelCasos(ultimosPacientesPanelCasos);
        if (typeof dibujarBarrasEjecutivosPanel === 'function') dibujarBarrasEjecutivosPanel(ultimosPacientesPanelCasos);
        if (typeof dibujarMedioAnilloProgreso === 'function') dibujarMedioAnilloProgreso(ultimosPacientesPanelCasos);
        if (typeof dibujarBarrasExamenesPanel === 'function') dibujarBarrasExamenesPanel(ultimosPacientesPanelCasos);
      }
      if (typeof renderizarCalendario === 'function') renderizarCalendario();
      if (typeof renderizarListaMedicosPersonal === 'function') renderizarListaMedicosPersonal();
      if (typeof renderizarMedicoLectorMes === 'function') renderizarMedicoLectorMes();
      if (typeof medicoSeleccionado !== 'undefined' && medicoSeleccionado && typeof mostrarFichaMedico === 'function') mostrarFichaMedico(medicoSeleccionado);
      if (typeof actualizarProgresoCasos === 'function') actualizarProgresoCasos();

      // Fase 3: revelar el nuevo tema con fade-in
      app.style.opacity = '1';
    }, 320);
  }

  // Hamburguesa: muestra/oculta los nombres (deja solo los iconos)
  function toggleNamesPanel() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main-content');
    if (sidebar) sidebar.classList.toggle('collapsed');
    if (main) main.classList.toggle('rail-only');
  }

  function abrirNamesPanel() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main-content');
    if (sidebar) sidebar.classList.remove('collapsed');
    if (main) main.classList.remove('rail-only');
  }

  // Navegación desde la barra de iconos o desde los nombres: despliega el panel y dirige a la sección
  function irASeccion(key) {
    switch (key) {
      case 'Pendiente': cambiarBandeja('Pendiente'); break;
      case 'EnProceso': cambiarBandeja('En Proceso'); break;
      case 'Completado': cambiarBandeja('Completado'); break;
      case 'Desestimados': cambiarBandeja('Desestimados'); break;
      case 'Estadisticas': mostrarVistaEstadisticas(); break;
      case 'PanelCasos': mostrarVistaPanelCasos(); break;
      case 'Calendario': mostrarVistaBaseDashboard(); break;
      case 'RegistroPersonal': mostrarVistaRegistroPersonal(); break;
    }
    document.querySelectorAll('.menu-item[data-sec]').forEach(b => b.classList.remove('active'));
    const rb = document.querySelector('.menu-item[data-sec="' + key + '"]');
    if (rb) rb.classList.add('active');
    // Sincronizar bottom nav móvil
    const mobKeys = ['Pendiente','PanelCasos','Estadisticas','Calendario','RegistroPersonal'];
    document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
    if (mobKeys.indexOf(key) !== -1) {
      const mb = document.getElementById('mobnav-' + key);
      if (mb) mb.classList.add('active');
    }
    // Cerrar drawer si está abierto
    if (window.innerWidth <= 768) _cerrarMobileDrawer();
  }

  function toggleMobileDrawer() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileDrawerOverlay');
    if (!sidebar) return;
    if (sidebar.classList.contains('mobile-open')) {
      _cerrarMobileDrawer();
    } else {
      sidebar.classList.add('mobile-open');
      if (overlay) overlay.classList.add('active');
    }
  }

  function _cerrarMobileDrawer() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileDrawerOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }

  function toggleSidebar() { toggleNamesPanel(); }

  // ===== MOBILE APP =====
  let _mobSeccionActual = 'casos';
  let _mobFiltroCasos = 'Pendiente';

  function irASeccionMobile(key) {
    _mobSeccionActual = key;
    document.querySelectorAll('.mob-view').forEach(v => { v.style.display = 'none'; });
    const vistaMap = { casos: 'mobVistaCasos', stats: 'mobVistaStats', agenda: 'mobVistaAgenda', perfil: 'mobVistaPerfil' };
    const el = document.getElementById(vistaMap[key]);
    if (el) el.style.display = 'flex';
    document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('mobnav-mob-' + key);
    if (btn) btn.classList.add('active');
    if (key === 'casos') _renderMobCasos();
    else if (key === 'stats') _renderMobStats();
    else if (key === 'agenda') _renderMobAgenda();
    else if (key === 'perfil') _renderMobPerfil();
  }

  function mobSetFiltro(filtro) {
    _mobFiltroCasos = filtro;
  }

  function _renderMobCasos() {
    // Siempre muestra la vista de resumen al llamarse
    mobVolverResumen();
    _renderMobResumen();
  }

  function _renderMobSaludo() {
    const container = document.getElementById('mobSaludoBloque');
    if (!container) return;
    const nombre = sessionStorage.getItem('sislabNombre') || '—';
    const rol = sessionStorage.getItem('sislabRol') || '—';
    const rolColores = {
      'Supervisor': { bg: '#fef3c7', color: '#92400e' },
      'Ejecutivo':  { bg: '#ede9f8', color: '#2b1070' },
      'Medico':     { bg: '#ecfdf5', color: '#065f46' }
    };
    const rc = rolColores[rol] || { bg: '#f1f5f9', color: '#475569' };
    container.innerHTML =
      '<div style="background:linear-gradient(135deg,#2b1070,#4f46e5);border-radius:18px;padding:18px 20px;display:flex;align-items:center;gap:14px;">' +
        '<div style="width:46px;height:46px;background:rgba(255,255,255,0.15);border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<i class="far fa-user" style="font-size:20px;color:white;"></i>' +
        '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-size:12px;color:rgba(255,255,255,0.65);font-weight:600;margin-bottom:2px;">Bienvenido</div>' +
          '<div style="font-size:16px;font-weight:800;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + nombre + '</div>' +
        '</div>' +
        '<span style="background:' + rc.bg + ';color:' + rc.color + ';font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;white-space:nowrap;flex-shrink:0;">' + rol + '</span>' +
      '</div>';
  }

  function _mobFiltrarEstado(lista, key) {
    if (key === 'Pendiente')    return lista.filter(function(p) { return p.estado === 'Pendiente'; });
    if (key === 'En Proceso')   return lista.filter(function(p) { return p.estado && p.estado.startsWith('En Proceso'); });
    if (key === 'Completado')   return lista.filter(function(p) { return p.estado === 'Completado' && (p.subEstado || '').toLowerCase().trim() !== 'desestimado'; });
    if (key === 'Desestimado')  return lista.filter(function(p) { return p.estado === 'Completado' && (p.subEstado || '').toLowerCase().trim() === 'desestimado'; });
    return lista;
  }

  function _renderMobResumen() {
    _renderMobSaludo();
    const container = document.getElementById('mobTarjetasResumen');
    if (!container) return;
    const bd = bdPacientes || [];
    const estados = [
      { key: 'Pendiente',   label: 'Pendiente',   icon: 'fas fa-clock',        color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
      { key: 'En Proceso',  label: 'En Proceso',  icon: 'fas fa-spinner',      color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
      { key: 'Completado',  label: 'Completado',  icon: 'fas fa-check-circle', color: '#10b981', bg: '#f0fdf4', border: '#bbf7d0' },
      { key: 'Desestimado', label: 'Desestimado', icon: 'fas fa-ban',          color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' }
    ];
    container.innerHTML = estados.map(function(e) {
      const cnt = _mobFiltrarEstado(bd, e.key).length;
      return '<div class="mob-resumen-card" onclick="mobAbrirLista(\'' + e.key + '\')" style="background:' + e.bg + ';border:2px solid ' + e.border + ';border-radius:18px;padding:20px 16px;cursor:pointer;transition:transform .15s ease;display:flex;flex-direction:column;gap:10px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="width:42px;height:42px;background:' + e.color + '20;border-radius:12px;display:flex;align-items:center;justify-content:center;">' +
            '<i class="' + e.icon + '" style="font-size:18px;color:' + e.color + ';"></i>' +
          '</div>' +
          '<i class="fas fa-chevron-right" style="font-size:12px;color:#94a3b8;"></i>' +
        '</div>' +
        '<div style="font-size:36px;font-weight:900;color:' + e.color + ';line-height:1;">' + cnt + '</div>' +
        '<div style="font-size:13px;font-weight:700;color:#475569;">' + e.label + '</div>' +
      '</div>';
    }).join('');
  }

  function mobAbrirLista(estado) {
    _mobFiltroCasos = estado;
    document.getElementById('mobSubResumen').style.display = 'none';
    const subLista = document.getElementById('mobSubLista');
    subLista.style.display = 'flex';
    const titulo = document.getElementById('mobListaTitulo');
    if (titulo) titulo.textContent = estado;
    _renderMobLista();
  }

  function mobVolverResumen() {
    const subLista = document.getElementById('mobSubLista');
    const subResumen = document.getElementById('mobSubResumen');
    if (subLista) subLista.style.display = 'none';
    if (subResumen) subResumen.style.display = 'flex';
    const inp = document.getElementById('mobBuscarPaciente');
    if (inp) inp.value = '';
  }

  function _renderMobLista() {
    const container = document.getElementById('mobListaCasos');
    if (!container) return;
    const busqueda = (document.getElementById('mobBuscarPaciente') ? document.getElementById('mobBuscarPaciente').value : '').toLowerCase().trim();
    const porEstado = _mobFiltrarEstado(bdPacientes || [], _mobFiltroCasos);
    const lista = porEstado.filter(function(p) {
      return !busqueda ||
        (p.nombre && p.nombre.toLowerCase().includes(busqueda)) ||
        (p.dni != null && p.dni.toString().includes(busqueda));
    });
    if (lista.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:48px 0;color:#94a3b8;"><i class="fas fa-inbox" style="font-size:36px;margin-bottom:12px;display:block;"></i><span style="font-size:14px;font-weight:600;">Sin resultados</span></div>';
      return;
    }
    const colores = { 'Pendiente': '#f59e0b', 'En Proceso': '#3b82f6', 'Completado': '#10b981', 'Desestimado': '#6b7280' };
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    container.innerHTML = lista.map(function(p) {
      const color = colores[p.estado] || '#94a3b8';
      const fechaVenc = p.vencimiento ? new Date(p.vencimiento + 'T00:00:00') : null;
      const venc = fechaVenc ? fechaVenc.toLocaleDateString('es', { day: '2-digit', month: 'short' }) : '—';
      const esVencido = fechaVenc && fechaVenc < hoy && p.estado === 'Pendiente';
      return '<div class="mob-caso-card" onclick="mobVerPaciente(\'' + (p.id || p.dni) + '\')">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">' +
          '<div style="font-size:15px;font-weight:700;color:#1e293b;flex:1;margin-right:8px;line-height:1.3;">' + (p.nombre || '—') + '</div>' +
          '<span style="background:' + color + '20;color:' + color + ';font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;white-space:nowrap;flex-shrink:0;">' + p.estado + '</span>' +
        '</div>' +
        '<div style="display:flex;gap:14px;font-size:12px;color:#64748b;flex-wrap:wrap;">' +
          '<span><i class="fas fa-id-card" style="margin-right:4px;color:#94a3b8;"></i>' + (p.dni || '—') + '</span>' +
          '<span style="color:' + (esVencido ? '#ef4444' : 'inherit') + '"><i class="fas fa-calendar-day" style="margin-right:4px;color:' + (esVencido ? '#ef4444' : '#94a3b8') + ';"></i>' + venc + '</span>' +
          (p.seguro ? '<span><i class="fas fa-shield-alt" style="margin-right:4px;color:#94a3b8;"></i>' + p.seguro + '</span>' : '') +
        '</div>' +
      '</div>';
    }).join('');
  }

  function mobVerPaciente(id) {
    abrirModalLectura(id);
  }

  function _renderMobStats() {
    const container = document.getElementById('mobStatsContenido');
    if (!container) return;
    const hoy = new Date();
    const mes = hoy.getMonth(); const anio = hoy.getFullYear();
    const delMes = (bdPacientes || []).filter(p => {
      if (!p.fechaCreacion) return false;
      const partes = p.fechaCreacion.toString().split(' ')[0].split('/');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) - 1 === mes && parseInt(partes[2], 10) === anio;
    });
    const completados = delMes.filter(p => p.estado === 'Completado' || p.estado === 'Desestimado').length;
    const pendientes = (bdPacientes || []).filter(p => p.estado === 'Pendiente').length;
    const enProceso = (bdPacientes || []).filter(p => p.estado === 'En Proceso' || (p.estado || '').startsWith('En Proceso')).length;
    const pct = delMes.length > 0 ? Math.round(completados / delMes.length * 100) : 0;
    const seguroCount = {};
    (bdPacientes || []).forEach(p => { if (p.seguro) seguroCount[p.seguro] = (seguroCount[p.seguro] || 0) + 1; });
    const topSeguros = Object.entries(seguroCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const coloresSeg = ['#2b1070', '#4f46e5', '#818cf8'];
    const totalAll = (bdPacientes || []).length || 1;
    container.innerHTML =
      '<div style="font-size:18px;font-weight:800;color:#1e293b;margin-bottom:16px;">Resumen del Mes</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">' +
        '<div style="background:white;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(15,23,42,.07);border-left:4px solid #2b1070;">' +
          '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">Total del Mes</div>' +
          '<div style="font-size:36px;font-weight:900;color:#2b1070;">' + delMes.length + '</div>' +
        '</div>' +
        '<div style="background:white;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(15,23,42,.07);border-left:4px solid #10b981;">' +
          '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">Cerrados</div>' +
          '<div style="font-size:36px;font-weight:900;color:#10b981;">' + completados + '</div>' +
        '</div>' +
        '<div style="background:white;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(15,23,42,.07);border-left:4px solid #f59e0b;">' +
          '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">Pendientes</div>' +
          '<div style="font-size:36px;font-weight:900;color:#f59e0b;">' + pendientes + '</div>' +
        '</div>' +
        '<div style="background:white;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(15,23,42,.07);border-left:4px solid #3b82f6;">' +
          '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">En Proceso</div>' +
          '<div style="font-size:36px;font-weight:900;color:#3b82f6;">' + enProceso + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="background:white;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(15,23,42,.07);margin-bottom:14px;">' +
        '<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:12px;">Progreso de Cierres</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
          '<span style="font-size:13px;font-weight:600;color:#475569;">' + completados + ' de ' + delMes.length + ' casos</span>' +
          '<span style="font-size:20px;font-weight:900;color:#2b1070;">' + pct + '%</span>' +
        '</div>' +
        '<div style="width:100%;height:10px;background:#e2e8f0;border-radius:50px;overflow:hidden;">' +
          '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#2b1070,#4f46e5);border-radius:50px;transition:width .6s ease;"></div>' +
        '</div>' +
      '</div>' +
      (topSeguros.length ?
        '<div style="background:white;border-radius:16px;padding:18px;box-shadow:0 2px 10px rgba(15,23,42,.07);">' +
          '<div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:14px;">Top Seguros</div>' +
          topSeguros.map(function(entry, i) {
            const seg = entry[0]; const cnt = entry[1];
            const pctSeg = Math.round(cnt / totalAll * 100);
            return '<div style="margin-bottom:14px;">' +
              '<div style="display:flex;justify-content:space-between;margin-bottom:5px;">' +
                '<span style="font-size:13px;font-weight:600;color:#1e293b;">' + seg + '</span>' +
                '<span style="font-size:13px;font-weight:700;color:#2b1070;">' + cnt + '</span>' +
              '</div>' +
              '<div style="width:100%;height:7px;background:#e2e8f0;border-radius:50px;overflow:hidden;">' +
                '<div style="height:100%;width:' + pctSeg + '%;background:' + (coloresSeg[i] || '#94a3b8') + ';border-radius:50px;"></div>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' : '');
  }

  function _renderMobAgenda() {
    const container = document.getElementById('mobAgendaContenido');
    if (!container) return;
    const lista = typeof pacientesProgramados !== 'undefined' ? pacientesProgramados : [];
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const proximos = lista.filter(function(e) {
      const f = e.fechaCita ? new Date(e.fechaCita) : null;
      return f && f >= hoy;
    }).sort(function(a, b) { return new Date(a.fechaCita) - new Date(b.fechaCita); }).slice(0, 20);
    container.innerHTML =
      '<div style="font-size:18px;font-weight:800;color:#1e293b;margin-bottom:16px;">Próximos Eventos</div>' +
      (proximos.length === 0 ?
        '<div style="text-align:center;padding:48px 0;color:#94a3b8;"><i class="fas fa-calendar-times" style="font-size:36px;margin-bottom:12px;display:block;"></i><span style="font-size:14px;font-weight:600;">Sin eventos próximos</span></div>' :
        proximos.map(function(e) {
          const fecha = e.fechaCita ? new Date(e.fechaCita).toLocaleDateString('es', { weekday: 'short', day: '2-digit', month: 'short' }) : '—';
          return '<div style="background:white;border-radius:14px;padding:16px 18px;margin-bottom:10px;box-shadow:0 2px 8px rgba(15,23,42,.07);border-left:4px solid #2b1070;display:flex;align-items:center;gap:14px;">' +
            '<div style="flex-shrink:0;width:44px;height:44px;background:#ede9f8;border-radius:12px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-calendar-check" style="color:#2b1070;font-size:18px;"></i></div>' +
            '<div style="flex:1;min-width:0;">' +
              '<div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (e.nombre || '—') + '</div>' +
              '<div style="font-size:12px;color:#64748b;">' + fecha + (e.hora ? ' · ' + e.hora : '') + '</div>' +
            '</div>' +
          '</div>';
        }).join('')
      );
  }

  function _renderMobPerfil() {
    const container = document.getElementById('mobPerfilContenido');
    if (!container) return;
    const nombre = sessionStorage.getItem('sislabNombre') || '—';
    const rol = sessionStorage.getItem('sislabRol') || '—';
    const usuario = sessionStorage.getItem('sislabUsuario') || '—';
    const total = (bdPacientes || []).length;
    const misRegistros = (bdPacientes || []).filter(function(p) { return p.ejecutivo === nombre || p.ejecutivo === usuario; }).length;
    container.innerHTML =
      '<div style="text-align:center;margin-bottom:24px;padding-top:8px;">' +
        '<div style="width:80px;height:80px;background:linear-gradient(135deg,#2b1070,#4f46e5);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;box-shadow:0 4px 16px rgba(43,16,112,.3);">' +
          '<i class="fas fa-user" style="font-size:32px;color:white;"></i>' +
        '</div>' +
        '<div style="font-size:20px;font-weight:800;color:#1e293b;">' + nombre + '</div>' +
        '<div style="font-size:13px;color:#64748b;margin-top:6px;">' + usuario + ' · <span style="background:#ede9f8;color:#2b1070;padding:2px 10px;border-radius:20px;font-weight:700;">' + rol + '</span></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">' +
        '<div style="background:white;border-radius:16px;padding:18px;text-align:center;box-shadow:0 2px 8px rgba(15,23,42,.07);">' +
          '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">Mis Registros</div>' +
          '<div style="font-size:34px;font-weight:900;color:#2b1070;">' + misRegistros + '</div>' +
        '</div>' +
        '<div style="background:white;border-radius:16px;padding:18px;text-align:center;box-shadow:0 2px 8px rgba(15,23,42,.07);">' +
          '<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;">Total Sistema</div>' +
          '<div style="font-size:34px;font-weight:900;color:#475569;">' + total + '</div>' +
        '</div>' +
      '</div>' +
      '<button onclick="cerrarSesion()" style="width:100%;padding:16px;background:#fee2e2;border:none;border-radius:16px;font-size:15px;font-weight:700;color:#dc2626;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;">' +
        '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión' +
      '</button>';
  }

  function _actualizarVistaMobile() {
    if (!document.body.classList.contains('mobile-view')) return;
    if (_mobSeccionActual === 'casos') _renderMobCasos();
    else if (_mobSeccionActual === 'stats') _renderMobStats();
    else if (_mobSeccionActual === 'agenda') _renderMobAgenda();
  }
  // ===== FIN MOBILE APP =====

  function cargarDatosDelServidor(silente) {
    if (!silente) mostrarCargandoTabla();
    google.script.run
      .withSuccessHandler(function(pacientes) {
        const _prevPac = _snapshot.pacientes;
        bdPacientes = pacientes;
        console.log(bdPacientes);
        const _storedPac = parseInt(localStorage.getItem('sislab_snap_pac') || '-1', 10);
        if (_prevPac >= 0 && pacientes.length > _prevPac) {
          const n = pacientes.length - _prevPac;
          agregarNotificacion(n === 1 ? 'Se agregó 1 nuevo caso' : `Se agregaron ${n} nuevos casos`, 'fas fa-user-plus');
        } else if (_prevPac < 0 && _storedPac >= 0 && pacientes.length > _storedPac) {
          const n = pacientes.length - _storedPac;
          agregarNotificacion(n === 1 ? 'Se agregó 1 nuevo caso desde tu última sesión' : `Se agregaron ${n} nuevos casos desde tu última sesión`, 'fas fa-user-plus');
        }
        _snapshot.pacientes = pacientes.length;
        localStorage.setItem('sislab_snap_pac', pacientes.length);

        /* TOTAL PACIENTES */
        document.getElementById('numeroTotalAbsoluto').textContent = bdPacientes.length;

        /* TOTAL PACIENTES DEL MES EN CURSO */
        const ahoraMes = new Date();
        const mesActual = ahoraMes.getMonth();
        const anioActual = ahoraMes.getFullYear();
        const totalMes = bdPacientes.filter(p => {
          if (!p.fechaCreacion) return false;
          // fechaCreacion viene como "dd/MM/yyyy HH:mm"
          const partes = p.fechaCreacion.toString().split(' ')[0].split('/');
          if (partes.length < 3) return false;
          const mes = parseInt(partes[1], 10) - 1;
          const anio = parseInt(partes[2], 10);
          return mes === mesActual && anio === anioActual;
        }).length;
        const elTotalMes = document.getElementById('numeroTotalMes');
        if (elTotalMes) elTotalMes.textContent = totalMes;

        /* FECHA ACTUAL */
        const hoy = new Date();
        hoy.setHours(0,0,0,0);

        /* MAÑANA */
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);

        /* PACIENTES VENCIDOS */
        const pacientesVencidos = bdPacientes.filter(p => {
          if (p.estado !== 'Pendiente') return false;
          if (!p.vencimiento) return false;
          const fechaVencimiento = new Date(p.vencimiento);
          fechaVencimiento.setHours(0,0,0,0);
          return (fechaVencimiento < hoy);
        }).length;

        /* PACIENTES POR VENCER */
        const pacientesPorVencer = bdPacientes.filter(p => {
          if (p.estado !== 'Pendiente') return false;
          if (!p.vencimiento) return false;
          const fechaManana = manana.toISOString().split('T')[0];
          return (p.vencimiento === fechaManana);
        }).length;

        /* ACTUALIZAR CARD */
        document.getElementById('numeroPorVencer').textContent = pacientesVencidos;
        document.getElementById('numeroPendientesPorVencer').textContent = pacientesPorVencer;

        /* ===== CARD VENCIDOS ===== */
        const cardVencidos = document.getElementById('cardVencidos');
        if (pacientesVencidos > 0) {
          cardVencidos.classList.add('card-vencidos-activo');
        } else {
          cardVencidos.classList.remove('card-vencidos-activo');
        }

        /* ===== CARD POR VENCER ===== */
        const cardPorVencer = document.getElementById('cardPorVencer');
        if (pacientesPorVencer > 0) {
          cardPorVencer.classList.add('card-por-vencer-activo');
        } else {
          cardPorVencer.classList.remove('card-por-vencer-activo');
        }

        cambiarBandeja(bandejaActual);
        actualizarNotificacionCampana(pacientesVencidos, pacientesPorVencer);

        // Refrescar panel médico si hay búsqueda activa
        const inputMedico = document.getElementById('inputBuscadorMedico');
        if (inputMedico && inputMedico.value.trim() !== '') {
          buscarMedicoEstadisticas();
        }
        // NUEVO: Rellenar el panel de casos de Junio
        renderizarPacientesJunio();
        // Actualizar barra de progreso de casos cerrados (sidebar)
        actualizarProgresoCasos();
        // Verificar y mover programaciones vencidas
        google.script.run.moverProgramacionesVencidas();
        // Actualizar vista mobile con datos frescos
        _actualizarVistaMobile();
      })
      .withFailureHandler(function(err) {
        console.error("Error al cargar pacientes:", err);
        document.getElementById('cuerpoTabla').innerHTML = `<tr><td colspan="7" class="text-center text-danger py-4">Error al cargar datos del servidor.</td></tr>`;
      })
      .obtenerPacientes();
  }

  function actualizarNotificacionCampana(vencidos, porVencer) {
    const pendientes = (bdPacientes || []).filter(p => p.estado === 'Pendiente' || (p.estado || '').startsWith('En Proceso')).length;
    const agendados = (typeof pacientesProgramados !== 'undefined' ? pacientesProgramados : []).length;
    _notifData = { vencidos, porVencer, pendientes, agendados };
    _notifDismissed = false;

    const btn = document.getElementById('btnCampana');
    const dot = document.getElementById('bellDot');
    if (!btn || !dot) return;
    const hayNotificaciones = vencidos > 0 || porVencer > 0 || pendientes > 0 || agendados > 0;
    if (hayNotificaciones) {
      dot.style.display = 'block';
      if (!btn.dataset.animado) {
        btn.dataset.animado = '1';
        setTimeout(() => {
          btn.classList.add('bell-shake');
          btn.addEventListener('animationend', () => btn.classList.remove('bell-shake'), { once: true });
        }, 600);
      }
    } else {
      dot.style.display = 'none';
    }
    // Si el panel está abierto, re-renderizarlo con los datos actualizados
    const _panel = document.getElementById('panelNotificaciones');
    if (_panel && _panel.dataset.abierto === 'true') renderPanelNotificaciones();
  }

  // Barra de progreso del sidebar: % de casos cerrados (Completados, sea lectura realizada o desestimados)
  function actualizarProgresoCasos() {
    const barra = document.getElementById('progresoCasosBarra');
    const pct = document.getElementById('progresoCasosPct');
    if (!barra || !pct) return;
    const total = (bdPacientes || []).length;
    const cerrados = (bdPacientes || []).filter(p => p.estado === 'Completado').length;
    const porcentaje = total > 0 ? Math.round((cerrados / total) * 100) : 0;
    barra.style.width = porcentaje + '%';
    pct.textContent = porcentaje + '%';
  }

  function cargarListasDesplegables() {
    google.script.run
      .withSuccessHandler(function(listas) {
        ejecutivosDatosPin = listas.ejecutivosConPin || []; // Lista COMPLETA (incluye supervisores) para validar PINs

        rellenarSelect('ejecutivo', listas.ejecutivos);
        rellenarSelect('seguro', listas.seguros);

        // MÉDICO SOLICITANTE
        const selectMedico = document.getElementById('medico');
        selectMedico.innerHTML = '<option value="">-- Seleccionar --</option>';
        medicosEspecialidades = listas.medicos;
        // Datos para gráficos/conteos/tabla de personal: SIN supervisores
        ejecutivosData = (listas.ejecutivosConPin || []).filter(e => (e.rol || '') !== 'Supervisor');
        const _curMed  = (listas.medicos || []).length;
        const _curEjec = (listas.ejecutivosConPin || []).length;
        const _storedMed  = parseInt(localStorage.getItem('sislab_snap_med')  || '-1', 10);
        const _storedEjec = parseInt(localStorage.getItem('sislab_snap_ejec') || '-1', 10);
        if (_storedMed >= 0 && _curMed > _storedMed) {
          const n = _curMed - _storedMed;
          agregarNotificacion(n === 1 ? 'Se agregó 1 nuevo médico desde tu última sesión' : `Se agregaron ${n} nuevos médicos desde tu última sesión`, 'fas fa-user-md');
        }
        if (_storedEjec >= 0 && _curEjec > _storedEjec) {
          const n = _curEjec - _storedEjec;
          agregarNotificacion(n === 1 ? 'Se agregó 1 nuevo ejecutivo desde tu última sesión' : `Se agregaron ${n} nuevos ejecutivos desde tu última sesión`, 'fas fa-briefcase');
        }
        _snapshot.medicos    = _curMed;
        _snapshot.ejecutivos = _curEjec;
        localStorage.setItem('sislab_snap_med',  _curMed);
        localStorage.setItem('sislab_snap_ejec', _curEjec);
        listas.medicos.forEach(m => {
          let opt = document.createElement('option');
          opt.value = m.nombre;
          opt.textContent = m.nombre;
          selectMedico.appendChild(opt);
        });

        rellenarSelect('selectExamenes', listas.examenes);
        new TomSelect("#selectExamenes", {
          create: false,
          sortField: {
            field: "text",
            direction: "asc"
          },
          placeholder: "Buscar examen...",
          maxOptions: 500
        });

        // CARGAR PACIENTES
        cargarDatosDelServidor();
      })
      .withFailureHandler(err => console.error("Error cargando desplegables:", err))
      .obtenerListasDesplegables();
  }

  // Recarga TODAS las cachés globales desde el servidor y ejecuta un callback opcional.
  // Se usa tras agregar/editar/eliminar médicos o ejecutivos para que nada quede pegado.
  function recargarListasGlobales(callback) {
    google.script.run
      .withSuccessHandler(function(listas) {
        const _prevMed  = _snapshot.medicos;
        const _prevEjec = _snapshot.ejecutivos;
        ejecutivosDatosPin    = listas.ejecutivosConPin || []; // Completa (con supervisores) para PINs
        ejecutivosData        = (listas.ejecutivosConPin || []).filter(e => (e.rol || '') !== 'Supervisor'); // Sin supervisores
        medicosEspecialidades = listas.medicos || [];
        if (_prevMed >= 0 && medicosEspecialidades.length > _prevMed) {
          const n = medicosEspecialidades.length - _prevMed;
          agregarNotificacion(n === 1 ? 'Se agregó 1 nuevo médico' : `Se agregaron ${n} nuevos médicos`, 'fas fa-user-md');
        }
        if (_prevEjec >= 0 && ejecutivosData.length > _prevEjec) {
          const n = ejecutivosData.length - _prevEjec;
          agregarNotificacion(n === 1 ? 'Se agregó 1 nuevo ejecutivo' : `Se agregaron ${n} nuevos ejecutivos`, 'fas fa-briefcase');
        }
        _snapshot.medicos    = medicosEspecialidades.length;
        _snapshot.ejecutivos = ejecutivosData.length;
        localStorage.setItem('sislab_snap_med',  medicosEspecialidades.length);
        localStorage.setItem('sislab_snap_ejec', ejecutivosData.length);

        // Solo actualizar los dropdowns del formulario si el modal NO está abierto
        const _modalAbierto = document.getElementById('modalClinico') &&
                              document.getElementById('modalClinico').classList.contains('active');

        if (!_modalAbierto) {
          // Refrescar el desplegable "Ejecutivo que registra" conservando la selección actual
          const _selEjec = document.getElementById('ejecutivo');
          const _prevEjecVal = _selEjec ? _selEjec.value : '';
          rellenarSelect('ejecutivo', listas.ejecutivos);
          if (_prevEjecVal && _selEjec) _selEjec.value = _prevEjecVal;

          // Refrescar médicos respetando el filtro de especialidad activo y conservando la selección
          const _selMed = document.getElementById('medico');
          const _prevMedVal = _selMed ? _selMed.value : '';
          const _espActual = document.getElementById('especialidadFiltro') ? document.getElementById('especialidadFiltro').value : '';
          if (_espActual) {
            filtrarMedicosPorEspecialidad();
          } else if (_selMed) {
            _selMed.innerHTML = '<option value="">-- Seleccionar --</option>';
            (listas.medicos || []).forEach(function(m) {
              const opt = document.createElement('option');
              opt.value = m.nombre;
              opt.textContent = m.nombre;
              _selMed.appendChild(opt);
            });
          }
          if (_prevMedVal && _selMed) _selMed.value = _prevMedVal;
        }

        // Redibujar la tabla de pacientes para refrescar los badges de especialidad
        if (typeof renderizarTabla === 'function') renderizarTabla();

        if (typeof callback === 'function') callback();
      })
      .withFailureHandler(function(err) {
        console.error('Error recargando listas globales:', err);
        if (typeof callback === 'function') callback();
      })
      .obtenerListasDesplegables();
  }

  // Refresca cachés y reabre el modal de ejecutivos con datos frescos
  function refrescarEjecutivosYAbrir() {
    recargarListasGlobales(function() {
      abrirModalEjecutivos();
      if (typeof actualizarContadoresPersonal === 'function') actualizarContadoresPersonal();
      if (typeof renderizarEjecutivosBloque8 === 'function') renderizarEjecutivosBloque8();
    });
  }


  function rellenarSelect(idElemento, items) {
    const select = document.getElementById(idElemento);
    if(!select) return;
    select.innerHTML = '<option value="">-- Seleccionar --</option>';
    items.forEach(item => {
      let option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });
  }

  function filtrarMedicosPorEspecialidad() {
    const especialidad = document.getElementById('especialidadFiltro').value;
    const selectMedico = document.getElementById('medico');
    selectMedico.innerHTML = '<option value="">-- Seleccionar --</option>';
    document.getElementById('boxEspecialidad').style.display = "none";
    
    const filtrados = medicosEspecialidades.filter(m => {
      const esp = (m.especialidad || '').toLowerCase().trim();
      if (especialidad === 'Medico General') {
        return esp.includes('general');
      }
      if (especialidad === 'Pediatria') {
        return esp.includes('pedi');
      }
      return false;
    });
    
    filtrados.forEach(m => {
      const option = document.createElement('option');
      option.value = m.nombre;
      option.textContent = m.nombre;
      selectMedico.appendChild(option);
    });
  }

  function actualizarSeguroInyectado() {
    const val = document.getElementById('seguro').value;
    const box = document.getElementById('boxSeguro');
    const txt = document.getElementById('textSeguro');
    
    if(!val) {
      box.style.display = "none";
      return;
    }
    
    txt.textContent = val;
    box.className = "insurance-badge-box";
    const seguroNormalizado = val.toLowerCase().trim();
    
    box.style.backgroundColor = ''; box.style.borderColor = ''; box.style.color = ''; // Reset de seguridad 
    if (seguroNormalizado.includes('mapfre')) {
      box.classList.add('bg-seguro-rojo');
      box.style.backgroundColor = '#68000c';
      box.style.borderColor = '#68000c';
      box.style.color = '#ffffff';
    } else if (seguroNormalizado.includes('rimac')) {
      box.classList.add('bg-seguro-rojo');
    } else if (seguroNormalizado.includes('positiva')) {
      box.classList.add('bg-seguro-anaranjado');
    } else if (seguroNormalizado.includes('particular')) {
      box.classList.add('bg-seguro-verde');
    } else if (seguroNormalizado.includes('vip')) {
      box.classList.add('bg-seguro-dorado');
    } else {
      box.classList.add('bg-eps');
    }
    
    box.style.display = "inline-flex";
  }

  function actualizarEspecialidadDestino() {
    const val = document.getElementById('medico').value;
    const box = document.getElementById('boxEspecialidad');
    const txt = document.getElementById('textEspecialidad');
    
    if(!val) {
      box.style.display = "none";
      return;
    }
    
    const buscado = medicosEspecialidades.find(m => m.nombre === val);
    txt.textContent = buscado ? (buscado.especialidad || buscado.specialty || "No especificada") : "No especificada";
    
    box.classList.remove('bg-general', 'bg-pediatria');
    const espNormalizada = txt.textContent.toLowerCase();
    
    if (espNormalizada.includes('pediatra') || espNormalizada.includes('pediatría') || espNormalizada.includes('pediatria')) {
      box.classList.add('bg-pediatria');
    } else {
      box.classList.add('bg-general');
    }
    
    box.style.display = "inline-flex";
  }

  function obtenerEspecialidadMedico(nombreMedico){
    if(!nombreMedico){
      return "No especificada";
    }
    const medicoEncontrado = medicosEspecialidades.find(m => m.nombre === nombreMedico);
    if(!medicoEncontrado){
      return "No especificada";
    }
    return medicoEncontrado.especialidad || "No especificada";
  }

  function toggleBuscadorBandeja() {
    const input = document.getElementById('inputBuscar');
    if (!input) return;
    if (input.dataset.abierto === 'true') {
      input.style.width = '0';
      input.style.opacity = '0';
      input.style.padding = '0';
      input.value = '';
      input.dataset.abierto = 'false';
      if (typeof filtrarPacientes === 'function') filtrarPacientes();
    } else {
      input.style.width = '230px';
      input.style.opacity = '1';
      input.style.padding = '0 14px';
      input.dataset.abierto = 'true';
      setTimeout(() => input.focus(), 160);
    }
  }

  function cerrarBuscadorBandeja() {
    const input = document.getElementById('inputBuscar');
    if (!input || input.dataset.abierto !== 'true') return;
    // Auto-ocultar al perder foco solo si no hay búsqueda activa (para no perder el filtro)
    if (input.value.trim() !== '') return;
    input.style.width = '0';
    input.style.opacity = '0';
    input.style.padding = '0';
    input.dataset.abierto = 'false';
  }

  function cambiarBandeja(nombreBandeja) {
    bandejaActual = nombreBandeja;
    paginaActual = 1;

    // Restaurar topbar original si fue reemplazada
    const sc = document.getElementById('searchContainer');
    sc.style.display = 'flex';
    sc.style.margin = '';
    sc.style.padding = '';
    sc.style.background = '';
    sc.style.boxShadow = '';
    sc.style.borderRadius = '';
    sc.style.justifyContent = 'space-between';
    sc.style.gap = '12px';
    if (!document.getElementById('searchPillBandeja')) {
      sc.innerHTML = `
        <div class="saludo-bloque">
          <div class="saludo-icon" onclick="toggleMenuUsuario(event)" style="cursor:pointer;"><i class="far fa-user"></i></div>
          <div class="saludo-texts">
            <span class="welcome-text">Bienvenido</span>
            <span class="saludo-sub">Dashboard de Registro de Pacientes de Laboratorio</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; margin-left:auto;">
          <div id="searchPillBandeja" style="flex:0 0 auto; display:flex; align-items:center; gap:6px; background:transparent; box-shadow:none; padding:0;">
            <input type="text" id="inputBuscar" class="search-bar-input" placeholder="Buscar paciente o caso..." oninput="filtrarPacientes()" onblur="setTimeout(cerrarBuscadorBandeja, 150)" data-abierto="false" style="height:40px; width:0; opacity:0; padding:0; margin-right:0; border:none; border-radius:40px; outline:none; color:#334155; font-size:14px; background:white; box-sizing:border-box; overflow:hidden; transition:all 0.3s ease;">
            <button onclick="toggleBuscadorBandeja()" title="Buscar" class="btn-icon-action" style="flex:0 0 auto; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; background:var(--accent); box-shadow:0 6px 14px rgba(0,78,224,0.28); color:var(--on-accent); display:flex; align-items:center; justify-content:center; font-size:14px; transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <button onclick="cargarDatosDelServidor()" title="Actualizar Datos" class="btn-icon-action" style="flex:0 0 auto; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; background:var(--accent); color:var(--on-accent); display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 6px 14px rgba(0,78,224,0.28); transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
            <i class="fas fa-sync-alt"></i>
          </button>
          <button id="btnCampana" title="Notificaciones" onclick="togglePanelNotificaciones(event)" class="btn-icon-action" style="flex:0 0 auto; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; background:var(--accent); color:var(--on-accent); display:flex; align-items:center; justify-content:center; font-size:15px; box-shadow:0 6px 14px rgba(0,78,224,0.28); transition:transform 0.2s ease; position:relative;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
            <i class="far fa-bell"></i>
            <span id="bellDot" class="bell-dot" style="display:none;"></span>
          </button>
        </div>
      `;
    }

    const _sp = document.getElementById('searchPillBandeja'); if (_sp) _sp.style.visibility = 'visible';
    aplicarSaludo();
    document.getElementById('vistaRegistroPersonal').style.display = 'none';
    document.getElementById('vistaBaseDashboard').style.display = 'none';
    document.getElementById('vistaPanelCasos').style.display = 'none';
    document.getElementById('vistaEstadisticas').style.display = 'none';
    document.querySelector('.table-card').style.display = 'block';
    document.querySelector('.cards-row-container').style.display = 'grid';
      
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    if(nombreBandeja === 'Desestimados') document.getElementById('menu-Desestimados').classList.add('active');
    if(nombreBandeja === 'Pendiente') document.getElementById('menu-Pendiente').classList.add('active');
    if(nombreBandeja === 'En Proceso') document.getElementById('menu-EnProceso').classList.add('active');
    if(nombreBandeja === 'Completado') document.getElementById('menu-Completado').classList.add('active');

    const titulo = document.getElementById('tituloBandeja');
    const tarjeta = document.getElementById('tarjetaContador');
    const etiqueta = document.getElementById('etiquetaContador');
    
    titulo.textContent = `Bandeja de Pacientes ${nombreBandeja === 'Completado' ? 'Completados' : nombreBandeja}`;
    etiqueta.textContent = `Pacientes ${nombreBandeja === 'Pendiente'? 'Pendientes': nombreBandeja === 'En Proceso'? 'En Proceso': nombreBandeja === 'Desestimados'? 'Desestimados': 'Completados'}`;
    
    if(nombreBandeja === 'Pendiente') {
      tarjeta.className = "counter-card border-left-pendiente";
      pacientesFiltrados = bdPacientes.filter(p => p.estado === 'Pendiente');
    } else if(nombreBandeja === 'En Proceso') {
      tarjeta.className = "counter-card border-left-proceso";
      pacientesFiltrados = bdPacientes.filter(p => p.estado && p.estado.startsWith('En Proceso'));
    } else if (nombreBandeja === 'Completado') {
      tarjeta.className = "counter-card border-left-resultados";
      pacientesFiltrados = bdPacientes.filter(p => p.estado === 'Completado' && ((p.subEstado || '').toLowerCase().trim() !== 'desestimado'));
    } else if (nombreBandeja === 'Desestimados') {
      tarjeta.className = "counter-card border-left-pendiente";
      pacientesFiltrados = bdPacientes.filter(p => p.estado === 'Completado' && ((p.subEstado || '').toLowerCase().trim() === 'desestimado'));
    }

    document.getElementById('numeroContador').textContent = pacientesFiltrados.length;
    const dotPendientes = document.getElementById('dotPendientes');
    if (dotPendientes) {
      if (nombreBandeja === 'Pendiente' && pacientesFiltrados.length === 0) {
        dotPendientes.style.background = '#10b981';
      } else if (nombreBandeja === 'Pendiente') {
        dotPendientes.style.background = '#dc3545';
      } else {
        dotPendientes.style.background = '';
      }
    }
    const inputBuscarEl = document.getElementById('inputBuscar');
    if (inputBuscarEl) inputBuscarEl.value = "";
    
    renderizarTabla();
  }

  function filtrarPacientes() {
    const busqueda = document.getElementById('inputBuscar').value.toLowerCase().trim();
    let universoBandeja = [];
    
    if(bandejaActual === 'Pendiente') {
      universoBandeja = bdPacientes.filter(p => p.estado === 'Pendiente');
    } else if(bandejaActual === 'En Proceso') {
      universoBandeja = bdPacientes.filter(p => p.estado && p.estado.startsWith('En Proceso'));
    } else if (bandejaActual === 'Completado') {
      universoBandeja = bdPacientes.filter(p => p.estado === 'Completado' && ((p.subEstado || '').toLowerCase().trim() !== 'desestimado'));
    } else if (bandejaActual === 'Desestimados') {
      universoBandeja = bdPacientes.filter(p => p.estado === 'Completado' && ((p.subEstado || '').toLowerCase().trim() === 'desestimado'));
    }
    
    if (busqueda === "") {
      pacientesFiltrados = universoBandeja;
    } else {
      pacientesFiltrados = universoBandeja.filter(p => 
        (p.nombre && p.nombre.toLowerCase().includes(busqueda)) || 
        (p.dni && p.dni.toString().includes(busqueda))
      );
    }
    paginaActual = 1;
    renderizarTabla();
  }

  function renderizarTabla() {
    const cuerpo = document.getElementById('cuerpoTabla');
    const encabezado = document.getElementById('encabezadoTabla');
    
    encabezado.innerHTML = `
      <th>Nombre Completo</th>
      <th>DNI / Documento</th>
      <th>Fecha Reg.</th>
      <th>Especialidad</th>
      <th>Seguro</th>
      <th>Estado / Sub-Estado</th>
      <th style="text-align: center;">Acciones</th>
    `;
    
    if (pacientesFiltrados.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="7" class="text-center py-4">No se encontraron registros en esta bandeja.</td></tr>`;
      actualizarControlesPaginacion(0);
      return;
    }

    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const sublista = pacientesFiltrados.slice(inicio, fin);

    let html = "";
    sublista.forEach(p => {
      let estadoTextoMostrar = p.estado || 'Pendiente';
      let estiloBadgePersonalizado = "";

      /* DETECTAR VENCIDOS */
      if (p.estado === 'Pendiente' && p.vencimiento) {
        const hoy = new Date();
        hoy.setHours(0,0,0,0);
        const fechaVencimiento = new Date(p.vencimiento);
        fechaVencimiento.setHours(0,0,0,0);
        
        if (fechaVencimiento < hoy) {
          estadoTextoMostrar = 'Vencido';
          estiloBadgePersonalizado = `
            style="background:#f50505; color:white; border:1px solid #f50505; font-weight:700;"
          `;
        }
      }

      const subEstadoPlano = p.subEstado || '';
      if (subEstadoPlano && ((p.estado || '').startsWith('En Proceso') || p.estado === 'Completado')) {
        estadoTextoMostrar = subEstadoPlano;
        const claveColor = subEstadoPlano.toLowerCase().trim();
        const hexColor = mapaColoresSemaforo[claveColor] || "#4b5563";
        estiloBadgePersonalizado = `
          style="background-color:${hexColor}; color:#ffffff; border:1px solid ${hexColor}; font-weight:600;"
        `;
      }

      let claseBadgeBase = "badge ";
      if (!estiloBadgePersonalizado) {
        claseBadgeBase += (p.estado === 'Pendiente') ? 'badge-danger' : 'badge-success';
      }

      html += `
        <tr>
          <td>
            <div class="patient-name-click" onclick="abrirModalLectura('${p.id || p.dni}')">
              ${p.nombre || ''}
            </div>
          </td>
          <td>${p.dni || ''}</td>
          <td style="white-space: nowrap; font-size: 13px; color: #475569;">${p.fechaCreacion || ''}</td>
          
          <td>
            <div class="specialty-badge-box ${obtenerEspecialidadMedico(p.medico).toLowerCase().includes('pedi') ? 'bg-pediatria' : 'bg-general'}" style="width: fit-content;">
              <i class="fas fa-user-md"></i>
              <span>${obtenerEspecialidadMedico(p.medico)}</span>
            </div>
          </td>

          <td>
            <div class="insurance-badge-box ${(p.seguro || '').toLowerCase().includes('rimac') ? 'bg-seguro-rojo' : (p.seguro || '').toLowerCase().includes('positiva') ? 'bg-seguro-anaranjado' : (p.seguro || '').toLowerCase().includes('particular') ? 'bg-seguro-verde' : (p.seguro || '').toLowerCase().includes('vip') ? 'bg-seguro-dorado' : 'bg-eps'}" style="width: fit-content; ${(p.seguro || '').toLowerCase().includes('mapfre') ? 'background-color:#68000c; color:white; border:1px solid #68000c;' : ''}">
              <i class="fas fa-shield-alt"></i>
              <span>${p.seguro || 'Sin seguro'}</span>
            </div>
          </td>
          
          <td>
            <span class="${claseBadgeBase}" ${estiloBadgePersonalizado} title="${p.estado || ''}">
              ${estadoTextoMostrar}
            </span>
          </td>
          <td style="text-align: center;">
            <button class="btn-table-view" onclick="abrirModalLectura('${p.id || p.dni}')" title="Ver Detalle">
              <i class="fas fa-eye"></i> Ver detalle
            </button>
          </td>
        </tr>
      `;
    });

    cuerpo.innerHTML = html;
    actualizarControlesPaginacion(pacientesFiltrados.length);
  }

  function actualizarControlesPaginacion(totalRegistros) {
    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina) || 1;
    document.getElementById('infoPaginacion').textContent = `Página ${paginaActual} de ${totalPaginas}`;
    document.getElementById('btnAnterior').disabled = (paginaActual === 1);
    document.getElementById('btnSiguiente').disabled = (paginaActual === totalPaginas);
  }

  function cambiarPagina(direccion) {
    paginaActual += direccion;
    renderizarTabla();
  }

  function mostrarCargandoTabla() {
    document.getElementById('cuerpoTabla').innerHTML = `<tr><td colspan="7" class="text-center py-4">Cargando registros...</td></tr>`;
  }

  function agregarExamenPorDesplegable() {
    const select = document.getElementById('selectExamenes');
    const examenSeleccionado = select.value;
    if (!examenSeleccionado) return;
    
    if (examenesSeleccionados.includes(examenSeleccionado)) {
      Swal.fire({
        target: document.getElementById('modalClinico'),
        icon: 'warning',
        title: 'Examen ya seleccionado',
        text: `El examen "${examenSeleccionado}" ya se encuentra agregado en el cuadro inferior.`,
        confirmButtonColor: '#2b1070'
      });
      if (select.tomselect) {select.tomselect.clear();} else {select.value = "";}
      return;
    }

    examenesSeleccionados.push(examenSeleccionado);
    dibujarTagsExamenes();
    calcularPrecioTotalInyectado();
    if (select.tomselect) {select.tomselect.clear();} else {select.value = "";}
  }

  function removerExamenTag(index) {
    if(document.getElementById('btnGuardarFicha').style.display === "none") return;
    examenesSeleccionados.splice(index, 1);
    dibujarTagsExamenes();
    calcularPrecioTotalInyectado();
  }

  function dibujarTagsExamenes() {
    const contenedor = document.getElementById('contenedorTagsExamenes');
    contenedor.innerHTML = "";
    
    examenesSeleccionados.forEach((examen, index) => {
      const tag = document.createElement('div');
      tag.className = 'exam-tag';
      tag.innerHTML = `
        <span>${examen}</span>
        <button type="button" onclick="removerExamenTag(${index})">&times;</button>
      `;
      contenedor.appendChild(tag);
    });
  }

  function calcularPrecioTotalInyectado() {
    const costoPorExamen = 25.00;
    const total = examenesSeleccionados.length * costoPorExamen;
    document.getElementById('precioTotal').value = total.toFixed(2);
  }

  function abrirModalNuevo() {
    document.getElementById('modalTitulo').textContent = "Ficha de Registro Clínico (Nuevo)";
    document.getElementById('formularioPaciente').reset();
    document.getElementById('esEdicion').value = "false";
    document.getElementById('dniOriginal').value = "";
    document.getElementById('btnEliminarPaciente').style.display = "none";
    alternarBloqueoInputs(false);
    
    document.getElementById('btnGuardarFicha').style.display = "block";
    document.getElementById('btnModoLecturaEditar').style.display = "none";
    document.getElementById('selectExamenes').style.display = "block";
    document.getElementById('labelSelectExamenes').style.display = "block";
    
    examenesSeleccionados = [];
    dibujarTagsExamenes();
    document.getElementById('precioTotal').value = "0.00";
    
    document.getElementById('boxEspecialidad').style.display = "none";
    document.getElementById('boxSeguro').style.display = "none";
    document.getElementById('grupoEspecialidadFiltro').style.display = "block";
    
    configurarOpcionCompletado(false);
    document.getElementById('estado').value = "Pendiente";
    document.getElementById('especialidadFiltro').value = "";
    document.getElementById('medico').innerHTML ='<option value="">-- Seleccionar --</option>';
    subEstadoSeleccionado = "";
    medicoLectorSeleccionado = "";
    ejecutivoCierreSeleccionado = "";
    actualizarColorBadgeSubEstado('');
    
    document.getElementById('textoSubEstadoBadge').textContent = "Sub-Estado";
    document.getElementById('estado').disabled = true;
    document.getElementById('modalClinico').classList.add('active');
    actualizarCamposProceso();
  }


  function seleccionarSubEstado() {
    if (document.getElementById('estado').disabled) return;
    const estado = document.getElementById('estado').value;
    if (estado !== 'En Proceso') return;
    
    Swal.fire({
      target: document.getElementById('modalClinico'),
      title: '<div style="font-size:22px; font-weight:800; color:#2b1070;">Actualizar Estado</div>',
      width: 380,
      scrollbarPadding: false,
      confirmButtonColor: '#2b1070',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'OK',
      reverseButtons: true,
      didOpen: () => { mostrarSelectMedicoLector(); },
      html: `
        <div style="overflow:hidden; width:100%; padding-top:5px;">
          <select id="swalSubEstado" onchange="mostrarSelectMedicoLector()" style="width:100%; height:42px; border:1px solid #cbd5e1; border-radius:10px; padding:0 12px; font-size:14px; font-weight:500; outline:none; background:#fff; color:#334155; margin-bottom:12px; transition:all 0.2s;">
            <option value="-- Seleccionar Sub-Estado --" ${subEstadoSeleccionado === '-- Seleccionar Sub-Estado --' ? 'selected' : ''}>-- Seleccionar Sub-Estado --</option>
            <option value="Desestimado" ${subEstadoSeleccionado === 'Desestimado' ? 'selected' : ''}>Desestimado</option>
            <option value="Espera de resultados" ${subEstadoSeleccionado === 'Espera de resultados' ? 'selected' : ''}>Espera de resultados</option>
            <option value="Lectura programada" ${subEstadoSeleccionado === 'Lectura programada' ? 'selected' : ''}>Lectura programada</option>
            <option value="Lectura realizada" ${subEstadoSeleccionado === 'Lectura realizada' ? 'selected' : ''}>Lectura realizada</option>
            <option value="Lectura parcial" ${subEstadoSeleccionado === 'Lectura parcial' ? 'selected' : ''}>Lectura parcial</option>
            <option value="Cerrado por error" ${subEstadoSeleccionado === 'Cerrado por error' ? 'selected' : ''}>Cerrado por error</option>
            <option value="Recojo Parcial" ${subEstadoSeleccionado === 'Recojo Parcial' ? 'selected' : ''}>Recojo Parcial</option>
          </select>

          <div id="contenedorMotivoDesestimado" style="display:none; margin-top:10px;">
            <label style="display:block; font-size:13px; font-weight:700; color:#475569; margin-bottom:6px; text-align:left;">Ingresar motivo de desestimación</label>
            <textarea id="swalMotivoDesestimado" placeholder="Escriba el motivo..." style="width:100%; min-height:90px; border:1px solid #cbd5e1; border-radius:10px; padding:12px; font-size:14px; resize:none; outline:none; color:#334155;">${motivoDesestimacion || ''}</textarea>
          </div>

          <div id="contenedorMedicoLector" style="display:none; margin-top:10px;">
            <label style="display:block; font-size:13px; font-weight:700; color:#475569; margin-bottom:6px; text-align:left;">Médico Lector</label>
            <select id="swalMedicoLector" style="width:100%; height:42px; border:1px solid #cbd5e1; border-radius:10px; padding:0 12px; font-size:14px; font-weight:500; outline:none; background:#fff; color:#334155;"></select>
          </div>
          
          <div id="contenedorEjecutivoCierre" style="display:none; margin-top:10px;">
            <label style="display:block; font-size:13px; font-weight:700; color:#475569; margin-bottom:6px; text-align:left;">Ejecutivo de Cierre</label>
            <select id="swalEjecutivoCierre" style="width:100%; height:42px; border:1px solid #cbd5e1; border-radius:10px; padding:0 12px; font-size:14px; font-weight:500; outline:none; background:#fff; color:#334155;"></select>
          </div>

          <div id="contenedorPlantillaLectura" style="display:none; margin-top:15px; text-align:left;">
            <label style="display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:700; color:#475569; margin-bottom:6px;">
              <span>Datos del Paciente</span>
              <button type="button" onclick="copiarPlantillaLectura(event)" style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; padding:4px 8px; color:#2b1070; cursor:pointer; font-size:11px; font-weight:700; display:flex; gap:6px; align-items:center; transition:all 0.2s;"><i class="fas fa-copy"></i> Copiar</button>
            </label>
            <div style="background:#1e293b; color:#f8fafc; border-radius:8px; padding:12px; font-family:'Courier New', Courier, monospace; font-size:13px; line-height:1.6; position:relative; box-shadow:inset 0 2px 4px rgba(0,0,0,0.2);">
              <pre id="textoPlantillaLectura" style="margin:0; white-space:pre-wrap; word-wrap:break-word; font-family:inherit;"></pre>
            </div>
          </div>
          </div>
      `,
      preConfirm: () => {
        const subEstado = document.getElementById('swalSubEstado').value;
        const selectMedico = document.getElementById('swalMedicoLector');
        const selectEjecutivo = document.getElementById('swalEjecutivoCierre');
        const textareaMotivo = document.getElementById('swalMotivoDesestimado');
        
        const esLectura = (subEstado || '').toLowerCase().includes('lectura');
        const esLecturaRealizada = (subEstado || '').toLowerCase().trim() === 'lectura realizada';
        const esDesestimado = (subEstado || '').toLowerCase().trim() === 'desestimado';
        const requiereEjecutivo = esLecturaRealizada || esDesestimado;

        if (esLectura && (!selectMedico || !selectMedico.value)) {
          Swal.showValidationMessage('Seleccione un Médico Lector');
          return false;
        }
        if (requiereEjecutivo && (!selectEjecutivo || !selectEjecutivo.value)) {
          Swal.showValidationMessage('Seleccione un Ejecutivo de Cierre');
          return false;
        }

        return {
          subEstado: subEstado,
          medicoLector: esLectura && selectMedico ? selectMedico.value : "",
          ejecutivoCierre: requiereEjecutivo && selectEjecutivo ? selectEjecutivo.value : "",
          motivo: textareaMotivo ? textareaMotivo.value.trim() : "",
          esLecturaRealizada: esLecturaRealizada,
          requierePin: requiereEjecutivo
        };
      }
    }).then((result) => {
      if (!result.isConfirmed) return;

      const data = result.value;

      const aplicarCambiosLocales = () => {
        subEstadoSeleccionado = data.subEstado;
        medicoLectorSeleccionado = data.medicoLector;
        ejecutivoCierreSeleccionado = data.ejecutivoCierre;
        motivoDesestimacion = data.motivo;
        
        document.getElementById('textoSubEstadoBadge').textContent = data.subEstado;
        actualizarColorBadgeSubEstado(data.subEstado);
      };

      if (data.requierePin && data.ejecutivoCierre) {

        const datosEjecutivo = ejecutivosDatosPin.find(e => e.nombre === data.ejecutivoCierre);
        const pinCorrecto = datosEjecutivo ? datosEjecutivo.pin.toString().trim() : "";

        Swal.fire({
          target: document.getElementById('modalClinico'),
          title: '<div style="font-size:22px; font-weight:800; color:#2b1070; margin-bottom:0;"><i class="fas fa-lock" style="color:#818cf8; margin-right:8px;"></i>Autenticación</div>',
          html: `
            <style>
              .swal2-input.pin-input {
                display: block !important;
                width: 80% !important;
                max-width: 220px !important;
                box-sizing: border-box !important;
                margin: 20px auto 0 auto !important;
                text-align: center !important;
                letter-spacing: 3px !important; 
                font-family: Verdana, sans-serif !important; 
                font-size: 28px !important; 
                font-weight: 900 !important;
                color: #1e293b !important;
                -webkit-text-stroke: 5px #1e293b !important; 
                background-color: #f8fafc !important;
                border-radius: 12px !important;
                border: 2px solid #cbd5e1 !important;
                height: 60px !important;
                padding: 0 0 0 3px !important; 
                transition: all 0.3s ease !important;
                box-shadow: none !important;
              }
              .swal2-input.pin-input:focus {
                border-color: #818cf8 !important;
                background-color: #ffffff !important;
                box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.15) !important;
              }
            </style>
            <div style="font-size:14px; font-weight:500; color:#64748b; line-height:1.4; margin-top:5px;">
              Ingrese el PIN de seguridad de<br>
              <b style="color:#1e293b; font-size:16px; display:inline-block; margin-top:4px;">${data.ejecutivoCierre}</b>
            </div>
          `,
          input: 'password',
          customClass: {
            input: 'pin-input'
          },
          width: 340,
          padding: '1.5em',
          confirmButtonColor: '#2b1070',
          cancelButtonColor: '#64748b',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Verificar',
          reverseButtons: true,
          preConfirm: (pinIngresado) => {
            if (pinIngresado.trim() !== pinCorrecto) {
              Swal.showValidationMessage('PIN incorrecto. Intente nuevamente.');
              return false;
            }
            return pinIngresado;
          }
        }).then((pinResult) => {
          if (pinResult.isConfirmed) {
            aplicarCambiosLocales();
          }
        });

      } else {
        aplicarCambiosLocales();
      }
    });
  }

  function mostrarSelectMedicoLector() {
    const valor = document.getElementById('swalSubEstado').value;
    const contenedorMedico = document.getElementById('contenedorMedicoLector');
    const contenedorMotivo = document.getElementById('contenedorMotivoDesestimado');
    const contenedorEjecutivo = document.getElementById('contenedorEjecutivoCierre');
    
    const selectMedico = document.getElementById('swalMedicoLector');
    const selectEjecutivo = document.getElementById('swalEjecutivoCierre');
    
    const esLectura = (valor || '').toLowerCase().includes('lectura');
    const esLecturaRealizada = (valor || '').toLowerCase().trim() === 'lectura realizada';
    const esDesestimado = (valor || '').toLowerCase().trim() === 'desestimado';

    contenedorMotivo.style.display = esDesestimado ? "block" : "none";
    
    if (esLectura) {
      contenedorMedico.style.display = "block";
      selectMedico.innerHTML = '<option value="">-- Seleccionar --</option>';
      const especialidadPaciente = document.getElementById('especialidadFiltro').value;
      const medicosFiltrados = medicosEspecialidades.filter(m => {
        const esp = (m.especialidad || '').toLowerCase().trim();
        if (especialidadPaciente === 'Medico General') return esp.includes('general');
        if (especialidadPaciente === 'Pediatria') return esp.includes('pedi');
        return false;
      });
      medicosFiltrados.forEach(m => {
        const option = document.createElement('option');
        option.value = m.nombre;
        option.textContent = m.nombre;
        if (medicoLectorSeleccionado === m.nombre) option.selected = true;
        selectMedico.appendChild(option);
      });
    } else {
      contenedorMedico.style.display = "none";
    }

    // Mostrar y llenar Ejecutivo si es "Lectura realizada" o "Desestimado" (control de cierre)
    if (esLecturaRealizada || esDesestimado) {
      contenedorEjecutivo.style.display = "block";
      selectEjecutivo.innerHTML = '<option value="">-- Seleccionar --</option>';
      // Clonamos las opciones del selector principal de ejecutivos que ya existe en el sistema
      const mainEjecutivos = document.getElementById('ejecutivo').options;
      for (let i = 1; i < mainEjecutivos.length; i++) {
        const opt = document.createElement('option');
        opt.value = mainEjecutivos[i].value;
        opt.textContent = mainEjecutivos[i].text;
        if (ejecutivoCierreSeleccionado === mainEjecutivos[i].value) opt.selected = true;
        selectEjecutivo.appendChild(opt);
      }
    } else {
      contenedorEjecutivo.style.display = "none";
    }

    // NUEVA LÓGICA: Mostrar plantilla si es "Lectura programada" o "Lectura parcial"
    const contenedorPlantilla = document.getElementById('contenedorPlantillaLectura');
    const esPlantillaActiva = (valor === 'Lectura programada' || valor === 'Lectura parcial');
    
    if (contenedorPlantilla) {
      contenedorPlantilla.style.display = esPlantillaActiva ? "block" : "none";
      if (esPlantillaActiva) {
        // Obtenemos los datos directamente desde los casilleros de la ficha
        const nombre = document.getElementById('nombre').value || '-';
        const caso = document.getElementById('caso').value || '-';
        const telefono = document.getElementById('telefono').value || '-';
        const dni = document.getElementById('dni').value || '-';
        const examenes = examenesSeleccionados.length > 0 ? examenesSeleccionados.join(', ') : 'Ninguno';

        // Armamos el texto y lo inyectamos en la caja negra
        const plantilla = `NOMBRE: ${nombre}\nCASO: ${caso}\nTELEFONO: ${telefono}\nDNI: ${dni}\nEXAMENES: ${examenes}`;
        document.getElementById('textoPlantillaLectura').textContent = plantilla;
      }
    }
  }

  // Muestra la opción "Completado" en el select de estado SOLO cuando el caso ya está cerrado.
  // Al editar/crear un caso abierto, solo se ven "Pendiente" y "En Proceso".
  function configurarOpcionCompletado(mostrar) {
    const sel = document.getElementById('estado');
    if (!sel) return;
    let opt = sel.querySelector('option[value="Completado"]');
    if (mostrar) {
      if (!opt) {
        opt = document.createElement('option');
        opt.value = 'Completado';
        opt.textContent = 'Completado';
        sel.appendChild(opt);
      }
    } else if (opt) {
      opt.remove();
    }
  }

  function abrirModalLectura(idPaciente) {
    dniFichaActual = idPaciente;
    const p = bdPacientes.find(item => (item.id || item.dni).toString() === idPaciente.toString());
    if (!p) return;
    
    document.getElementById('modalTitulo').textContent = "Ficha del Paciente (Modo Lectura)";
    document.getElementById('esEdicion').value = "true";
    document.getElementById('dniOriginal').value = p.id || p.dni;
    document.getElementById('nombre').value = p.nombre || '';
    document.getElementById('dni').value = p.dni || '';
    document.getElementById('edad').value = p.edad || '';
    document.getElementById('telefono').value = p.telefono || '';
    document.getElementById('caso').value = p.caso || '';
    document.getElementById('grupoEspecialidadFiltro').style.display = "block";
    document.getElementById('textoSubEstadoBadge').textContent = 'Sub-Estado';
    
    subEstadoSeleccionado = "";
    medicoLectorSeleccionado = p.medicoLector || "";
    ejecutivoCierreSeleccionado = p.ejecutivoCierre || ""; // Carga el dato de la base

    let estadoBase = p.estado || 'Pendiente';
    configurarOpcionCompletado(estadoBase === 'Completado');
    if ((estadoBase && estadoBase.startsWith('En Proceso')) || estadoBase === 'Completado') {
      document.getElementById('estado').value = estadoBase.startsWith('En Proceso') ? 'En Proceso' : estadoBase;
      subEstadoSeleccionado = p.subEstado || "";
      medicoLectorSeleccionado = p.medicoLector || "";
      actualizarColorBadgeSubEstado(subEstadoSeleccionado);
      document.getElementById('textoSubEstadoBadge').textContent = subEstadoSeleccionado || 'Sub-Estado';
    } else {
      document.getElementById('estado').value = estadoBase;
    }

    document.getElementById('ejecutivo').value = p.ejecutivo || '';
    document.getElementById('seguro').value = p.seguro || '';

    // Repoblar el select de médicos con TODOS (por si quedó vacío tras abrir "Nuevo Registro"),
    // así el médico asignado siempre se puede seleccionar.
    const selMedicoLectura = document.getElementById('medico');
    selMedicoLectura.innerHTML = '<option value="">-- Seleccionar --</option>';
    (medicosEspecialidades || []).forEach(function(m) {
      const o = document.createElement('option');
      o.value = m.nombre;
      o.textContent = m.nombre;
      selMedicoLectura.appendChild(o);
    });

    document.getElementById('medico').value = p.medico || '';
    document.getElementById('especialidadFiltro').value = p.especialidad || '';
    document.getElementById('vencimiento').value = p.vencimiento || '';
    document.getElementById('observaciones').value = p.observaciones || '';
    document.getElementById('precioTotal').value = p.precioTotal || '0.00';
    
    examenesSeleccionados = p.listaExamenes ? [...p.listaExamenes] : [];
    dibujarTagsExamenes();
    actualizarEspecialidadDestino();
    actualizarSeguroInyectado();
    alternarBloqueoInputs(true);
    
    document.getElementById('estado').disabled = true;
    document.getElementById('btnGuardarFicha').style.display = "none";
    document.getElementById('btnModoLecturaEditar').style.display = "block";
    document.getElementById('selectExamenes').style.display = "none";
    document.getElementById('labelSelectExamenes').style.display = "none";

    document.getElementById('btnEliminarPaciente').innerHTML = '<i class="fas fa-trash"></i> Eliminar Paciente';
    document.getElementById('btnEliminarPaciente').style.background = '#dc2626';
    document.getElementById('btnEliminarPaciente').style.border = '1px solid #dc2626';
    document.getElementById('btnEliminarPaciente').onclick = eliminarPaciente;

    const esCompletado = p.estado === 'Completado';
    const esDesestimado = (p.subEstado || '').toLowerCase().trim() === 'desestimado';
    const ocultarEliminar = esCompletado || esDesestimado;

    document.getElementById('btnEliminarPaciente').style.display = ocultarEliminar ? "none" : "inline-flex";
    document.getElementById('btnModoLecturaEditar').style.display = esDesestimado ? "none" : "block";

    if (esCompletado) {
      document.getElementById('btnModoLecturaEditar').style.display = "none";
      document.getElementById('btnEliminarPaciente').style.display = "inline-flex";
      document.getElementById('btnEliminarPaciente').innerHTML = 'Detalle de Lectura';
      document.getElementById('btnEliminarPaciente').style.background = '#3b238f';
      document.getElementById('btnEliminarPaciente').style.border = '1px solid #3b238f';
      // En casos desestimados no hay médico lector ni especialidad
      const medicoLectorTexto = esDesestimado ? 'Sin registro' : (p.medicoLector || 'No asignado');
      const especialidadTexto = esDesestimado ? 'Sin registro' : obtenerEspecialidadMedico(p.medicoLector);
      document.getElementById('btnEliminarPaciente').onclick = function () {
        const esDark = document.body.classList.contains('dark');
        const popupBg     = esDark ? 'linear-gradient(160deg,#0D1428 0%,#0A0F1E 50%,#070C18 100%)' : '#ffffff';
        const tituloColor = esDark ? '#7BA7F5' : '#2b1070';
        const labelColor  = esDark ? '#5B6585' : '#475569';
        const fieldBg     = esDark ? '#1C2033' : '#f8fafc';
        const fieldBorder = esDark ? 'rgba(255,255,255,0.10)' : '#cbd5e1';
        const chipBg      = esDark ? '#252B45' : '#f1f5f9';
        const chipColor   = esDark ? '#C9D1E9' : '#334155';
        const btnColor    = esDark ? 'linear-gradient(135deg,#3B5FD9,#5B3DB8)' : '#2b1070';

        const chipStyle = `background:${chipBg}; color:${chipColor}; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:600;`;
        const fieldStyle = `background:${fieldBg}; border:1px solid ${fieldBorder}; border-radius:14px; padding:12px; min-height:34px; display:flex; align-items:center;`;

        const fechaCierreHtml = p.fechaCierre
          ? `<div style="display:flex; gap:8px; align-items:center; white-space:nowrap;">
               <span style="${chipStyle}">${new Date(p.fechaCierre).toLocaleDateString('es-PE')}</span>
               <span style="${chipStyle}">${new Date(p.fechaCierre).toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})}</span>
             </div>`
          : `<span style="${chipStyle}">Sin fecha registrada</span>`;

        Swal.fire({
          target: document.getElementById('modalClinico'),
          width: 470,
          background: popupBg,
          confirmButtonColor: esDark ? '#3B5FD9' : '#2b1070',
          html: `
            <div style="font-size:20px; font-weight:700; color:${tituloColor}; margin-bottom:27px; text-align:center;">Información de Lectura</div>
            <div style="padding:14px; text-align:left;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div>
                  <div style="font-size:14px; font-weight:700; color:${labelColor}; margin-bottom:8px;">Médico Lector</div>
                  <div style="${fieldStyle}">
                    <span style="${chipStyle}"><i class="fas fa-user-md"></i> ${medicoLectorTexto}</span>
                  </div>
                </div>
                <div>
                  <div style="font-size:14px; font-weight:700; color:${labelColor}; margin-bottom:8px;">Especialidad</div>
                  <div style="${fieldStyle}">
                    <span style="${chipStyle}">${especialidadTexto}</span>
                  </div>
                </div>
                <div>
                  <div style="font-size:14px; font-weight:700; color:${labelColor}; margin-bottom:8px;">Ejecutivo de Cierre</div>
                  <div style="${fieldStyle}">
                    <span style="${chipStyle}">${p.ejecutivoCierre || 'No asignado'}</span>
                  </div>
                </div>
                <div>
                  <div style="font-size:14px; font-weight:700; color:${labelColor}; margin-bottom:8px;">Fecha de Cierre</div>
                  <div style="${fieldStyle}">${fechaCierreHtml}</div>
                </div>
              </div>
            </div>
          `
        });
      };
    }

    document.getElementById('modalClinico').classList.add('active');
    actualizarCamposProceso();
  }



  function transformarLecturaAEdicion() {
    alternarBloqueoInputs(false);
    document.getElementById('modalTitulo').textContent = "Ficha del Paciente (Modo Edición)";
    document.getElementById('btnGuardarFicha').style.display = "block";
    document.getElementById('btnModoLecturaEditar').style.display = "none";
    document.getElementById('selectExamenes').style.display = "block";
    document.getElementById('labelSelectExamenes').style.display = "block";
    document.getElementById('estado').disabled = false;
  }

  function toggleBloqueoInputs(bloquear) {
    alternarBloqueoInputs(bloquear);
  }

  function alternarBloqueoInputs(bloquear) {
    const contenedor = document.getElementById('formularioPaciente');
    const inputs = contenedor.querySelectorAll('input, select, textarea');
    inputs.forEach(el => {
      if(el.id !== 'esEdicion' && el.id !== 'dniOriginal') {
        el.disabled = bloquear;
      }
    });
  }

  function cerrarModal() {
    document.getElementById('modalClinico').classList.remove('active');
  }

  function eliminarPaciente() {
    // Detectamos si el modal de la ficha está abierto o cerrado
    const modal = document.getElementById('modalClinico');
    const destinoAlerta = modal.classList.contains('active') ? modal : 'body';

    Swal.fire({
      target: destinoAlerta,
      icon: 'warning',
      title: 'Eliminar Paciente',
      html: `¿Desea eliminar este paciente?<br><br><b>Esta acción no se puede deshacer.</b>`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#64748b'
    }).then((result) => {
      if (!result.isConfirmed) return;
      
      Swal.fire({
        target: destinoAlerta,
        title: 'Eliminando...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      google.script.run
        .withSuccessHandler(() => {
          Swal.fire({
            target: destinoAlerta,
            icon: 'success',
            title: 'Paciente eliminado',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            cerrarModal(); // Cierra el modal en caso de que estuviera abierto
            cargarDatosDelServidor();
          });
        })
        .withFailureHandler(err => {
          Swal.fire({
            target: destinoAlerta,
            icon: 'error',
            title: 'Error',
            text: err.message || 'No se pudo eliminar.',
            confirmButtonColor: '#2b1070'
          });
        })
       .eliminarPaciente(document.getElementById('dniOriginal').value);
    });
  }

  function validarYEnviarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const ejecutivo = document.getElementById('ejecutivo')?.value.trim() || '';
    const seguro = document.getElementById('seguro')?.value.trim() || '';
    const medico = document.getElementById('medico')?.value.trim() || '';
    const especialidad = document.getElementById('especialidadFiltro')?.value.trim() || '';
    let camposFaltantes = [];
    
    if (!nombre) {camposFaltantes.push('Nombre Completo');}
    if (!dni) {camposFaltantes.push('DNI / Documento');}
    if (!ejecutivo) {camposFaltantes.push('Ejecutivo que registra');}
    if (!seguro) {camposFaltantes.push('Tipo de Seguro');}
    if (!especialidad) {camposFaltantes.push('Especialidad');}
    if (!medico) {camposFaltantes.push('Médico Solicitante');}
    
    if (camposFaltantes.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        html: `<div style="text-align:left; font-size:14px; line-height:1.7;">Faltan completar:<br><br>${camposFaltantes.map(c => `• ${c}`).join('<br>')}</div>`,
        confirmButtonColor: '#2b1070'
      });
      return;
    }

    let estadoFinal = document.getElementById('estado').value;
    const subEstadoNormalizado = (subEstadoSeleccionado || '').toLowerCase().trim();
    const esLecturaRealizada = subEstadoNormalizado === 'lectura realizada';
    const esDesestimado = subEstadoNormalizado === 'desestimado';
    
    if (document.getElementById('estado').value === 'En Proceso' && subEstadoSeleccionado){
      estadoFinal = `En Proceso - ${subEstadoSeleccionado}`;
    }

    if (document.getElementById('estado').value === 'En Proceso' && (esLecturaRealizada || esDesestimado)) {
      Swal.fire({
        icon: 'question',
        title: esDesestimado ? 'Desestimar Caso' : 'Completar Caso',
        html: esDesestimado ? `¿Desea cerrar este caso como <b>DESESTIMADO</b>?` : `¿Desea marcar este caso como COMPLETADO?`,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#64748b'
      }).then((result) => {
        if (!result.isConfirmed) return;
        continuarGuardado('Completado');
      });
      return;
    }
    continuarGuardado(estadoFinal);
  }

  function continuarGuardado(estadoFinal){
    const datosFicha = {
      esEdicion: document.getElementById('esEdicion').value === "true",
      dniOriginal: document.getElementById('dniOriginal').value,
      id: document.getElementById('dniOriginal').value, // Previene duplicados
      forzarReapertura: true, // Previene bloqueos del servidor
      nombre: document.getElementById('nombre').value,
      dni: document.getElementById('dni').value,
      edad: document.getElementById('edad').value,
      telefono: document.getElementById('telefono').value,
      caso: document.getElementById('caso').value,
      fechaRecojo: document.getElementById('fechaRecojo').value,
      fechaEnvio: document.getElementById('fechaEnvio').value,
      estado: estadoFinal,
      fechaCierre: estadoFinal === 'Completado' ? (bdPacientes.find(x => x.dni == document.getElementById('dni').value)?.fechaCierre || new Date().toISOString()) : "",
      subEstado: subEstadoSeleccionado,
      ejecutivo: document.getElementById('ejecutivo').value,
      seguro: document.getElementById('seguro').value,
      medico: document.getElementById('medico').value,
      medicoLector: medicoLectorSeleccionado,
      ejecutivoCierre: ejecutivoCierreSeleccionado, // ¡VITAL! Envía el dato a tu Base de Datos
      listaExamenes: examenesSeleccionados,
      vencimiento: document.getElementById('vencimiento').value,
      precioTotal: document.getElementById('precioTotal').value,
      observaciones: subEstadoSeleccionado === 'Desestimado' ? motivoDesestimacion : document.getElementById('observaciones').value,
      especialidad: document.getElementById('especialidadFiltro').value
    };

    // NAVEGACIÓN INTELIGENTE (Para saltar a la bandeja correcta)
    let nuevaBandeja = 'Pendiente';
    const subEstadoNormalizado = (subEstadoSeleccionado || '').toLowerCase().trim();

    if (estadoFinal.startsWith('En Proceso')) {
      nuevaBandeja = 'En Proceso';
    } else if (estadoFinal === 'Completado') {
      if (subEstadoNormalizado === 'desestimado') {
        nuevaBandeja = 'Desestimados';
      } else {
        nuevaBandeja = 'Completado';
      }
    }

    Swal.fire({
      title: 'Guardando registro...',
      text: 'Por favor espere.',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    google.script.run
      .withSuccessHandler(function(mensaje) {
        Swal.fire({
          icon: 'success',
          title: '¡Operación Exitosa!',
          text: mensaje,
          confirmButtonColor: '#2b1070',
          timer: 1500
        }).then(() => {
          cerrarModal();
          // Forzamos el salto de bandeja
          bandejaActual = nuevaBandeja;
          cargarDatosDelServidor();
        });
      })
      .withFailureHandler(function(err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message || 'Error desconocido.',
          confirmButtonColor: '#2b1070'
        });
      })
      .guardarPaciente(datosFicha);
  }

  function actualizarCamposProceso() {
    const estado = document.getElementById('estado').value;
    const grupoFechaRecojo = document.getElementById('grupoFechaRecojo');
    const grupoFechaEnvio = document.getElementById('grupoFechaEnvio');
    const boxSubEstado = document.getElementById('boxSubEstado');
    const esDesestimado = (subEstadoSeleccionado || '').toLowerCase().trim() === 'desestimado';
    
    if (estado === 'En Proceso' || (estado === 'Completado' && subEstadoSeleccionado)){
      boxSubEstado.style.display = "inline-flex";
      if (esDesestimado) {
        grupoFechaRecojo.style.display = "none";
        grupoFechaEnvio.style.display = "none";
        document.getElementById('fechaRecojo').value = "";
        document.getElementById('fechaEnvio').value = "";
      } else {
        grupoFechaRecojo.style.display = "flex";
        grupoFechaEnvio.style.display = "flex";
      }
    } else {
      grupoFechaRecojo.style.display = "none";
      grupoFechaEnvio.style.display = "none";
      boxSubEstado.style.display = "none";
      document.getElementById('fechaRecojo').value = "";
      document.getElementById('fechaEnvio').value = "";
    }
  }

  function actualizarColorBadgeSubEstado(subEstado) {
    const badge = document.getElementById('boxSubEstado');
    if (!badge) return;
    const clave = subEstado.toLowerCase().trim();
    const color = mapaColoresSemaforo[clave];
    if (!color) {
      badge.style.background = '#14532d';
      badge.style.border = '1px solid #166534';
      badge.style.color = '#dcfce7';
      return;
    }
    badge.style.background = color;
    badge.style.border = `1px solid ${color}`;
    badge.style.color = '#ffffff';
  }

  function mostrarVistaEstadisticas(){
    document.querySelector('.table-card').style.display = 'none';
    document.querySelector('.cards-row-container').style.display = 'none';
    document.getElementById('vistaRegistroPersonal').style.display = 'none';
    document.getElementById('vistaPanelCasos').style.display = 'none';
    document.getElementById('vistaBaseDashboard').style.display = 'none';
    document.getElementById('vistaEstadisticas').style.display = 'block';

    document.querySelectorAll('.menu-item').forEach(item=>{item.classList.remove('active');});
    document.getElementById('menu-Estadisticas').classList.add('active');
    
    const ib = document.getElementById('inputBuscar');
    if (ib) ib.value = '';
    
    const esDark = document.body.classList.contains('dark');
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.style.display = 'flex';
    searchContainer.style.margin = '';
    searchContainer.style.padding = '';
    searchContainer.style.background = '';
    searchContainer.style.boxShadow = '';
    searchContainer.style.borderRadius = '';
    searchContainer.style.position = 'relative';
    searchContainer.style.justifyContent = 'space-between';
    searchContainer.style.gap = '';
    const bgIndicador = esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : 'linear-gradient(145deg,#E9ECEF,#F3F9FA)';
    const colorIndicador = esDark ? '#99CAFF' : '#004EE0';
    searchContainer.innerHTML = `
      <div class="saludo-bloque">
        <div class="saludo-icon" onclick="toggleMenuUsuario(event)" style="cursor:pointer;"><i class="far fa-user"></i></div>
        <div class="saludo-texts">
          <span class="welcome-text">Bienvenido</span>
          <span class="saludo-sub">Dashboard de Registro de Pacientes de Laboratorio</span>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:12px; margin-left:auto;">
        <div style="flex:0 0 auto; display:flex; align-items:center; gap:6px;">
          <input type="text" id="inputBuscadorMedico" class="search-bar-input" oninput="buscarMedicoEstadisticas()" onblur="setTimeout(cerrarBuscadorEstadisticas,150)" placeholder="Buscar médico por nombre..." data-abierto="false" style="height:40px; width:0; opacity:0; padding:0; border:1px solid #e2e8f0; border-radius:40px; outline:none; color:#334155; font-size:14px; background:white; box-sizing:border-box; overflow:hidden; transition:all 0.3s ease;">
          <button onclick="toggleBuscadorEstadisticas()" title="Buscar médico" class="btn-icon-action" style="flex:0 0 auto; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; background:var(--accent); box-shadow:0 6px 14px rgba(0,78,224,0.28); color:var(--on-accent); display:flex; align-items:center; justify-content:center; font-size:14px; transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'"><i class="fas fa-search"></i></button>
        </div>
        <div id="medicoIndicador" style="flex:0 0 auto; height:40px; min-width:40px; border-radius:50px; background:${bgIndicador}; box-shadow:0 6px 14px rgba(0,78,224,0.28); color:${colorIndicador}; display:flex; align-items:center; justify-content:center; padding:0; font-size:16px; font-weight:700; white-space:nowrap; transition:all 0.3s ease;">
          <i class="fas fa-user-md"></i>
        </div>
      </div>
    `;
    aplicarSaludo();
    resetearPanelEstadisticas();
  }

let mesPanelSeleccionado = new Date().getMonth();
let anioPanelSeleccionado = new Date().getFullYear();
let ultimosPacientesPanelCasos = null;
// NUEVAS VARIABLES PARA QUE LA BARRA SE MUEVA INDEPENDIENTEMENTE
let mesInicioBarraPanel = new Date().getMonth() > 0 ? new Date().getMonth() - 1 : 11;
let anioBarraPanel = new Date().getMonth() > 0 ? new Date().getFullYear() : new Date().getFullYear() - 1;

function mostrarVistaPanelCasos(){  
    document.querySelector('.table-card').style.display = 'none';  
    document.querySelector('.cards-row-container').style.display = 'none';  
    document.getElementById('vistaEstadisticas').style.display = 'none';  
    document.getElementById('vistaBaseDashboard').style.display = 'none';  
    document.getElementById('vistaRegistroPersonal').style.display = 'none';  
    document.getElementById('vistaPanelCasos').style.display = 'block';  
      
    document.querySelectorAll('.menu-item').forEach(item=>{item.classList.remove('active');});  
    document.getElementById('menu-PanelCasos').classList.add('active');  

    // Inyectar la estructura visual de la barra horizontal
    const esDark = document.body.classList.contains('dark');
    const bgBarraTabs = esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : 'linear-gradient(145deg,#E9ECEF,#F3F9FA)';
    const bgTabPill   = esDark ? 'linear-gradient(145deg,#004EE0,#042E7B)' : '#ffffff';
    const sombTabPill = esDark ? '3px 3px 7px rgba(0,0,0,0.45), -3px -3px 7px rgba(4,46,123,0.6)' : '3px 3px 7px rgba(163,177,198,0.55), -3px -3px 7px #ffffff';
      const searchContainer = document.getElementById('searchContainer');
    searchContainer.style.display = 'flex';
    searchContainer.style.alignItems = 'center';
    searchContainer.style.background = '';
    searchContainer.style.boxShadow = '';
    searchContainer.style.padding = '';
    searchContainer.style.borderRadius = '';
    searchContainer.style.margin = '';
    searchContainer.style.position = 'relative';
    searchContainer.style.justifyContent = '';
    searchContainer.style.gap = '';
    searchContainer.innerHTML = `
      <div class="saludo-bloque">
        <div class="saludo-icon" onclick="toggleMenuUsuario(event)" style="cursor:pointer;"><i class="far fa-user"></i></div>
        <div class="saludo-texts">
          <span class="welcome-text">Bienvenido</span>
          <span class="saludo-sub">Dashboard de Registro de Pacientes de Laboratorio</span>
        </div>
      </div>

      <!-- Pestañas ocultas por ahora (se reubicarán más adelante) -->
      <div id="barraTabsPanel" style="display:none; position:absolute; left:32px; top:50%; transform:translateY(-50%); align-items:stretch; background:${bgBarraTabs}; border:none; border-radius:40px; padding:5px; gap:2px; box-shadow:0 4px 12px rgba(15,23,42,0.06);">
        <div id="tabPanelPill" style="position:absolute; top:5px; left:5px; width:0; height:calc(100% - 10px); border-radius:40px; background:${bgTabPill}; box-shadow:${sombTabPill}; transition:all 0.35s cubic-bezier(0.4,0,0.2,1); z-index:0; opacity:0;"></div>
        <button data-tabp="examenes" onclick="seleccionarTabPanelCasos('examenes')" style="position:relative; z-index:1; display:flex; align-items:center; gap:8px; border:none; cursor:pointer; padding:10px 20px; border-radius:40px; font-size:13px; font-weight:700; background:transparent; color:#004EE0; white-space:nowrap; transition:color 0.3s ease;"><i class="fas fa-vials"></i> Exámenes del Mes</button>
        <button data-tabp="seguro" onclick="seleccionarTabPanelCasos('seguro')" style="position:relative; z-index:1; display:flex; align-items:center; gap:8px; border:none; cursor:pointer; padding:10px 20px; border-radius:40px; font-size:13px; font-weight:700; background:transparent; color:#64748b; white-space:nowrap; transition:color 0.3s ease;"><i class="fas fa-shield-alt"></i> Pacientes por Seguro</button>
        <button data-tabp="base" onclick="seleccionarTabPanelCasos('base')" style="position:relative; z-index:1; display:flex; align-items:center; gap:8px; border:none; cursor:pointer; padding:10px 20px; border-radius:40px; font-size:13px; font-weight:700; background:transparent; color:#64748b; white-space:nowrap; transition:color 0.3s ease;"><i class="fas fa-chart-pie"></i> Base del Mes</button>
      </div>

      <!-- Grupo derecho: Búsqueda + Descargar Base + píldora de fecha (izquierda vacía) -->
      <div style="flex:0 0 auto; display:flex; align-items:center; gap:12px; margin-left:auto;">
        <div style="flex:0 0 auto; display:flex; align-items:center; gap:6px; background:transparent; box-shadow:none; padding:0;">
          <input type="text" id="inputBuscarCasoPanel" class="search-bar-input" oninput="filtrarListaPanel()" onblur="setTimeout(cerrarBuscadorPanel, 150)" placeholder="Buscar paciente o caso..." data-abierto="false" style="height:40px; width:0; opacity:0; padding:0; margin-right:0; border:none; border-radius:40px; outline:none; color:#334155; font-size:14px; background:white; box-sizing:border-box; overflow:hidden; transition:all 0.3s ease;">
          <button onclick="toggleBuscadorPanel()" title="Buscar" class="btn-icon-action" style="flex:0 0 auto; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; background:var(--accent); box-shadow:0 6px 14px rgba(0,78,224,0.28); color:var(--on-accent); display:flex; align-items:center; justify-content:center; font-size:14px; transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div style="position:relative; flex:0 0 auto; ${(window.__rolUsuario||'').toLowerCase()==='ejecutivo' ? 'display:none;' : ''}">
          <button id="btnDescargarBase" onclick="descargarBasePanel(event)" title="Descargar Base" style="display:flex; align-items:center; gap:8px; cursor:pointer; background:transparent; color:var(--accent); border:1.5px solid var(--accent); border-radius:50px; padding:8px 18px; font-size:14px; font-weight:700; transition:background 0.2s ease, color 0.2s ease;" onmouseover="var d=document.body.classList.contains('dark'); this.style.background=d?'rgba(255,255,255,0.14)':'var(--accent)'; this.style.color=d?'#ffffff':'var(--on-accent)';" onmouseout="var d=document.body.classList.contains('dark'); this.style.background='transparent'; this.style.color=d?'rgba(255,255,255,0.80)':'var(--accent)';">
            Descargar Base <i class="fas fa-chevron-down" style="font-size:11px;"></i>
          </button>
          <div id="menuDescargarBase" data-abierto="false" style="position:absolute; top:calc(100% + 8px); left:0; min-width:200px; background:var(--surface); border-radius:12px; box-shadow:0 10px 28px rgba(15,23,42,0.18); overflow:hidden; max-height:0; opacity:0; transition:max-height 0.3s ease, opacity 0.25s ease; z-index:60;">
            <div onclick="cerrarMenuDescargarBase(); descargarTopExamenes();" style="padding:11px 16px; cursor:pointer; font-size:13px; font-weight:600; color:var(--text); white-space:nowrap; transition:background 0.15s ease;" onmouseover="var d=document.body.classList.contains('dark'); this.style.background=d?'rgba(255,255,255,0.08)':'var(--accent-2)';" onmouseout="this.style.background='transparent'">Top Exámenes</div>
            <div onclick="cerrarMenuDescargarBase(); descargarPacientesPorSeguro();" style="padding:11px 16px; cursor:pointer; font-size:13px; font-weight:600; color:var(--text); white-space:nowrap; transition:background 0.15s ease;" onmouseover="var d=document.body.classList.contains('dark'); this.style.background=d?'rgba(255,255,255,0.08)':'var(--accent-2)';" onmouseout="this.style.background='transparent'">Paciente por Seguro</div>
            <div onclick="cerrarMenuDescargarBase(); descargarBaseMes();" style="padding:11px 16px; cursor:pointer; font-size:13px; font-weight:600; color:var(--text); white-space:nowrap; transition:background 0.15s ease;" onmouseover="var d=document.body.classList.contains('dark'); this.style.background=d?'rgba(255,255,255,0.08)':'var(--accent-2)';" onmouseout="this.style.background='transparent'">Base del Mes</div>
          </div>
        </div>

        <div id="pildoraFechaPanel" onclick="abrirSelectorFechaPanel()" title="Cambiar mes / año" style="flex:0 0 auto; display:flex; align-items:center; gap:8px; cursor:pointer; background:var(--accent); color:var(--on-accent); border-radius:50px; padding:9px 18px; font-size:14px; font-weight:700; box-shadow:0 6px 14px rgba(0,78,224,0.28); transition:transform 0.2s ease;" onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'">
          <i class="fas fa-calendar-alt"></i>
          <span id="textoFechaPanel">Mes Año</span>
          <i class="fas fa-caret-down" style="opacity:0.85;"></i>
        </div>
      </div>
    `;

    aplicarSaludo();
    actualizarPildoraFechaPanel();
    renderizarPacientesJunio(); // Forzamos el renderizado al entrar
    setTimeout(function() { seleccionarTabPanelCasos('examenes'); }, 50);
    _aplicarRestriccionesRol();
}

// -------------------------------------------------------------
// FUNCIONES DE NAVEGACIÓN PARA LA BARRA DEL PANEL
// -------------------------------------------------------------
function cambiarMesVistaPanel(direccion) {
  mesInicioBarraPanel += direccion;
  if (mesInicioBarraPanel > 11) { mesInicioBarraPanel = 0; anioBarraPanel++; }
  else if (mesInicioBarraPanel < 0) { mesInicioBarraPanel = 11; anioBarraPanel--; }
  actualizarPildoraFechaPanel();
}

function activarMesFiltroPanel(mesIndex, anio) {
  mesPanelSeleccionado = mesIndex;
  anioPanelSeleccionado = anio;
  actualizarPildoraFechaPanel();
  renderizarPacientesJunio(); // Actualiza los gráficos y listas al instante
}

function toggleBuscadorPanel() {
  const input = document.getElementById('inputBuscarCasoPanel');
  if (!input) return;
  if (input.dataset.abierto === 'true') {
    // Cierre manual (clic en el círculo): colapsa y limpia el filtro
    input.style.width = '0';
    input.style.opacity = '0';
    input.style.padding = '0';
    input.style.marginRight = '0';
    input.value = '';
    input.dataset.abierto = 'false';
    if (typeof filtrarListaPanel === 'function') filtrarListaPanel();
  } else {
    // Cerrar las opciones de Base si están abiertas (mutuamente excluyentes)
    const op = document.getElementById('descargarBaseOpciones');
    if (op && op.dataset.abierto === 'true') {
      op.style.maxWidth = '0';
      op.style.opacity = '0';
      op.style.marginLeft = '0';
      op.dataset.abierto = 'false';
    }
    input.style.width = '320px';
    input.style.opacity = '1';
    input.style.padding = '0 18px';
    input.style.marginRight = '4px';
    input.dataset.abierto = 'true';
    setTimeout(() => input.focus(), 160);
  }
}

function cerrarBuscadorPanel() {
  const input = document.getElementById('inputBuscarCasoPanel');
  if (!input || input.dataset.abierto !== 'true') return;
  // Auto-ocultar al perder foco SOLO si no hay búsqueda activa,
  // así no se pierde el filtro al hacer clic en el lápiz u otras acciones de la lista.
  if (input.value.trim() !== '') return;
  input.style.width = '0';
  input.style.opacity = '0';
  input.style.padding = '0';
  input.style.marginRight = '0';
  input.dataset.abierto = 'false';
}

// Barra segmentada central del Panel (mismo efecto que Registro de Personal)
function seleccionarTabPanelCasos(tab) {
  const bar = document.getElementById('barraTabsPanel');
  if (!bar) return;
  const pill = document.getElementById('tabPanelPill');
  bar.querySelectorAll('button[data-tabp]').forEach(btn => {
    const activo = btn.getAttribute('data-tabp') === tab;
    btn.style.color = activo ? '#004EE0' : '#64748b';
    if (activo && pill) {
      pill.style.left = btn.offsetLeft + 'px';
      pill.style.top = btn.offsetTop + 'px';
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.height = btn.offsetHeight + 'px';
      pill.style.opacity = '1';
    }
  });
  // de momento solo selección visual
}

// Barra segmentada central del Calendario (mismo efecto que las demás)
function seleccionarTabCalendario(tab) {
  const bar = document.getElementById('barraTabsCalendario');
  if (!bar) return;
  const pill = document.getElementById('tabCalendarioPill');
  bar.querySelectorAll('button[data-tabc]').forEach(btn => {
    const activo = btn.getAttribute('data-tabc') === tab;
    btn.style.color = activo ? '#004EE0' : '#64748b';
    if (activo && pill) {
      pill.style.left = btn.offsetLeft + 'px';
      pill.style.top = btn.offsetTop + 'px';
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.height = btn.offsetHeight + 'px';
      pill.style.opacity = '1';
    }
  });
  // de momento solo selección visual
}

function toggleDescargarBase() {
  const op = document.getElementById('descargarBaseOpciones');
  if (!op) return;
  if (op.dataset.abierto === 'true') {
    op.style.maxWidth = '0';
    op.style.opacity = '0';
    op.style.marginLeft = '0';
    op.dataset.abierto = 'false';
  } else {
    // Esconder la barra de búsqueda si está abierta (mutuamente excluyentes)
    const input = document.getElementById('inputBuscarCasoPanel');
    if (input && input.dataset.abierto === 'true') {
      input.style.width = '0';
      input.style.opacity = '0';
      input.style.padding = '0';
      input.style.marginLeft = '0';
      input.value = '';
      input.dataset.abierto = 'false';
      if (typeof filtrarListaPanel === 'function') filtrarListaPanel();
    }
    op.style.maxWidth = '460px';
    op.style.opacity = '1';
    op.style.marginLeft = '4px';
    op.dataset.abierto = 'true';
  }
}

// Placeholders (de momento solo la interfaz)
function descargarBaseCompleta() { avisoBaseProximamente('Base Completa'); }
function descargarBaseCasos() { avisoBaseProximamente('Base de Casos'); }
function descargarBasePorcentual() { avisoBaseProximamente('Base Porcentual'); }
function avisoBaseProximamente(nombre) {
  Swal.fire({ icon: 'info', title: nombre, text: 'Función en construcción.', timer: 1400, showConfirmButton: false });
}

function generarBarraMesesPanel() {
  const contenedor = document.getElementById('barraMesesDinamicaPanel');
  if (!contenedor) return;
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Píldora deslizante persistente (se crea una sola vez y se conserva entre renders)
  let pill = document.getElementById('pillMesPanel');
  if (!pill) {
    contenedor.style.position = 'relative';
    pill = document.createElement('div');
    pill.id = 'pillMesPanel';
    pill.style.cssText = 'position:absolute; top:4px; left:0; width:0; height:calc(100% - 8px); border-radius:50px; background:linear-gradient(90deg,#004EE0,#042E7B); box-shadow:0 4px 12px rgba(0,78,224,0.40); transition:all 0.35s cubic-bezier(0.4,0,0.2,1); z-index:0; opacity:0;';
    contenedor.appendChild(pill);
  }

  // Quitar los items viejos pero conservar la píldora
  Array.from(contenedor.querySelectorAll('.month-item')).forEach(n => n.remove());

  let html = `<div class="month-item" style="cursor:pointer; flex:0 0 auto; padding:0 16px; color:#ffffff; background:linear-gradient(90deg,#004EE0,#042E7B); box-shadow:0 4px 10px rgba(0,78,224,0.35);" onclick="abrirSelectorFechaPanel()">${anioBarraPanel} <i class="fas fa-caret-down" style="margin-left:6px;"></i></div>`;
  html += `<div class="month-item" style="flex: 0 0 40px;" onclick="cambiarMesVistaPanel(-1)"><i class="fas fa-chevron-left"></i></div>`;

  for (let i = 0; i < 3; i++) {
    let mesCalc = mesInicioBarraPanel + i;
    let anioCalc = anioBarraPanel;
    if (mesCalc > 11) { mesCalc -= 12; anioCalc++; }
    const esActivo = (mesCalc === mesPanelSeleccionado && anioCalc === anioPanelSeleccionado);
    html += `<div class="month-item ${esActivo ? 'active mes-activo' : ''}" onclick="activarMesFiltroPanel(${mesCalc}, ${anioCalc})">${meses[mesCalc].toUpperCase()}</div>`;
  }
  html += `<div class="month-item" style="flex: 0 0 40px;" onclick="cambiarMesVistaPanel(1)"><i class="fas fa-chevron-right"></i></div>`;
  contenedor.insertAdjacentHTML('beforeend', html);

  // Deslizar la píldora hasta el mes activo
  requestAnimationFrame(() => {
    const activo = contenedor.querySelector('.mes-activo');
    if (activo && pill) {
      pill.style.left = activo.offsetLeft + 'px';
      pill.style.width = activo.offsetWidth + 'px';
      pill.style.opacity = '1';
    } else if (pill) {
      pill.style.opacity = '0';
    }
  });
}

// Actualiza la píldora con el mes y año seleccionados del Panel de Casos
function actualizarPildoraFechaPanel() {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const el = document.getElementById('textoFechaPanel');
  if (el) el.textContent = meses[mesPanelSeleccionado] + ' ' + anioPanelSeleccionado;
}

// Botón "Descargar Base" (Panel de Casos): despliega el menú con efecto cortina
function descargarBasePanel(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('menuDescargarBase');
  if (!menu) return;
  if (menu.dataset.abierto === 'true') {
    cerrarMenuDescargarBase();
  } else {
    menu.style.maxHeight = '240px';
    menu.style.opacity = '1';
    menu.dataset.abierto = 'true';
    setTimeout(function(){ document.addEventListener('click', cerrarMenuDescargarBaseFuera); }, 0);
  }
}
function cerrarMenuDescargarBase() {
  const menu = document.getElementById('menuDescargarBase');
  if (!menu) return;
  menu.style.maxHeight = '0';
  menu.style.opacity = '0';
  menu.dataset.abierto = 'false';
  document.removeEventListener('click', cerrarMenuDescargarBaseFuera);
}
function cerrarMenuDescargarBaseFuera(e) {
  const btn = document.getElementById('btnDescargarBase');
  const menu = document.getElementById('menuDescargarBase');
  if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
    cerrarMenuDescargarBase();
  }
}

function descargarTopExamenes() {
  if (!bdPacientes || bdPacientes.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin datos', text: 'No hay pacientes cargados para generar el reporte.', confirmButtonColor: '#004EE0' });
    return;
  }

  // Filtrar pacientes del mes/año seleccionado en el panel
  const mesBuscado = mesPanelSeleccionado + 1;
  const anioBuscado = anioPanelSeleccionado;
  const nombresMesesTop = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const etiquetaMes = nombresMesesTop[mesPanelSeleccionado] + ' ' + anioBuscado;

  const pacientesMes = bdPacientes.filter(function(p) {
    if (!p.fechaCreacion) return false;
    const fc = p.fechaCreacion.toString();
    if (fc.includes('/')) {
      const partes = fc.split('/');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) === mesBuscado && parseInt(partes[2].split(' ')[0], 10) === anioBuscado;
    } else if (fc.includes('-')) {
      const partes = fc.split('T')[0].split('-');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) === mesBuscado && parseInt(partes[0], 10) === anioBuscado;
    }
    return false;
  });

  if (pacientesMes.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin registros', text: 'No hay pacientes registrados en ' + etiquetaMes + '.', confirmButtonColor: '#004EE0' });
    return;
  }

  const conteo = {};
  pacientesMes.forEach(function(p) {
    if (!p.listaExamenes || !Array.isArray(p.listaExamenes)) return;
    p.listaExamenes.forEach(function(ex) {
      const nombre = (ex || '').toString().trim();
      if (!nombre) return;
      conteo[nombre] = (conteo[nombre] || 0) + 1;
    });
  });

  const ordenado = Object.entries(conteo).sort(function(a, b) { return b[1] - a[1]; });
  if (ordenado.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin exámenes', text: 'Los pacientes de ' + etiquetaMes + ' no tienen exámenes registrados.', confirmButtonColor: '#004EE0' });
    return;
  }

  Swal.fire({
    title: 'Generando Excel...',
    text: 'Creando reporte de ' + etiquetaMes + ', espera un momento.',
    allowOutsideClick: false,
    didOpen: function() { Swal.showLoading(); }
  });

  const filas = ordenado.map(function(entry, idx) {
    return [idx + 1, entry[0], entry[1]];
  });

  google.script.run
    .withSuccessHandler(function(result) {
      Swal.close();
      if (!result || !result.ok) {
        Swal.fire({ icon: 'error', title: 'Error al generar', text: (result && result.error) || 'No se pudo crear el archivo.', confirmButtonColor: '#004EE0' });
        return;
      }
      const exportUrl = 'https://docs.google.com/spreadsheets/d/' + result.fileId + '/export?format=xlsx';
      window.open(exportUrl, '_blank');
    })
    .withFailureHandler(function(err) {
      Swal.close();
      Swal.fire({ icon: 'error', title: 'Error', text: (err && err.message) || 'No se pudo conectar con el servidor.', confirmButtonColor: '#004EE0' });
    })
    .crearTopExamenesExcel(filas, etiquetaMes);
}

function descargarPacientesPorSeguro() {
  if (!bdPacientes || bdPacientes.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin datos', text: 'No hay pacientes cargados para generar el reporte.', confirmButtonColor: '#004EE0' });
    return;
  }

  const mesBuscado = mesPanelSeleccionado + 1;
  const anioBuscado = anioPanelSeleccionado;
  const nombresMesesTop = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const etiquetaMes = nombresMesesTop[mesPanelSeleccionado] + ' ' + anioBuscado;

  const pacientesMes = bdPacientes.filter(function(p) {
    if (!p.fechaCreacion) return false;
    const fc = p.fechaCreacion.toString();
    if (fc.includes('/')) {
      const partes = fc.split('/');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) === mesBuscado && parseInt(partes[2].split(' ')[0], 10) === anioBuscado;
    } else if (fc.includes('-')) {
      const partes = fc.split('T')[0].split('-');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) === mesBuscado && parseInt(partes[0], 10) === anioBuscado;
    }
    return false;
  });

  if (pacientesMes.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin registros', text: 'No hay pacientes registrados en ' + etiquetaMes + '.', confirmButtonColor: '#004EE0' });
    return;
  }

  const conteo = {};
  pacientesMes.forEach(function(p) {
    const seg = (p.seguro || 'Sin seguro').trim();
    conteo[seg] = (conteo[seg] || 0) + 1;
  });

  const ordenado = Object.entries(conteo).sort(function(a, b) { return b[1] - a[1]; });

  Swal.fire({
    title: 'Generando Excel...',
    text: 'Creando reporte de ' + etiquetaMes + ', espera un momento.',
    allowOutsideClick: false,
    didOpen: function() { Swal.showLoading(); }
  });

  const filas = ordenado.map(function(entry, idx) {
    return [idx + 1, entry[0], entry[1]];
  });

  google.script.run
    .withSuccessHandler(function(result) {
      Swal.close();
      if (!result || !result.ok) {
        Swal.fire({ icon: 'error', title: 'Error al generar', text: (result && result.error) || 'No se pudo crear el archivo.', confirmButtonColor: '#004EE0' });
        return;
      }
      const exportUrl = 'https://docs.google.com/spreadsheets/d/' + result.fileId + '/export?format=xlsx';
      window.open(exportUrl, '_blank');
    })
    .withFailureHandler(function(err) {
      Swal.close();
      Swal.fire({ icon: 'error', title: 'Error', text: (err && err.message) || 'No se pudo conectar con el servidor.', confirmButtonColor: '#004EE0' });
    })
    .crearSeguroExcel(filas, etiquetaMes);
}

function descargarBaseMes() {
  if (!bdPacientes || bdPacientes.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin datos', text: 'No hay pacientes cargados para generar el reporte.', confirmButtonColor: '#004EE0' });
    return;
  }

  const mesBuscado = mesPanelSeleccionado + 1;
  const anioBuscado = anioPanelSeleccionado;
  const nombresMesesTop = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const etiquetaMes = nombresMesesTop[mesPanelSeleccionado] + ' ' + anioBuscado;

  const pacientesMes = bdPacientes.filter(function(p) {
    if (!p.fechaCreacion) return false;
    const fc = p.fechaCreacion.toString();
    if (fc.includes('/')) {
      const partes = fc.split('/');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) === mesBuscado && parseInt(partes[2].split(' ')[0], 10) === anioBuscado;
    } else if (fc.includes('-')) {
      const partes = fc.split('T')[0].split('-');
      if (partes.length < 3) return false;
      return parseInt(partes[1], 10) === mesBuscado && parseInt(partes[0], 10) === anioBuscado;
    }
    return false;
  });

  if (pacientesMes.length === 0) {
    Swal.fire({ icon: 'info', title: 'Sin registros', text: 'No hay pacientes registrados en ' + etiquetaMes + '.', confirmButtonColor: '#004EE0' });
    return;
  }

  Swal.fire({
    title: 'Generando Base del Mes...',
    text: 'Preparando Excel de ' + etiquetaMes + ', espera un momento.',
    allowOutsideClick: false,
    didOpen: function() { Swal.showLoading(); }
  });

  const filas = pacientesMes.map(function(p) {
    const examenes = Array.isArray(p.listaExamenes) ? p.listaExamenes.join(', ') : (p.listaExamenes || '');
    const subE = (p.subEstado || '').toLowerCase().trim();
    let resultadoCierre = '';
    if (p.estado === 'Completado') {
      resultadoCierre = subE === 'desestimado' ? 'Desestimado' : 'Completado';
    }
    return [
      p.fechaCreacion   || '',
      p.estado          || '',
      p.caso            || '',
      p.dni             || '',
      p.nombre          || '',
      examenes,
      p.telefono        || '',
      p.seguro          || '',
      p.medico          || '',
      '',                           // Fecha de Recojo (no almacenado aún)
      '',                           // Fecha de Envío de Resultados (no almacenado aún)
      p.ejecutivo       || '',
      p.precioTotal     || '',
      p.medicoLector    || '',
      p.vencimiento     || '',
      resultadoCierre
    ];
  });

  google.script.run
    .withSuccessHandler(function(result) {
      Swal.close();
      if (!result || !result.ok) {
        Swal.fire({ icon: 'error', title: 'Error al generar', text: (result && result.error) || 'No se pudo crear el archivo.', confirmButtonColor: '#004EE0' });
        return;
      }
      const exportUrl = 'https://docs.google.com/spreadsheets/d/' + result.fileId + '/export?format=xlsx';
      window.open(exportUrl, '_blank');
    })
    .withFailureHandler(function(err) {
      Swal.close();
      Swal.fire({ icon: 'error', title: 'Error', text: (err && err.message) || 'No se pudo conectar con el servidor.', confirmButtonColor: '#004EE0' });
    })
    .crearBaseMesExcel(filas, etiquetaMes);
}

function _csvEscape(val) {
  const s = (val || '').toString();
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? '"' + s.replace(/"/g, '""') + '"'
    : s;
}

function _csvFechaHoy() {
  const d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

function abrirSelectorFechaPanel() {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const anioActualSistema = new Date().getFullYear();
  const anioLimite = anioActualSistema + 5;
  let opcionesAnio = '';
  for(let i = 2023; i <= anioLimite; i++) opcionesAnio += `<option value="${i}" ${i === anioPanelSeleccionado ? 'selected' : ''}>${i}</option>`;

  let opcionesMes = '';
  for(let i = 0; i < 12; i++) opcionesMes += `<option value="${i}" ${i === mesPanelSeleccionado ? 'selected' : ''}>${meses[i]}</option>`;

  const esDark = document.body.classList.contains('dark');
  const cLabel  = esDark ? 'rgba(255,255,255,0.60)' : '#475569';
  const cSelect = esDark ? 'background:#1C2033; color:#C9D1E9; border:1px solid rgba(255,255,255,0.12);' : 'background:#fff; color:#334155; border:1px solid #cbd5e1;';
  const bgModal = esDark ? '#0f1e3d' : '#ffffff';

  Swal.fire({
    title: 'Filtrar Casos por Fecha',
    width: 280,
    background: bgModal,
    html: `
      <div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
        <div>
          <label style="font-size:12px; font-weight:700; color:${cLabel};">Año</label>
          <select id="popAnioPanel" style="width:100%; height:36px; border-radius:8px; padding:0 10px; font-size:14px; outline:none; margin-top:4px; ${cSelect}">
            ${opcionesAnio}
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:${cLabel};">Mes</label>
          <select id="popMesPanel" style="width:100%; height:36px; border-radius:8px; padding:0 10px; font-size:14px; outline:none; margin-top:4px; ${cSelect}">
            ${opcionesMes}
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Aplicar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2b1070',
    cancelButtonColor: '#64748b',
    preConfirm: () => {
      return {
        anio: parseInt(document.getElementById('popAnioPanel').value),
        mes: parseInt(document.getElementById('popMesPanel').value)
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      mesPanelSeleccionado = result.value.mes;
      anioPanelSeleccionado = result.value.anio;

      anioBarraPanel = result.value.anio;
      mesInicioBarraPanel = result.value.mes > 0 ? result.value.mes - 1 : 11;
      if(result.value.mes === 0) anioBarraPanel--;

      actualizarPildoraFechaPanel();
      renderizarPacientesJunio();
    }
  });
}


  function mostrarVistaBaseDashboard(){
    document.querySelector('.table-card').style.display = 'none';
    document.querySelector('.cards-row-container').style.display = 'none';
    document.getElementById('vistaEstadisticas').style.display = 'none';
    document.getElementById('vistaPanelCasos').style.display = 'none';
    document.getElementById('vistaRegistroPersonal').style.display = 'none';
    document.getElementById('vistaBaseDashboard').style.display = 'flex';

    document.querySelectorAll('.menu-item').forEach(item=>{item.classList.remove('active');});
    document.getElementById('menu-BaseDashboard').classList.add('active');
    
    const sc = document.getElementById('searchContainer');
    if (sc) {
      sc.innerHTML = '';
      sc.style.display = 'none';
      sc.style.margin = '0';
      sc.style.padding = '0';
    }
    iniciarCalendario();
    setTimeout(function() { seleccionarTabCalendario('pendientes'); }, 50);
  }

  function mostrarVistaRegistroPersonal(){
    document.querySelector('.table-card').style.display = 'none';
    document.querySelector('.cards-row-container').style.display = 'none';
    document.getElementById('vistaEstadisticas').style.display = 'none';
    document.getElementById('vistaPanelCasos').style.display = 'none';
    document.getElementById('vistaBaseDashboard').style.display = 'none';
    document.getElementById('vistaRegistroPersonal').style.display = 'flex';
    
    document.querySelectorAll('.menu-item').forEach(item=>{item.classList.remove('active');});
    document.getElementById('menu-RegistroPersonal').classList.add('active');
    
    const sc = document.getElementById('searchContainer');
    if (sc) {
      sc.innerHTML = '';
      sc.style.display = 'none';
    }
  renderizarListaMedicosPersonal();
  renderizarEjecutivosBloque8();
  renderizarMedicoLectorMes();
      google.script.run
  .withSuccessHandler(function(conteo) {
    const el1 = document.getElementById('conteoMedicosGenerales');
    if (el1) el1.textContent = conteo.generales;
    const el2 = document.getElementById('conteoMedicosPediatras');
    if (el2) el2.textContent = conteo.pediatras;
  })
  .obtenerConteoMedicos();
  google.script.run
  .withSuccessHandler(function(total) {
    const el = document.getElementById('conteoEjecutivos');
    if (el) el.textContent = total;
  })
  .obtenerConteoEjecutivos();
  }

    function resetearPanelEstadisticas() {
      const panel = document.getElementById('panelMedico');
      const placeholder = document.getElementById('placeholderEstadisticas');
      if (placeholder) placeholder.style.display = 'none';
      if (panel) panel.style.display = 'block';

      const sinDatos = '<tr><td colspan="3" style="padding:10px; color:#94a3b8; text-align:center;">Sin resultados</td></tr>';
      ['statMedicoSolicitados','statMedicoCompletados','statMedicoDesestimados','statMedicoPendientes'].forEach(id => {
        const el = document.getElementById(id); if (el) el.textContent = '0';
      });
      ['statMedicoUltLeidoNombre','statMedicoUltLeidoExamenes','statMedicoUltLeidoSeguro'].forEach(id => {
        const el = document.getElementById(id); if (el) el.textContent = '—';
      });
      const tbody = document.getElementById('tablaUltimosMedico');
      if (tbody) tbody.innerHTML = sinDatos;
      const carrusel = document.getElementById('carruselContenedorTarjetas');
      if (carrusel) carrusel.innerHTML = `<div class="carrusel-card" style="position:absolute; top:0; left:0; width:100%; height:100%; background:white; border:1px solid #e2e8f0; border-radius:16px; padding:20px 24px; box-sizing:border-box; box-shadow:0 4px 12px rgba(0,0,0,0.05); display:flex; flex-direction:column; justify-content:center; align-items:center; gap:10px;"><i class="fas fa-search" style="font-size:22px; color:#cbd5e1;"></i><span style="font-size:12px; font-weight:600; color:#94a3b8;">Sin datos</span></div>`;
      const controles = document.getElementById('controlesCarrusel');
      if (controles) controles.style.display = 'none';
      const burbujas = document.getElementById('contenedorBurbujasSeguros');
      if (burbujas) burbujas.innerHTML = '<span style="color:#cbd5e1; font-size:12px; font-weight:600;">Sin datos</span>';
      const listaSeg = document.getElementById('listaSegurosTop');
      if (listaSeg) listaSeg.innerHTML = '';
      const barras = document.getElementById('barrasTopMedicos');
      if (barras) barras.innerHTML = '';
      const donut = document.getElementById('donutMedico');
      if (donut) { const ctx = donut.getContext('2d'); ctx.clearRect(0, 0, donut.width, donut.height); }
      }

// =========================================================
  // SECCIÓN DE ESTADÍSTICAS Y PANEL MÉDICO
  // =========================================================

  let medicoVistaEstadisticas = "";
  let pacientesCarrusel = [];
  let indexCarrusel = 0; 

  function buscarMedicoEstadisticas() {
    const query = document.getElementById('inputBuscadorMedico').value.toLowerCase().trim();
    const panel = document.getElementById('panelMedico');
    const placeholder = document.getElementById('placeholderEstadisticas');

    if (!query) {
      setMedicoIndicador('');
      medicoVistaEstadisticas = "";
      resetearPanelEstadisticas();
      return;
    }

    const medicoEncontrado = medicosEspecialidades.find(m => m.nombre.toLowerCase().includes(query));
    if (!medicoEncontrado) {
      setMedicoIndicador('');
      medicoVistaEstadisticas = "";
      resetearPanelEstadisticas();
      return;
    }

    setMedicoIndicador(`${medicoEncontrado.nombre} | ${medicoEncontrado.especialidad || 'General'}`);
    medicoVistaEstadisticas = medicoEncontrado.nombre;

    actualizarVistaEstadisticas();

    placeholder.style.display = 'none';
    panel.style.display = 'block';
  }

  // Indicador de médico: círculo con muñequito (sin búsqueda) o pastilla con el nombre (médico encontrado)
  function setMedicoIndicador(texto) {
    const ind = document.getElementById('medicoIndicador');
    if (!ind) return;
    if (texto) {
      ind.innerHTML = `<i class="fas fa-user-md" style="margin-right:8px;"></i>${texto}`;
      ind.style.padding = '0 22px';
      ind.style.fontSize = '14px';
    } else {
      ind.innerHTML = '<i class="fas fa-user-md"></i>';
      ind.style.padding = '0';
      ind.style.fontSize = '16px';
    }
  }

  function toggleBuscadorEstadisticas() {
    const input = document.getElementById('inputBuscadorMedico');
    if (!input) return;
    if (input.dataset.abierto === 'true') {
      // Cierre manual: colapsa, limpia y resetea
      input.style.width = '0';
      input.style.opacity = '0';
      input.style.padding = '0';
      input.value = '';
      input.dataset.abierto = 'false';
      buscarMedicoEstadisticas();
    } else {
      input.style.width = '300px';
      input.style.opacity = '1';
      input.style.padding = '0 18px';
      input.dataset.abierto = 'true';
      setTimeout(() => input.focus(), 160);
    }
  }

  function cerrarBuscadorEstadisticas() {
    const input = document.getElementById('inputBuscadorMedico');
    if (!input || input.dataset.abierto !== 'true') return;
    // Auto-ocultar al perder foco solo si no hay búsqueda activa
    if (input.value.trim() !== '') return;
    input.style.width = '0';
    input.style.opacity = '0';
    input.style.padding = '0';
    input.dataset.abierto = 'false';
  }

  function actualizarVistaEstadisticas() {
    if (!medicoVistaEstadisticas) return;

    // 1. Filtramos los casos del médico para EL MES SELECCIONADO
    const casosFiltrados = bdPacientes.filter(p => 
      (p.medico || '').trim() === medicoVistaEstadisticas && 
      pacienteEsDelMesActual(p.fechaCreacion)
    );

    // 2. Calculamos las estadísticas de las Tarjetas
    const solicitados = casosFiltrados.length;
    const completados = casosFiltrados.filter(p => p.estado === 'Completado' && (p.subEstado || '').toLowerCase().trim() !== 'desestimado').length;
    const desestimados = casosFiltrados.filter(p => (p.subEstado || '').toLowerCase().trim() === 'desestimado').length;
    const pendientes = casosFiltrados.filter(p => p.estado === 'Pendiente' || (p.estado || '').startsWith('En Proceso')).length;

    const elSolicitados = document.getElementById('statMedicoSolicitados');
    const elCompletados = document.getElementById('statMedicoCompletados');
    const elDesestimados = document.getElementById('statMedicoDesestimados');
    const elPendientes = document.getElementById('statMedicoPendientes');

    if (elSolicitados) elSolicitados.textContent = solicitados;
    if (elCompletados) elCompletados.textContent = completados;
    if (elDesestimados) elDesestimados.textContent = desestimados;
    if (elPendientes) elPendientes.textContent = pendientes;

  // 3. Actualizamos el Carrusel de Pacientes Registrados
    pacientesCarrusel = [...casosFiltrados].reverse(); // Los más recientes primero
    indexCarrusel = 0;
    construirDOMCarrusel();
    actualizarPosicionesCarrusel();

  // 4. Actualizamos la tabla de Pacientes del Mes
    const tbody = document.getElementById('tablaUltimosMedico');
    if (tbody) {
      tbody.innerHTML = '';
      if (casosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding:10px; color:#94a3b8; text-align:center;">Sin registros en este mes</td></tr>';
      } else {
        // Quitamos el slice(-5) para enviar todos los registros y usar el scroll
        casosFiltrados.slice().reverse().forEach(p => {
          const estadoColor = p.estado === 'Completado' ? '#10b981' : p.estado === 'En Proceso' ? '#f59e0b' : '#ef4444';
          tbody.innerHTML += `
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:8px 10px; font-weight:600; color:#1e293b;">${p.nombre || ''}</td>
              <td style="padding:8px 10px;">
                <span style="background:${estadoColor}20; color:${estadoColor}; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:700;">
                  ${p.subEstado || p.estado || 'Pendiente'}
                </span>
              </td>
              <td style="padding:8px 10px; color:#64748b; font-size:12px;">${p.vencimiento || '—'}</td>
            </tr>`;
        });
      }
    }

    // 5. Casos como Lector (Último leído)
    const casosComoLectorMes = bdPacientes.filter(p => 
      (p.medicoLector || '').trim() === medicoVistaEstadisticas && 
      pacienteEsDelMesActual(p.fechaCreacion)
    );
    const leidos = casosComoLectorMes.length;

    if (casosComoLectorMes.length > 0) {
      const ultimoLeido = casosComoLectorMes[casosComoLectorMes.length - 1];
      document.getElementById('statMedicoUltLeidoNombre').textContent = ultimoLeido.nombre || '—';
      document.getElementById('statMedicoUltLeidoExamenes').textContent = (ultimoLeido.listaExamenes ? ultimoLeido.listaExamenes.length : 0) + ' examen(es)';
      document.getElementById('statMedicoUltLeidoSeguro').textContent = ultimoLeido.seguro || 'Sin seguro';
    } else {
      document.getElementById('statMedicoUltLeidoNombre').textContent = '—';
      document.getElementById('statMedicoUltLeidoExamenes').textContent = '—';
      document.getElementById('statMedicoUltLeidoSeguro').textContent = '—';
    }

    // 6. NUEVA LÓGICA: BURBUJAS DE SEGUROS (TOP 5)
    const contenedorBurbujas = document.getElementById('contenedorBurbujasSeguros');
    const contenedorLista = document.getElementById('listaSegurosTop');

    if (casosFiltrados.length > 0) {
      const conteoSeguros = {};
      casosFiltrados.forEach(p => {
        const seguro = (p.seguro || 'Sin seguro').trim();
        conteoSeguros[seguro] = (conteoSeguros[seguro] || 0) + 1;
      });
      
      const listaSeguros = Object.entries(conteoSeguros).sort((a, b) => b[1] - a[1]);
      const top5Seguros = listaSeguros.slice(0, 5);
            
      let burbujasHTML = '';
      let listaHTML = '';
            
      // Posiciones distribuidas hacia las esquinas para revelar todos los números
      const posiciones = [
        { size: 75, top: '22px', left: '22px', z: 3 },    // 1er lugar (Centro)
        { size: 58, bottom: '0px', right: '0px', z: 4 },  // 2do lugar (Abajo-Derecha)
        { size: 48, top: '0px', right: '5px', z: 2 },     // 3er lugar (Arriba-Derecha)
        { size: 42, bottom: '5px', left: '0px', z: 5 },   // 4to lugar (Abajo-Izquierda)
        { size: 36, top: '0px', left: '0px', z: 1 }       // 5to lugar (Arriba-Izquierda)
      ];

      let delayActual = 0;
      let cantidadAnterior = -1;

      top5Seguros.forEach((item, index) => {
        const nombre = item[0];
        const cant = item[1];
        const porcentaje = Math.round((cant / solicitados) * 100);

        // Lógica inteligente: Si la cantidad es menor, aumenta el tiempo de espera. 
        // Si hay un empate, el delay no aumenta y se inflan a la vez.
        if (cantidadAnterior !== -1 && cant < cantidadAnterior) {
          delayActual += 0.20; // 200ms de diferencia entre burbujas
        }
        cantidadAnterior = cant;

        const nombreNormalizado = nombre.toLowerCase();
        let colorHex = '#64748b'; 
        if (nombreNormalizado.includes('mapfre')) colorHex = '#68000c'; 
        else if (nombreNormalizado.includes('rimac')) colorHex = '#dc2626'; 
        else if (nombreNormalizado.includes('positiva')) colorHex = '#ea580c';
        else if (nombreNormalizado.includes('particular')) colorHex = '#16a34a';
        else if (nombreNormalizado.includes('vip')) colorHex = '#ca8a04';

        const pos = posiciones[index];
        const fontSize = Math.max(12, pos.size / 2.5);

        // Combinamos la animación de aparición (inflado) con la de jabón (flotar)
        const floatDuration = 2.5 + (index * 0.3); // Diferente velocidad para que no floten como robots
        const animacionCSS = `animation: bubbleAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delayActual}s both, bubbleFloat ${floatDuration}s ease-in-out ${delayActual + 0.5}s infinite alternate;`;

        burbujasHTML += `
          <div style="position:absolute; ${pos.top ? 'top:'+pos.top : 'bottom:'+pos.bottom}; ${pos.left ? 'left:'+pos.left : 'right:'+pos.right}; width:${pos.size}px; height:${pos.size}px; background-color:${colorHex}; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:${fontSize}px; z-index:${pos.z}; box-shadow: 0 4px 8px rgba(0,0,0,0.20); ${animacionCSS}">
            ${cant}
          </div>
        `;

        listaHTML += `
          <div style="display:flex; flex-direction:column; gap:3px;">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; font-weight:700; color:#334155;">
              <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:85px;" title="${nombre}">${nombre}</span>
              <span style="color:${colorHex}; font-size:10px;">${porcentaje}%</span>
            </div>
            <div style="width:100%; height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
              <div style="width:${porcentaje}%; height:100%; background-color:${colorHex}; border-radius:3px;"></div>
            </div>
          </div>
        `;
      });

      contenedorBurbujas.innerHTML = burbujasHTML;
      contenedorLista.innerHTML = listaHTML;
    } else {
      contenedorBurbujas.innerHTML = '<span style="color:#cbd5e1; font-size:12px; font-weight:600;">Sin datos</span>';
      contenedorLista.innerHTML = '<span style="color:#cbd5e1; font-size:12px; font-weight:600; text-align:center;">Sin datos</span>';
    }

    dibujarDonutMedico(solicitados, leidos);
    dibujarBarrasTopMedicos();
  }

  let animacionDonutId = null;
  let ultimoDonutMedico = null;

  function dibujarDonutMedico(solicitados, leidos) {
    ultimoDonutMedico = { solicitados, leidos };
    const canvas = document.getElementById('donutMedico');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const esDark = document.body.classList.contains('dark');

    // Cancelar animación anterior si el usuario hace clic muy rápido
    if (animacionDonutId) {
      cancelAnimationFrame(animacionDonutId);
      animacionDonutId = null;
    }

    // Nuevas coordenadas y dimensiones para el lienzo de 260x260
    const cx = 130;
    const cy = 130;
    const radio = 95;
    const grosor = 34;

    if (solicitados === 0 && leidos === 0) {
      ctx.clearRect(0, 0, 260, 260);
      ctx.beginPath();
      ctx.arc(cx, cy, radio, 0, 2 * Math.PI);
      ctx.strokeStyle = esDark ? '#2D3451' : '#e2e8f0';
      ctx.lineWidth = grosor;
      ctx.stroke();
      ctx.fillStyle = esDark ? '#5B6585' : '#94a3b8';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("Sin registros", cx, cy);
      return;
    }

    // Degradados diagonales para los dos colores del anillo
    const gradAzul = ctx.createLinearGradient(cx - radio, cy - radio, cx + radio, cy + radio);
    if (esDark) {
      gradAzul.addColorStop(0, '#6B8DF5');
      gradAzul.addColorStop(1, '#2A4FB0');
    } else {
      gradAzul.addColorStop(0, '#3B82F6');
      gradAzul.addColorStop(1, '#1e3a8a');
    }
    const gradVerde = ctx.createLinearGradient(cx - radio, cy - radio, cx + radio, cy + radio);
    gradVerde.addColorStop(0, '#34d399');
    gradVerde.addColorStop(1, '#059669');

    const colorSolicitados = gradAzul;
    const colorLeidos = gradVerde;
    const esBaseSolicitados = solicitados >= leidos;
    const colorBase = esBaseSolicitados ? colorSolicitados : colorLeidos;
    const colorProgreso = esBaseSolicitados ? colorLeidos : colorSolicitados;

    const total = solicitados + leidos;
    const parteMenor = esBaseSolicitados ? leidos : solicitados;
    const anguloFinalObjetivo = (parteMenor / total) * 2 * Math.PI;

    // Configuración de la animación
    let startTime = null;
    const duration = 1200; // Duración de 1.2 segundos

    // Ecuación matemática para el efecto "Rebote" (EaseOutBack)
    function easeOutBack(x) {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    function animar(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      let progress = Math.min(timeElapsed / duration, 1);

      // Aplicar el rebote al progreso
      const easeProgress = easeOutBack(progress);

      ctx.clearRect(0, 0, 260, 260);

      // 1. Dibujar el anillo de fondo (Base)
      ctx.beginPath();
      ctx.arc(cx, cy, radio, 0, 2 * Math.PI);
      ctx.strokeStyle = colorBase;
      ctx.lineWidth = grosor;
      ctx.stroke();

      // 2. Dibujar la barra de progreso animada
      if (parteMenor > 0) {
        ctx.beginPath();
        const anguloActual = easeProgress * anguloFinalObjetivo;
        ctx.arc(cx, cy, radio, -Math.PI / 2, -Math.PI / 2 + anguloActual);
        ctx.strokeStyle = colorProgreso;
        ctx.lineWidth = grosor;
        ctx.stroke();
      }

      // 3. Dibujar textos centrales (tamaños ajustados al nuevo anillo)
      ctx.fillStyle = esDark ? '#FFFFFF' : '#1e3a8a';
      ctx.font = 'bold 38px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(solicitados, cx, cy - 12);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(leidos + ' leídos', cx, cy + 22);

      // Si no ha terminado, solicitar el siguiente fotograma
      if (progress < 1) {
        animacionDonutId = requestAnimationFrame(animar);
      }
    }

    // Iniciar la animación
    animacionDonutId = requestAnimationFrame(animar);
  }

  // =========================================================
  // VARIABLES Y FUNCIONES PARA LA BARRA DE MESES
  // =========================================================
  const hoyGlobal = new Date();
  let anioBarra = hoyGlobal.getFullYear();
  let mesInicioBarra = hoyGlobal.getMonth(); 
  let anioSeleccionado = hoyGlobal.getFullYear();
  let mesSeleccionado = hoyGlobal.getMonth(); 

  function cambiarMesVista(direccion) {
    mesInicioBarra += direccion;
    if (mesInicioBarra > 11) { mesInicioBarra = 0; anioBarra++; } 
    else if (mesInicioBarra < 0) { mesInicioBarra = 11; anioBarra--; }
    generarBarraMesesDinamica();
  }

  function activarMesFiltro(mesIndex, anio) {
  mesSeleccionado = mesIndex;
  anioSeleccionado = anio;
  generarBarraMesesDinamica();
  if (medicoVistaEstadisticas) {
    actualizarVistaEstadisticas();
  } else {
    resetearPanelEstadisticas();
  }
}

  function pacienteEsDelMesActual(fechaStr) {
    if (!fechaStr) return false;
    const mesActual = mesSeleccionado + 1;
    const anioActual = anioSeleccionado;

    if (fechaStr.includes('/')) {
      const partes = fechaStr.split('/');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[2].split(' ')[0], 10);
        return (mes === mesActual && anio === anioActual);
      }
    }
    const d = new Date(fechaStr);
    return (!isNaN(d.getTime()) && (d.getMonth() + 1) === mesActual && d.getFullYear() === anioActual);
  }

  function dibujarBarrasTopMedicos() {
    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const mesActualTexto = nombresMeses[mesSeleccionado];
    const conteo = {};
    bdPacientes.forEach(p => {
      if (pacienteEsDelMesActual(p.fechaCreacion)) {
        const m = (p.medico || '').trim();
        if (m) conteo[m] = (conteo[m] || 0) + 1;
      }
    });

    // Aumentamos el corte a los 6 primeros
    const top6 = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const contenedor = document.getElementById('barrasTopMedicos');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (top6.length === 0) {
      contenedor.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b;">Sin registros en ${mesActualTexto} ${anioSeleccionado}</div>`;
      return;
    }

    let tablaHTML = `<table style="width:100%; border-collapse:collapse;"><thead><tr><th style="text-align:left; padding-bottom:10px; color:#94a3b8; font-size:11px;">MÉDICO</th><th style="text-align:center; padding-bottom:10px; color:#94a3b8; font-size:11px;">CANTIDAD</th></tr></thead><tbody>`;
    top6.forEach(([nombre, cant]) => {
      tablaHTML += `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding:10px 5px; font-weight:600; color:#334155;">${nombre}</td><td style="text-align:center; font-weight:800; color:#2b1070;">${cant}</td></tr>`;
    });
    tablaHTML += `</tbody></table>`;
    contenedor.innerHTML = tablaHTML;
  }

  function generarBarraMesesDinamica() {
    const contenedor = document.getElementById('barraMesesDinamica');
    if (!contenedor) return;
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let html = `<div class="month-item active" style="cursor:pointer;" onclick="abrirSelectorFecha()">${anioBarra} <i class="fas fa-caret-down" style="margin-left:6px;"></i></div>`;
    html += `<div class="month-item" style="flex: 0 0 45px;" onclick="cambiarMesVista(-1)"><i class="fas fa-chevron-left"></i></div>`;
    
    for (let i = 0; i < 3; i++) {
      let mesCalc = mesInicioBarra + i;
      let anioCalc = anioBarra;
      if (mesCalc > 11) { mesCalc -= 12; anioCalc++; }
      const claseActive = (mesCalc === mesSeleccionado && anioCalc === anioSeleccionado) ? 'active' : '';
      html += `<div class="month-item ${claseActive}" onclick="activarMesFiltro(${mesCalc}, ${anioCalc})">${meses[mesCalc].toUpperCase()}</div>`;
    }
    html += `<div class="month-item" style="flex: 0 0 45px;" onclick="cambiarMesVista(1)"><i class="fas fa-chevron-right"></i></div>`;
    contenedor.innerHTML = html;
  }

  function abrirSelectorFecha() {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const anioActualSistema = new Date().getFullYear();
    const anioLimite = anioActualSistema + 5;
    let opcionesAnio = '';
    for(let i = 2023; i <= anioLimite; i++) opcionesAnio += `<option value="${i}" ${i === anioSeleccionado ? 'selected' : ''}>${i}</option>`;

    let opcionesMes = '';
    for(let i = 0; i < 12; i++) opcionesMes += `<option value="${i}" ${i === mesSeleccionado ? 'selected' : ''}>${meses[i]}</option>`;

    const esDark = document.body.classList.contains('dark');
    const cLabel  = esDark ? 'rgba(255,255,255,0.60)' : '#475569';
    const cSelect = esDark ? 'background:#1C2033; color:#C9D1E9; border:1px solid rgba(255,255,255,0.12);' : 'background:#fff; color:#334155; border:1px solid #cbd5e1;';
    const bgModal = esDark ? '#0f1e3d' : '#ffffff';

    Swal.fire({
      title: 'Ir a fecha',
      width: 280,
      background: bgModal,
      html: `
        <div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
          <div>
            <label style="font-size:12px; font-weight:700; color:${cLabel};">Año</label>
            <select id="popAnio" style="width:100%; height:36px; border-radius:8px; padding:0 10px; font-size:14px; outline:none; margin-top:4px; ${cSelect}">
              ${opcionesAnio}
            </select>
          </div>
          <div>
            <label style="font-size:12px; font-weight:700; color:${cLabel};">Mes</label>
            <select id="popMes" style="width:100%; height:36px; border-radius:8px; padding:0 10px; font-size:14px; outline:none; margin-top:4px; ${cSelect}">
              ${opcionesMes}
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Aplicar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2b1070',
      cancelButtonColor: '#64748b',
      preConfirm: () => {
        return {
          anio: parseInt(document.getElementById('popAnio').value),
          mes: parseInt(document.getElementById('popMes').value)
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        anioBarra = result.value.anio;
        mesInicioBarra = result.value.mes;
        activarMesFiltro(result.value.mes, result.value.anio);
      }
    });
  }

  // =========================================================
  // FUNCIONES DEL CARRUSEL DE TARJETAS APILADAS
  // =========================================================

  function construirDOMCarrusel() {
    const contenedor = document.getElementById('carruselContenedorTarjetas');
    if (!contenedor) return;

    if (pacientesCarrusel.length === 0) {
      contenedor.innerHTML = `<div class="carrusel-card" style="position:absolute; top:0; left:0; width:100%; height:200px; border-radius:16px; box-sizing:border-box;"></div>`;
      return;
    }

    const totalC = pacientesCarrusel.length;
    let html = '';

    // Construimos todas las tarjetas, la transición ocurre al mover las clases CSS
    pacientesCarrusel.forEach((p, i) => {
      html += `
        <div id="carrusel-item-${i}" class="carrusel-card" style="position:absolute; top:0; left:0; width:100%; height:200px; border-radius:16px; padding:24px 28px; box-sizing:border-box; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); display:flex; flex-direction:column; justify-content:center; gap:12px; transform-origin: top center;">
            <div style="display:flex; align-items:center; flex-wrap: wrap; gap:5px;">
              <span style="font-size:11px; font-weight:600; color:#94a3b8; width:70px;">Nombre:</span>
              <span style="font-size:13px; font-weight:700; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px;" title="${p.nombre || '—'}">${p.nombre || '—'}</span>
            </div>
            <div style="display:flex; align-items:center; flex-wrap: wrap; gap:5px;">
              <span style="font-size:11px; font-weight:600; color:#94a3b8; width:70px;">Exámenes:</span>
              <span style="font-size:13px; font-weight:700; color:#1e293b;">${(p.listaExamenes ? p.listaExamenes.length : 0)} examen(es)</span>
            </div>
            <div style="display:flex; align-items:center; flex-wrap: wrap; gap:5px;">
              <span style="font-size:11px; font-weight:600; color:#94a3b8; width:70px;">Vence:</span>
              <span style="font-size:13px; font-weight:700; color:#1e293b;">${p.vencimiento || '—'}</span>
            </div>
            <div class="carrusel-controles" style="position:absolute; bottom:14px; right:16px; display:flex; align-items:center; gap:12px;">
              <i class="fas fa-eye carrusel-ojo" onclick="event.stopPropagation(); verDetalleCarrusel()" style="cursor:pointer; font-size:16px; transition:color 0.2s;" title="Ver Ficha Clínica"></i>
              ${totalC > 1 ? `
              <i class="fas fa-chevron-left carrusel-flecha" onclick="event.stopPropagation(); moverCarrusel(-1)" style="cursor:pointer; font-size:12px; padding:6px 10px; border-radius:6px; transition:background 0.2s;"></i>
              <i class="fas fa-chevron-right carrusel-flecha" onclick="event.stopPropagation(); moverCarrusel(1)" style="cursor:pointer; font-size:12px; padding:6px 10px; border-radius:6px; transition:background 0.2s;"></i>
              ` : ''}
            </div>
        </div>
      `;
    });
    contenedor.innerHTML = html;
  }

  function actualizarPosicionesCarrusel() {
    if (pacientesCarrusel.length === 0) return;
    const total = pacientesCarrusel.length;

    for (let i = 0; i < total; i++) {
      const el = document.getElementById(`carrusel-item-${i}`);
      if (!el) continue;

      // Calculamos a qué distancia está esta tarjeta de la vista actual
      let distance = i - indexCarrusel;
      if (distance < 0) distance += total; // Efecto de bucle infinito

      if (distance === 0) {
        // Tarjeta Frontal
        el.style.transform = 'translateY(25px) scale(1)';
        el.style.zIndex = 10;
        el.style.opacity = 1;
      } else if (distance === 1 || (total === 2 && distance === 1)) {
        // Segunda Tarjeta (atrás y asomándose por arriba)
        el.style.transform = 'translateY(12px) scale(0.94)';
        el.style.zIndex = 9;
        el.style.opacity = 0.8;
      } else if (distance === 2) {
        // Tercera Tarjeta (más atrás)
        el.style.transform = 'translateY(0px) scale(0.88)';
        el.style.zIndex = 8;
        el.style.opacity = 0.4;
      } else {
        // Ocultas
        el.style.transform = 'translateY(0px) scale(0.8)';
        el.style.zIndex = 1;
        el.style.opacity = 0;
      }
    }
  }

  function moverCarrusel(direccion) {
    if (pacientesCarrusel.length <= 1) return;
    indexCarrusel += direccion;
    // Bucle infinito
    if (indexCarrusel < 0) indexCarrusel = pacientesCarrusel.length - 1;
    if (indexCarrusel >= pacientesCarrusel.length) indexCarrusel = 0;
    actualizarPosicionesCarrusel();
  }

  function verDetalleCarrusel() {
    if (pacientesCarrusel.length === 0) return;
    const p = pacientesCarrusel[indexCarrusel];
    const id = p.id || p.dni;
    abrirModalLectura(id); // Usa tu función original que ya bloquea los campos
  }

function descargarReporteMedicos(event) {
  event.preventDefault();
  
  const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const mesActualTexto = nombresMeses[mesSeleccionado].toUpperCase();
  
  // 1. Contamos los pacientes de todos los médicos para el mes seleccionado
  const conteo = {};
  let totalPacientes = 0;
  
  bdPacientes.forEach(p => {
    if (pacienteEsDelMesActual(p.fechaCreacion)) {
      const m = (p.medico || '').trim();
      if (m) {
         conteo[m] = (conteo[m] || 0) + 1;
         totalPacientes++;
      }
    }
  });
  
  // 2. Ordenamos de mayor a menor cantidad
  const lista = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  
  if (lista.length === 0) {
    console.log("No hay datos para exportar en este mes.");
    return;
  }

  // 3. Construimos el texto del archivo CSV exactamente como el de tu ejemplo
  let csvContent = `MÉDICO;CANTIDAD DE EXÁMENES (${mesActualTexto})\n`;
  lista.forEach(([nombre, cant]) => {
    csvContent += `"${nombre}";${cant}\n`;
  });
  csvContent += `"Suma total";${totalPacientes}\n`;
  
  // 4. Creamos el archivo y forzamos la descarga instantánea (Sin popups ni hojas en blanco)
  const bom = "\uFEFF"; // Este código asegura que Excel lea perfectamente las tildes y ñ
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `Reporte_Medicos_${nombresMeses[mesSeleccionado]}_${anioSeleccionado}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// ==========================================================
// FUNCIÓN PARA RENDERIZAR LOS PACIENTES DE JUNIO (PANEL DE CASOS)
// ==========================================================
function renderizarPacientesJunio() {
  const contenedor = document.getElementById('listaPacientesJunio');
  if (!contenedor) return;

  const pacientesJunio = bdPacientes.filter(p => {
    if (!p.fechaCreacion) return false;
    const mesBuscado = mesPanelSeleccionado + 1; // De 0-11 a 1-12
    const anioBuscado = anioPanelSeleccionado;

    if (p.fechaCreacion.includes('/')) {
      const partes = p.fechaCreacion.split('/');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[2].split(' ')[0], 10);
        return (mes === mesBuscado && anio === anioBuscado);
      }
    } else if (p.fechaCreacion.includes('-')) {
      const partes = p.fechaCreacion.split('T')[0].split('-');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[0], 10);
        return (mes === mesBuscado && anio === anioBuscado);
      }
    }
    return false;
  });

  // --------------------------------------------------------
  // LÓGICA: Actualizar Tarjetas Superiores (Total y Seguro Top)
  // --------------------------------------------------------
  const txtTotalPacientes = document.getElementById('totalPacientesMesPanel');
  if (txtTotalPacientes) {
    txtTotalPacientes.textContent = pacientesJunio.length;
  }

  // NUEVO: Calcular Ingresos Totales del Mes sumando los precios
  const txtTotalIngresos = document.getElementById('totalIngresosMesPanel');
  if (txtTotalIngresos) {
    let sumaIngresos = 0;
    pacientesJunio.forEach(p => {
      let precio = parseFloat(p.precioTotal);
      if (!isNaN(precio)) {
        sumaIngresos += precio;
      }
    });
    const textoIngreso = 'S/. ' + sumaIngresos.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    txtTotalIngresos.textContent = textoIngreso;
    const len = textoIngreso.length;
    txtTotalIngresos.style.fontSize = len <= 10 ? '34px' : len <= 13 ? '26px' : len <= 16 ? '20px' : '16px';
  }

  const cardSeguroTop = document.getElementById('cardSeguroTop');
  const textSeguroTop = document.getElementById('seguroTopTexto');
  const labelSeguroTop = document.getElementById('labelSeguroTop');
  const iconoSeguroTop = document.getElementById('iconoSeguroTop');

  if (cardSeguroTop && textSeguroTop) {
    const conteoSeg = {};
    let maxCount = 0;
    
    // Contar los seguros
    pacientesJunio.forEach(p => {
      let nSeguro = (p.seguro || '').trim().toUpperCase();
      if(nSeguro.includes('MAPFRE')) nSeguro = 'MAPFRE';
      else if(nSeguro.includes('RIMAC')) nSeguro = 'RIMAC';
      else if(nSeguro.includes('POSITIVA')) nSeguro = 'LA POSITIVA';
      else if(nSeguro.includes('PARTICULAR')) nSeguro = 'PARTICULAR';
      
      if(nSeguro !== '' && nSeguro !== 'SIN SEGURO') {
        conteoSeg[nSeguro] = (conteoSeg[nSeguro] || 0) + 1;
        if(conteoSeg[nSeguro] > maxCount) maxCount = conteoSeg[nSeguro];
      }
    });

    // Detectar ganadores o empates
    let topSeguros = [];
    for (const [seg, count] of Object.entries(conteoSeg)) {
      if (count === maxCount && count > 0) {
        topSeguros.push(seg);
      }
    }

    const getColor = (n) => {
      if (n === 'MAPFRE') return '#68000c';
      if (n === 'RIMAC') return '#dc2626';
      if (n === 'LA POSITIVA') return '#ea580c';
      if (n === 'PARTICULAR') return '#16a34a';
      if (n.includes('VIP')) return '#ca8a04';
      return '#64748b';
    };

    if (topSeguros.length === 0) {
      cardSeguroTop.style.background = 'white';
      labelSeguroTop.style.color = '#94a3b8';
      iconoSeguroTop.style.color = '#818cf8';
      iconoSeguroTop.style.opacity = '0.08';
      textSeguroTop.innerHTML = '<span style="font-size: 32px; font-weight: 900; color: #2b1070;">-</span>';
      
    } else if (topSeguros.length === 1) {
      // 1 Ganador
      const seg1 = topSeguros[0];
      const color1 = getColor(seg1);
      cardSeguroTop.style.background = 'white';
      labelSeguroTop.style.color = '#94a3b8';
      iconoSeguroTop.style.color = color1;
      iconoSeguroTop.style.opacity = '0.08';
      textSeguroTop.innerHTML = `<span style="font-size: 30px; font-weight: 900; color: ${color1};">${seg1}</span>`;
      
    } else {
      // Empate (Degradado)
      const seg1 = topSeguros[0];
      const seg2 = topSeguros[1];
      const c1 = getColor(seg1);
      const c2 = getColor(seg2);
      
      cardSeguroTop.style.background = `linear-gradient(90deg, ${c1} 0%, ${c2} 100%)`;
      labelSeguroTop.style.color = 'rgba(255,255,255,0.9)';
      iconoSeguroTop.style.color = '#ffffff';
      iconoSeguroTop.style.opacity = '0.2';
      
      textSeguroTop.innerHTML = `
        <span style="font-size: 18px; font-weight: 900; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${seg1}</span>
        <span style="font-size: 16px; font-weight: 900; color: rgba(255,255,255,0.6);">-</span>
        <span style="font-size: 18px; font-weight: 900; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${seg2}</span>
      `;
    }
  }

  // --------------------------------------------------------
  // LÓGICA: Lista de Pacientes
  // --------------------------------------------------------
  if (pacientesJunio.length === 0) {
    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    contenedor.innerHTML = `<div style="text-align:center; padding:30px; color:#94a3b8; font-size:13px; font-style:italic;">No hay pacientes registrados en ${nombresMeses[mesPanelSeleccionado]} ${anioPanelSeleccionado}.</div>`;
    
    // 1. Resetear las tarjetas de arriba a cero
    const txtTotal = document.getElementById('totalPacientesMesPanel');
    if (txtTotal) txtTotal.textContent = '0';
    
    const txtIngresos = document.getElementById('totalIngresosMesPanel');
    if (txtIngresos) { txtIngresos.textContent = 'S/. 0.00'; txtIngresos.style.fontSize = '34px'; }
    
    const txtSeguro = document.getElementById('seguroTopTexto');
    if (txtSeguro) txtSeguro.innerHTML = '<span style="font-size: 32px; font-weight: 900; color: #2b1070;">-</span>';
    
    // 2. OPCIÓN NUCLEAR + MENSAJE VISUAL: Clonar los lienzos y escribir "Sin datos"
    ['barrasEjecutivosPanel', 'barrasExamenesPanel', 'donutSegurosPanelCasos', 'halfDonutProgreso'].forEach(id => {
      const canvasAntiguo = document.getElementById(id);
      if (canvasAntiguo) {
        // Clonar para matar el gráfico viejo
        const canvasNuevo = canvasAntiguo.cloneNode(true);
        canvasAntiguo.parentNode.replaceChild(canvasNuevo, canvasAntiguo);
        
        // Dibujar el texto "Sin datos registrados" en el centro del nuevo lienzo
        const ctx = canvasNuevo.getContext('2d');
        const w = canvasNuevo.width || 300;
        const h = canvasNuevo.height || 150;
        
        ctx.clearRect(0, 0, w, h);
        ctx.font = "italic 600 14px 'Segoe UI', Arial, sans-serif";
        ctx.fillStyle = "#94a3b8"; // Color gris profesional
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Sin datos registrados", w / 2, h / 2);
      }
    });
    
    // 3. Limpiar la leyenda de seguros
    const leyenda = document.getElementById('leyendaDonutSeguros');
    if (leyenda) leyenda.innerHTML = '';
    
    return; // Detiene el código
  }

  const esDark = document.body.classList.contains('dark');
  let html = '';
  pacientesJunio.forEach(p => {
    let colorSeguro = '#64748b';
    let nombreSeguro = p.seguro || 'Sin seguro';
    const seguroNormalizado = nombreSeguro.toLowerCase().trim();

    if (seguroNormalizado.includes('mapfre')) colorSeguro = '#68000c';
    else if (seguroNormalizado.includes('rimac')) colorSeguro = '#dc2626';
    else if (seguroNormalizado.includes('positiva')) colorSeguro = '#ea580c';
    else if (seguroNormalizado.includes('particular')) colorSeguro = '#16a34a';
    else if (seguroNormalizado.includes('vip')) colorSeguro = '#ca8a04';

    let estadoTextoMostrar = p.estado || 'Pendiente';
    let hexColor = '#94a3b8';
    let bgEstado = '#f1f5f9';

    if (p.estado === 'Pendiente') {
      hexColor = '#ef4444';
      bgEstado = hexColor;
    } else if (p.estado === 'Completado') {
      hexColor = '#10b981';
      bgEstado = hexColor;
    }

    const subEstadoPlano = p.subEstado || '';

    if (subEstadoPlano && ((p.estado || '').startsWith('En Proceso') || p.estado === 'Completado')) {
      estadoTextoMostrar = subEstadoPlano;
      const claveColor = subEstadoPlano.toLowerCase().trim();
      hexColor = mapaColoresSemaforo[claveColor] || '#f59e0b';
      bgEstado = hexColor;
    }

    const especialidad = obtenerEspecialidadMedico(p.medico);
      
    // CREAMOS UN TEXTO FANTASMA CON LOS 5 DATOS EXACTOS PARA EL BUSCADOR
    const textoSecreto = `${p.nombre || ''} ${p.caso || ''} ${nombreSeguro || ''} ${especialidad || ''} ${estadoTextoMostrar || ''}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // CORRECCIÓN: Fila sin "onclick", menú desplegable anclado al lápiz
    html += `
      <div class="tira-wrapper">
        <span class="datos-filtro-secreto" style="display:none;">${textoSecreto}</span>
        <div class="tira-paciente" style="display: grid; grid-template-columns: 2fr 1fr 1.5fr 1fr 30px; align-items: center;">
          
          
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 700; color: #1e293b; font-size: 13px;">${p.nombre || 'Sin nombre'}</span>
            <span style="font-size: 11px; color: #94a3b8;">${p.fechaCreacion || ''}</span>
          </div>
          <div>
            <span style="background: ${colorSeguro}; color: white; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700;">${nombreSeguro}</span>
          </div>
          <div style="font-size: 12px; color: #475569; font-weight: 500;">${especialidad}</div>
          <div>
            <span style="background: ${bgEstado}; color: #ffffff; border: 1px solid ${hexColor}; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700;">${estadoTextoMostrar}</span>
          </div>
          
          <!-- Contenedor relativo para el lápiz y su menú -->

          <div style="text-align: right; position: relative;">  
                    <i class="fas fa-pencil-alt icon-edit-row" onclick="abrirMenuAcciones(event, 'menu-${p.id || p.dni}')"></i>  
                      
                    <div id="menu-${p.id || p.dni}" class="dropdown-acciones">  
                      <div class="dropdown-item" onclick="accionEditarFicha(event, '${p.id || p.dni}')">  
                        <i class="fas fa-edit" style="margin-right:8px; color:#818cf8;"></i> Corregir Ficha  
                      </div>  
                      <div class="dropdown-item item-danger" onclick="accionCambiarEstado(event, '${p.id || p.dni}')">  
                        <i class="fas fa-trash-alt" style="margin-right:8px; color:#f87171;"></i> Eliminar Registro  
                      </div>  
                    </div>  
                  </div>  
                  
              </div> </div> `;
  });

  contenedor.innerHTML = html;

  ultimosPacientesPanelCasos = pacientesJunio;

  if (typeof dibujarDonutSegurosPanelCasos === 'function') {
    dibujarDonutSegurosPanelCasos(pacientesJunio);
  }
  if (typeof dibujarBarrasEjecutivosPanel === 'function') {
    dibujarBarrasEjecutivosPanel(pacientesJunio);
  }
  if (typeof dibujarMedioAnilloProgreso === 'function') {
    dibujarMedioAnilloProgreso(pacientesJunio);
  }
  if (typeof dibujarBarrasExamenesPanel === 'function') {
    dibujarBarrasExamenesPanel(pacientesJunio);
  }
}

// ==========================================================
// GRÁFICO DE ANILLO PARA SEGUROS (ESTILO GRUESO CON PORCENTAJES DENTRO)
// ==========================================================
let animacionDonutPanelCasosId = null;

function dibujarDonutSegurosPanelCasos(pacientesDelMes) {
  const canvas = document.getElementById('donutSegurosPanelCasos');
  const leyenda = document.getElementById('leyendaDonutSeguros');
  if (!canvas || !leyenda) return;
  const ctx = canvas.getContext('2d');
  const esDark = document.body.classList.contains('dark');

  if (animacionDonutPanelCasosId) {
    cancelAnimationFrame(animacionDonutPanelCasosId);
    animacionDonutPanelCasosId = null;
  }

  const conteoSeguros = {};
  let total = 0;
  pacientesDelMes.forEach(p => {
    let nombreSeguro = (p.seguro || 'Sin seguro').trim().toUpperCase();
    if(nombreSeguro.includes('MAPFRE')) nombreSeguro = 'MAPFRE';
    else if(nombreSeguro.includes('RIMAC')) nombreSeguro = 'RIMAC';
    else if(nombreSeguro.includes('POSITIVA')) nombreSeguro = 'LA POSITIVA';
    else if(nombreSeguro.includes('PARTICULAR')) nombreSeguro = 'PARTICULAR';
    
    conteoSeguros[nombreSeguro] = (conteoSeguros[nombreSeguro] || 0) + 1;
    total++;
  });

  const listaSeguros = Object.entries(conteoSeguros).sort((a, b) => b[1] - a[1]);

  // --- MEDIDAS DEL ANILLO "GORDITO" ---
  const cx = 140;          
  const cy = 140;          
  const radioBase = 90;    // Radio ligeramente menor para dar espacio al grosor
  const grosorBase = 65;   // ¡Grosor al doble! (antes 32)
  const anchoCanvas = 280; 

  // Nombres de los meses para poner en el centro
  const nombresMeses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  // Lee el mes exacto del Panel de Casos
  const textoCentroMes = (typeof mesPanelSeleccionado !== 'undefined') ? nombresMeses[mesPanelSeleccionado] : "MES";

  if (total === 0) {
    ctx.clearRect(0, 0, anchoCanvas, anchoCanvas);
    ctx.beginPath();
    ctx.arc(cx, cy, radioBase, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = grosorBase;
    ctx.stroke();
    
    ctx.fillStyle = esDark ? '#ffffff' : '#1e293b';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textoCentroMes, cx, cy);

    leyenda.innerHTML = '';
    return;
  }

  const segmentos = listaSeguros.map(item => {
    const nombre = item[0];
    const cantidad = item[1];
    const proporcion = cantidad / total;
    const porcentaje = Math.round(proporcion * 100);

    let color = '#64748b'; 
    if (nombre === 'MAPFRE') color = '#68000c';
    else if (nombre === 'RIMAC') color = '#dc2626';
    else if (nombre === 'LA POSITIVA') color = '#ea580c'; 
    else if (nombre === 'PARTICULAR') color = '#16a34a';
    else if (nombre.includes('VIP')) color = '#ca8a04';
    
    return { nombre, cantidad, porcentaje, color, proporcion };
  });

  // --- LEYENDA LIMPIA (Sin los porcentajes) ---
  const leyendaColor = esDark ? 'rgba(255,255,255,0.80)' : '#475569';
  const leyendaBg    = esDark ? 'rgba(255,255,255,0.06)' : '#f8fafc';
  const leyendaBorde = esDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9';
  let htmlLeyenda = '';
  segmentos.forEach(seg => {
    htmlLeyenda += `
      <div style="display: flex; align-items: center; width: 100%; font-size: 11px; font-weight: 700; color: ${leyendaColor}; background: ${leyendaBg}; padding: 8px 12px; border-radius: 8px; box-sizing: border-box; border: 1px solid ${leyendaBorde};">
        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 3px; background: ${seg.color}; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-right: 8px;"></span>
        <span style="text-transform: uppercase;">${seg.nombre}</span>
      </div>
    `;
  });
  leyenda.innerHTML = htmlLeyenda;

  let startTime = null;
  const duration = 1200; 

  function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  function animar(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / duration, 1);
    
    const easeCircle = 1 - Math.pow(1 - progress, 3); 
    const easeSize = easeOutBack(progress);
    const radioAnimado = Math.max(0, radioBase * easeSize); 

    ctx.clearRect(0, 0, anchoCanvas, anchoCanvas);

    let anguloInicio = -Math.PI / 2; 

    // 1. DIBUJAR LOS ARCOS (Segmentos del anillo)
    segmentos.forEach(seg => {
      const anguloSegmento = seg.proporcion * 2 * Math.PI * easeCircle;
      
      ctx.beginPath();
      ctx.arc(cx, cy, radioAnimado, anguloInicio, anguloInicio + anguloSegmento);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = grosorBase * Math.max(0, easeSize); 
      ctx.stroke();
      
      // 2. DIBUJAR EL PORCENTAJE DENTRO DEL ARCO
      // Calculamos el ángulo medio de la rebanada para saber dónde poner el texto
      if (progress > 0.6 && seg.porcentaje >= 4) { // Solo si el % es mayor a 4 para que quepa bien
        const anguloMedio = anguloInicio + (anguloSegmento / 2);
        
        // Coordenadas trigonométricas para el texto
        const textX = cx + Math.cos(anguloMedio) * radioAnimado;
        const textY = cy + Math.sin(anguloMedio) * radioAnimado;
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Efecto de desvanecimiento para el texto
        ctx.globalAlpha = Math.min(1, (progress - 0.6) * 2.5);
        ctx.fillText(seg.porcentaje + '%', textX, textY);
        ctx.globalAlpha = 1.0;
      }
      
      anguloInicio += anguloSegmento;
    });

    // 3. TEXTO DEL MES EN EL CENTRO
    ctx.fillStyle = esDark ? '#ffffff' : '#1e293b';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textoCentroMes, cx, cy);

    if (progress < 1) {
      animacionDonutPanelCasosId = requestAnimationFrame(animar);
    }
  }

  animacionDonutPanelCasosId = requestAnimationFrame(animar);
}

function getColorEjecutivo(nombre) {
  const n = (nombre || '').toLowerCase();
  if (n.includes('stefanny')) return '#FDC3D1';
  if (n.includes('joseph'))   return '#E2760C';
  if (n.includes('andres'))   return '#475569';
  if (n.includes('renzo'))    return '#1d54e0';
  if (n.includes('gustavo'))  return '#68000C';

  // Para ejecutivos nuevos: color estable derivado del nombre (distinto por persona)
  const paleta = [
    '#8b5cf6', '#0ea5e9', '#ef4444', '#f59e0b', '#10b981',
    '#ec4899', '#6366f1', '#14b8a6', '#f43f5e', '#7c3aed',
    '#0891b2', '#65a30d', '#9333ea', '#2563eb', '#db2777',
    '#c2410c', '#0d9488', '#7e22ce', '#be123c', '#1e7a46'
  ];
  let hash = 0;
  for (let i = 0; i < n.length; i++) {
    hash = (hash * 31 + n.charCodeAt(i)) >>> 0;
  }
  return paleta[hash % paleta.length];
}

// ==========================================================
// GRÁFICO DE BARRAS HORIZONTALES: EJECUTIVOS (MÁRGENES CORREGIDOS)
// ==========================================================
let animacionBarrasEjecutivosId = null;

function dibujarBarrasEjecutivosPanel(pacientesDelMes) {
  const canvas = document.getElementById('barrasEjecutivosPanel');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const esDark = document.body.classList.contains('dark');

  if (animacionBarrasEjecutivosId) {
    cancelAnimationFrame(animacionBarrasEjecutivosId);
    animacionBarrasEjecutivosId = null;
  }

  // 1. Obtener ejecutivos del sistema
  const conteo = {};
  const selectEjecutivos = document.getElementById('ejecutivo');
  if (selectEjecutivos) {
    Array.from(selectEjecutivos.options).forEach(opt => {
      if (opt.value && opt.value.trim() !== '') {
        conteo[opt.value.trim()] = 0;
      }
    });
  }

  // 2. Contar casos
  pacientesDelMes.forEach(p => {
    let ejec = (p.ejecutivo || 'Sin asignar').trim();
    conteo[ejec] = (conteo[ejec] || 0) + 1;
  });

  if (conteo['Sin asignar'] === 0) delete conteo['Sin asignar'];

  // 3. Ordenar de MAYOR a MENOR
  const lista = Object.entries(conteo).sort((a, b) => b[1] - a[1]);

  const width = canvas.width;   // Ahora es 600
  const height = canvas.height; // Ahora es 340

  if (lista.length === 0) {
    ctx.clearRect(0, 0, width, height);
    return; 
  }

  // 4. Variables Espaciales del Canvas
  const maxVal = Math.max(...lista.map(item => item[1]), 1);
  const barCount = lista.length;

  const leftArea  = 110; // espacio para nombres
  const rightArea = 70;  // espacio para números
  const topArea    = 2;
  const bottomArea = 42;
  const chartWidth = width - leftArea - rightArea;
  const available  = height - topArea - bottomArea;

  // Barras dinámicas: se adaptan al número de ejecutivos
  const maxBarH = 54;
  const minBarH = 16;
  const gap     = 8;
  const barHeight = Math.min(maxBarH, Math.max(minBarH, Math.floor((available - gap * (barCount - 1)) / barCount)));
  const barStep   = barHeight + gap;
  const totalGroupH = barCount * barStep - gap;
  const startY = topArea + Math.max(0, (available - totalGroupH) / 2);
  const labelSize = barHeight >= 28 ? 15 : 12;
  const numSize   = barHeight >= 28 ? 16 : 12;

  let startTime = null;
  const duration = 1000;

  function easeOutExpo(x) { return x === 1 ? 1 : 1 - Math.pow(2, -10 * x); }

  function animar(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeOutExpo(progress);

    ctx.clearRect(0, 0, width, height);

    lista.forEach((item, index) => {
      const nombreCompleto = item[0] === 'Sin asignar' ? 'S/A' : item[0]; 
      const nombre = nombreCompleto.split(' ')[0]; 
      const valor = item[1];
      const color = getColorEjecutivo(nombre);
      
      const barW = (valor / maxVal) * chartWidth * easeProgress;
      const y = startY + index * barStep;
      const widthVisible = Math.max(barW, 4);

      // 1. Dibujar NOMBRE
      ctx.fillStyle = esDark ? 'rgba(255,255,255,0.80)' : '#475569';
      ctx.font = `bold ${labelSize}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(nombre.toUpperCase(), leftArea - 15, y + barHeight / 2);

      // 2. Pintar BARRA HORIZONTAL
      ctx.fillStyle = color;

      const radius = Math.min(6, widthVisible / 2, barHeight / 2);
      ctx.beginPath();
      ctx.moveTo(leftArea, y);
      ctx.lineTo(leftArea + widthVisible - radius, y);
      ctx.quadraticCurveTo(leftArea + widthVisible, y, leftArea + widthVisible, y + radius);
      ctx.lineTo(leftArea + widthVisible, y + barHeight - radius);
      ctx.quadraticCurveTo(leftArea + widthVisible, y + barHeight, leftArea + widthVisible - radius, y + barHeight);
      ctx.lineTo(leftArea, y + barHeight);
      ctx.fill();

      // 3. Dibujar CANTIDAD DE CASOS
      if (progress > 0.4) {
        ctx.globalAlpha = Math.min(1, (progress - 0.4) * 2);

        if (widthVisible > 40) {
          ctx.fillStyle = 'white';
          ctx.font = `bold ${numSize}px sans-serif`;
          ctx.textAlign = 'right';
          ctx.fillText(valor, leftArea + widthVisible - 12, y + barHeight / 2 + 1);
        } else {
          ctx.fillStyle = color;
          ctx.font = `bold ${numSize}px sans-serif`;
          ctx.textAlign = 'left';
          ctx.fillText(valor, leftArea + widthVisible + 10, y + barHeight / 2 + 1);
        }
        ctx.globalAlpha = 1.0;
      }
    });

    // Línea base vertical decorativa (Con un pequeño rebose arriba y abajo para verse mejor)
    const finBarras = startY + (barStep * (barCount - 1)) + barHeight;
    ctx.beginPath();
    ctx.moveTo(leftArea, startY - 8);
    ctx.lineTo(leftArea, finBarras + 8);
    ctx.strokeStyle = esDark ? 'rgba(255,255,255,0.20)' : '#bae6fd';
    ctx.lineWidth = 3;
    ctx.stroke();

    if (progress < 1) {
      animacionBarrasEjecutivosId = requestAnimationFrame(animar);
    }
  }
  
  animacionBarrasEjecutivosId = requestAnimationFrame(animar);
}

// ==========================================================
// FUNCIONES DEL MENÚ DESPLEGABLE DE ACCIONES (PANEL CASOS)
// ==========================================================

function abrirMenuAcciones(event, menuId) {
  event.stopPropagation(); 
  
  // 1. Cerrar cualquier otro menú abierto y quitar elevación a las demás filas
  document.querySelectorAll('.dropdown-acciones').forEach(menu => {
    if (menu.id !== menuId) {
      menu.classList.remove('active');
      const filaPadre = menu.closest('.tira-paciente');
      if (filaPadre) filaPadre.classList.remove('menu-abierto');
    }
  });

  // 2. Abrir/Cerrar menú actual y elevar (z-index) a su fila para evitar cortes
  const menuActual = document.getElementById(menuId);
  if (menuActual) {
    menuActual.classList.toggle('active');
    const filaActual = menuActual.closest('.tira-paciente');
    
    if (filaActual) {
      if (menuActual.classList.contains('active')) {
        filaActual.classList.add('menu-abierto');
        
        // 3. Inteligencia espacial para que no se corte abajo
        const rectFila = filaActual.getBoundingClientRect();
        const contenedorLista = document.getElementById('listaPacientesJunio');
        const rectContenedor = contenedorLista.getBoundingClientRect();
        
        // Si la distancia desde la fila hasta el fondo de la caja es menor a 110px
        if ((rectContenedor.bottom - rectFila.bottom) < 110) {
          menuActual.style.top = 'auto';
          menuActual.style.bottom = '25px'; // Lo hace abrir hacia ARRIBA
          menuActual.style.boxShadow = '0 -4px 12px rgba(0,0,0,0.08)'; 
        } else {
          menuActual.style.bottom = 'auto';
          menuActual.style.top = '25px'; // Lo hace abrir hacia ABAJO (Normal)
          menuActual.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; 
        }
        
      } else {
        filaActual.classList.remove('menu-abierto');
      }
    }
  }
}

// 4. Detectar clics fuera para cerrar menú y restaurar la tabla
document.addEventListener('click', function() {
  document.querySelectorAll('.dropdown-acciones.active').forEach(menu => {
    menu.classList.remove('active');
    const filaPadre = menu.closest('.tira-paciente');
    if (filaPadre) filaPadre.classList.remove('menu-abierto');
  });
});

// 5. Cerrar el menú automáticamente si el usuario hace scroll en la lista
const contenedorScrollLista = document.getElementById('listaPacientesJunio');
if (contenedorScrollLista) {
  contenedorScrollLista.addEventListener('scroll', function() {
    document.querySelectorAll('.dropdown-acciones.active').forEach(menu => {
      menu.classList.remove('active');
      const filaPadre = menu.closest('.tira-paciente');
      if (filaPadre) filaPadre.classList.remove('menu-abierto');
    });
  });
}

// 6. Funciones de Acción para los Botones
function accionEditarFicha(event, idPaciente) {
  event.stopPropagation(); 
  document.querySelectorAll('.dropdown-acciones').forEach(m => m.classList.remove('active')); 
  document.querySelectorAll('.menu-abierto').forEach(f => f.classList.remove('menu-abierto'));
  
  // Abrimos la ficha del paciente en modo lectura
  abrirModalLectura(idPaciente);

  // Forzamos a que el botón de "Editar Ficha" se muestre, saltando los bloqueos
  document.getElementById('btnModoLecturaEditar').style.display = "block";
}

function accionCambiarEstado(event, idPaciente) {
  event.stopPropagation();
  // 1. Cerramos los menús desplegables
  document.querySelectorAll('.dropdown-acciones').forEach(m => m.classList.remove('active')); 
  document.querySelectorAll('.menu-abierto').forEach(f => f.classList.remove('menu-abierto'));

  // 2. Simulamos que abrimos la ficha internamente para cargar el ID Original
  const p = bdPacientes.find(item => (item.id || item.dni).toString() === idPaciente.toString());
  if (!p) return;
  document.getElementById('dniOriginal').value = p.id || p.dni;
  
  // 3. Disparamos tu alerta roja nativa de eliminación
  eliminarPaciente();
}

// ==========================================================
// GRÁFICO DE MEDIO ANILLO (PROGRESO DE CIERRES)
// ==========================================================
let animacionMedioAnilloId = null;

function dibujarMedioAnilloProgreso(pacientesDelMes) {
  const canvas = document.getElementById('halfDonutProgreso');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const esDark = document.body.classList.contains('dark');

  if (animacionMedioAnilloId) {
    cancelAnimationFrame(animacionMedioAnilloId);
    animacionMedioAnilloId = null;
  }

  if (pacientesDelMes.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  // 1. Filtrar solo los cerrados (Lectura Realizada y Desestimados)
  let cerrados = 0;
  pacientesDelMes.forEach(p => {
    const sub = (p.subEstado || '').toLowerCase().trim();
    if (sub === 'lectura realizada' || sub === 'desestimado') {
      cerrados++;
    }
  });

  const total = pacientesDelMes.length;
  const porcentajeReal = (cerrados / total);
  const porcentajeTexto = Math.round(porcentajeReal * 100);

  // 2. Coordenadas y diseño ampliados para maximizar el espacio
  const cx = 160;
  const cy = 165;
  const radio = 115; // Aumentado para aprovechar el canvas más grande
  const grosor = 48; // Ligeramente más grueso

  let startTime = null;
  const duration = 1200;

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function animar(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo completo del arco (Faltantes) -> Color #99CAFF
    ctx.beginPath();
    ctx.arc(cx, cy, radio, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = '#99CAFF';
    ctx.lineWidth = grosor;
    ctx.stroke();

    // Progreso superpuesto (Completados) -> Color #004EE0
    if (porcentajeReal > 0) {
      const anguloProgreso = Math.PI + (Math.PI * porcentajeReal * easeProgress);
      ctx.beginPath();
      ctx.arc(cx, cy, radio, Math.PI, anguloProgreso);
      ctx.strokeStyle = '#004EE0';
      ctx.lineWidth = grosor;
      ctx.stroke();
    }

    // Texto en el centro
    const currentPorcentaje = Math.round(porcentajeTexto * easeProgress);
    ctx.fillStyle = esDark ? '#ffffff' : '#2b1070';
    ctx.font = '900 38px Verdana, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentPorcentaje + '%', cx, cy - 16);

    ctx.fillStyle = esDark ? 'rgba(255,255,255,0.65)' : '#64748b';
    ctx.font = '700 13px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText('COMPLETADOS', cx, cy + 12);

    if (progress < 1) {
      animacionMedioAnilloId = requestAnimationFrame(animar);
    }
  }

  animacionMedioAnilloId = requestAnimationFrame(animar);
}

// ==========================================================
// GRÁFICO DE BARRAS VERTICALES: TOP EXÁMENES
// ==========================================================
let animacionBarrasExamenesId = null;

function dibujarBarrasExamenesPanel(pacientesDelMes) {
  const canvas = document.getElementById('barrasExamenesPanel');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const esDark = document.body.classList.contains('dark');

  if (animacionBarrasExamenesId) {
    cancelAnimationFrame(animacionBarrasExamenesId);
    animacionBarrasExamenesId = null;
  }

  // 1. Contar todos los exámenes dentro del array de cada paciente
  const conteo = {};
  pacientesDelMes.forEach(p => {
    if (p.listaExamenes && Array.isArray(p.listaExamenes)) {
      p.listaExamenes.forEach(ex => {
        const nombreExamen = ex.trim();
        if (nombreExamen) {
          conteo[nombreExamen] = (conteo[nombreExamen] || 0) + 1;
        }
      });
    }
  });

  // 2. Ordenar de mayor a menor y extraer los Top 5
  const lista = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const width = canvas.width;   
  const height = canvas.height; 

  if (lista.length === 0) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Sin datos de exámenes", width/2, height/2);
    return;
  }

  // 3. Paleta de colores clínicos (tonos más claros en modo oscuro)
  const colores = esDark
    ? ['#A5C8FF', '#7BA7F5', '#4F8EF7', '#99CAFF', '#C9DDF5']
    : ['#042E7B', '#004EE0', '#1883FF', '#99CAFF', '#E3F2FF'];

  const maxVal = Math.max(...lista.map(item => item[1]), 1);
  
  // Variables espaciales corregidas
  const bottomArea = 45; 
  const topArea = 55;    // AUMENTADO: Da más respiro arriba para la barra más alta
  const chartHeight = height - topArea - bottomArea;
  const chartWidth = width - 40; 
  const startX = 20;
  
  const barWidth = 65; 
  const spacing = (chartWidth - (lista.length * barWidth)) / (lista.length + 1);

  let startTime = null;
  const duration = 1000;

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function animar(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    let progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeOutExpo(progress);

    ctx.clearRect(0, 0, width, height);

    // Dibujar línea base
    ctx.beginPath();
    ctx.moveTo(startX, height - bottomArea);
    ctx.lineTo(width - 20, height - bottomArea);
    ctx.strokeStyle = esDark ? 'rgba(255,255,255,0.15)' : '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.stroke();

    lista.forEach((item, index) => {
      const nombreCompleto = item[0];
      
      let nombreCorto = nombreCompleto;
      if (nombreCorto.length > 13) {
         nombreCorto = nombreCorto.substring(0, 11) + '..';
      }
      
      const valor = item[1];
      const color = colores[index] || colores[colores.length-1];
      
      // Calcular altura animada
      const barH = (valor / maxVal) * chartHeight * easeProgress;
      const x = startX + spacing + index * (barWidth + spacing);
      const y = height - bottomArea - barH;
      
      // Pintar la barra vertical
      if (barH > 0) {
          ctx.fillStyle = color;
          const radius = Math.min(8, barWidth / 2, barH / 2);
          
          ctx.beginPath();
          ctx.moveTo(x, height - bottomArea);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.lineTo(x + barWidth - radius, y);
          ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
          ctx.lineTo(x + barWidth, height - bottomArea);
          ctx.fill();
      }

      // Dibujar la cantidad arriba de la barra (¡Corregido!)
      if (progress > 0.4) {
        ctx.globalAlpha = Math.min(1, (progress - 0.4) * 2);
        ctx.fillStyle = esDark ? '#ffffff' : color;
        ctx.font = '900 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom'; // CORRECCIÓN: Evita que el número se hunda en la barra
        ctx.fillText(valor, x + barWidth / 2, y - 8); // Se dibuja 8px por encima del borde exacto
        ctx.globalAlpha = 1.0;
      }

      // Dibujar el nombre del examen abajo
      ctx.fillStyle = esDark ? 'rgba(255,255,255,0.75)' : '#475569';
      ctx.font = '800 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(nombreCorto.toUpperCase(), x + barWidth / 2, height - bottomArea + 12);
    });

    if (progress < 1) {
      animacionBarrasExamenesId = requestAnimationFrame(animar);
    }
  }
  
  animacionBarrasExamenesId = requestAnimationFrame(animar);
}


// ==========================================================
// POPUP: DETALLE DE EXÁMENES TOP 5
// ==========================================================
function verDetallesExamenesTop() {
  // 1. Filtrar los pacientes de forma dinámica (igual que hace el panel)
  const pacientesJunio = bdPacientes.filter(p => {
    if (!p.fechaCreacion) return false;
    const mesBuscado = mesPanelSeleccionado + 1; // De 0-11 a 1-12
    const anioBuscado = anioPanelSeleccionado;

    if (p.fechaCreacion.includes('/')) {
      const partes = p.fechaCreacion.split('/');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[2].split(' ')[0], 10);
        return (mes === mesBuscado && anio === anioBuscado);
      }
    } else if (p.fechaCreacion.includes('-')) {
      const partes = p.fechaCreacion.split('T')[0].split('-');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[0], 10);
        return (mes === mesBuscado && anio === anioBuscado);
      }
    }
    return false;
  });

  // 2. Contar todos los exámenes
  const conteo = {};
  let totalExamenes = 0;
  
  pacientesJunio.forEach(p => {
    if (p.listaExamenes && Array.isArray(p.listaExamenes)) {
      p.listaExamenes.forEach(ex => {
        const nombreExamen = ex.trim();
        if (nombreExamen) {
          conteo[nombreExamen] = (conteo[nombreExamen] || 0) + 1;
          totalExamenes++; // Sumamos al total general para sacar porcentajes
        }
      });
    }
  });

  // 3. Ordenar de mayor a menor y extraer los Top 5
  const lista = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 5);

  if (lista.length === 0) {
    Swal.fire({
      target: document.getElementById('modalClinico') ? document.getElementById('modalClinico') : 'body',
      icon: 'info',
      title: 'Sin datos',
      text: 'No hay exámenes registrados en este mes.',
      confirmButtonColor: '#2b1070'
    });
    return;
  }

  // 4. Paleta de colores
  const colores = ['#042E7B', '#004EE0', '#1883FF', '#99CAFF', '#E3F2FF'];

  // 5. Construir la lista HTML detallada
  const esDark = document.body.classList.contains('dark');
  const cTxt    = esDark ? 'rgba(255,255,255,0.87)' : '#334155';
  const cSub    = esDark ? 'rgba(255,255,255,0.45)' : '#94a3b8';
  const cBg     = esDark ? 'rgba(255,255,255,0.10)' : '#f1f5f9';
  const cTitulo = esDark ? '#7BA7F5' : '#2b1070';
  const bgModal = esDark ? '#0f1e3d' : '#ffffff';

  let htmlDetalle = '<div style="display:flex; flex-direction:column; gap:16px; margin-top:20px; padding: 0 10px;">';

  lista.forEach((item, index) => {
    const nombre = item[0];
    const cantidad = item[1];
    const porcentaje = Math.round((cantidad / totalExamenes) * 100);
    const color = colores[index] || colores[colores.length-1];

    htmlDetalle += `
      <div style="display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; font-size:13px; font-weight:700; color:${cTxt};">
          <span style="text-align:left; line-height:1.2;">
            <span style="color:${cSub}; margin-right:4px;">#${index + 1}</span>
            ${nombre}
          </span>
          <span style="color:${color}; font-weight:900; font-size: 16px;">
            ${cantidad} <span style="font-size:11px; color:${cSub}; font-weight:600;">(${porcentaje}%)</span>
          </span>
        </div>
        <div style="width:100%; height:10px; background:${cBg}; border-radius:5px; overflow:hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
          <div style="width:${porcentaje}%; height:100%; background-color:${color}; border-radius:5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
        </div>
      </div>
    `;
  });
  htmlDetalle += '</div>';

  // 6. Lanzar la alerta
  Swal.fire({
    title: `<div style="font-size:22px; font-weight:800; color:${cTitulo}; text-transform:uppercase; margin-bottom: 0;">Detalle de Exámenes</div><div style="font-size:12px; font-weight:600; color:${cSub}; text-transform:none; margin-top:4px;">Exámenes más solicitados del mes</div>`,
    html: htmlDetalle,
    background: bgModal,
    width: 420,
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#64748b',
    buttonsStyling: true,
    padding: '1.5em 1em 2em 1em'
  });
}

// ==========================================================
// POPUP: DETALLE DE PACIENTES POR SEGURO
// ==========================================================
function verDetallesSeguros() {
  // 1. Filtrar los pacientes de forma dinámica (igual que hace el panel)
  const pacientesJunio = bdPacientes.filter(p => {
    if (!p.fechaCreacion) return false;
    const mesBuscado = mesPanelSeleccionado + 1; // De 0-11 a 1-12
    const anioBuscado = anioPanelSeleccionado;

    if (p.fechaCreacion.includes('/')) {
      const partes = p.fechaCreacion.split('/');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[2].split(' ')[0], 10);
        return (mes === mesBuscado && anio === anioBuscado);
      }
    } else if (p.fechaCreacion.includes('-')) {
      const partes = p.fechaCreacion.split('T')[0].split('-');
      if (partes.length >= 3) {
        const mes = parseInt(partes[1], 10);
        const anio = parseInt(partes[0], 10);
        return (mes === mesBuscado && anio === anioBuscado);
      }
    }
    return false;
  });

  // 2. Contar por seguros
  const conteoSeguros = {};
  let total = 0;
  
  pacientesJunio.forEach(p => {
    let nombreSeguro = (p.seguro || 'Sin seguro').trim().toUpperCase();
    if(nombreSeguro.includes('MAPFRE')) nombreSeguro = 'MAPFRE';
    else if(nombreSeguro.includes('RIMAC')) nombreSeguro = 'RIMAC';
    else if(nombreSeguro.includes('POSITIVA')) nombreSeguro = 'LA POSITIVA';
    else if(nombreSeguro.includes('PARTICULAR')) nombreSeguro = 'PARTICULAR';
    
    conteoSeguros[nombreSeguro] = (conteoSeguros[nombreSeguro] || 0) + 1;
    total++;
  });

  // 3. Ordenar de mayor a menor
  const lista = Object.entries(conteoSeguros).sort((a, b) => b[1] - a[1]);

  if (lista.length === 0) {
    Swal.fire({
      target: document.getElementById('modalClinico') ? document.getElementById('modalClinico') : 'body',
      icon: 'info',
      title: 'Sin datos',
      text: 'No hay pacientes registrados en este mes.',
      confirmButtonColor: '#2b1070'
    });
    return;
  }

  // 4. Construir la lista HTML detallada
  const esDark = document.body.classList.contains('dark');
  const cTxt    = esDark ? 'rgba(255,255,255,0.87)' : '#334155';
  const cSub    = esDark ? 'rgba(255,255,255,0.45)' : '#94a3b8';
  const cBg     = esDark ? 'rgba(255,255,255,0.10)' : '#f1f5f9';
  const cTitulo = esDark ? '#7BA7F5' : '#2b1070';
  const bgModal = esDark ? '#0f1e3d' : '#ffffff';

  let htmlDetalle = '<div style="display:flex; flex-direction:column; gap:16px; margin-top:20px; padding: 0 10px;">';

  lista.forEach((item, index) => {
    const nombre = item[0];
    const cantidad = item[1];
    const porcentaje = Math.round((cantidad / total) * 100);

    // Paleta de colores exacta por marca de seguro
    let color = '#64748b';
    if (nombre === 'MAPFRE') color = '#68000c';
    else if (nombre === 'RIMAC') color = '#dc2626';
    else if (nombre === 'LA POSITIVA') color = '#ea580c';
    else if (nombre === 'PARTICULAR') color = '#16a34a';
    else if (nombre.includes('VIP')) color = '#ca8a04';

    htmlDetalle += `
      <div style="display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; font-size:13px; font-weight:700; color:${cTxt};">
          <span style="text-align:left; line-height:1.2; display:flex; align-items:center; gap:8px;">
            <span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:${color};"></span>
            ${nombre}
          </span>
          <span style="color:${color}; font-weight:900; font-size: 16px;">
            ${cantidad} <span style="font-size:11px; color:${cSub}; font-weight:600;">(${porcentaje}%)</span>
          </span>
        </div>
        <div style="width:100%; height:10px; background:${cBg}; border-radius:5px; overflow:hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
          <div style="width:${porcentaje}%; height:100%; background-color:${color}; border-radius:5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
        </div>
      </div>
    `;
  });
  htmlDetalle += '</div>';

  // 5. Lanzar la alerta emergente
  Swal.fire({
    title: `<div style="font-size:22px; font-weight:800; color:${cTitulo}; text-transform:uppercase; margin-bottom: 0;">Detalle por Seguro</div><div style="font-size:12px; font-weight:600; color:${cSub}; text-transform:none; margin-top:4px;">Distribución de pacientes atendidos</div>`,
    html: htmlDetalle,
    background: bgModal,
    width: 420,
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#64748b',
    buttonsStyling: true,
    padding: '1.5em 1em 2em 1em'
  });
}

// ==========================================================
// BUSCADOR BLINDADO: LISTA DE PANEL DE CASOS
// ==========================================================
function filtrarListaPanel() {
  const input = document.getElementById('inputBuscarCasoPanel');
  if (!input) return;
  
  // 1. Limpiamos lo que el usuario escribe (minúsculas y sin tildes)
  const filtro = input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const palabrasFiltro = filtro.split(/\s+/).filter(p => p !== '');
  
  const contenedorLista = document.getElementById('listaPacientesJunio');
  if (!contenedorLista) return;
  
  const wrappers = contenedorLista.querySelectorAll('.tira-wrapper');
  
  wrappers.forEach(wrapper => {
    // 2. Leemos nuestro texto fantasma (que tiene Nombre, Caso, Seguro, Especialidad y Estado)
    const spanSecreto = wrapper.querySelector('.datos-filtro-secreto');
    const textoExacto = spanSecreto ? spanSecreto.textContent : '';
    
    // 3. Verificamos que todas las palabras buscadas existan en el texto fantasma
    const coincide = palabrasFiltro.every(palabra => textoExacto.includes(palabra));
    
    if (coincide || palabrasFiltro.length === 0) {
      wrapper.style.display = ''; 
    } else {
      wrapper.style.display = 'none'; 
    }
  });
}

// ==========================================================
// FUNCIÓN PARA COPIAR LA PLANTILLA AL PORTAPAPELES
// ==========================================================
function copiarPlantillaLectura(event) {
  const texto = document.getElementById('textoPlantillaLectura').textContent;
  
  navigator.clipboard.writeText(texto).then(() => {
    // Si se copia con éxito, hacemos que el botón cambie a verde diciendo "Copiado" por 2 segundos
    if (event && event.currentTarget) {
      const btn = event.currentTarget;
      const originalHTML = btn.innerHTML;
      
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
      btn.style.borderColor = '#10b981';
      btn.style.color = '#10b981';
      btn.style.background = '#ecfdf5';
      
      setTimeout(() => { 
        btn.innerHTML = originalHTML; 
        btn.style.borderColor = '#cbd5e1';
        btn.style.color = '#2b1070';
        btn.style.background = '#f1f5f9';
      }, 2000);
    }
  }).catch(err => {
    console.error("Error al copiar: ", err);
  });
}

/* =========================
   CALENDARIO
========================= */

let calAnio = new Date().getFullYear();
let calMes = new Date().getMonth();
let pacientesProgramados = [];

function iniciarCalendario() {
  actualizarFechaHoyCard();
  google.script.run
    .withSuccessHandler(function(lista) {
      const _prevProg = _snapshot.programados;
      if (_prevProg >= 0 && lista.length > _prevProg) {
        const n = lista.length - _prevProg;
        agregarNotificacion(n === 1 ? 'Se agregó 1 evento al calendario' : `Se agregaron ${n} eventos al calendario`, 'fas fa-calendar-plus');
      }
      _snapshot.programados = lista.length;
      pacientesProgramados = lista;
      renderizarCalendario();
      renderizarProximosEventos();
    })
    .withFailureHandler(function() {
      renderizarCalendario();
    })
    .obtenerPacientesProgramados();
}

function actualizarFechaHoyCard() {
  const diasSemana = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const hoy = new Date();

  const elDia = document.getElementById('calFechaHoyDia');
  const elNumero = document.getElementById('calFechaHoyNumero');
  if (elDia) elDia.textContent = `${diasSemana[hoy.getDay()]} ${meses[hoy.getMonth()]}`;
  if (elNumero) elNumero.textContent = hoy.getDate();
}

function calNavegar(dir) {
  calMes += dir;
  if (calMes > 11) { calMes = 0; calAnio++; }
  if (calMes < 0)  { calMes = 11; calAnio--; }
  renderizarCalendario();
}

function calHoy() {
  const hoy = new Date();
  calAnio = hoy.getFullYear();
  calMes = hoy.getMonth();
  renderizarCalendario();
}

function renderizarCalendario() {
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                 "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  document.getElementById('calTitulo').textContent = meses[calMes] + ' ' + calAnio;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const esDark = document.body.classList.contains('dark');

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  const primerDia = new Date(calAnio, calMes, 1).getDay();
  const diasEnMes = new Date(calAnio, calMes + 1, 0).getDate();

  // Tokens de color según el tema
  const borde       = esDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9';
  const bgVacia     = esDark ? 'rgba(0,0,0,0.15)'       : '#fafafa';
  const bgNormal    = esDark ? 'rgba(255,255,255,0.03)'  : 'white';
  const bgHoy       = esDark ? 'rgba(99,102,241,0.18)'   : '#faf5ff';
  const bgHoverNorm = esDark ? 'rgba(255,255,255,0.08)'  : '#f8fafc';
  const bgHoverHoy  = esDark ? 'rgba(99,102,241,0.28)'   : '#f3e8ff';
  const circHoyBg   = esDark ? '#818cf8'                 : '#2b1070';
  const numHoy      = 'white';
  const numPasado   = esDark ? 'rgba(255,255,255,0.28)'  : '#94a3b8';
  const numFuturo   = esDark ? 'rgba(255,255,255,0.85)'  : '#1e293b';
  const chipRegBg   = esDark ? 'rgba(139,92,246,0.22)'   : '#ede9fe';
  const chipRegClr  = esDark ? '#c4b5fd'                 : '#2b1070';
  const chipProgBg  = esDark ? 'rgba(16,185,129,0.20)'   : '#dcfce7';
  const chipProgClr = esDark ? '#6ee7b7'                 : '#166534';
  const masClr      = esDark ? 'rgba(255,255,255,0.40)'  : '#94a3b8';

  // Celdas vacías antes del primer día
  for (let i = 0; i < primerDia; i++) {
    grid.innerHTML += `<div style="border:1px solid ${borde}; background:${bgVacia}; overflow:hidden;"></div>`;
  }
  // Actualizar contadores del encabezado
  const elProg = document.getElementById('calTotalProgramados');
  const elCasos = document.getElementById('calTotalCasos');
  if (elProg) elProg.textContent = pacientesProgramados.length;
  if (elCasos) elCasos.textContent = bdPacientes.length;
  renderizarMiniCalLista();

  // Días del mes
  for (let d = 1; d <= diasEnMes; d++) {
    const fechaStr = `${calAnio}-${String(calMes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const fechaDia = new Date(calAnio, calMes, d);
    fechaDia.setHours(0,0,0,0);

    const esHoy = fechaDia.getTime() === hoy.getTime();
    const esPasado = fechaDia < hoy;

    const bgBase  = esHoy ? bgHoy    : bgNormal;
    const bgHover = esHoy ? bgHoverHoy : bgHoverNorm;
    const numColor = esHoy ? numHoy : (esPasado ? numPasado : numFuturo);

    // Pacientes registrados ese día
    const registrados = bdPacientes.filter(p => {
      if (!p.fechaCreacion) return false;
      const partes = p.fechaCreacion.split(' ')[0].split('/');
      if (partes.length < 3) return false;
      const fReg = `${partes[2]}-${partes[1].padStart(2,'0')}-${partes[0].padStart(2,'0')}`;
      return fReg === fechaStr;
    });

    // Pacientes programados ese día
    const programados = pacientesProgramados.filter(p => p.fechaProgramada === fechaStr);

    let eventosHTML = '';
    registrados.slice(0, 2).forEach(p => {
      eventosHTML += `<div style="background:${chipRegBg}; color:${chipRegClr}; border-radius:4px; padding:2px 5px; font-size:10px; font-weight:600; margin-bottom:2px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${p.nombre}</div>`;
    });
    programados.slice(0, 2).forEach(p => {
      eventosHTML += `<div style="background:${chipProgBg}; color:${chipProgClr}; border-radius:4px; padding:2px 5px; font-size:10px; font-weight:600; margin-bottom:2px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">📅 ${p.nombre}</div>`;
    });

    const totalExtra = (registrados.length + programados.length) - 4;

    grid.innerHTML += `
      <div onclick="calClickDia('${fechaStr}', ${esPasado})" style="
        border:1px solid ${borde};
        padding:8px;
        cursor:pointer;
        background:${bgBase};
        transition:background 0.15s;
        position:relative;
        overflow:hidden;
        box-sizing:border-box;
      "
      onmouseover="this.style.background='${bgHover}'"
      onmouseout="this.style.background='${bgBase}'">
        <div style="
          width:26px; height:26px;
          border-radius:50%;
          background:${esHoy ? circHoyBg : 'transparent'};
          color:${numColor};
          font-size:13px;
          font-weight:${esHoy ? '700' : '500'};
          display:flex; align-items:center; justify-content:center;
          margin-bottom:4px;
        ">${d}</div>
        ${eventosHTML}
        ${totalExtra > 0 ? `<div style="font-size:10px; color:${masClr}; font-weight:600;">+${totalExtra} más</div>` : ''}
      </div>
    `;
  }
}

function calClickDia(fechaStr, esPasado) {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const opciones = { year:'numeric', month:'long', day:'numeric' };
  const fechaFormateada = fecha.toLocaleDateString('es-PE', opciones);
  const esDark = document.body.classList.contains('dark');

  // Colores adaptativos del modal
  const modalBg      = esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : '#ffffff';
  const tituloClr    = esDark ? '#ffffff'                  : '#1e293b';
  const seccionClr   = esDark ? '#a5b4fc'                  : '#2b1070';
  const seccionVerde = esDark ? '#86efac'                  : '#166534';
  const regChipBg    = esDark ? 'rgba(139,92,246,0.20)'    : '#ede9fe';
  const regChipClr   = esDark ? '#c4b5fd'                  : '#2b1070';
  const regEstadoClr = esDark ? '#a78bfa'                  : '#7c3aed';
  const progChipBg   = esDark ? 'rgba(16,185,129,0.18)'    : '#dcfce7';
  const progChipClr  = esDark ? '#6ee7b7'                  : '#166534';
  const sinDatosClr  = esDark ? 'rgba(255,255,255,0.35)'   : '#94a3b8';

  // Ver programados de ese día
  const programadosDelDia = pacientesProgramados.filter(p => p.fechaProgramada === fechaStr);
  const registradosDelDia = bdPacientes.filter(p => {
    if (!p.fechaCreacion) return false;
    const partes = p.fechaCreacion.split(' ')[0].split('/');
    if (partes.length < 3) return false;
    const fReg = `${partes[2]}-${partes[1].padStart(2,'0')}-${partes[0].padStart(2,'0')}`;
    return fReg === fechaStr;
  });

  let listaHTML = '';
  if (registradosDelDia.length > 0) {
    listaHTML += `<div style="font-size:12px; font-weight:700; color:${seccionClr}; margin-bottom:6px; text-transform:uppercase; letter-spacing:.5px;">Registrados</div>`;
    registradosDelDia.forEach(p => {
      listaHTML += `<div style="background:${regChipBg}; border-radius:8px; padding:8px 12px; margin-bottom:6px; font-size:13px; color:${regChipClr}; font-weight:600;">${p.nombre} <span style="font-weight:400; color:${regEstadoClr};">· ${p.estado}</span></div>`;
    });
  }
  if (programadosDelDia.length > 0) {
    listaHTML += `<div style="font-size:12px; font-weight:700; color:${seccionVerde}; margin-bottom:6px; text-transform:uppercase; letter-spacing:.5px; margin-top:10px;">Programados</div>`;
    programadosDelDia.forEach(p => {
      const progId = p.id || p.dni || '';
      listaHTML += `
        <div style="display:flex; align-items:center; gap:8px; background:${progChipBg}; border-radius:8px; padding:8px 12px; margin-bottom:6px;">
          <span style="flex:1; font-size:13px; color:${progChipClr}; font-weight:600;">📅 ${p.nombre} <span style="font-weight:400;">· ${p.medico}</span></span>
          <button onclick="confirmarEliminarProgramacion('${progId}', '${fechaStr}')"
            title="Eliminar programación"
            style="flex-shrink:0; background:transparent; border:none; cursor:pointer; color:#ef4444; font-size:14px; padding:5px 7px; border-radius:6px; line-height:1; transition:background 0.15s;"
            onmouseover="this.style.background='rgba(239,68,68,0.15)'"
            onmouseout="this.style.background='transparent'">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>`;
    });
  }
  if (listaHTML === '') {
    listaHTML = `<div style="color:${sinDatosClr}; font-size:13px; text-align:center; padding:10px;">Sin pacientes este día</div>`;
  }

  Swal.fire({
    title: fechaFormateada,
    html: `
      <div style="text-align:left; max-height:300px; overflow-y:auto;">
        ${listaHTML}
      </div>
      ${!esPasado ? `
      <button onclick="abrirModalProgramacion('${fechaStr}')" style="
        margin-top:16px;
        width:100%;
        background:#2b1070;
        color:white;
        border:none;
        border-radius:10px;
        padding:12px;
        font-size:14px;
        font-weight:600;
        cursor:pointer;
      ">+ Programar Examen para este día</button>
      ` : `
      <div style="
        margin-top:16px;
        width:100%;
        background:${esDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'};
        color:${esDark ? 'rgba(255,255,255,0.35)' : '#94a3b8'};
        border-radius:10px;
        padding:12px;
        font-size:13px;
        font-weight:600;
        text-align:center;
        box-sizing:border-box;
      ">No se puede programar en fechas pasadas</div>
      `}
    `,
    showConfirmButton: false,
    showCloseButton: true,
    width: 420,
    background: modalBg,
    color: tituloClr
  });
}

function confirmarEliminarProgramacion(id, fechaStr) {
  const esDark = document.body.classList.contains('dark');
  Swal.fire({
    title: '¿Eliminar programación?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: esDark ? '#334155' : '#64748b',
    background: esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : '#ffffff',
    color: esDark ? '#ffffff' : '#1e293b'
  }).then(result => {
    if (!result.isConfirmed) return;
    Swal.fire({ title: 'Eliminando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    google.script.run
      .withSuccessHandler(function() {
        iniciarCalendario();
        Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false,
          background: esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : '#ffffff',
          color: esDark ? '#ffffff' : '#1e293b' });
      })
      .withFailureHandler(function() {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar. Intenta de nuevo.',
          background: esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : '#ffffff',
          color: esDark ? '#ffffff' : '#1e293b' });
      })
      .eliminarProgramacion(id);
  });
}

function abrirModalProgramacion(fechaStr) {
  Swal.close();
  // Reutilizamos el modal existente, solo cambiamos el título y agregamos la fecha programada
  fechaProgramadaActual = fechaStr;
  const fecha = new Date(fechaStr + 'T00:00:00');
  const fechaFormateada = fecha.toLocaleDateString('es-PE', { year:'numeric', month:'long', day:'numeric' });
  
  document.getElementById('modalTitulo').textContent = `Programar Examen · ${fechaFormateada}`;
  document.getElementById('formularioPaciente').reset();
  document.getElementById('esEdicion').value = "false";
  document.getElementById('dniOriginal').value = "";
  document.getElementById('btnEliminarPaciente').style.display = "none";
  alternarBloqueoInputs(false);
  document.getElementById('btnGuardarFicha').style.display = "none";
  document.getElementById('btnModoLecturaEditar').style.display = "none";
  document.getElementById('selectExamenes').style.display = "block";
  document.getElementById('labelSelectExamenes').style.display = "block";
  examenesSeleccionados = [];
  dibujarTagsExamenes();
  document.getElementById('precioTotal').value = "0.00";
  document.getElementById('boxEspecialidad').style.display = "none";
  document.getElementById('boxSeguro').style.display = "none";
  document.getElementById('grupoEspecialidadFiltro').style.display = "block";
  document.getElementById('estado').value = "Pendiente";
  document.getElementById('estado').disabled = true;
  document.getElementById('especialidadFiltro').value = "";
  document.getElementById('medico').innerHTML = '<option value="">-- Seleccionar --</option>';
  subEstadoSeleccionado = "";
  medicoLectorSeleccionado = "";

  // Botón guardar programación
  const acciones = document.querySelector('.modal-actions');
  acciones.innerHTML = `
    <button type="button" class="btn-secondary" onclick="cerrarModal(); restaurarBotonesModal();">Cancelar</button>
    <button type="button" class="btn-primary" onclick="guardarProgramacion()">
      <i class="fas fa-calendar-check"></i> Guardar Programación
    </button>
  `;

  document.getElementById('modalClinico').classList.add('active');
  actualizarCamposProceso();
}

let fechaProgramadaActual = "";

function guardarProgramacion() {
  const nombre = document.getElementById('nombre').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const ejecutivo = document.getElementById('ejecutivo')?.value.trim() || '';
  const seguro = document.getElementById('seguro')?.value.trim() || '';
  const medico = document.getElementById('medico')?.value.trim() || '';
  const especialidad = document.getElementById('especialidadFiltro')?.value.trim() || '';
  let camposFaltantes = [];
  if (!nombre) camposFaltantes.push('Nombre Completo');
  if (!dni) camposFaltantes.push('DNI / Documento');
  if (!ejecutivo) camposFaltantes.push('Ejecutivo que registra');
  if (!seguro) camposFaltantes.push('Tipo de Seguro');
  if (!especialidad) camposFaltantes.push('Especialidad');
  if (!medico) camposFaltantes.push('Médico Solicitante');

  if (camposFaltantes.length > 0) {
    Swal.fire({
      target: document.getElementById('modalClinico'),
      icon: 'error',
      title: 'Campos requeridos',
      html: `<div style="text-align:left; font-size:14px; line-height:1.7;">Faltan completar:<br><br>${camposFaltantes.map(c => `• ${c}`).join('<br>')}</div>`,
      confirmButtonColor: '#2b1070'
    });
    return;
  }

  const datosProg = {
    fechaProgramada: fechaProgramadaActual,
    nombre: document.getElementById('nombre').value,
    dni: document.getElementById('dni').value,
    edad: document.getElementById('edad').value,
    telefono: document.getElementById('telefono').value,
    caso: document.getElementById('caso').value,
    ejecutivo: document.getElementById('ejecutivo').value,
    seguro: document.getElementById('seguro').value,
    medico: document.getElementById('medico').value,
    listaExamenes: examenesSeleccionados,
    vencimiento: document.getElementById('vencimiento').value,
    precioTotal: document.getElementById('precioTotal').value,
    observaciones: document.getElementById('observaciones').value,
    especialidad: document.getElementById('especialidadFiltro').value,
    subEstado: "",
    medicoLector: "",
    ejecutivoCierre: ""
  };

  Swal.fire({
    target: document.getElementById('modalClinico'),
    title: 'Guardando programación...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  google.script.run
    .withSuccessHandler(function(msg) {
      cerrarModal();
      iniciarCalendario();
      Swal.fire({
        icon: 'success',
        title: '¡Programado!',
        text: msg,
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: '#2b1070'
      });
      // Restaurar botones del modal para uso normal
      restaurarBotonesModal();
    })
    .withFailureHandler(function(err) {
      Swal.fire({
        target: document.getElementById('modalClinico'),
        icon: 'error',
        title: 'Error',
        text: err.message || 'No se pudo guardar.',
        confirmButtonColor: '#2b1070'
      });
    })
    .guardarPacienteProgramado(datosProg);
}

function restaurarBotonesModal() {
  const acciones = document.querySelector('.modal-actions');
  acciones.innerHTML = `
    <button type="button" class="btn-secondary" onclick="cerrarModal()">Cerrar</button>
    <div style="display:flex; gap:10px; align-items:center;">
      <button type="button" class="btn-danger" id="btnEliminarPaciente" onclick="eliminarPaciente()" style="display:none;">
        <i class="fas fa-trash"></i> Eliminar Paciente
      </button>
      <button type="button" class="btn-primary" id="btnGuardarFicha" onclick="validarYEnviarFormulario()">
        Guardar Ficha
      </button>
    </div>
  `;
}

function renderizarMiniCalLista() {
  const contenedor = document.getElementById('miniCalLista');
  const badge = document.getElementById('miniCalTotalBadge');
  if (!contenedor) return;

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  const mesActual = calMes;
  const anioActual = calAnio;

  // Pacientes registrados en el mes del calendario
  const registradosMes = bdPacientes.filter(p => {
    if (!p.fechaCreacion) return false;
    if (p.fechaCreacion.includes('/')) {
      const partes = p.fechaCreacion.split('/');
      if (partes.length < 3) return false;
      return parseInt(partes[1]) === mesActual + 1 && parseInt(partes[2]) === anioActual;
    }
    return false;
  });

  // Programados en el mes del calendario
  const programadosMes = pacientesProgramados.filter(p => {
    if (!p.fechaProgramada) return false;
    const partes = p.fechaProgramada.split('-');
    if (partes.length < 3) return false;
    return parseInt(partes[1]) === mesActual + 1 && parseInt(partes[0]) === anioActual;
  });

  const total = registradosMes.length + programadosMes.length;
  if (badge) badge.textContent = total;

  const esDark = document.body.classList.contains('dark');

  const filaBorde   = esDark ? 'rgba(255,255,255,0.07)' : '#f8fafc';
  const filaBg      = esDark ? 'transparent'            : 'white';
  const filaHover   = esDark ? 'rgba(255,255,255,0.08)' : '#f8fafc';
  const textoNombre = esDark ? 'rgba(255,255,255,0.85)' : '#1e293b';
  const textoFecha  = esDark ? 'rgba(255,255,255,0.40)' : '#94a3b8';
  const sinDatosClr = esDark ? 'rgba(255,255,255,0.35)' : '#94a3b8';

  if (total === 0) {
    contenedor.innerHTML = `<div style="text-align:center; padding:30px 16px; color:${sinDatosClr}; font-size:12px; font-weight:600;">Sin casos este mes</div>`;
    return;
  }

  let html = '';

  // Primero los registrados
  registradosMes.forEach(p => {
    const sub = p.subEstado || '';
    const claveColor = sub.toLowerCase().trim();
    let color = mapaColoresSemaforo[claveColor] || '#ef4444';
    let textoEstado = sub || p.estado || 'Pendiente';
    if (p.estado === 'Completado' && !sub) color = '#10b981';
    if (p.estado === 'Pendiente' && !sub) { color = '#ef4444'; textoEstado = 'Pendiente'; }

    html += `
      <div onclick="abrirModalLectura('${p.id || p.dni}')" style="
        display:flex; align-items:center; gap:10px;
        padding:10px 16px;
        border-bottom:1px solid ${filaBorde};
        background:${filaBg};
        cursor:pointer;
        transition:background 0.15s;
      "
      onmouseover="this.style.background='${filaHover}'"
      onmouseout="this.style.background='${filaBg}'">
        <div style="width:8px; height:8px; border-radius:50%; background:${color}; flex-shrink:0;"></div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:12px; font-weight:700; color:${textoNombre}; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${p.nombre || '—'}</div>
          <div style="font-size:10px; color:${textoFecha}; font-weight:600;">${p.fechaCreacion ? p.fechaCreacion.split(' ')[0] : '—'}</div>
        </div>
        <span style="background:${color}; color:#ffffff; font-size:9px; font-weight:700; padding:2px 7px; border-radius:6px; white-space:nowrap; flex-shrink:0;">${textoEstado}</span>
      </div>
    `;
  });

  // Luego los programados
  programadosMes.forEach(p => {
    const fechaP = new Date(p.fechaProgramada + 'T00:00:00');
    const esFuturo = fechaP > hoy;
    const progBg = esDark
      ? (esFuturo ? 'rgba(16,185,129,0.10)' : 'transparent')
      : (esFuturo ? '#f0fdf4' : 'white');
    const progNomClr = esDark ? '#6ee7b7' : '#166534';
    const progBadgeBg = esDark ? 'rgba(16,185,129,0.20)' : '#dcfce7';
    const progBadgeClr = esDark ? '#6ee7b7' : '#166534';

    html += `
      <div style="
        display:flex; align-items:center; gap:10px;
        padding:10px 16px;
        border-bottom:1px solid ${filaBorde};
        background:${progBg};
      ">
        <div style="width:8px; height:8px; border-radius:50%; background:#166534; flex-shrink:0;"></div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:12px; font-weight:700; color:${progNomClr}; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">📅 ${p.nombre || '—'}</div>
          <div style="font-size:10px; color:${textoFecha}; font-weight:600;">${p.fechaProgramada || '—'} · ${p.medico || '—'}</div>
        </div>
        <span style="background:${progBadgeBg}; color:${progBadgeClr}; font-size:9px; font-weight:700; padding:2px 7px; border-radius:6px; white-space:nowrap; flex-shrink:0;">Programado</span>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}

/* =========================
   PRÓXIMOS EVENTOS (CARRUSEL APILADO)
========================= */

let proximosLista = [];
let proximosIndex = 0;

function renderizarProximosEventos() {
  const badge = document.getElementById('proximosBadge');
  const stack = document.getElementById('proximosStack');
  const controles = document.getElementById('proximosControles');
  if (!stack) return;

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  // Solo programados en fechas futuras, ordenados por fecha
  proximosLista = pacientesProgramados
    .filter(p => {
      if (!p.fechaProgramada) return false;
      const f = new Date(p.fechaProgramada + 'T00:00:00');
      return f >= hoy;
    })
    .sort((a, b) => new Date(a.fechaProgramada) - new Date(b.fechaProgramada));

  if (badge) badge.textContent = proximosLista.length;

  if (proximosLista.length === 0) {
    stack.innerHTML = `
      <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; color:#94a3b8;">
        <i class="fas fa-calendar-check" style="font-size:30px; color:#e2e8f0; display:block; margin-bottom:8px;"></i>
        <span style="font-size:12px; font-weight:600;">Sin eventos próximos</span>
      </div>`;
    if (controles) controles.style.display = 'none';
    return;
  }

  proximosIndex = 0;
  construirStackProximos();
  if (controles) controles.style.display = proximosLista.length > 1 ? 'flex' : 'none';
  actualizarStackProximos();
}

function construirStackProximos() {
  const stack = document.getElementById('proximosStack');
  if (!stack) return;

      let html = '';
    proximosLista.forEach((p, i) => {
      const fecha = new Date(p.fechaProgramada + 'T00:00:00');
      const diasRestantes = Math.ceil((fecha - new Date().setHours(0,0,0,0)) / (1000*60*60*24));
      const seguroNorm = (p.seguro || '').toLowerCase();
      let color = '#2b1070';
      if (seguroNorm.includes('mapfre')) color = '#68000c';
      else if (seguroNorm.includes('rimac')) color = '#dc2626';
      else if (seguroNorm.includes('positiva')) color = '#ea580c';
      else if (seguroNorm.includes('particular')) color = '#16a34a';
      else if (seguroNorm.includes('vip')) color = '#ca8a04';

    html += `
      <div id="prox-card-${i}" style="
        position:absolute; top:0; left:0; width:100%;
        background:${color};
        border-radius:14px;
        padding:16px 18px;
        box-sizing:border-box;
        color:white;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor:pointer;
        height:100%;
        overflow:hidden;
      "
      onclick="calClickDia('${p.fechaProgramada}', false)">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <span style="font-size:10px; font-weight:700; background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:6px;">
            📅 En ${diasRestantes} día${diasRestantes !== 1 ? 's' : ''}
          </span>
          <span style="font-size:10px; font-weight:700; color:rgba(255,255,255,0.7);">${p.fechaProgramada}</span>
        </div>
        <div style="font-size:14px; font-weight:800; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.nombre || '—'}</div>
        <div style="font-size:11px; color:rgba(255,255,255,0.75); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          <i class="fas fa-user-md" style="margin-right:4px;"></i>${p.medico || '—'}
        </div>
        <div style="font-size:11px; color:rgba(255,255,255,0.75); margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          <i class="fas fa-shield-alt" style="margin-right:4px;"></i>${p.seguro || '—'}
        </div>
        <div style="font-size:11px; color:rgba(255,255,255,0.75); margin-top:3px;">
          Cantidad de Exámenes: ${(p.listaExamenes && p.listaExamenes.length) ? p.listaExamenes.length : 0}
        </div>
      </div>
    `;
  });

  stack.innerHTML = html;
}

function actualizarStackProximos() {
  const total = proximosLista.length;
  const indicador = document.getElementById('proximosIndicador');
  if (indicador) indicador.textContent = `${proximosIndex + 1} de ${total}`;

  for (let i = 0; i < total; i++) {
    const el = document.getElementById(`prox-card-${i}`);
    if (!el) continue;

    let distancia = i - proximosIndex;
    if (distancia < 0) distancia += total;

    if (distancia === 0) {
      el.style.transform = 'translateY(0px) scale(1)';
      el.style.zIndex = 10;
      el.style.opacity = '1';
    } else if (distancia === 1) {
      el.style.transform = 'translateY(0px) scale(0.95)';
      el.style.zIndex = 9;
      el.style.opacity = '0.7';
    } else if (distancia === 2) {
      el.style.transform = 'translateY(0px) scale(0.90)';
      el.style.zIndex = 8;
      el.style.opacity = '0.4';
    } else {
      el.style.transform = 'translateY(0px) scale(0.85)';
      el.style.zIndex = 1;
      el.style.opacity = '0';
    }
  }
}

function moverProximos(dir) {
  const total = proximosLista.length;
  if (total <= 1) return;
  proximosIndex += dir;
  if (proximosIndex < 0) proximosIndex = total - 1;
  if (proximosIndex >= total) proximosIndex = 0;
  actualizarStackProximos();
  const indicador = document.getElementById('proximosIndicador');
  if (indicador) indicador.textContent = `${proximosIndex + 1} de ${total}`;
}

////////////// REGISTRO DE PERSONAL (independiente) //////////////
let bdPersonal = [];

function mostrarVistaRegistroPersonalYCargar() {
  mostrarVistaRegistroPersonal();
  cargarPersonal();
}

function cargarPersonal() {
  google.script.run
    .withSuccessHandler(function(lista) {
      bdPersonal = lista || [];
      renderizarPersonal(bdPersonal);
      actualizarContadoresPersonal();
    })
    .withFailureHandler(function(err) {
      console.error("Error cargando personal:", err);
    })
    .obtenerPersonal();
}

function actualizarContadoresPersonal() {
  const gen  = (medicosEspecialidades || []).filter(m => (m.especialidad||'').toLowerCase().includes('general')).length;
  const ped  = (medicosEspecialidades || []).filter(m => (m.especialidad||'').toLowerCase().includes('pediatr')).length;
  const ejec = (ejecutivosData || []).length;

  const e1 = document.getElementById('conteoMedicosGenerales'); if (e1) e1.textContent = gen;
  const e2 = document.getElementById('conteoMedicosPediatras'); if (e2) e2.textContent = ped;
  const e3 = document.getElementById('conteoEjecutivos');       if (e3) e3.textContent = ejec;
}

function renderizarPersonal(lista) {
  const contenedor = document.getElementById('rpTablaPersonal');
  if (!contenedor) return;

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = `
      <div style="padding:40px; text-align:center; color:#94a3b8; font-size:14px; font-weight:600;">
        <i class="fas fa-users" style="font-size:32px; color:#e2e8f0; display:block; margin-bottom:10px;"></i>
        No hay personal registrado
      </div>`;
    return;
  }

  let html = '';
  lista.forEach(p => {
    const esActivo = (p.estado || '').toLowerCase() === 'activo';
    html += `
      <div style="display:grid; grid-template-columns: 2fr 1fr 1fr 1fr 80px; padding:12px 20px; border-bottom:1px solid #f1f5f9; align-items:center; font-size:13px; transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
        <div style="font-weight:700; color:#1e293b;">${p.nombre || '—'}</div>
        <div style="color:#475569;">${p.cargo || '—'}</div>
        <div style="color:#475569;">${p.area || '—'}</div>
        <div>
          <span style="background:${esActivo ? '#d1fae5' : '#fee2e2'}; color:${esActivo ? '#065f46' : '#991b1b'}; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px;">
            ${p.estado || '—'}
          </span>
        </div>
        <div style="text-align:center;">
          <button onclick="eliminarPersonalItem('${p.id}')" title="Eliminar" style="background:#fee2e2; border:none; border-radius:8px; width:30px; height:30px; cursor:pointer; color:#ef4444; font-size:13px; transition:background 0.2s;" onmouseover="this.style.background='#fecaca'" onmouseout="this.style.background='#fee2e2'">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;
  });
  contenedor.innerHTML = html;
}

function filtrarPersonal() {
  const busqueda = (document.getElementById('inputBuscarPersonal')?.value || '').toLowerCase().trim();
  if (!busqueda) {
    renderizarPersonal(bdPersonal);
    return;
  }
  const filtrado = bdPersonal.filter(p =>
    (p.nombre || '').toLowerCase().includes(busqueda) ||
    (p.cargo  || '').toLowerCase().includes(busqueda) ||
    (p.area   || '').toLowerCase().includes(busqueda)
  );
  renderizarPersonal(filtrado);
}

function guardarPersonal() {
  const nombre = (document.getElementById('rpNombre')?.value || '').trim();
  const dni    = (document.getElementById('rpDni')?.value || '').trim();
  const cargo  = (document.getElementById('rpCargo')?.value || '').trim();
  const area   = (document.getElementById('rpArea')?.value || '').trim();
  const estado = document.getElementById('rpEstado')?.value || 'Activo';

  if (!nombre || !dni) {
    Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Nombre y DNI son obligatorios.', confirmButtonColor: '#2b1070' });
    return;
  }

  const datos = { nombre, dni, cargo, area, estado };
  Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

  google.script.run
    .withSuccessHandler(function() {
      Swal.fire({ icon: 'success', title: '¡Guardado!', timer: 1500, showConfirmButton: false });
      document.getElementById('rpNombre').value = '';
      document.getElementById('rpDni').value    = '';
      document.getElementById('rpCargo').value  = '';
      document.getElementById('rpArea').value   = '';
      cargarPersonal();
    })
    .withFailureHandler(function(err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'No se pudo guardar.', confirmButtonColor: '#2b1070' });
    })
    .guardarPersonal(datos);
}

function eliminarPersonalItem(id) {
  Swal.fire({
    icon: 'warning',
    title: 'Eliminar',
    text: '¿Desea eliminar este registro?',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#b91c1c',
    cancelButtonColor: '#64748b'
  }).then(result => {
    if (!result.isConfirmed) return;
    google.script.run
      .withSuccessHandler(function() {
        Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false });
        cargarPersonal();
      })
      .withFailureHandler(function(err) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'No se pudo eliminar.', confirmButtonColor: '#2b1070' });
      })
      .eliminarPersonal(id);
  });
}

function renderizarListaMedicosPersonal(filtro) {
  const lista = document.getElementById('listaMedicosPersonal');
  if (!lista) return;

  if (!medicosEspecialidades || medicosEspecialidades.length === 0) {
    lista.innerHTML = '<div style="padding:20px; text-align:center; color:#94a3b8; font-size:13px; font-weight:600;">Sin médicos registrados</div>';
    return;
  }

  const esDark = document.body.classList.contains('dark');
  const term = (filtro || '').toLowerCase().trim();

  const filaBorde   = esDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9';
  const textoNombre = esDark ? 'rgba(255,255,255,0.90)' : '#1e293b';
  const textoEsp    = esDark ? 'rgba(255,255,255,0.55)' : '#475569';
  const textoFecha  = esDark ? 'rgba(255,255,255,0.35)' : '#94a3b8';
  const sinDatosClr = esDark ? 'rgba(255,255,255,0.35)' : '#94a3b8';

  const filas = medicosEspecialidades
    .map((m, i) => ({ m: m, i: i }))
    .filter(o => !term || (o.m.nombre || '').toLowerCase().includes(term))
    .map(o => `
    <div data-idx="${o.i}" onclick="mostrarFichaMedico(${o.i})"
      style="display:grid; grid-template-columns: 2fr 1.5fr 1fr; padding:11px 20px; border-bottom:1px solid ${filaBorde}; font-size:13px; cursor:pointer; transition:background 0.15s; border-left:3px solid transparent;">
      <div style="font-weight:600; color:${textoNombre}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${o.m.nombre || '—'}</div>
      <div style="color:${textoEsp}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${o.m.especialidad || '—'}</div>
      <div style="color:${textoFecha};">${o.m.fechaRegistro || '—'}</div>
    </div>
  `).join('');

  lista.innerHTML = filas || `<div style="padding:20px; text-align:center; color:${sinDatosClr}; font-size:13px; font-weight:600;">Sin resultados</div>`;
}

function filtrarMedicosPersonal(termino) {
  renderizarListaMedicosPersonal(termino);
}

function mostrarFichaMedico(idx) {
  const m = medicosEspecialidades[idx];
  if (!m) return;
  medicoSeleccionado = idx;

  const esDark = document.body.classList.contains('dark');
  document.querySelectorAll('#listaMedicosPersonal > div').forEach(el => {
    el.classList.remove('fila-activa');
    el.style.background = '';
    el.style.borderLeft = '3px solid transparent';
  });
  const fila = document.querySelector(`#listaMedicosPersonal > div[data-idx="${idx}"]`);
  if (fila) {
    fila.classList.add('fila-activa');
    fila.style.background = esDark ? 'rgba(99,102,241,0.18)' : '#ede9fe';
    fila.style.borderLeft  = esDark ? '3px solid #818cf8'    : '3px solid #2b1070';
  }

  const reg = bdPacientes.filter(p => p.medico === m.nombre).length;
  const leidos = bdPacientes.filter(p => p.medicoLector === m.nombre).length;
  const iniciales = m.nombre.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();

  const esp = (m.especialidad || '').toLowerCase();
  let espColor = '#2b1070', espBg = '#ede9fe';
  if (esp.includes('pediatra') || esp.includes('pediatr')) { espColor = '#0369a1'; espBg = '#e0f2fe'; }
  else if (esp.includes('general')) { espColor = '#166534'; espBg = '#dcfce7'; }

  const bloque7 = document.getElementById('bloque7');
  if (!bloque7) return;

  const hexTema    = (!esDark && sessionStorage.getItem('sislab_color')) || '';
  const divisor    = esDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9';
  const textoVal   = esDark ? 'rgba(255,255,255,0.90)' : 'var(--text, #1e293b)';
  const textoLabel = esDark ? 'rgba(255,255,255,0.40)' : '#94a3b8';
  const miniCardBg = esDark ? 'rgba(255,255,255,0.06)' : 'var(--bg, #f8fafc)';
  const numRegClr  = esDark ? '#a5b4fc'                : 'var(--accent, #2b1070)';
  const avatarBg   = hexTema ? ('linear-gradient(135deg,' + _colorDarken(hexTema,0.25) + ',' + hexTema + ')') : 'linear-gradient(135deg,#2b1070,#6d5bf0)';
  const btnBg      = hexTema || '#2b1070';
  const btnBgHvr   = hexTema ? _colorDarken(hexTema, 0.15) : '#3b238f';
  const btnTxt     = hexTema ? ('var(--on-accent, white)') : 'white';

  bloque7.innerHTML = `
    <div style="padding:16px 18px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; flex:1; min-height:0;">

      <!-- Sección superior: avatar + datos -->
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:7px; text-align:center;">
          <div style="width:56px; height:56px; border-radius:50%; background:${avatarBg}; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; color:white; flex-shrink:0;">${iniciales}</div>
          <div style="font-size:18px; font-weight:900; color:${textoVal}; line-height:1.2;">${m.nombre}</div>
          <span style="background:${espBg}; color:${espColor}; font-size:11px; font-weight:700; padding:3px 12px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px;">${m.especialidad || 'General'}</span>
        </div>

        <div style="border-top:1px solid ${divisor};"></div>

        <div style="display:flex; flex-direction:column; gap:9px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">CMP</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.cmp || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">RNE / RNA</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.rne || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">Fecha de Registro</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.fechaRegistro || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">Nacionalidad</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.nacionalidad || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">Edad</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.edad || '—'}</span>
          </div>
        </div>

        <div style="border-top:1px solid ${divisor};"></div>
      </div>

      <!-- Sección media: mini cards -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div style="background:${miniCardBg}; border-radius:10px; padding:12px 8px; text-align:center;">
          <div style="font-size:26px; font-weight:900; color:${numRegClr}; line-height:1;">${reg}</div>
          <div style="font-size:11px; font-weight:600; color:${textoLabel}; margin-top:4px; line-height:1.3;">Pacientes Registrados</div>
        </div>
        <div style="background:${miniCardBg}; border-radius:10px; padding:12px 8px; text-align:center;">
          <div style="font-size:26px; font-weight:900; color:#10b981; line-height:1;">${leidos}</div>
          <div style="font-size:11px; font-weight:600; color:${textoLabel}; margin-top:4px; line-height:1.3;">Pacientes Leídos</div>
        </div>
      </div>

      <!-- Botón -->
      <button onclick="verFichaMedico(${idx})" style="background:${btnBg}; color:${btnTxt}; border:none; border-radius:10px; padding:12px; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s;" onmouseover="this.style.background='${btnBgHvr}';" onmouseout="this.style.background='${btnBg}';">
        <i class="fas fa-id-card"></i> Ver Ficha
      </button>

    </div>
  `;
}

function renderizarMedicoLectorMes() {
  const cont = document.getElementById('bloque6Contenido');
  if (!cont) return;

  const esDark = document.body.classList.contains('dark');
  const textoNombre = esDark ? 'rgba(255,255,255,0.90)' : '#1e293b';
  const textoLabel  = esDark ? 'rgba(255,255,255,0.40)' : '#94a3b8';
  const textoVacio  = esDark ? 'rgba(255,255,255,0.30)' : '#cbd5e1';

  const ahora = new Date();
  const mes = ahora.getMonth();
  const anio = ahora.getFullYear();

  // Contar lecturas (pacientes con médico lector) cerradas este mes
  const conteo = {};
  (bdPacientes || []).forEach(p => {
    const lector = (p.medicoLector || '').trim();
    if (!lector) return;
    if (!p.fechaCierre) return;
    const f = new Date(p.fechaCierre);
    if (isNaN(f.getTime())) return;
    if (f.getMonth() !== mes || f.getFullYear() !== anio) return;
    conteo[lector] = (conteo[lector] || 0) + 1;
  });

  const ranking = Object.keys(conteo)
    .map(n => ({ nombre: n, total: conteo[n] }))
    .sort((a, b) => b.total - a.total);

  if (ranking.length === 0) {
    cont.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; gap:8px; color:${textoVacio};"><i class="fas fa-user-md" style="font-size:30px;"></i><span style="font-size:12px; font-weight:600; color:${textoLabel};">Sin lecturas este mes</span></div>`;
    return;
  }

  const top = ranking[0];
  const iniciales = top.nombre.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();

  cont.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center;">
      <div style="position:relative;">
        <div style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#10b981,#059669); display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; color:white;">${iniciales}</div>
        <div style="position:absolute; bottom:-3px; right:-3px; background:#fbbf24; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white;"><i class="fas fa-trophy" style="color:white; font-size:9px;"></i></div>
      </div>
      <div style="font-size:14px; font-weight:800; color:${textoNombre}; line-height:1.2;">${top.nombre}</div>
      <div style="display:flex; align-items:baseline; gap:5px;">
        <span style="font-size:28px; font-weight:900; color:#10b981; line-height:1;">${top.total}</span>
        <span style="font-size:11px; font-weight:600; color:${textoLabel};">lectura${top.total === 1 ? '' : 's'}</span>
      </div>
    </div>
  `;
}

function renderizarEjecutivosBloque8() {
  const stack = document.getElementById('bloque8Stack');
  if (!stack) return;
  if (!ejecutivosData || ejecutivosData.length === 0) {
    stack.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.4);font-size:13px;font-weight:600;">Sin ejecutivos registrados</div>';
    return;
  }
  stackEjecutivoIdx = 0;
  dibujarStackEjecutivos();
}

function dibujarStackEjecutivos() {
  const stack = document.getElementById('bloque8Stack');
  if (!stack || !ejecutivosData || !ejecutivosData.length) return;
  const total = ejecutivosData.length;
  let html = '';

  ejecutivosData.forEach((e, i) => {
    const color = getColorEjecutivo(e.nombre);
    const casos = bdPacientes.filter(p => (p.ejecutivo || '').trim() === e.nombre.trim());
    const registrados = casos.length;
    const pendientes = casos.filter(p => p.estado === 'Pendiente' || p.estado === 'En Proceso').length;
    const cerrados = casos.filter(p => p.estado === 'Completado' || p.estado === 'Desestimados').length;
    const pct = registrados > 0 ? cerrados / registrados : 0;
    const r = 44, circ = 2 * Math.PI * r;
    const filled = (pct * circ).toFixed(2);

    html += `
      <div id="ejec-card-${i}" style="position:absolute; top:0; left:0; width:100%; height:calc(100% - 8px); background:${color}; border-radius:16px; padding:20px 24px; box-sizing:border-box; color:white; overflow:hidden; transform-origin:top center; box-shadow:0 6px 16px rgba(0,0,0,0.18); transition: all 0.35s cubic-bezier(0.4,0,0.2,1);">
        <div style="display:flex; height:100%; align-items:center; justify-content:space-between; gap:18px;">
          <div style="flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; gap:14px;">
            <div>
              <div style="font-size:22px; font-weight:800; line-height:1.15; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${e.nombre}</div>
              <div style="font-size:11px; color:rgba(255,255,255,0.55); margin-top:5px;">${e.fechaRegistro || '—'}</div>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:rgba(255,255,255,0.8);">Casos Registrados <b style="font-size:15px; font-weight:900; color:white;">${registrados}</b></div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:rgba(255,255,255,0.8);">Casos Pendientes <b style="font-size:15px; font-weight:900; color:#fcd34d;">${pendientes}</b></div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:rgba(255,255,255,0.8);">Casos Cerrados <b style="font-size:15px; font-weight:900; color:#86efac;">${cerrados}</b></div>
            </div>
          </div>
          <div style="flex-shrink:0; display:flex; align-items:center; justify-content:center;">
            <svg width="118" height="118" viewBox="0 0 118 118" style="display:block;">
              <circle cx="59" cy="59" r="${r}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="11"/>
              <circle cx="59" cy="59" r="${r}" fill="none" stroke="white" stroke-width="11" stroke-dasharray="${filled} ${circ.toFixed(2)}" stroke-linecap="round" transform="rotate(-90 59 59)"/>
              <text x="59" y="59" text-anchor="middle" dominant-baseline="central" fill="white" font-size="20" font-weight="800" font-family="Inter, Arial, sans-serif">${Math.round(pct*100)}%</text>
            </svg>
          </div>
        </div>
        ${total > 1 ? `<div style="position:absolute; bottom:12px; right:14px; display:flex; align-items:center; gap:6px;"><button onclick="event.stopPropagation(); moverStackEjecutivos(-1)" style="background:rgba(255,255,255,0.2); border:none; border-radius:6px; width:24px; height:24px; cursor:pointer; color:white; display:flex; align-items:center; justify-content:center;"><i class="fas fa-chevron-left" style="font-size:10px;"></i></button><span class="ejec-indicador" style="font-size:11px; font-weight:700; color:rgba(255,255,255,0.7);">1/${total}</span><button onclick="event.stopPropagation(); moverStackEjecutivos(1)" style="background:rgba(255,255,255,0.2); border:none; border-radius:6px; width:24px; height:24px; cursor:pointer; color:white; display:flex; align-items:center; justify-content:center;"><i class="fas fa-chevron-right" style="font-size:10px;"></i></button></div>` : ''}
      </div>`;
  });

  stack.innerHTML = html;
  actualizarStackEjecutivos();
}

function actualizarStackEjecutivos() {
  const total = ejecutivosData ? ejecutivosData.length : 0;
  if (!total) return;

  for (let i = 0; i < total; i++) {
    const el = document.getElementById(`ejec-card-${i}`);
    if (!el) continue;
    let dist = i - stackEjecutivoIdx;
    if (dist < 0) dist += total;

    if (dist === 0) { el.style.transform = 'translateY(8px) scale(1)'; el.style.zIndex = '10'; el.style.opacity = '1'; }
    else if (dist === 1) { el.style.transform = 'translateY(0px) scale(0.96)'; el.style.zIndex = '9'; el.style.opacity = '0.5'; }
    else if (dist === 2) { el.style.transform = 'translateY(0px) scale(0.92)'; el.style.zIndex = '8'; el.style.opacity = '0.25'; }
    else { el.style.transform = 'translateY(0px) scale(0.88)'; el.style.zIndex = '1'; el.style.opacity = '0'; }
  }

  document.querySelectorAll('.ejec-indicador').forEach(el => { el.textContent = `${stackEjecutivoIdx + 1}/${total}`; });
}

function moverStackEjecutivos(dir) {
  const total = ejecutivosData ? ejecutivosData.length : 0;
  if (total <= 1) return;
  stackEjecutivoIdx = (stackEjecutivoIdx + dir + total) % total;
  actualizarStackEjecutivos();
}

// Desliza la píldora con degradado hasta el botón activo y ajusta el color del texto
function setTabActivo(tab) {
  const bar = document.getElementById('barraTabsPersonal');
  if (!bar) return;
  const pill = document.getElementById('tabPersonalPill');
  bar.querySelectorAll('button[data-tab]').forEach(btn => {
    const activo = btn.getAttribute('data-tab') === tab;
    btn.style.color = activo ? '#004EE0' : '#64748b';
    if (activo && pill) {
      pill.style.left = btn.offsetLeft + 'px';
      pill.style.top = btn.offsetTop + 'px';
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.height = btn.offsetHeight + 'px';
      pill.style.opacity = '1';
    }
  });
}

function seleccionarTabPersonal(tab) {
  if (tab === 'medico') abrirModalMedico();
  else if (tab === 'ejecutivo') abrirModalEjecutivos();
  else if (tab === 'busqueda') toggleBuscadorMedico();
}

function toggleBuscadorMedico() {
  const input = document.getElementById('inputBuscarMedicoPersonal');
  if (!input) return;
  const abierto = input.dataset.abierto === 'true';
  if (abierto) {
    cerrarBuscadorMedico();
  } else {
    input.style.width = '240px';
    input.style.opacity = '1';
    input.style.padding = '0 20px';
    input.style.marginLeft = '6px';
    input.dataset.abierto = 'true';
    setTimeout(() => input.focus(), 160);
  }
}

function cerrarBuscadorMedico() {
  const input = document.getElementById('inputBuscarMedicoPersonal');
  if (!input || input.dataset.abierto !== 'true') return;
  input.style.width = '0';
  input.style.opacity = '0';
  input.style.padding = '0';
  input.style.marginLeft = '0';
  input.value = '';
  input.dataset.abierto = 'false';
  renderizarListaMedicosPersonal(); // restaurar lista completa
}

function abrirModalMedico() {
  Swal.fire({
    title: '<span style="font-size:18px; font-weight:800; color:#2b1070;">Registrar Médico</span>',
    width: 420,
    html: `
      <div style="display:flex; flex-direction:column; gap:12px; text-align:left; margin-top:6px;">
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Nombre de Médico</label>
          <input id="swalMedNombre" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. Juan Pérez">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Especialidad</label>
          <select id="swalMedEsp" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;">
            <option value="">-- Seleccionar --</option>
            <option value="Medico General">Médico General</option>
            <option value="Medico Pediatra">Pediatría</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Nacionalidad</label>
          <select id="swalMedNac" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;">
            <option value="">-- Seleccionar --</option>
            <option value="Peruano">Peruano</option>
            <option value="Venezolano">Venezolano</option>
            <option value="Boliviano">Boliviano</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Fecha de Nacimiento</label>
          <input id="swalMedFechaNac" type="date" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">CMP</label>
          <input id="swalMedCmp" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. 12345">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">RNA / RNE</label>
          <input id="swalMedRne" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. 6789">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Registrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2b1070',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    preConfirm: () => {
      const nombre = document.getElementById('swalMedNombre').value.trim();
      const especialidad = document.getElementById('swalMedEsp').value.trim();
      const nacionalidad = document.getElementById('swalMedNac').value.trim();
      const fechaNacimiento = document.getElementById('swalMedFechaNac').value;
      const cmp = document.getElementById('swalMedCmp').value.trim();
      const rne = document.getElementById('swalMedRne').value.trim();
      if (!nombre || !especialidad) {
        Swal.showValidationMessage('Ingresa al menos el nombre y la especialidad.');
        return false;
      }
      return { nombre: nombre, especialidad: especialidad, nacionalidad: nacionalidad, fechaNacimiento: fechaNacimiento, cmp: cmp, rne: rne };
    }
  }).then(result => {
    if (!result.isConfirmed) return;
    guardarMedico(result.value);
  });
}

function guardarMedico(datos) {
  Swal.fire({ title:'Registrando médico...', allowOutsideClick:false, didOpen:()=>Swal.showLoading() });

  google.script.run
    .withSuccessHandler(function(msg) {
      Swal.fire({ icon:'success', title:'¡Listo!', text:msg, timer:1500, showConfirmButton:false });
      recargarListasGlobales(function() {
        renderizarListaMedicosPersonal();
        if (typeof actualizarContadoresPersonal === 'function') actualizarContadoresPersonal();
      });
    })
    .withFailureHandler(function(err) {
      Swal.fire({ icon:'error', title:'Error', text: err.message || 'No se pudo registrar.', confirmButtonColor:'#2b1070' });
    })
    .registrarMedico(datos);
}

function verFichaMedico(idx) {
  const m = medicosEspecialidades[idx];
  if (!m) return;

  const esDark = document.body.classList.contains('dark');
  const reg = bdPacientes.filter(p => p.medico === m.nombre).length;
  const leidos = bdPacientes.filter(p => p.medicoLector === m.nombre).length;
  const iniciales = (m.nombre || '?').split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();

  const esp = (m.especialidad || '').toLowerCase();
  let espColor = '#2b1070', espBg = '#ede9fe';
  if (esp.includes('pediatr')) { espColor = '#0369a1'; espBg = '#e0f2fe'; }
  else if (esp.includes('general')) { espColor = '#166534'; espBg = '#dcfce7'; }

  const swalBg      = esDark ? '#0f1e3d'                  : '#ffffff';
  const textoVal    = esDark ? 'rgba(255,255,255,0.92)'   : '#1e293b';
  const textoLabel  = esDark ? 'rgba(255,255,255,0.45)'   : '#94a3b8';
  const divisor     = esDark ? 'rgba(255,255,255,0.07)'   : '#f1f5f9';
  const miniCardBg  = esDark ? 'linear-gradient(145deg,#1a3a6e,#0a1220)' : '#f8fafc';
  const miniCardBrd = esDark ? '1px solid rgba(255,255,255,0.08)'        : '1px solid transparent';
  const numRegClr   = esDark ? '#a5b4fc'                  : '#2b1070';

  Swal.fire({
    width: 430,
    background: swalBg,
    color: textoVal,
    showCloseButton: true,
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: '<i class="fas fa-edit"></i> Editar',
    denyButtonText: '<i class="fas fa-trash"></i> Eliminar',
    confirmButtonColor: '#2b1070',
    denyButtonColor: '#ef4444',
    html: `
      <div style="display:flex; flex-direction:column; gap:16px; text-align:left;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center;">
          <div style="width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,#2b1070,#6d5bf0); display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; color:white;">${iniciales}</div>
          <div style="font-size:19px; font-weight:900; color:${textoVal}; line-height:1.2;">${m.nombre || '—'}</div>
          <span style="background:${espBg}; color:${espColor}; font-size:11px; font-weight:700; padding:4px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px;">${m.especialidad || 'General'}</span>
        </div>
        <div style="border-top:1px solid ${divisor};"></div>
        <div style="display:flex; flex-direction:column; gap:11px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">CMP</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.cmp || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">RNE / RNA</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.rne || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">Fecha de Registro</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.fechaRegistro || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">Nacionalidad</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.nacionalidad || '—'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600; color:${textoLabel};">Edad</span>
            <span style="font-size:13px; font-weight:700; color:${textoVal};">${m.edad || '—'}</span>
          </div>
        </div>
        <div style="border-top:1px solid ${divisor};"></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="background:${miniCardBg}; border:${miniCardBrd}; border-radius:12px; padding:14px; text-align:center;">
            <div style="font-size:28px; font-weight:900; color:${numRegClr}; line-height:1;">${reg}</div>
            <div style="font-size:11px; font-weight:600; color:${textoLabel}; margin-top:6px;">Pacientes Registrados</div>
          </div>
          <div style="background:${miniCardBg}; border:${miniCardBrd}; border-radius:12px; padding:14px; text-align:center;">
            <div style="font-size:28px; font-weight:900; color:#10b981; line-height:1;">${leidos}</div>
            <div style="font-size:11px; font-weight:600; color:${textoLabel}; margin-top:6px;">Pacientes Leídos</div>
          </div>
        </div>
      </div>
    `
  }).then(result => {
    if (result.isConfirmed) {
      editarFichaMedico(idx);
    } else if (result.isDenied) {
      eliminarMedicoModal(idx);
    }
  });
}

function editarFichaMedico(idx) {
  const m = medicosEspecialidades[idx];
  if (!m) return;

  const nombreVal = (m.nombre || '').replace(/"/g, '&quot;');
  const cmpVal = (m.cmp && m.cmp !== '—' ? m.cmp : '').toString().replace(/"/g, '&quot;');
  const rneVal = (m.rne && m.rne !== '—' ? m.rne : '').toString().replace(/"/g, '&quot;');
  const fechaNacVal = (m.fechaNacimiento && m.fechaNacimiento !== '—' ? m.fechaNacimiento : '').toString().replace(/"/g, '&quot;');
  const espActual = m.especialidad || '';
  const nacActual = (m.nacionalidad && m.nacionalidad !== '—' ? m.nacionalidad : '');

  let espOpts = '';
  const estandar = ['Medico General', 'Medico Pediatra'];
  if (espActual && estandar.indexOf(espActual) === -1) {
    espOpts += '<option value="' + espActual + '" selected>' + espActual + '</option>';
  }
  estandar.forEach(e => {
    espOpts += '<option value="' + e + '"' + (espActual === e ? ' selected' : '') + '>' + e + '</option>';
  });

  let nacOpts = '<option value="">-- Seleccionar --</option>';
  const nacionalidades = ['Peruano', 'Venezolano', 'Boliviano'];
  if (nacActual && nacionalidades.indexOf(nacActual) === -1) {
    nacOpts += '<option value="' + nacActual + '" selected>' + nacActual + '</option>';
  }
  nacionalidades.forEach(n => {
    nacOpts += '<option value="' + n + '"' + (nacActual === n ? ' selected' : '') + '>' + n + '</option>';
  });

  Swal.fire({
    title: '<span style="font-size:18px; font-weight:800; color:#2b1070;">Editar Médico</span>',
    width: 420,
    html: `
      <div style="display:flex; flex-direction:column; gap:12px; text-align:left; margin-top:6px;">
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Nombre de Médico</label>
          <input id="swalMedNombre" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. Juan Pérez" value="` + nombreVal + `">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Especialidad</label>
          <select id="swalMedEsp" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;">` + espOpts + `</select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Nacionalidad</label>
          <select id="swalMedNac" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;">` + nacOpts + `</select>
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Fecha de Nacimiento</label>
          <input id="swalMedFechaNac" type="date" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" value="` + fechaNacVal + `">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">CMP</label>
          <input id="swalMedCmp" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. 12345" value="` + cmpVal + `">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">RNA / RNE</label>
          <input id="swalMedRne" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. 6789" value="` + rneVal + `">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2b1070',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    preConfirm: () => {
      const nombre = document.getElementById('swalMedNombre').value.trim();
      const especialidad = document.getElementById('swalMedEsp').value.trim();
      const nacionalidad = document.getElementById('swalMedNac').value.trim();
      const fechaNacimiento = document.getElementById('swalMedFechaNac').value;
      const cmp = document.getElementById('swalMedCmp').value.trim();
      const rne = document.getElementById('swalMedRne').value.trim();
      if (!nombre || !especialidad) {
        Swal.showValidationMessage('Ingresa al menos el nombre y la especialidad.');
        return false;
      }
      return { nombreOriginal: m.nombre, nombre: nombre, especialidad: especialidad, nacionalidad: nacionalidad, fechaNacimiento: fechaNacimiento, cmp: cmp, rne: rne };
    }
  }).then(result => {
    if (!result.isConfirmed) return;
    guardarEdicionMedico(result.value);
  });
}

function guardarEdicionMedico(datos) {
  Swal.fire({ title:'Guardando cambios...', allowOutsideClick:false, didOpen:()=>Swal.showLoading() });

  google.script.run
    .withSuccessHandler(function(msg) {
      Swal.fire({ icon:'success', title:'¡Listo!', text:msg, timer:1500, showConfirmButton:false });
      recargarListasGlobales(function() {
        renderizarListaMedicosPersonal();
        if (typeof actualizarContadoresPersonal === 'function') actualizarContadoresPersonal();
      });
    })
    .withFailureHandler(function(err) {
      Swal.fire({ icon:'error', title:'Error', text: err.message || 'No se pudo editar.', confirmButtonColor:'#2b1070' });
    })
    .editarMedico(datos);
}

function eliminarMedicoModal(idx) {
  const m = medicosEspecialidades[idx];
  if (!m) return;
  Swal.fire({
    icon: 'warning',
    title: '¿Eliminar médico?',
    html: 'Se eliminará a <b>' + (m.nombre || '') + '</b> de la lista. Los pacientes que registró se mantienen intactos.',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    reverseButtons: true
  }).then(result => {
    if (!result.isConfirmed) return;
    Swal.fire({ title:'Eliminando...', allowOutsideClick:false, didOpen:()=>Swal.showLoading() });
    google.script.run
      .withSuccessHandler(function(msg) {
        Swal.fire({ icon:'success', title:'¡Listo!', text:msg, timer:1500, showConfirmButton:false });
        recargarListasGlobales(function() {
          renderizarListaMedicosPersonal();
          const bloque7 = document.getElementById('bloque7');
          if (bloque7) {
            bloque7.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:12px; padding:20px;"><i class="fas fa-user-md" style="font-size:40px; color:#e2e8f0;"></i><span style="font-size:13px; font-weight:600; color:#94a3b8; text-align:center;">Selecciona un médico<br>para ver su ficha</span></div>';
          }
          if (typeof actualizarContadoresPersonal === 'function') actualizarContadoresPersonal();
        });
      })
      .withFailureHandler(function(err) {
        Swal.fire({ icon:'error', title:'Error', text: err.message || 'No se pudo eliminar.', confirmButtonColor:'#2b1070' });
      })
      .eliminarMedico(m.nombre);
  });
}

function abrirModalEjecutivos() {
  const esDark = document.body.classList.contains('dark');
  const swalBg      = esDark ? '#0f1e3d'                  : '#ffffff';
  const titleColor  = esDark ? '#a5b4fc'                  : '#2b1070';
  const emptyColor  = esDark ? 'rgba(255,255,255,0.35)'   : '#94a3b8';
  const addBtnBg    = esDark ? 'rgba(255,255,255,0.05)'   : '#f5f3ff';
  const addBtnBgHov = esDark ? 'rgba(255,255,255,0.10)'   : '#ede9fe';
  const addBtnBrd   = esDark ? 'rgba(255,255,255,0.18)'   : '#c7d2fe';
  const addBtnClr   = esDark ? 'rgba(255,255,255,0.85)'   : '#2b1070';

  Swal.fire({
    title: `<span style="font-size:18px; font-weight:800; color:${titleColor};">Ejecutivos Registrados</span>`,
    background: swalBg,
    color: esDark ? 'rgba(255,255,255,0.85)' : '#1e293b',
    width: 440,
    html: ''
      + `<div id="swalEjecLista" style="text-align:center; color:${emptyColor}; font-size:13px; padding:24px;">Cargando...</div>`
      + `<button onclick="abrirModalNuevoEjecutivo()" style="display:flex; align-items:center; justify-content:center; gap:8px; width:100%; margin-top:6px; padding:11px; border:2px dashed ${addBtnBrd}; background:${addBtnBg}; color:${addBtnClr}; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='${addBtnBgHov}';" onmouseout="this.style.background='${addBtnBg}';"><i class="fas fa-plus"></i> Add Ejecutivo</button>`,
    showConfirmButton: false,
    showCloseButton: true,
    didOpen: () => {
      // La tabla de personal muestra solo ejecutivos (sin supervisores)
      renderModalEjecutivos({ ejecutivosConPin: ejecutivosData || [] });
    }
  });
}

var ejecutivosModalData = [];

function _toggleAuthPinField() {
  var tipo = document.getElementById('swalEjecTipo');
  var wrap = document.getElementById('swalAuthPinWrap');
  if (!tipo || !wrap) return;
  wrap.style.display = tipo.value === 'Supervisor' ? 'block' : 'none';
  if (tipo.value !== 'Supervisor') {
    var ap = document.getElementById('swalAuthPin');
    if (ap) ap.value = '';
  }
}

function abrirModalNuevoEjecutivo(ejec) {
  const esEdicion = !!ejec;
  const nombreVal = esEdicion ? (ejec.nombre || '').replace(/"/g, '&quot;') : '';
  const pinVal    = esEdicion ? (ejec.pin    || '').replace(/"/g, '&quot;') : '';
  const tipoVal   = esEdicion ? (ejec.rol    || '') : '';

  Swal.fire({
    title: '<span style="font-size:18px; font-weight:800; color:#2b1070;">' + (esEdicion ? 'Editar Ejecutivo' : 'Registrar Ejecutivo') + '</span>',
    width: 420,
    html: `
      <div style="display:flex; flex-direction:column; gap:12px; text-align:left; margin-top:6px;">
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Nombre de Ejecutivo</label>
          <input id="swalEjecNombre" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="Ej. Gustavo" value="` + nombreVal + `">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">PIN de Seguridad</label>
          <input id="swalEjecPin" type="password" inputmode="numeric" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="••••••" value="` + pinVal + `">
        </div>
        <div>
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">Tipo de Registro</label>
          <select id="swalEjecTipo" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" onchange="_toggleAuthPinField()">
            <option value="">-- Seleccionar --</option>
            <option value="Ejecutivo"  ` + (tipoVal === 'Ejecutivo'  ? 'selected' : '') + `>Ejecutivo</option>
            <option value="Supervisor" ` + (tipoVal === 'Supervisor' ? 'selected' : '') + `>Supervisor</option>
          </select>
        </div>
        <div id="swalAuthPinWrap" style="display:none;">
          <label style="font-size:12px; font-weight:700; color:#475569; display:block; margin-bottom:5px;">
            PIN de Autorización <span style="color:#ef4444; font-size:11px;">(Solo Admin o Supervisor)</span>
          </label>
          <input id="swalAuthPin" type="password" inputmode="numeric" class="swal2-input" style="margin:0; width:100%; box-sizing:border-box; height:42px;" placeholder="PIN de Admin o Supervisor">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: esEdicion ? 'Guardar cambios' : 'Registrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2b1070',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    didOpen: function() {
      // Si ya es Supervisor en edición, mostrar el campo de auth pin
      if (tipoVal === 'Supervisor') _toggleAuthPinField();
    },
    preConfirm: () => {
      const nombre = document.getElementById('swalEjecNombre').value.trim();
      const pin    = document.getElementById('swalEjecPin').value.trim();
      const tipo   = document.getElementById('swalEjecTipo').value;
      if (!nombre || !pin) {
        Swal.showValidationMessage('Ingresa el nombre y el PIN de seguridad.');
        return false;
      }
      if (!tipo) {
        Swal.showValidationMessage('Selecciona el Tipo de Registro.');
        return false;
      }
      if (tipo === 'Supervisor') {
        const authPin = document.getElementById('swalAuthPin').value.trim();
        if (!authPin) {
          Swal.showValidationMessage('Ingresa el PIN de autorización para registrar un Supervisor.');
          return false;
        }
        const autorizado = (ejecutivosDatosPin || []).some(function(e) {
          return e.pin === authPin && (e.rol === 'Admin' || e.rol === 'Supervisor');
        });
        if (!autorizado) {
          Swal.showValidationMessage('PIN de autorización incorrecto o sin permisos suficientes.');
          return false;
        }
      }
      return { nombre: nombre, pin: pin, tipo: tipo };
    }
  }).then(result => {
    if (!result.isConfirmed) return;
    if (esEdicion) {
      guardarEdicionEjecutivo({ nombreOriginal: ejec.nombre, nombre: result.value.nombre, pin: result.value.pin, tipo: result.value.tipo });
    } else {
      guardarEjecutivo(result.value);
    }
  });
}

function guardarEjecutivo(datos) {
  Swal.fire({ title:'Registrando ejecutivo...', allowOutsideClick:false, didOpen:()=>Swal.showLoading() });

  google.script.run
    .withSuccessHandler(function(msg) {
      Swal.fire({ icon:'success', title:'¡Listo!', text:msg, timer:1500, showConfirmButton:false })
        .then(() => { refrescarEjecutivosYAbrir(); });
    })
    .withFailureHandler(function(err) {
      Swal.fire({ icon:'error', title:'Error', text: err.message || 'No se pudo registrar.', confirmButtonColor:'#2b1070' });
    })
    .registrarEjecutivo(datos);
}

function guardarEdicionEjecutivo(datos) {
  Swal.fire({ title:'Guardando cambios...', allowOutsideClick:false, didOpen:()=>Swal.showLoading() });

  google.script.run
    .withSuccessHandler(function(msg) {
      Swal.fire({ icon:'success', title:'¡Listo!', text:msg, timer:1500, showConfirmButton:false })
        .then(() => { refrescarEjecutivosYAbrir(); });
    })
    .withFailureHandler(function(err) {
      Swal.fire({ icon:'error', title:'Error', text: err.message || 'No se pudo editar.', confirmButtonColor:'#2b1070' });
    })
    .editarEjecutivo(datos);
}

function renderModalEjecutivos(listas) {
  const cont = document.getElementById('swalEjecLista');
  if (!cont) return;

  const ejecutivos = (listas && listas.ejecutivosConPin) ? listas.ejecutivosConPin : [];
  ejecutivosModalData = ejecutivos;

  if (ejecutivos.length === 0) {
    cont.innerHTML = '<div style="color:#94a3b8; font-size:13px; padding:20px;">No hay ejecutivos registrados.</div>';
    return;
  }

  const esDark = document.body.classList.contains('dark');
  const rowBrd  = esDark ? 'rgba(255,255,255,0.09)' : '#eef2f7';
  const avBg    = esDark ? 'rgba(99,102,241,0.22)'  : '#ede9fe';
  const avClr   = esDark ? '#a5b4fc'                : '#2b1070';
  const nameClr = esDark ? 'rgba(255,255,255,0.90)' : '#1e293b';
  const dotClr  = esDark ? 'rgba(255,255,255,0.30)' : '#475569';

  const filas = ejecutivos.map(function(e, i) {
    const inicial = (e.nombre || '?').charAt(0).toUpperCase();
    return ''
      + `<div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:11px 12px; border:1px solid ${rowBrd}; border-radius:12px; margin-bottom:8px;">`
      +   '<div style="display:flex; align-items:center; gap:10px; min-width:0;">'
      +     `<div style="width:34px; height:34px; border-radius:50%; background:${avBg}; color:${avClr}; font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${inicial}</div>`
      +     `<span style="font-size:14px; font-weight:600; color:${nameClr}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${e.nombre || ''}</span>`
      +   '</div>'
      +   '<div style="display:flex; align-items:center; gap:12px; flex-shrink:0;">'
      +     `<span style="font-family:monospace; font-size:14px; font-weight:700; color:${dotClr}; letter-spacing:2px; text-align:right;">••••••</span>`
      +     `<i class="fas fa-pen" title="Editar" onclick="editarEjecutivoModal(${i})" style="cursor:pointer; color:#004EE0; font-size:13px; width:18px; text-align:center;"></i>`
      +     `<i class="fas fa-trash" title="Eliminar" onclick="eliminarEjecutivoModal(${i})" style="cursor:pointer; color:#ef4444; font-size:13px; width:18px; text-align:center;"></i>`
      +   '</div>'
      + '</div>';
  }).join('');

  cont.innerHTML = filas;
}

function editarEjecutivoModal(i) {
  const e = ejecutivosModalData[i];
  if (!e) return;
  abrirModalNuevoEjecutivo(e);
}

function eliminarEjecutivoModal(i) {
  const e = ejecutivosModalData[i];
  if (!e) return;
  Swal.fire({
    icon: 'warning',
    title: '¿Eliminar ejecutivo?',
    html: 'Se eliminará a <b>' + (e.nombre || '') + '</b> de la lista. Esta acción no se puede deshacer.',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    reverseButtons: true
  }).then(result => {
    if (!result.isConfirmed) return;
    Swal.fire({ title:'Eliminando...', allowOutsideClick:false, didOpen:()=>Swal.showLoading() });
    google.script.run
      .withSuccessHandler(function(msg) {
        Swal.fire({ icon:'success', title:'¡Listo!', text:msg, timer:1500, showConfirmButton:false })
          .then(() => { refrescarEjecutivosYAbrir(); });
      })
      .withFailureHandler(function(err) {
        Swal.fire({ icon:'error', title:'Error', text: err.message || 'No se pudo eliminar.', confirmButtonColor:'#2b1070' });
      })
      .eliminarEjecutivo(e.nombre);
  });
}


// Función para abrir/cerrar el menú lateral en pantallas pequeñas
function toggleMobileDrawer() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileDrawerOverlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  }
}

// Para asegurar que si el usuario hace clic en el menú, este se cierre automáticamente
document.querySelectorAll('.mob-nav-btn, .menu-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileDrawerOverlay');
    
    if (sidebar && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    }
  });
});

</script>
