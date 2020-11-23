function getCategoryInfo(obj) {
    var value = obj.value;

    switch(value) {
        case "tarjeta_video":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputFrecuencia">Frecuencia</label>
                    <input type="text" class="form-control" id="inputFrecuencia" required name="frecuencia">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputVer_pci">Version PCI</label>
                    <input type="text" class="form-control" id="inputVer_pci" required name="ver_pci">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputBoost_reloj">Reloj Boost</label>
                    <input type="text" class="form-control" id="inputBoost_reloj" required name="boost_reloj">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputVram">Memoria RAM de video</label>
                    <input type="text" class="form-control" id="inputVram" required name="vram" >
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypeVram">Tipo de memoria RAM de video</label>
                    <select class="form-control" id="inputTypeVram" required name="tipo_vram">
                        <option selected disabled value="">Elegir...</option>
                        <option>GDDR</option>
                        <option>GDDR2</option>
                        <option>GDDR3</option>
                        <option>GDDR4</option>
                        <option>GDDR5</option>
                        <option>GDDR6</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTdp">TDP</label>
                    <input type="number" class="form-control" id="inputTdp" required name="tdp" min="1" max="1000" placeholder="Watts">
                </div>
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;

        case "motherboard":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputTypeFactor_forma">Factor de forma</label>
                    <select class="form-control" id="inputTypeFactor_forma" required name="factor_forma">
                        <option selected disabled value="">Elegir...</option>
                        <option>ATX</option> 
                        <option>microATX</option> 
                        <option>MiniITX</option> 
                        <option>ExtendedATX</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputSocket">Socket</label>
                    <input type="text" class="form-control" id="inputSocket" required name="socket">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputChipset">Chipset</label>
                    <input type="text" class="form-control" id="inputChipset" required name="chipset">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputLineas_pcie">Lineas PCIe</label>
                    <input type="number" class="form-control" id="inputLineas_pcie" required name="lineas_pcie" min="1" max="100" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypeTipo_canal">Tipo de canal</label>
                    <select class="form-control" id="inputTypeTipo_canal" required name="dual_quad_channel">
                        <option selected disabled value="">Elegir...</option>
                        <option>Dual channel</option> 
                        <option>Quad channel</option> 
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputFrecuencia_ram">Frecuencia de RAM</label>
                    <input type="text" class="form-control" id="inputFrecuencia_ram" required name="frecuencia_ram">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPuertos_pci">Puertos PCI</label>
                    <input type="number" class="form-control" id="inputPuertos_pci" required name="puertos_pci" min="1" max="100" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPuertos_pcie">Puertos PCIe</label>
                    <input type="number" class="form-control" id="inputPuertos_pcie" required name="puertos_pci" min="1" max="100" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPuertos_sata">Puertos SATA</label>
                    <input type="number" class="form-control" id="inputPuertos_sata" required name="puertos_pci" min="1" max="100" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputCant_usb">Puertos USB</label>
                    <input type="number" class="form-control" id="inputCant_usb" required name="cant_usb" min="1" max="200" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputio_extra">Puertos I/O Extra</label>
                    <input type="number" class="form-control" id="inputio_extra" required name="io_extra" min="1" max="200" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypegeneracion_ram">Generación de RAM Soportada</label>
                    <select class="form-control" id="inputTypegeneracion_ram" required name="generacion_ram">
                        <option selected disabled value="">Elegir...</option>
                        <option>DDR</option> 
                        <option>DDR2</option> 
                        <option>DDR3</option> 
                        <option>DDR4</option>
                    </select>
                </div>
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;

        case "ram":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputFrecuencia">Frecuencia</label>
                    <input type="text" class="form-control" id="inputFrecuencia" required name="frecuencia" maxlength="7" pattern="[0-9]{4}MHz">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputLatencia">Latencia</label>
                    <input type="text" class="form-control" id="inputLatencia" required name="latencia">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypegeneracion">Generación</label>
                    <select class="form-control" id="inputTypegeneracion" required name="generacion">
                        <option selected disabled value="">Elegir...</option>
                        <option>DDR</option> 
                        <option>DDR2</option> 
                        <option>DDR3</option> 
                        <option>DDR4</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputCapacidad">Capacidad</label>
                    <input type="number" class="form-control" id="inputCapacidad" required name="capacidad" min="1" max="99999">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypeecc">ECC?</label>
                    <select class="form-control" id="inputTypeecc" required name="ecc">
                        <option selected disabled value="">Elegir...</option>
                        <option>Si</option> 
                        <option>No</option>
                    </select>
                </div>
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;

        case "almacenamiento":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputCapacidad">Capacidad</label>
                    <input type="number" class="form-control" id="inputCapacidad" required name="capacidad" min="1" max="999999999999999" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypefactor_forma">Factor de Forma</label>
                    <select class="form-control" id="inputTypefactor_forma" required name="factor_forma">
                        <option selected disabled value="">Elegir...</option>
                        <option>2.5 in</option> 
                        <option>3.5 in</option> 
                        <option>M.2</option> 
                        <option>PCIe</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypetipo_disco">Tipo de Disco</label>
                    <select class="form-control" id="inputTypetipo_disco" required name="tipo_disco">
                        <option selected disabled value="">Elegir...</option>
                        <option>HDD</option> 
                        <option>SSD</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputvelocidad_escritura">Velocidad de Escritura</label>
                    <input type="number" class="form-control" id="inputvelocidad_escritura" required name="velocidad_escritura">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputvelocidad_lectura">Velocidad de Lectura</label>
                    <input type="number" class="form-control" id="inputvelocidad_lectura" required name="velocidad_lectura">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputrpm">Revoluciones por Minuto (RPM)</label>
                    <input type="number" class="form-control" id="inputrpm" required name="rpm" min="1" max="99999" step="1">
                </div>
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;

        case "case":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputTypefactor_forma">Factor de Forma</label>
                    <select class="form-control" id="inputTypefactor_forma" required name="factor_forma">
                        <option selected disabled value="">Elegir...</option>
                        <option>Mid Tower</option>
                        <option>Full Tower</option>
                        <option>Mini Tower</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputvent_incluidos">Ventiladores incluidos</label>
                    <input type="number" class="form-control" id="inputvent_incluidos" required name="vent_incluidos" min="0" max="20" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputpuertos_frontales">Puertos Frontales</label>
                    <input type="number" class="form-control" id="inputpuertos_frontales" required name="puertos_frontales" min="1" max="20" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputbahias_radiador">Bahias para Radiador</label>
                    <input type="number" class="form-control" id="inputbahias_radiador" required name="bahias_radiador" min="1" max="20" step="1">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputbahias_almacenamiento">Bahias para Almacenamiento</label>
                    <input type="number" class="form-control" id="inputbahias_almacenamiento" required name="bahias_almacenamiento" min="1" max="20" step="1">
                </div>
                
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;

        case "fuente_alimentacion":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputPotencia">Potencia</label>
                    <input type="text" class="form-control" id="inputPotencia" required name="potencia" maxlength=19>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypeFactor_forma">Factor de Forma</label>
                    <select class="form-control" id="inputTypeFactor_forma" required name="factor_forma">
                        <option selected disabled value="">Elegir...</option>
                        <option>ATX</option>
                        <option>SFX</option>
                        <option>TFX</option>
                        <option>Flex ATX</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypemodularidad">Modular?</label>
                    <select class="form-control" id="inputTypemodularidad" required name="modularidad">
                        <option selected disabled value="">Elegir...</option>
                        <option>Si</option>
                        <option>No</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypetipo_alimentacion">Tipo de Alimentación</label>
                    <select class="form-control" id="inputTypetipo_alimentacion" required name="tipo_alimentacion">
                        <option selected disabled value="">Elegir...</option>
                        <option>Digital</option>
                        <option>Analógica</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputTypecertificacion">Certificación</label>
                    <select class="form-control" id="inputTypecertificacion" required name="certificacion">
                        <option selected disabled value="">Elegir...</option>
                        <option>80 Plus</option>
                        <option>80 Plus Bronce</option>
                        <option>80 Plus Plata</option>
                        <option>80 Plus Oro</option>
                        <option>80 Plus Platino</option>
                        <option>80 Plus Titanio</option>
                    </select>
                </div>
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;

        case "cpu":
            var html = `
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputFrecuencia">Frecuencia</label>
                    <input type="text" class="form-control" id="inputFrecuencia" required name="frecuencia">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputcant_nucleos_hilos">Cantidad de nucleos / hilos</label>
                    <input type="text" class="form-control" id="inputcant_nucleos_hilos" required name="cant_nucleos_hilos">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputSocket">Socket</label>
                    <input type="text" class="form-control" id="inputSocket" required name="socket">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputproceso_fabricacion">Proceso de fabricación</label>
                    <input type="text" class="form-control" id="inputproceso_fabricacion" required name="proceso_fabricacion">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputcache">Cache</label>
                    <input type="text" class="form-control" id="inputcache" required name="cache">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputtdp">TDP</label>
                    <input type="text" class="form-control" id="inputtdp" required name="tdp">
                </div>
            </div>
            `
            document.getElementById("tipo").innerHTML = html;
            break;
    }
}


const token = window.localStorage.getItem('token')

if(!token){
    document.getElementById("insert").innerHTML= `<li class="nav-item" id="usuarionav">
    <a class="nav-link hover" href="/Front/login.html"><i class="fas fa-user"></i> Iniciar sesión</a>
  </li>
  <li class="nav-item" id="registranav">
      <a class="nav-link hover" href="/Front/register.html"><i class="fas fa-user"></i> Registrarse</a>
  </li>`
}else{
    document.getElementById("insert").innerHTML=""
    document.getElementById("insert").innerHTML=`<span tabindex="0"  data-toggle="popover" data-trigger="focus" data-placement="bottom"  id="username"><i class="fas fa-user"></i> </span>
    <a href="/UserCart/<%=Sesion.id%>"><i class="fas fa-shopping-cart"></i></a>`

    if(isAdmin()) {
        var options = `<a class="nav-link hover" href="/Front/admin.html"><i class="fas fa-user-cog"></i> Panel Administrativo</a>
        <a class="nav-link hover" href="/Front/SessionClose"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`
    } else {
        var options = `<a class="nav-link hover" href="/Front/SessionClose"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>`;
    }

    $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
            trigger: "click",
            html: true,
            content: options
        })
    })
}