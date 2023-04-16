$(document).ready(function () {
    // Obtener la lista de productos al cargar la página
    getProductos();

    // Manejar el evento de enviar el formulario para agregar un nuevo producto
    $('#agregar-producto-form').submit(function (event) {
        event.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        registrarProducto(formData);
        form.console();
    });
});

// Obtener la lista de productos desde la API REST
function getProductos() {
    $.ajax({
        url: 'https:/donjulio.fun/api/productos.php',
        method: 'GET',
        dataType: 'json'
    }).done(function (data) {
        mostrarProductos(data);
    }).fail(function () {
        alert('Error al obtener la lista de productos');
    });
}

// Mostrar la lista de productos en la tabla
function mostrarProductos(productos) {
    var productosTableBody = $('#productos-table-body');
    productosTableBody.empty();
    $.each(productos, function (index, producto) {
        var tr = $('<tr>');
        tr.append('<td>' + producto.id + '</td>');
        tr.append('<td>' + producto.nombre + '</td>');
        tr.append('<td>' + producto.categoria + '</td>');
        tr.append('<td>' + producto.descripcion + '</td>');
        tr.append('<td>' + producto.precio + '</td>');
        tr.append('<td><button  class="btn btn-sm btn-primary editar-producto-btn" data-cod_producto="' + producto.id + '">Editar</button> <button onclick="eliminarProducto(' + producto.id + ')" class="btn btn-sm btn-danger eliminar-producto-btn" data-cod_producto="' + producto.id + '">Eliminar</button></td>');
        productosTableBody.append(tr);
    });
}

// Registrar Producto en  la API REST
function registrarProducto() {
    var cod_producto = $('#cod_producto').val();
    var name_producto = $('#name_producto').val();
    var category_producto = $('#category_producto').val();
    var description_producto = $('#description_producto').val();
    var price_producto = $('#price_producto').val();
    

    var nuevoProducto = {
      cod_producto: cod_producto,
      name_producto: name_producto,
      category_producto: category_producto,
      description_producto: description_producto,
      price_producto: price_producto
    };

    console.log(nuevoProducto);

    $.ajax({
        url: 'https:/donjulio.fun/api/productos.php',
    
        data:{
          "id":cod_producto,
          "nombre":name_producto,
          "precio":price_producto,
          "descripcion":description_producto,
          "categoria":category_producto },
        method: 'POST',
        dataType: 'json'
        
    }).done(function (data) {
        alert('Producto registrado exitosamente');
        form.trigger('reset');
        getProductos();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        getProductos();

    });
  }

//Eliminar producto del sitema 
  function eliminarProducto(id) {
    $.ajax({
      url: 'https:/donjulio.fun/api/productos.php?id='+id,
      method: 'DELETE',
      dataType: 'json'
  }).done(function (data) {
        getProductos();
  }).fail(function () {
      alert('Error al obtener la lista de productos');
  });
  
  }


  //Mostrar un solo producto 

  function mostarProducto(id) {
    $.ajax({
      url: 'https:/donjulio.fun/api/productos.php',
  
      data:{
        "id":id,},
      method: 'GET',
      dataType: 'json'
  }).done(function (data) {
      console.log(data);
  }).fail(function () {
      alert('Error al obtener la lista de productos');
  });s
  }  


//Editar Producto 

  function editarProducto(eid,enombre,eprecio,edescripcion,ecategoria){

    $.ajax({
      url: 'https:/donjulio.fun/api/productos.php?', // La URL del endpoint de la API REST
      type: 'PUT', // El método HTTP a utilizar (PUT)
      dataType: 'json', // El tipo de datos esperados como respuesta (JSON)
      data: JSON.stringify({ // Los datos a enviar en el cuerpo de la petición, convertidos a JSON
          id:eid,
          nombre: enombre,
          precio: eprecio,
          descripcion: edescripcion,
          categoria: ecategoria
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
    

   