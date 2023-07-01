// Obtener la dirección IP del usuario
function obtenerDireccionIP() {
    return fetch('https://api.ipify.org?format=json')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener la dirección IP');
        }
      })
      .then(data => data.ip);
  }
  
  
  // Obtener la ubicación utilizando la dirección IP
  function obtenerUbicacion(direccionIP) {
    const apiKey = 'TU_API_KEY';
    return fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=e0963e1a4b9c4670b5766f4048a832df&ip=${direccionIP}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener la ubicación');
        }
      })
      .then(data => ({
        pais: data.country_name,
        ubicacion: {
          ciudad: data.city,
          region: data.region,
          codigoPostal: data.zipcode,
          latitud: data.latitude,
          longitud: data.longitude
        }
      }));
  }
  
  
  // Ejecutar las funciones y obtener la información del país y ubicación
  obtenerDireccionIP()
    .then(direccionIP => obtenerUbicacion(direccionIP))
    .then(data => {
      console.log('País:', data.pais);
      console.log('Ubicación:', data.ubicacion);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  