const flights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

let yourName
const nameManager = () => {
  yourName = prompt(`Bienvenido/a a Isdi Coders Airlines \nPara empezar con la búsqueda, porfavor introduce tu nombre`)
  while (!yourName) {
    yourName = prompt('Debes introducir un nombre para continuar')
  }
  console.log(`Hola ${yourName}, a continuación te mostramos todos los vuelos:`)

}

const allFlights = (flights) => {
  for (let i in flights) {
    const scales = !flights[i].scale ? 'no ' : ''
    const text = `El vuelo con origen: ${flights[i].from} y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} € y ${scales}hace escala`
    console.log(text)
  }
  return flights
}

const averageCost = (flights) => {
  let acc = 0
  for (let i in flights) {
    acc += flights[i].cost
  }
  let totalAverage = acc / flights.length
  return console.log(`El coste medio de los vuelos es: ${totalAverage}`)
}

const scaleFlights = (flights) => {
  let scale = []
  for (let i in flights) {
    if (flights[i].scale === true) {
      scale.push(flights[i])
    }
  }
  return console.log(`Hay ${scale.length} vuelos que hacen escala`)
}

const lastFlights = (flights) => {
  let fiveLast = []
  for (let i in flights) {
    if (i > flights.length - 6) {
      fiveLast.push(flights[i].to)
    }
  }
  return console.log(`Los últimos vuelos del día se dirigen a: ${fiveLast.join(', ')}`)
}

const priceFlights = (flights) => {
  let price = Number(prompt('Introduce un precio para empezar la búsqueda'))
  for (let i in flights) {
    if (price >= flights[i].cost) {
      const scales = !flights[i].scale ? 'no ' : ''
      const search = `El vuelo con origen: ${flights[i].from} y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y ${scales}hace escala`

      console.log(search)
    }
  }
  return flights
}

const addFlights = (flights) => {
  const id2 = flights[flights.length - 1].id + 1
  let newFlights = {
    id: id2, to: prompt('¿Hacia donde se dirige?'), from: prompt('¿De donde sale el vuelo?'), cost: Number(prompt('¿Cuál es su precio?')), scale: Boolean(prompt('¿Hace escala? true/false'))
  }
  if (flights.length < 15) {
    flights.push(newFlights)
  }
  while (!newFlights.to) {
    newFlights.to = prompt('¿Hacia donde se dirige?')
  }
  while (!newFlights.from) {
    newFlights.from = prompt('¿De donde sale el vuelo?')
  }
  while (isNaN(newFlights.cost) || !newFlights.cost) {
    newFlights.cost = Number(prompt('¿Cuál es su precio?'))
  }
  while (!newFlights.scale) {
    newFlights.scale = Boolean(prompt('¿Hace escala? true/false'))
  }
  return console.log(flights)
}

const deleteFlights = (flights) => {
  const idRemove = Number(prompt('Introduce el ID para borrar los vuelos'))
  flights.splice(idRemove, 1)
  alert(`El vuelo con ID: ${idRemove} ha sido eliminado`)

  return console.log(flights)
}

const adminInterface = (flights) => {
  let keepAdding = ''
  let keepDeleting = ''
  let programQuit = ''
  const addOrDelete = prompt(`Quieres añadir o borrar un vuelo. Escribe tu respuesta para continuar`)
  if (addOrDelete === 'añadir') {
    do {
      addFlights(flights)
      keepAdding = confirm('Quieres añadir más vuelos?')
      if (flights.length === 15) {
        const noMoreFlights = 'No puedes introducir más vuelos'
        alert(noMoreFlights)
        keepAdding = false
      }
      if (keepAdding === false) {
        let otherAction = confirm('Ahora quieres borrar algún vuelo?')
        if (otherAction === true) {
          do {
            deleteFlights(flights)
            keepDeleting = confirm('Quieres borrar más vuelos')
            if (keepDeleting === false) {
              programQuit = 'Hemos terminado por ahora.\nEn la consola encontrarás la base de datos actualizada. Hasta pronto.'
              alert(programQuit)
            }
          }
          while (keepDeleting === true)
        }
        if (otherAction === false) {
          alert('Gracias por tu tiempo. Hasta pronto.')
        }
      }
    }
    while (keepAdding === true)
  }
  if (addOrDelete === 'borrar') {
    do {
      deleteFlights(flights)
      keepDeleting = confirm('Quieres borrar más vuelos?')
      if (keepDeleting === false) {
        let otherAction = confirm('Ahora quieres añadir algún vuelo?')
        if (otherAction === true) {
          do {
            addFlights(flights)
            keepAdding = confirm('Quieres añadir más vuelos?')
            if (flights.length === 15) {
              const noMoreFlights = 'No puedes introducir más vuelos'
              alert(noMoreFlights)
              keepAdding = false
            }
            if (keepAdding === false) {
              programQuit = 'Hemos terminado por ahora.\nEn la consola encontrarás la base de datos actualizada. Hasta pronto.'
              alert(programQuit)
            }
          }
          while (keepAdding === true)
        }
        if (otherAction === false) {
          alert('Gracias por tu tiempo. Hasta pronto.')
        }
      }
    }
    while (keepDeleting === true)
  }
  return flights
}

const userInterface = (flights) => {
  let userQuit = ''
  do {
    priceFlights(flights)
    userQuit = confirm('Quieres realizar una nueva búsqueda')
    if (userQuit === false) {
      const quitMessage = 'Esperamos que hayas encontrado lo que te interesa. Saludos'
      alert(quitMessage)
    }
  }
  while (userQuit === true)
  return flights
}

const adminOrUser = () => {
  let permissions = prompt(`¿Eres admin o user? \nEscribe tu respuesta para poder continuar`)
  while (permissions !== 'admin' && permissions !== 'user') {
    permissions = prompt('Lo siento. No te hemos entendido. Eres admin o user?')
  }
  if (permissions === 'admin') {
    adminInterface(flights)
  }
  if (permissions === 'user') {
    userInterface(flights)
  }
  return flights
}

const airlines = (flights) => {
  nameManager()
  allFlights(flights)
  averageCost(flights)
  scaleFlights(flights)
  lastFlights(flights)
  adminOrUser(flights)
}

airlines(flights)