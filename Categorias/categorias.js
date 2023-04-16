$(document).ready(function () {
    // Obtener la lista de productos al cargar la página
    getCategorias();

    // Manejar el evento de enviar el formulario para agregar un nuevo producto
    $('#agregar-producto-form').submit(function (event) {
        event.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        registrarCategoria(formData);
        form.console();
    });
});

// Obtener la lista de categorias desde la API REST
function getCategorias() {
    $.ajax({
        url: 'https:/donjulio.fun/api/categorias.php',
        method: 'GET',
        dataType: 'json'
    }).done(function (data) {
        mostrarCategorias(data);
    }).fail(function () {
        alert('Error al obtener la lista de categorias');
    });
}

// Mostrar la lista de categorias en la tabla
function mostrarCategorias(categoria) {
    var productosTableBody = $('#productos-table-body');
    productosTableBody.empty();
    $.each(categoria, function (index, categoria) {
        var tr = $('<tr>');
        tr.append('<td>' + categoria.id + '</td>');
        tr.append('<td>' + categoria.nombre + '</td>');
        tr.append('<td>' + categoria.descripcion + '</td>');
        tr.append('<td><button  class="btn btn-sm btn-primary editar-producto-btn" data-cod_producto="' + categoria.id + '">Editar</button> <button onclick="eliminarCategoria(' + categoria.id + ')" class="btn btn-sm btn-danger eliminar-producto-btn" data-cod_producto="' + categoria.id + '">Eliminar</button></td>');
        productosTableBody.append(tr);
    });
}

// Registrar Producto en  la API REST
function registrarCategoria() {
    var cod_categoria = $('#cod_producto').val();
    var name_categoria = $('#name_producto').val();
    var description_categoria = $('#description_producto').val();

    $.ajax({
        url: 'https:/donjulio.fun/api/categorias.php',
    
        data:{
          "id":cod_categoria,
          "nombre":name_categoria,
          "descripcion":description_categoria
 },
        method: 'POST',
        dataType: 'json'
        
    }).done(function (data) {
        alert('categoria registrada exitosamente');
        form.trigger('reset');
        getCategorias();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        getCategorias();
        alert("no se puede realizar la operacion ");

    });
  }

//Eliminar producto del sitema 
  function eliminarCategoria(id) {

    $.ajax({
      url: 'https:/donjulio.fun/api/categorias.php?id='+id,
      method: 'DELETE',
      dataType: 'json'
  }).done(function (data) {
    getCategorias();
  }).fail(function () {
      alert('Error al eliminar categoria');
  });
  
  }


  //Mostrar un solo producto 
  
  function mostarCategoria(id) {
    $.ajax({
      url: 'https:/donjulio.fun/api/categorias.php',
  
      data:{
        "id":id,},
      method: 'GET',
      dataType: 'json'
  }).done(function (data) {
      console.log(data);
  }).fail(function () {
      alert('Error al obtener la  categorias');
  });
  }  


//Editar Categorias 

  function editarCategoria(eid,enombre,edescripcion){

    $.ajax({
      url: 'https:/donjulio.fun/api/categorias.php?', // La URL del endpoint de la API REST
      type: 'PUT', // El método HTTP a utilizar (PUT)
      dataType: 'json', // El tipo de datos esperados como respuesta (JSON)
      data: JSON.stringify({ // Los datos a enviar en el cuerpo de la petición, convertidos a JSON
          id:eid,
          nombre: enombre,
          descripcion: edescripcion
      }),
      headers: {
          'Content-Type': 'application/json' // La cabecera Content-Type debe ser de tipo application/json
      },
      success: function(data) {
          console.log(data); // La respuesta de la API REST, en formato JSON
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown); // En caso de error, se muestra el mensaje de error en la consola
      }
    });
    
    
    };
    

   