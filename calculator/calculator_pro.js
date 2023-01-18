const n = [];
let entries;
do {
  entries = Number(
    prompt(
      `Porfavor, introduce un número.\nDeje el texto vacío y aprete aceptar cuando quiera obtener los resultados`
    )
  );

  if (isNaN(entries)) {
    alert(
      `El valor introducido debe ser un número\n¿Quieres volver a intentarlo?`
    );
  } else {
    n.push(entries);
  }
} while (entries !== 0);

function sum() {
  let acc = 0;
  for (let i = 0; i < n.length - 1; i++) {
    acc += n[i];
  }

  return acc;
}

function resta() {
  let acc1 = 0;
  for (let i = 0; i < n.length - 1; i++) {
    if (i === 0) {
      acc1 = n[i];
    } else {
      acc1 -= n[i];
    }
  }

  return acc1;
}

function multi() {
  let acc2 = 0;
  for (let i = 0; i < n.length - 1; i++) {
    if (i === 0) {
      acc2 = n[i];
    } else {
      acc2 *= n[i];
    }
  }

  return acc2;
}

function div() {
  let acc3 = 0;
  for (let i = 0; i < n.length - 1; i++) {
    if (i === 0) {
      acc3 = n[i];
    } else {
      acc3 /= n[i];
    }
  }

  return acc3;
}

const result = [];
let lastResult = [];

function calculator() {
  switch (n.length === 2) {
    case true:
      alert(`La raíz cuadrada de ${n[0]} es: ${Math.sqrt(n[0]).toFixed(3)}`);
      break;
    case false:
      result.push(sum(), resta(), multi(), div());
      break;
    default:
      alert(`No podemos realizar operaciones con estos valores`);
  }

  const actualResult = `Los últimos resultados son: \nSuma: ${
    result[0]
  } \nResta: ${result[1]} \nMultiplicación: ${
    result[2]
  } \nDivisión: ${result[3].toFixed(3)}\n\n`;
  const prevResult = lastResult.length
    ? `Los anteriores resultados han sido: \nSuma: ${lastResult[0]} \nResta: ${
        lastResult[1]
      } \nMultiplicación: ${lastResult[2]} \nDivisión: ${lastResult[3].toFixed(
        3
      )}`
    : "";

  return alert(
    lastResult.length ? `${actualResult}${prevResult}` : actualResult
  );
}

calculator();

let otherNums = "";
do {
  otherNums = prompt("¿Quieres hacer más operaciones? si/no");

  if (otherNums === "si") {
    n.splice(0, n.length);
    lastResult = [...result];
    result.splice(0, result.length);
    do {
      entries = Number(
        prompt(
          `Porfavor, introduce un número.\nDeje el texto vacío y aprete aceptar cuando quiera obtener los resultados`
        )
      );

      if (isNaN(entries)) {
        alert(
          `El valor introducido debe ser un número\n¿Quieres volver a intentarlo?`
        );
      } else {
        n.push(entries);
      }
    } while (entries !== 0);

    calculator();
  }
} while (otherNums === "si");

alert("Bye!");

export default sum;
